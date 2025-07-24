import path from "path";


function getMarkdownPath(language: string, id: string) {
  const root = path.resolve(__dirname, "../..");
  return path.join(root, `content/${language}/${id}.mdx`);
}


export default async function PuzzleDescription({ language, id }: { language: string, id: string }) {
  const mod = await import(`@/content/${language}/${id}.mdx`);
  const Component = mod.default;

  return (
    <article>
      <Component />
    </article>
  )
}
