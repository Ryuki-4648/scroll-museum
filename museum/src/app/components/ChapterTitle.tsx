interface ChapterTitleProps {
  children: string;
}

export default function ChapterTitle({ children }: ChapterTitleProps) {
  return (
    <h3 className="text-center text-[6rem] font-ten tracking-wider">{children}</h3>
  )
}