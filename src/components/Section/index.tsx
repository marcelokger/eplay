import type { JSX } from 'react'
import * as Styles from './styles'

export type Props = {
  title: string
  background: 'black' | 'gray'
  children: JSX.Element
}

const Section = ({ title, background, children }: Props) => (
  <Styles.ContainerCards background={background}>
    <div className="container">
      <Styles.TitleSection>{title}</Styles.TitleSection>
      {children}
    </div>
  </Styles.ContainerCards>
)
export default Section
