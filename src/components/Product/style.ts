import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const CardContainer = styled(Link)`
  background-color: ${colors.gray};
  border-radius: 8px;
  height: 100%;
  padding: 8px;
  position: relative;
  display: block;
  color: ${colors.white};
  text-decoration: none;
  opacity: 0; /* Aplica a opacidade inicial aqui */
  transform: translateY(20px); /* Aplica a transformação inicial aqui */
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-out,
    transform 0.3s ease-in-out,
    /* Adiciona transição para o zoom */ box-shadow 0.3s ease-in-out; /* Adiciona transição para a sombra */

  &.show {
    /* Aplica a classe show diretamente ao CardContainer */
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.05) translateY(0); /* Aplica zoom no hover, mantendo a posição Y */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Opcional: Adiciona uma sombra sutil */
  }

  img {
    display: block;
    height: 250px;
    width: 100%;
    transition: transform 0.3s ease-in-out; /* Adiciona transição para o zoom da imagem */
    border-radius: 8px;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.05); /* Aplica zoom na imagem no hover do card */
  }

  ${TagContainer} {
    margin-right: 8px;
  }
`

export const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin-top: 16px;
  margin-bottom: 8px;
`

export const CardDescription = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-top: 16px;
`
export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
