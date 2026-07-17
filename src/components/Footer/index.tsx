//É necessario instalar um pato para que o react-router-dom reconheça os #
// npm install --save react-router-hash-link
//Vai ser preciso instlar outro pacote para o typescript
//npm install --save-dev @types/react-router-hash-link

import { TitleSection } from '../ProductsList/styles'
import * as Styles from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <Styles.ContainerFooter>
    <div className="container">
      <Styles.FooterSection>
        <TitleSection>Categorias</TitleSection>
        <Styles.Links>
          <li>
            <Styles.Link title="Clique aqui para acessar os jogos de ação" to="/categories#action">
              Ação
            </Styles.Link>
          </li>
          <li>
            <Styles.Link title="Clique aqui para acessar os jogos de RPG" to="/categories#rpg">
              RPG
            </Styles.Link>
          </li>
          <li>
            <Styles.Link
              title="Clique aqui para acessar os jogos de simulação"
              to="/categories#simulation"
            >
              Simulação
            </Styles.Link>
          </li>
          <li>
            <Styles.Link
              title="Clique aqui para acessar os jogos de esportes"
              to="/categories#sports"
            >
              Esportes
            </Styles.Link>
          </li>
          <li>
            <Styles.Link title="Clique aqui para acessar os jogos de luta" to="/categoriesfight">
              Luta
            </Styles.Link>
          </li>
        </Styles.Links>
      </Styles.FooterSection>
      <Styles.FooterSection>
        <TitleSection>Acesso Rápido</TitleSection>
        <Styles.Links>
          <li>
            <Styles.Link title="Clique aqui para acessar a seção de promoções" to="/#on-sale">
              Promoções
            </Styles.Link>
          </li>
          <li>
            <Styles.Link title="Clique aqui para acessar a seção de em breve" to="/#coming-soon">
              Em Breve
            </Styles.Link>
          </li>
        </Styles.Links>
      </Styles.FooterSection>
      <p>{currentYear} - &copy; EPLAY Todos os direitos reservados.</p>
    </div>
  </Styles.ContainerFooter>
)
export default Footer
