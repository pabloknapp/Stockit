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
  import { Link } from 'react-router-dom'


  function Menu() {
    const [menuAberto, setMenuAberto] = useState(false)

    const abrirMenu = () => setMenuAberto(true)
    const fecharMenu = () => setMenuAberto(false)

    return (
      <>
      {/* <div className='nav-links'>
                        <Link to="/" className='links'>🎭SHOWS🎟️</Link>&nbsp;&nbsp;
                        <Link to="/inclusao" className='links'>CADASTRO✍️</Link>&nbsp;&nbsp;
                        <Link to="/pesquisa" className='links'>PESQUISAR🔍</Link>&nbsp;&nbsp;
                    </div>        */}
          <nav className="justify-between items-center bg-cinza-escuro p-4 hidden md:block">
            <img src={IconsPerfil} alt="" className="w-8 h-8" />
            <p>teste</p>
          </nav>
          <aside className="fixed top-0 left-0 h-full w-64 bg-cinza-escuro text-white z-50 shadow-lg overflow-y-auto cursor-pointer hidden md:block">
            <div className="flex justify-center items-center px-4 mt-8 mb-16 ">
              <img src={Logo} alt="" className="w-32" />
            </div>
            <ul className="flex items-center flex-col gap-4">
              <li>
                <div className='flex items-center gap-3'>
                  <img src={IconsGlobo} alt="" className="w-5" />
                  <Link to="../home">Visão Geral</Link>
                </div>

              </li>
              <li>
                  <div className='flex items-center gap-3'>
                  <img src={IconsCaixa} alt="" className="w-5" />
                  <Link to="../produtos">Produtos</Link>
                </div>
              </li>
              <li>
                <div className='flex items-center gap-3'>
                  <img src={IconsEngrenagem} alt="" className="w-5" />
                  <Link to="../gerenciar-produtos">Gerenciar produtos</Link>
                </div>
              </li>
              <li>
                <div className='flex items-center gap-3'>
                  <img src={IconsDocument} alt="" className="w-5" />
                  <Link to="../gerar-relatorio">Relatório</Link>
                </div>
              </li>
              <li>
              <div className='flex items-center gap-3'>
                  <img src={IconsRelogio} alt="" className="w-5" />
                  <Link to="../historico">Histórico</Link>
                </div>
              </li>
            </ul>
          </aside>
        <header>
          <nav className="flex justify-between items-center bg-cinza-escuro p-4  md:hidden">
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
            <ul className="flex flex-col gap-4 p-6 ">
              <li>
                <a href="x" className='flex items-center gap-3'>
                  <img src={IconsGlobo} alt="" className="w-5" />
                  <p>Visão geral</p>
                </a>
              </li>
              <li>
                <a href="z" className='flex items-center gap-3'>
                  <img src={IconsCaixa} alt="" className="w-5" />
                  <p>Produtos</p>
                </a>
              </li>
              <li>
                <a href="" className='flex items-center gap-3'>
                <img src={IconsEngrenagem} alt="" className="w-5" />
                <p>Gerenciar produtos</p>
                </a>
              </li>
              <li>
                <a href="" className='flex items-center gap-3'>
                <img src={IconsDocument} alt="" className="w-5" />
                <p>Relatório</p>
                </a>
              </li>
              <li>
                <a href="" className='flex items-center gap-3'>
                  <img src={IconsRelogio} alt="" className="w-5" />
                  <p>Histórico</p>
                </a>
              </li>
            </ul>
          </aside>
        )}
      </>
    )
  }

  export default Menu