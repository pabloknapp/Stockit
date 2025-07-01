import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Historico() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (usuario?.userId) {
      fetch(`http://localhost:3000/historico?userId=${usuario.userId}`)
        .then((res) => res.json())
        .then((dados) => setEventos(dados))
        .catch((err) => console.error(err));
    }
  }, [usuario?.userId]);

  const handleLimparHistorico = async () => {
    if (!usuario?.userId) return;

    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja realmente limpar todo o histórico?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, limpar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:3000/historico?userId=${usuario.userId}`
        );
        const historicos = await res.json();

        const deletes = historicos.map((item) =>
          fetch(`http://localhost:3000/historico/${item.id}`, {
            method: "DELETE",
          })
        );
        await Promise.all(deletes);

        setEventos([]);
      } catch (error) {
        console.error(error);
        await Swal.fire({
          title: "Erro!",
          text: "Não foi possível limpar o histórico.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Menu />
      <div className="min-h-screen flex flex-col sm:flex-row bg-cinza">
        <main className="flex-1 px-4 py-6 flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-bold md:ml-[10vw] my-10">
            Histórico de atividade
          </h1>

          {eventos.length === 0 ? (
            <p className="text-gray-600 mt-32 md:pl-[15vh]">
              Nenhum evento registrado.
            </p>
          ) : (
            <div className="bg-white w-full md:ml-[10vw] flex flex-col-reverse gap-4 max-w-3xl rounded-lg shadow-md p-6">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="border border-gray-300 rounded-md p-4 hover:bg-cinza transition"
                >
                  <strong className="block text-gray-800">
                    {evento.titulo}
                  </strong>
                  <p className="text-gray-600 text-sm">{evento.descricao}</p>
                </div>
              ))}
            </div>
          )}

          {eventos.length > 0 && (
            <button
              type="button"
              onClick={handleLimparHistorico}
              className="bg-vermelho-botao text-white px-4 py-2 rounded hover:bg-red-500 hover:cursor-pointer transition my-16 md:ml-[15vh]"
              disabled={loading}
            >
              {loading ? "Limpando..." : "Limpar Histórico"}
            </button>
          )}
        </main>
      </div>
    </>
  );
}

export default Historico;
