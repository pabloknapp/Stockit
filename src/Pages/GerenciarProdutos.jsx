import Menu from '../Components/Menu'
import '../Styles/Variables.css'
import IconsCaixa3 from '../Assets/Icons/icon-caixa3.png'
import IconsCaixa2 from '../Assets/Icons/icon-caixa2.png'
import IconsPlanilha from '../Assets/Icons/icon-planilha.png'
import IconsMais from '../Assets/Icons/icon-mais2.png'
import IconsMenos from '../Assets/Icons/icons-menos.png'
import IconsCaneta from '../Assets/Icons/icon-caneta.png'



function GerenciarProdutos() {
return (
    <>
    <Menu/>
    <div className="flex h-screen">
        <main className="bg-cinza min-h-screen w-full md:ml-[16rem]  p-6 md:p-12">

            <h1 className="text-3xl p-5 text-center md:text-left font-bold block ">Gerenciar Produtos</h1>
            <ul className="flex flex-col gap-8">
                <li className="flex items-center justify-between md:justify-between">
                <div className="flex items-center gap-3">
                    <img src={IconsCaixa3} alt="" className="w-6" />
                    <p className="text-base md:text-2xl font-bold">Adicionar Produto</p>
                </div>
                    <button className="bg-verde-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer">
                        <img src={IconsMais} alt="" className="w-4 md:w-5" />
                    </button>
                </li>

                <li className="flex items-center justify-between md:justify-between">
                <div className="flex items-center gap-3">
                    <img src={IconsCaixa2} alt="" className="w-6" />
                    <p className="text-base md:text-2xl font-bold">Remover produto</p>
                </div>
                    <button className="bg-vermelho-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer">
                        <img src={IconsMenos} alt="" className="w-4 md:w-5" />
                    </button>
                </li>

                <li className="flex items-center justify-between md:justify-between">
                <div className="flex items-center gap-3">
                    <img src={IconsPlanilha} alt="" className="w-6" />
                    <p className="text-base md:text-2xl font-bold">Editar produto</p>
                </div>
                    <button className="bg-azul-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer">
                        <img src={IconsCaneta} alt="" className="w-4 md:w-5" />
                    </button>
                </li>
            </ul>
        </main>
    </div>
    </>
)
}

export default GerenciarProdutos
