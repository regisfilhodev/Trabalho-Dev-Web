import styled from 'styled-components'

export const BACKGROUND_ICON_COLOR = {
  yellow: 'yellow-500',
  yellowDark: 'yellow-700',
  gray: 'gray-700',
  purple: 'purple-500',
} as const

export interface BackgroundIconProps {
  backgroundColor: keyof typeof BACKGROUND_ICON_COLOR
}

export const IconPresentarionItem = styled.div<BackgroundIconProps>`
  background: ${(props) =>
    props.theme[BACKGROUND_ICON_COLOR[props.backgroundColor]]};
  color: ${(props) => props.theme['gray-100']};

  width: 2rem;
  height: 2rem;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;
`
