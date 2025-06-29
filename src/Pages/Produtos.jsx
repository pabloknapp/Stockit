import { useEffect, useState } from 'react';
import Menu from '../Components/Menu';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('user'));

  const [filtros, setFiltros] = useState({
    busca: '',
    id: '',
    valorMin: '',
    valorMax: '',
    estoqueMin: '',
    estoqueMax: '',
  });

  useEffect(() => {
    if (usuario?.userId) {
      fetch(`http://localhost:3000/produtos?userId=${usuario.userId}`)
        .then((res) => res.json())
        .then((dados) => {
          setProdutos(dados);
          setProdutosFiltrados(dados);
        })
        .catch((err) => console.error(err));
    }
  }, [usuario?.userId]);

  useEffect(() => {
    let filtrados = [...produtos];

    if (filtros.busca) {
      filtrados = filtrados.filter((p) =>
        [p.nome, p.marca, p.categoria]
          .join(' ')
          .toLowerCase()
          .includes(filtros.busca.toLowerCase())
      );
    }

    if (filtros.id) {
      filtrados = filtrados.filter((p) => p.id === filtros.id);
    }

    if (filtros.valorMin) {
      filtrados = filtrados.filter((p) => Number(p.valor) >= Number(filtros.valorMin));
    }

    if (filtros.valorMax) {
      filtrados = filtrados.filter((p) => Number(p.valor) <= Number(filtros.valorMax));
    }

    if (filtros.estoqueMin) {
      filtrados = filtrados.filter((p) => Number(p.estoque) >= Number(filtros.estoqueMin));
    }

    if (filtros.estoqueMax) {
      filtrados = filtrados.filter((p) => Number(p.estoque) <= Number(filtros.estoqueMax));
    }

    setProdutosFiltrados(filtrados);
  }, [filtros, produtos]);

  const handleChangeFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const limparFiltros = () => {
    setFiltros({
      busca: '',
      id: '',
      valorMin: '',
      valorMax: '',
      estoqueMin: '',
      estoqueMax: '',
    });
  };

  return (
    <>
      <Menu />
      <div className="bg-cinza min-h-screen md:ml-[16rem] p-4 md:p-8">
        <h1 className="text-3xl text-center md:text-left font-bold mb-16 mt-2 text-cinza-escuro">
          Meus Produtos
        </h1>

        {/* Barra de Filtros */}
        <div className="bg-cinza-escuro p-4 rounded mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="busca"
            placeholder="Pesquisar por Nome, Marca ou Categoria"
            value={filtros.busca}
            onChange={handleChangeFiltro}
            className="p-2 mr-auto rounded border-1 text-white w-full md:w-1/3"
          />
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={filtros.id}
            onChange={handleChangeFiltro}
            className="p-2 rounded text-white w-full md:w-16"
          />
          <input
            type="number"
            name="valorMin"
            placeholder="Valor Min."
            value={filtros.valorMin}
            onChange={handleChangeFiltro}
            className="p-2 rounded text-white w-full md:w-26"
          />
          <input
            type="number"
            name="valorMax"
            placeholder="Valor Max."
            value={filtros.valorMax}
            onChange={handleChangeFiltro}
            className="p-2 rounded text-white w-full md:w-26"
          />
          <input
            type="number"
            name="estoqueMin"
            placeholder="Estoque Min."
            value={filtros.estoqueMin}
            onChange={handleChangeFiltro}
            className="p-2 rounded text-white w-full md:w-32"
          />
          <input
            type="number"
            name="estoqueMax"
            placeholder="Estoque Max."
            value={filtros.estoqueMax}
            onChange={handleChangeFiltro}
            className="p-2 rounded text-white w-full md:w-32"
          />
          <button
            onClick={limparFiltros}
            className="bg-red-500 text-white p-2 ml-auto rounded hover:bg-vermelho-botao w-full md:w-auto hover:cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>

        <div className="hidden md:grid grid-cols-7 text-white bg-gray-800 p-4 font-semibold rounded-t-2xl mt-[8vh]">
          <span>Imagem</span>
          <span>ID</span>
          <span>Nome</span>
          <span>Marca</span>
          <span>Categoria</span>
          <span>Valor</span>
          <span>Estoque</span>
        </div>

        {produtosFiltrados.length === 0 && (
          <p className="text-cinza-escuro text-center bg-white pt-8 rounded-t-2xl mt-[15vh]">
            Nenhum produto encontrado.
          </p>
        )}
<div className="flex flex-col gap-4 py-7 md:bg-white rounded-b-2xl">
  {produtosFiltrados.map((produto) => (
    <div
      key={produto.id}
      className="grid md:grid-cols-7 grid-cols-1 gap-4 bg-cinza-escuro p-4 text-white"
    >

      <div className="flex justify-center md:justify-start items-center">
        {produto.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-24 h-24 object-cover rounded"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded">
            <span className="text-xs">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Campos desktop */}
      <div className="hidden md:flex items-center">{produto.id}</div>
      <div className="hidden md:flex items-center">{produto.nome}</div>
      <div className="hidden md:flex items-center">{produto.marca}</div>
      <div className="hidden md:flex items-center">{produto.categoria}</div>
      <div className="hidden md:flex items-center">
        R$ {Number(produto.valor).toFixed(2)}
      </div>
      <div className="hidden md:flex items-center">{produto.estoque}</div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-1 text-sm">
        <p><span className="font-bold">ID:</span> {produto.id}</p>
        <p><span className="font-bold">Nome:</span> {produto.nome}</p>
        <p><span className="font-bold">Marca:</span> {produto.marca}</p>
        <p><span className="font-bold">Categoria:</span> {produto.categoria}</p>
        <p><span className="font-bold">Valor:</span> R$ {Number(produto.valor).toFixed(2)}</p>
        <p><span className="font-bold">Estoque:</span> {produto.estoque}</p>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
}

export default ListaProdutos;
