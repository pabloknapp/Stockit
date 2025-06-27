import React from "react";
import Grafico from '../Assets/Icons/graf.png'

function GerarRelatorio() {

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
     
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
    
        <div className="sm:hidden absolute top-4 right-4 text-gray-700"></div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Gerar relatório</h1>

        <div className="bg-white w-full max-w-md sm:max-w-xl rounded-lg shadow-md p-6 sm:p-10 flex flex-col items-center">
         
          <img src={Grafico} alt="" className="w-48 h-48 object-contain mb-6"/>

          <button className="bg-blue-500 hover:bg-blue-600 text-black  px-6 py-3 rounded-full font-bold">
            Gerar relatório em PDF
          </button>
        </div>
      </main>
    </div>
  )
}

export default GerarRelatorio
