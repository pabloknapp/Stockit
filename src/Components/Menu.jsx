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
  import '../Styles/Variables.css'

  function Menu() {
    const [menuAberto, setMenuAberto] = useState(false)

    const abrirMenu = () => setMenuAberto(true)
    const fecharMenu = () => setMenuAberto(false)

    return (
      <>
          <nav className="justify-between items-center bg-cinza-escuro p-4 hidden md:block">
            <img src={IconsPerfil} alt="" className="w-8 h-8" />
          </nav>
          <aside className="fixed top-0 left-0 h-full w-64 bg-cinza-escuro text-white z-50 shadow-lg overflow-y-auto cursor-pointer hidden md:block">
            <div className="flex justify-between items-center px-4 py-6 ">
              <img src={Logo} alt="" className="w-32" />
            </div>
            <ul className="flex flex-col gap-4 p-6">
              <li className="flex items-center gap-3">
                <img src={IconsGlobo} alt="" className="w-5" />
                <a href="">Visão geral</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsCaixa} alt="" className="w-5" />
                <a href="">Produtos</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsEngrenagem} alt="" className="w-5" />
                <a href="">Gerenciar produtos</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsDocument} alt="" className="w-5" />
                <a href="">Relatório</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsRelogio} alt="" className="w-5" />
                <a href="">Histórico</a>
              </li>
            </ul>
          </aside>
        <header>
          <nav className="flex justify-between items-center bg-cinza-escuro p-4 block md:hidden">
            <button onClick={abrirMenu}>
              <img src={IconsBurguer} alt="" className="w-6 h-6" />
            </button>
            <img src={IconsPerfil} alt="" className="w-8 h-8" />
          </nav>
        </header>

        {menuAberto && (
          <aside className="fixed top-0 left-0 h-full w-64 bg-cinza-escuro text-white z-50 shadow-lg overflow-y-auto cursor-pointer block md:hidden">
            <div className="flex justify-between items-center px-4 py-6 ">
              <img src={Logo} alt="" className="w-32" />
              <button className='cursor-pointer' onClick={fecharMenu}>
                <img src={IconsX} alt="" className="w-6 h-6" />
              </button>
            </div>

            <ul className="flex flex-col gap-4 p-6">
              <li className="flex items-center gap-3">
                <img src={IconsGlobo} alt="" className="w-5" />
                <a href="">Visão geral</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsCaixa} alt="" className="w-5" />
                <a href="">Produtos</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsEngrenagem} alt="" className="w-5" />
                <a href="">Gerenciar produtos</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsDocument} alt="" className="w-5" />
                <a href="">Relatório</a>
              </li>
              <li className="flex items-center gap-3">
                <img src={IconsRelogio} alt="" className="w-5" />
                <a href="">Histórico</a>
              </li>
            </ul>
          </aside>
        )}
      </>
    )
  }

  export default Menu