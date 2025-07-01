import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Historico() {
  const [eventos, setEventos] = useState([]);
  
  // Pegamos o usuário logado no localStorage 
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (usuario?.userId) {
      fetch(`http://localhost:3000/historico?userId=${usuario.userId}`)
        .then((res) => res.json())
        .then((dados) => setEventos(dados))
        .catch((err) => console.error(err));
    }
  }, [usuario?.userId]);

  return (
    <>
      <Menu />
      <div className="min-h-screen flex flex-colsm:flex-row bg-gray-100">
        <main className="flex-1 px-4 py-6 flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-bold md:ml-[10vw] my-10">
            Histórico de atividade
          </h1>

          {eventos.length === 0 ? (
            <p className="text-gray-600 mt-4">
              Nenhum evento registrado.
            </p>
          ) : (
            <div className="bg-white w-full md:ml-[10vw] flex flex-col-reverse gap-4 max-w-3xl rounded-lg shadow-md p-6">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition"
                >
                  <strong className="block text-gray-800">
                    {evento.titulo}
                  </strong>
                  <p className="text-gray-600 text-sm">
                    {evento.descricao}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Historico;
