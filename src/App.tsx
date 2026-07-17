//Comece importando o Provider
//Depois envolva todo o conteúdo dentro do return na tag <Provider>
//Depois coloque a propriedade store dentro da tag do provider, que recebe o nosso store
//Agora é configurar a api com o redux, começando criando a pasta services

//Ordem dos imports: 1ª - Imports externos, 2ª - funções/store/routes, 3ª - componentes e por último o style

//React Spinners - pacote de carregamento: npm i --save react-spinners

//Para criar mascaras para os inputs usar o imask ao invés do react-input-mask, pois está obsoleto.
//npm install imask react-imask

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import Rotas from './routes'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'

import { GlobalCss } from './styles'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <div className="container">
          <Header />
        </div>
        <Rotas />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App
