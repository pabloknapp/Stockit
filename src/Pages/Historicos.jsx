import React from "react";

   function Historico() {

        const eventos = [
    {
      titulo: "Novo Produto adicionado",
      descricao: "User Criou o produto Carregador Inova às 12:34 12/03",
    },
    {
      titulo: "Produto removido",
      descricao: "User Removeu o produto Carregador Inova às 13:00 12/03",
    },
    {
      titulo: "Produto editado",
      descricao:
        "User editou categoria, nome, valor, marca do produto Carregador Inova às 13:54 12/03",
    },
    {
      titulo: "Estoque adicionado",
      descricao: "User adicionou 159 de estoque de Carregador Inova às 14:11 12/03",
    },
    {
      titulo: "Estoque removido",
      descricao: "User removeu 19 de estoque de Carregador Inova às 14:49 12/03",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
 
      <main className="flex-1 px-4 py-6 flex flex-col items-center">

        <div className="sm:hidden absolute top-4 right-4 text-gray-700">
          
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Histórico</h1>

        <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6 space-y-4">
          {eventos.map((evento, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition"
            >
              <strong className="block text-gray-800">{evento.titulo}</strong>
              <p className="text-gray-600 text-sm">{evento.descricao}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


export default Historico