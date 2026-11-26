import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { load } from "js-yaml";

const source = readFileSync(new URL("../.github/workflows/pull-request.yml", import.meta.url), "utf8");
const workflow = load(source);
const jobs = Object.values(workflow.jobs);

test("validation runs for pull requests without branch or path exclusions", () => {
  assert.deepEqual(workflow.on, { pull_request: null });
  assert(jobs.length > 0);
  for (const job of jobs) {
    assert.equal(job.if, undefined, "PR validation must not be skipped by a job condition");
  }
});

test("PR validation has read-only access and no deployment credentials or actions", () => {
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.doesNotMatch(source, /\bsecrets\s*[.[]/i);
  assert.equal(workflow.env, undefined, "Validation must not require external configuration");
  const setupActions = new Set(["actions/checkout", "pnpm/action-setup", "actions/setup-node"]);
  for (const job of jobs) {
    assert.equal(job.environment, undefined, "Validation must not access a deployment environment");
    assert.equal(job.env, undefined);
    assert.equal(job.permissions, undefined, "Jobs must inherit read-only permissions");
    assert.equal(job.uses, undefined, "Validation must not delegate to a deployment workflow");
    for (const step of job.steps) {
      assert.equal(step.env, undefined);
      if (step.uses) {
        const action = step.uses.split("@")[0];
        assert(setupActions.has(action), `Unexpected action in PR validation: ${action}`);
        if (action === "actions/checkout") {
          assert.equal(step.with?.["persist-credentials"], false);
          assert.equal(step.with?.ref, undefined, "Checkout must validate the PR merge commit");
        }
      }
      if (step.run) {
        assert.match(step.run, /^pnpm (install --frozen-lockfile|lint|typecheck|test|build|check:seo)$/);
      }
    }
  }
});

test("all five validation gates are mandatory and SEO checks the completed build", () => {
  const validation = jobs.find((job) => job.steps?.some((step) => step.run === "pnpm build"));
  assert(validation, "Missing static build job");
  assert.equal(validation["continue-on-error"], undefined);
  const commands = validation.steps.map((step) => step.run).filter(Boolean);
  for (const command of ["pnpm lint", "pnpm typecheck", "pnpm test", "pnpm build", "pnpm check:seo"]) {
    assert(commands.includes(command), `Missing validation gate: ${command}`);
  }
  assert(commands.indexOf("pnpm install --frozen-lockfile") >= 0);
  assert(commands.indexOf("pnpm install --frozen-lockfile") < commands.indexOf("pnpm lint"));
  assert(commands.indexOf("pnpm build") < commands.indexOf("pnpm check:seo"));
  for (const step of validation.steps) {
    assert.equal(step.if, undefined, "Validation gates must not be conditional");
    assert.equal(step["continue-on-error"], undefined, "Validation failures must fail the check");
  }
});
