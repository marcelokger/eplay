import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

type InputGroupProps = {
  maxWidth?: string
}

type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  isActive?: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px; // alem de funcionar com o display grid, tbm funciona com o flex.
  margin-top: ${(props) => props.marginTop || '0'};
  align-items: flex-end;
`
export const InputGroup = styled.div<InputGroupProps>`
  flex: auto; // a largura sera distribuída de forma igual para todos os elementos.
  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
  }

  input,
  select {
    background-color: ${colors.white};
    border: 1px solid ${colors.white}; // adiciona uma borda igual a cor de fundo do input para usar na validação do campo, deixando vermelho caso esteja incorreto.
    height: 32px;
    padding: 0 8px;
    width: 100%;

    &.error {
      border: 1px solid red;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 16px;
    display: block;
  }
`
export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${(props) => (props.isActive ? colors.green : colors.black)};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 8px;
    display: block;
    width: 100%;
  }
`
