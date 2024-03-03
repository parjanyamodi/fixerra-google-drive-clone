import Content from "./content";

export default function Page({
  params: { filePath },
}: {
  params: { filePath: string[] };
}) {
  return <Content filePath={filePath} />;
}
