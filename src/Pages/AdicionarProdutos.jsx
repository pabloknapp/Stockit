
import React from "react"
import Menu from "../Components/Menu";


function AdicionarProduto() {

  return (
    <div>
      <Menu/>
      <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Adicionar Produtos
          </h1>
          <div className="bg-white w-full max-w-md sm:max-w-2xl rounded-lg shadow-md p-6 sm:p-10">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Imagens"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Nome do Produto"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Categorias</option>
                <option value="eletronicos">Samsung</option>
                <option value="roupas">Apple</option>
                <option value="alimentos">Nokia</option>
                <option value="alimentos">Motorola</option>
                <option value="alimentos">LG</option>
                <option value="alimentos">Xiaomi</option>
              </select>
              <input
                type="number"
                placeholder="Valor"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Estoque"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-black w-full sm:w-auto px-6 py-2 rounded-md font-bold"
                >
                  Cadastrar
                </button>
                <button
                  type="reset"
                  className="bg-red-500 hover:bg-red-600 text-black w-full sm:w-auto px-6 py-2 rounded-md font-bold"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
 

export default AdicionarProduto
