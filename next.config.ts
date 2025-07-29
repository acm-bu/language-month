import type { NextConfig } from "next";
import createMdx from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "mdx", "md", "ts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      }
    ]
  }
};

const withMdx = createMdx({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypePrettyCode, { theme: "tokyo-night", keepBackground: true, } ],],
  }
})

export default withMdx(nextConfig);
