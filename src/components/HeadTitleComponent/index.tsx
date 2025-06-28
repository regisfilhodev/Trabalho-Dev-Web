import { Helmet } from 'react-helmet-async'

interface HeadTitleComponentProps {
  title: string
}

export function HeadTitleComponent({ title }: HeadTitleComponentProps) {
  return (
    <Helmet>
      <title>Coffee Delivery - {title}</title>
    </Helmet>
  )
}
