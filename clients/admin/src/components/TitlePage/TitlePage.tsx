interface Props {
  title: string
}
export default function TitlePage({ title }: Props) {
  return (
    <header className='flex items-center justify-between mb-4'>
      <h2 className='text-2xl'>{title}</h2>
    </header>
  )
}
