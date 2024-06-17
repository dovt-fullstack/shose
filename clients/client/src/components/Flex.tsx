import { clsxm } from '@/utils'

interface FlexProps {
  children: React.ReactNode
  className: string
}

export const Flex = ({ children, className }: FlexProps) => {
  return <div className={clsxm(className)}>{children}</div>
}
