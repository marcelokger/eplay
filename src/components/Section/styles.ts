import styled from 'styled-components'
import type { Props } from '.'
import { colors } from '../../styles'
import { CardContainer } from '../Product/style'

export const ContainerCards = styled.section<Omit<Props, 'title' | 'games'>>`
  padding: 32px 0;
  background-color: ${(props) => (props.background === 'black' ? colors.black : colors.gray)};

  ${CardContainer} {
    background-color: ${(props) => (props.background === 'black' ? colors.gray : colors.black)};
  }

  p {
    font-size: 14px;
    line-height: 22px;
    max-width: 640px;
  }
`

export const TitleSection = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
`
