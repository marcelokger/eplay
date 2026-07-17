import ProductsList from '../../components/ProductsList'

import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery,
} from '../../services/api'

const Categories = () => {
  const { data: actionGames, isLoading: isLoadingAction } = useGetActionGamesQuery()
  const { data: fightGames, isLoading: isLoadingFight } = useGetFightGamesQuery()
  const { data: rpgGames, isLoading: isLoadingRpg } = useGetRpgGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } = useGetSimulationGamesQuery()
  const { data: sportGames, isLoading: isLoadingSport } = useGetSportGamesQuery()

  return (
    <>
      <ProductsList
        games={actionGames}
        title="Ação"
        background="black"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductsList
        games={sportGames}
        title="Esportes"
        background="gray"
        id="sports"
        isLoading={isLoadingFight}
      />
      <ProductsList
        games={simulationGames}
        title="Simulação"
        background="black"
        id="simulation"
        isLoading={isLoadingRpg}
      />
      <ProductsList
        games={fightGames}
        title="Luta"
        background="gray"
        id="fight"
        isLoading={isLoadingSimulation}
      />
      <ProductsList
        games={rpgGames}
        title="RPG"
        background="black"
        id="rpg"
        isLoading={isLoadingSport}
      />
    </>
  )
}

export default Categories
