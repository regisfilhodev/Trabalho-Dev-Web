import { ReactNode } from 'react'
import { BACKGROUND_ICON_COLOR, IconPresentarionItem } from './styles'

interface PresentationIconProps {
  backgroundColor: keyof typeof BACKGROUND_ICON_COLOR
  children: ReactNode
}

export function PresentationIcon({
  backgroundColor,
  children,
}: PresentationIconProps) {
  return (
    <IconPresentarionItem backgroundColor={backgroundColor}>
      {children}
    </IconPresentarionItem>
  )
}
