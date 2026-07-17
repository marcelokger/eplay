//Aqui será feito a troca do fetch pelo useGetFeaturedGameQuery
//Ao invés de trocar game por data, eu posso usar data: game para fazer essa troca automatica

import Button from '../Button'
import Tag from '../Tag'
import Loader from '../Loader'

import { parseToBrl } from '../../utils'
import { useGetFeaturedGameQuery } from '../../services/api'

import * as Styles from './syles'

const Banner = () => {
  const { data: game } = useGetFeaturedGameQuery()

  if (!game) return <Loader />

  return (
    <Styles.Image style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="containerBanner">
        <Tag style={{ position: 'absolute', bottom: '516px' }} size="big">
          Destaque do dia
        </Tag>
        <Styles.Title>{game.name}</Styles.Title>
        <Styles.Prices>
          De <span>{parseToBrl(game.prices.old)}</span> <br />
          por apenas {parseToBrl(game.prices.current)}
        </Styles.Prices>
        <Button
          type="link"
          to={`/product/${game.id}`}
          title="Clique aqui para aproveitar essa promoção!"
        >
          Aproveitar
        </Button>
      </div>
    </Styles.Image>
  )
}
export default Banner
