import { useState } from 'react'
import Logo from '../Assets/logo-stockit.png'
import IconsGlobo from '../Assets/Icons/icon-globo.png'
import IconsCaixa from '../Assets/Icons/icon-caixa.png'
import IconsEngrenagem from '../Assets/Icons/icon-engrenagem.png'
import IconsDocument from '../Assets/Icons/icon-document.png'
import IconsRelogio from '../Assets/Icons/icon-relogio.png'
import IconsX from '../Assets/Icons/icons-x.png'
import IconsBurguer from '../Assets/Icons/icon-burguer.png'
import IconsPerfil from '../Assets/Icons/icon-perfil.png'
import Sair from '../Assets/Icons/icons-sair.png'
import '../Styles/Variables.css'
import { Link, useNavigate } from 'react-router-dom'

function Menu() {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  const abrirMenu = () => setMenuAberto(true)
  const fecharMenu = () => setMenuAberto(false)

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const links = [
    { to: '/home', label: 'Visão Geral', icon: IconsGlobo },
    { to: '/produtos', label: 'Produtos', icon: IconsCaixa },
    { to: '/gerenciar-produtos', label: 'Gerenciar produtos', icon: IconsEngrenagem },
    { to: '/gerar-relatorio', label: 'Relatório', icon: IconsDocument },
    { to: '/historico', label: 'Histórico', icon: IconsRelogio }
  ]

  return (
    <>
      {/* NAV DESKTOP */}
      <nav className="hidden md:flex justify-between items-center bg-cinza-escuro p-4">
        <div />
        <img src={IconsPerfil} alt="Perfil" className="" />
      </nav>

      {/* ASIDE DESKTOP */}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-full md:w-64 md:bg-cinza-escuro md:text-white font-semibold md:z-50 md:shadow-lg md:overflow-y-auto justify-between">
        <div>
          <div className="flex justify-center items-center px-4 mt-8 mb-16">
            <img src={Logo} alt="Logo" className="w-42 my-4" />
          </div>
          <ul className="flex flex-col gap-2 px-4 py-[2vh]">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-8 hover:bg-gray-700 hover:text-blue-300 rounded p-2 transition-all duration-200"
                >
                  <img src={item.icon} alt="" className="w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 bg-cinza-escuro hover:bg-vermelho-botao transition-colors"
        >
          <span className="text-white font-semibold flex gap-2 items-center">
            <img src={Sair} alt="Sair" className="w-5" />
            Sair
          </span>
        </button>
      </aside>

      {/* NAV MOBILE */}
      <header className="md:hidden">
        <nav className="flex justify-between items-center bg-cinza-escuro p-4">
          <button onClick={abrirMenu}>
            <img src={IconsBurguer} alt="Menu" className="w-6 h-6" />
          </button>
          <img src={IconsPerfil} alt="Perfil" className="w-6 mr-2" />
        </nav>
      </header>

      {menuAberto && (
        <aside className=" w-[100vw] h-[80vh] bg-cinza-escuro text-white font-semibold z-50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center px-4 py-6">
              <img src={Logo} alt="Logo" className="w-32" />
              <button onClick={fecharMenu}>
                <img src={IconsX} alt="Fechar" className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-6 mt-8">
              {links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-4 text-lg hover:text-azul-botao transition-all duration-200"
                    onClick={fecharMenu}
                  >
                    <img src={item.icon} alt="" className="w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-6 bg-cinza-escuro hover:bg-vermelho-botao transition-colors"
        >
          <span className="text-white font-semibold"><img src={Sair} alt="" />Sair</span>
        </button>
        </aside>
      )}
    </>
  )
}

export default Menu