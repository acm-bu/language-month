

export default async function PuzzleDescription({ language, id }: { language: string, id: string }) {
  const mod = await import(`@/content/${language}/${id}.mdx`);
  const Component = mod.default;

  return (
    <article className="prose">
      <Component />
    </article>
  )
}
