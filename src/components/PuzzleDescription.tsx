

export default async function PuzzleDescription({ language, id }: { language: string, id: string }) {
  const mod = await import(`@/content/${language}/${id}.mdx`);
  const Component = mod.default;

  return (
    <div className="w-full flex flex-col mt-16">
      <article className="prose max-w-[800px] mx-auto">
        <Component />
      </article>
    </div>
  )
}
