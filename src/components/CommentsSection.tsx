"use client";
import Giscus from "@giscus/react";

export function CommentsSection() {
  console.log("Rendering comments section");
  return (
    <Giscus
      repo="acm-bu/language-month"
      repoId="R_kgDOPRC5qg"
      category="Announcements"
      categoryId="DIC_kwDOPRC5qs4CuMMy"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
    />

  )
}
