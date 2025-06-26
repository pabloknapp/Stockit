import '../Styles/Variables.css'
import Logo from '../Assets/logo-stockit.png'

function Login() {

return( 

    <>
<div className='md:max-h-[100vh] '>
    <div className="flex items-center justify-center md:m-[15vh]">
                <div
                className="bg-cinza-escuro md:rounded-xl">
        <div
        className="mx-auto flex items-center space-y-8 py-16 px-12 font-semibold text-gray-500 flex-col justify-center h-screen md:h-auto"
        >
        <img src={Logo} alt="StockitLogo" className="w-80 h-25 mb-20 md: w-96 md:h-32 mt">

        </img>
        <h1 className="text-white md:text-4xl text-3xl mb-6">Entre na sua conta</h1>
        <div className='gap-5 flex flex-col w-full md:w-96'>
            <input
                className="w-full p-3 bg-white rounded-md border border-gray-700 hover:border-blue-800 transition-all duration-200"
                placeholder="Usuário"
                type="text"
                name="Usuario"
                id=""
                />
            <input
                className="w-full p-3 bg-white rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                placeholder="Senha"
                type="password"
                name="Senha"
                id=""
                />
            <input
                className="w-full p-3 mt-4 bg-azul-botao cursor-pointer rounded-lg font-bold text-white focus:border-blue-700 hover:bg-blue-500 transition-all duration-200"
                type="submit"
                id=""
                />
        </div>
        <p className='gap-1 flex'>
            Não possui uma conta?
            <a
            className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
            href="./cadastro.html"
            > Criar aqui</a>
        </p>
    </div>
    </div>
    </div>
</div>






</>

)
}


export default Login