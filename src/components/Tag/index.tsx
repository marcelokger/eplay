import type { CSSProperties } from 'styled-components'
import { TagContainer } from './styles'

export type Props = {
  size?: 'small' | 'big'
  children: string
  style?: CSSProperties
}

const Tag = ({ children, size = 'small', style }: Props) => (
  <TagContainer size={size} style={style}>
    {children}
  </TagContainer>
)

export default Tag
