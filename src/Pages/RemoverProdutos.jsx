import React from "react"
import Menu from "../Components/Menu"

function RemoverProduto() {
  return (
    <>
    <Menu/>
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
    
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
   
        <div className="sm:hidden absolute top-4 right-4 text-gray-700">
         
        </div>

        <h1 className="text-xl sm:text-2xl font-bold mb-6">Gerenciar produtos</h1>

        <div className="bg-white w-full max-w-md sm:max-w-xl rounded-lg shadow-md p-6 sm:p-10">
          <h2 className="text-xl font-bold text-center mb-4">Remover Produto</h2>
          <p className="text-center mb-6 text-sm font-medium">Coloque o ID do produto que deseja remover</p>

          <input
            type="text"
            placeholder="ID"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="ID"
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-black px-6 py-2 rounded-md w-full sm:w-auto font-bold">
              Remover  
            </button>
            <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-black px-6 py-2 rounded-md w-full sm:w-auto font-bold">
              Cancelar  
            </button>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default RemoverProduto