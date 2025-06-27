import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdicionarProduto from './Pages/AdicionarProdutos.jsx'
import Cadastro from './Pages/Cadastro.jsx'
import GerarRelatorio from './Pages/GerarRelatorios.jsx'
import GerenciarProdutos from './Pages/GerenciarProdutos.jsx'
import Historico from './Pages/Historicos.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import RemoverProduto from './Pages/RemoverProdutos.jsx'
import Relatorio from './Pages/Produtos.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Produtos from './Pages/Produtos.jsx'


const rotas = createBrowserRouter([
  {path:"/", element: <App />},
  {path: "adicionar-produtos", element: <AdicionarProduto/>},
  {path: "cadastro", element: <Cadastro/>},
  {path: "gerar-relatorio", element: <GerarRelatorio/>},
  {path: "gerenciar-produtos", element: <GerenciarProdutos/>},
  {path: "historico", element: <Historico/>},
  {path: "home", element: <Home/>},
  {path: "login", element: <Login/>},
  {path: "remover-produto", element: <RemoverProduto/>},
  {path: "produtos", element: <Produtos/>}
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas}/>
  </StrictMode>,
)
