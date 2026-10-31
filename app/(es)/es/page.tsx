import { BlogHome } from "@/components/blog-home";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("es");
export default function Home() { return <BlogHome locale="es" />; }
