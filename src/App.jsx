import './App.css'
import Menu from './Components/Menu'
import GerenciarProdutos from './Pages/GerenciarProdutos'
import Home from './Pages/Home'
import './Styles/Variables.css'


function App() {


  return (
    <>
        { <Menu />}
        {/* {<Home />} */ }
         {<GerenciarProdutos/>} 
    </>
  )
}

export default App
