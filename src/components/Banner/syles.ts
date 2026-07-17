import styled from 'styled-components'
import { colors } from '../../styles'

export const Image = styled.div`
  width: 100%;
  height: 560px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  color: ${colors.white};
  overflow: hidden;
  filter: saturate(0.4) brightness(0.5);
  transition: filter 0.5s ease-in-out;

  &:hover::before {
    opacity: 0.7;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }

  .containerBanner {
    text-align: left;
    padding-left: 180px;
    padding-bottom: 40px;
    z-index: 10;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease-in-out,
      transform 0.5s ease-in-out;
  }

  &:hover .containerBanner {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    filter: saturate(1) brightness(1);
  }
`

export const Title = styled.h2`
  font-size: 30px;
  max-width: 450px;
  margin-bottom: 10px;
  text-align: left;
  z-index: 11;
`

export const Prices = styled.p`
  font-size: 20px;
  text-align: left;
  z-index: 11;

  span {
    text-decoration: line-through;
  }
`
