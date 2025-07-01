import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import "../Styles/Variables.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (usuario?.userId) {
      fetch(`http://localhost:3000/produtos?userId=${usuario.userId}`)
        .then((res) => res.json())
        .then((dados) => {
          setProdutos(dados);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [usuario?.userId, navigate]);

  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce(
    (total, p) => total + Number(p.valor || 0) * Number(p.estoque || 0),
    0
  );
  const produtosSemEstoque = produtos.filter((p) => Number(p.estoque) === 0)
    .length;

  return (
    <>
      <Menu />
      <main className="px-4 md:h-screen md:px-0 md:pl-[25vw] md:pr-[15vw] flex flex-col gap-7 bg-cinza">
        <h1 className="text-3xl mb-4 font-bold md:text-[45px] mt-[8vh] text-cinza-escuro">
          Visão geral
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="py-4 px-6 bg-white rounded-3xl shadow-lg hover:bg-gray-200 transition hover:cursor-default">
            <p className="text-lg md:text-2xl mb-6">Total de produtos</p>
            <h2 className="text-4xl md:text-4xl">
              {loading ? "..." : totalProdutos}
            </h2>
          </div>
          <div className="flex flex-col gap-6 py-4 px-6 bg-white rounded-3xl shadow-lg hover:bg-gray-200 transition hover:cursor-default">
            <p className="text-lg md:text-2xl">Valor total em estoque</p>
            <h2 className="text-4xl md:text-4xl">
              {loading
                ? "..."
                : `R$ ${valorTotalEstoque.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`}
            </h2>
          </div>
          <div className="flex flex-col gap-6 py-4 px-6 bg-white rounded-3xl shadow-lg hover:bg-gray-200 transition hover:cursor-default">
            <p className="text-lg md:text-2xl">Produtos sem estoque</p>
            <h2 className="text-4xl md:text-4xl">
              {loading ? "..." : produtosSemEstoque}
            </h2>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl mb-8 font-semibold text-cinza-escuro">
            Prévia dos seus produtos
          </h2>
          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : produtos.length === 0 ? (
            <p className="text-gray-600">Nenhum produto cadastrado.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {produtos.slice(0, 3).map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-cinza-escuro text-white rounded-xl p-4 cursor-pointer hover:scale-103 transition"
                    onClick={() => navigate("/produtos")}
                  >
                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-40 object-cover rounded mb-4"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-700 rounded mb-4 flex items-center justify-center">
                        <span className="text-sm">Sem imagem</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">
                      {produto.nome}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Estoque: {produto.estoque}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="bg-azul-botao text-white font-bold px-4 py-2 mb-16 rounded hover:bg-blue-500 hover:cursor-pointer mt-16 w-full sm:w-auto hover:scale-102 transition"
                onClick={() => navigate("/produtos")}
              >
                Ver todos os produtos
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
