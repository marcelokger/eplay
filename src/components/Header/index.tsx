import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootReducer } from '../../store'
import { open } from '../../store/reducers/cart'

import cartIcon from '../../assets/images/carrinho.svg'
import logo from '../../assets/images/logo.svg'
import * as Styles from './styles'

const Header = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <Styles.HeaderBar>
      <Styles.HeaderRow>
        <div>
          <Styles.MenuHamburguer onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span />
            <span />
            <span />
          </Styles.MenuHamburguer>
          <Link to="/">
            <h1>
              <img src={logo} alt="EPLAY" />{' '}
              {/*O google nao consegue interpretar a imagem, colocando dentro da tag h1, o google entende que é um titulo mais relevante, e a partir do alt ele consegue entender*/}
            </h1>
          </Link>
          <nav>
            <Styles.Links>
              <Styles.LinkItem>
                <Link title="Clique aqui para acessar a página de categorias" to="/categorias">
                  Categorias
                </Link>
              </Styles.LinkItem>
              <Styles.LinkItem>
                <HashLink title="Clique aqui para acessar a seção de em breve" to="/#coming-soon">
                  Em Breve
                </HashLink>
              </Styles.LinkItem>
              <Styles.LinkItem>
                <HashLink title="Clique aqui para acessar a seção de promoções" to="/#on-sale">
                  Promoções
                </HashLink>
              </Styles.LinkItem>
            </Styles.Links>
          </nav>
        </div>
        <Styles.CartButton role="button" onClick={openCart}>
          {items.length} <span> - Produto(s)</span>
          <img src={cartIcon} alt="Carrinho" />
        </Styles.CartButton>
      </Styles.HeaderRow>
      <Styles.NavMobile className={isMenuOpen ? 'is-open' : ''}>
        <Styles.Links>
          <Styles.LinkItem>
            <Link
              title="Clique aqui para acessar a página de categorias"
              to="/categorias"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
          </Styles.LinkItem>
          <Styles.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de em breve"
              to="/#coming-soon"
              onClick={() => setIsMenuOpen(false)}
            >
              Em Breve
            </HashLink>
          </Styles.LinkItem>
          <Styles.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de promoções"
              to="/#on-sale"
              onClick={() => setIsMenuOpen(false)}
            >
              Promoções
            </HashLink>
          </Styles.LinkItem>
        </Styles.Links>
      </Styles.NavMobile>
    </Styles.HeaderBar>
  )
}

export default Header
