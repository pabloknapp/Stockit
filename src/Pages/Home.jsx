import Menu from '../Components/Menu'
import '../Styles/Variables.css'


function Home() {

  return (  
    <>
    <Menu/>
        <main className='ml-[25vw] mr-[15vw] flex flex-col gap-7 hiddden md:block'>
                <h1 className='text-[45px] mt-[5vh]'>Visão geral</h1>
                <div className='flex items-center gap-50'>
                    <div className='py-4 px-8 bg-bege rounded-3xl'>
                        <p className='text-2xl'>Total de vendas</p>
                        <h2 className='text-6xl'>96</h2>
                    </div>
                    <div className='py-4 px-8 bg-bege rounded-3xl'>
                        <p className='text-2xl'>Total de vendas</p>
                        <h2 className='text-6xl'>96</h2>
                    </div>
                    <div className='py-4 px-8 bg-bege rounded-3xl'>
                        <p className='text-2xl'>Total de vendas</p>
                        <h2 className='text-6xl'>96</h2>
                    </div>
                </div>
                <div className='mt-4 py-[30vh] bg-cinza-escuro'>
                
                </div>
        </main>
        </>
    )
    }

    export default Home
