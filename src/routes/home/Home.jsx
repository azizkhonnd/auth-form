import { useContext } from "react"
import AppConext from "../../context/store"

const Home = () => {
  const [state, dispatch] = useContext(AppConext)
  return (
    <div>Home</div>
  )
}

export default Home