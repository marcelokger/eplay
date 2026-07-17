import styled from 'styled-components'
import type { Props } from '.'
import { breakpoints, colors } from '../../styles'
import { CardContainer } from '../Product/style'

export const ContainerCards = styled.section<Omit<Props, 'title' | 'games' | 'isLoading'>>`
  padding: 32px 0;
  background-color: ${(props) => (props.background === 'black' ? colors.black : colors.gray)};

  ${CardContainer} {
    background-color: ${(props) => (props.background === 'black' ? colors.gray : colors.black)};
  }
`

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 40px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const TitleSection = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
