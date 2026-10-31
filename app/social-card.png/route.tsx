import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "75px 90px", background: "#faf9f6", color: "#282c27" }}><div style={{ display: "flex", fontSize: 30, color: "#52694d" }}>KALEC.IO / BLOG</div><div style={{ display: "flex", fontSize: 115, letterSpacing: -7 }}>kalec.io</div><div style={{ display: "flex", fontSize: 29, color: "#52694d", borderTop: "1px solid #d9ddcf", paddingTop: 30 }}>Technology · Design · Software</div></div>, { width: 1200, height: 630 });
}
