import { clsxm } from '@/utils'

interface ImageProps {
  imgSrc: string
  className?: string
}

export const Image = ({ imgSrc, className }: ImageProps) => {
  return <img className={clsxm(className)} src={imgSrc} alt={imgSrc} />
}
