//Foi feito a troca dos fecths pelo useGetOnSaleQuery e useGetSoonQuery
//Foi trocado o atributo game no <ProductList>
//É necessario criar um if para confimar o carregamento dos dados, todo componente react precisa de ter um return

import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'
import { useGetOnSaleQuery, useGetSoonQuery } from '../../services/api'

const Home = () => {
  const { data: onSaleGames, isLoading: isLoadingSale } = useGetOnSaleQuery()
  const { data: SoonGames, isLoading: isLoadingSoon } = useGetSoonQuery()

  return (
    <>
      <Banner />
      <ProductsList
        games={onSaleGames}
        title="Promoções"
        background="black"
        id="on-sale"
        isLoading={isLoadingSale}
      />
      <ProductsList
        games={SoonGames}
        title="Em Breve"
        background="gray"
        id="coming-soon"
        isLoading={isLoadingSoon}
      />
    </>
  )
}

export default Home
