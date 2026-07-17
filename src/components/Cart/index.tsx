import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { close, remove } from '../../store/reducers/cart'
import type { RootReducer } from '../../store'
import { getTotalPrice, parseToBrl } from '../../utils'
import Button from '../Button'
import Tag from '../Tag'

import * as Styles from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const goToCheckOut = () => {
    navigate('/checkout')
    closeCart()
  }

  return (
    <>
      <Styles.CartContainer className={isOpen ? 'is-open' : ''}>
        <Styles.Overlay onClick={closeCart} />
        <Styles.Sidebar>
          {items.length > 0 ? (
            <>
              <ul>
                {items.map((item) => (
                  <Styles.CartItem key={item.id}>
                    <img src={item.media.thumbnail} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <Tag>{item.details.category}</Tag>
                      <Tag>{item.details.system}</Tag>
                      <span>{parseToBrl(item.prices.current)}</span>
                    </div>
                    <button onClick={() => removeItem(item.id)} type="button" />
                  </Styles.CartItem>
                ))}
              </ul>
              <Styles.Quantity>{items.length} jogos(s) no carrinho</Styles.Quantity>
              <Styles.Prices>
                Total de {parseToBrl(getTotalPrice(items))} <span>Em até 6x sem juros</span>
              </Styles.Prices>
              <Button
                onClick={goToCheckOut}
                type="button"
                title="Clique aqui para continuar com a compra"
              >
                Continuar com a compra
              </Button>
            </>
          ) : (
            <p className="empty-text">O carrinho está vazio</p>
          )}
        </Styles.Sidebar>
      </Styles.CartContainer>
    </>
  )
}
export default Cart
