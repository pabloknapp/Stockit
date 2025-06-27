import '../Styles/Variables.css'
import Logo from '../Assets/logo-stockit.png'

function Cadastro() {

return( 

    <>
     <Menu/>
<div className='flex justify-center ml-40 w-400'>
    <div className="flex items-center justify-center">
                <div
                className="bg-cinza-escuro ">
        <div
        className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col h-screen justify-center md: gap-1 md:gap-2"
        >
        <img src={Logo} alt="StockitLogo" className="w-80 h-25 mb-20 md: w-96 md:h-32 mt">

        </img>
        <h1 className="text-white md:text-4xl text-3xl mb-6 font-bold">Criar sua conta</h1>
        <input
            className="w-full p-2 bg-white rounded-md border border-gray-700 hover:border-blue-800 transition-all duration-200 focus:border-blue-700"
            placeholder="Usuário"
            type="text"
            name="Usuario"
            id=""
            />
        <input
            className="w-full p-2 bg-white rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
            placeholder="Senha"
            type="password"
            name="Senha"
            id=""
            />
        <input
            className="w-full p-2 bg-white rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
            placeholder="Confirmar Senha"
            type="password"
            name="Senha"
            id=""
            />
        <input
            className="w-full p-3 mt-4 bg-azul-botao cursor-pointer rounded-lg font-bold text-white focus:border-blue-700 hover:border-white-500 transition-all duration-200"
            type="submit"
            id=""
            />
        <p className='gap-2 flex'>
            Já possui uma conta?
            <a
            className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
            href="./Login.jsx"
            >Entrar aqui</a>
        </p>
    </div>
    </div>
    </div>
</div>






</>

)
}


export default Cadastro;






