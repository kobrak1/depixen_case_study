import Card from "./components/Card/Card"
import CardsList from "./components/CardsList/CardsList"
import { useMain } from "./context/MainProvider"


const App = () => {
  const { cards } = useMain()

  return (
    <>
      <Card />
      <CardsList cards={cards} />
    </>
  )
}

export default App