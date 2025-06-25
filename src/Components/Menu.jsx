import Logo from '../Assets/logo-stockit.png'
import '../Styles/Variables.css'

function Menu() {

  return (
    <> 
        <header className='flex flex-col items-center bg-cinza-escuro text-white w-[15%] h-[100vh] absolute'>
            <img className='mb-[30%] mt-[10%]' src={Logo} alt="" />
            <ul className='flex flex-col gap-5'>
                <li>Visão geral</li>
                <li>Produtos</li>
                <li>Gerenciar produtos</li>
                <li>Relatório</li>
                <li>Histórico</li>
            </ul>
        </header>
    </>
  )
}

export default Menu
