import { useEffect, useState } from 'react';
import Menu from '../Components/Menu';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false); // novo estado

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

        {/* MOBILE: Campo de busca sempre visível */}
        <input
          type="text"
          name="busca"
          placeholder="Pesquisar por Nome, Marca ou Categoria"
          value={filtros.busca}
          onChange={handleChangeFiltro}
          className="p-2 rounded border-1 text-white w-full bg-cinza-escuro mb-4 md:hidden"
        />

        {/* MOBILE: Botão para abrir filtros */}
        <button
          className="md:hidden bg-azul-stockit text-white p-2 rounded mb-4 w-full cursor-pointer"
          onClick={() => setFiltrosVisiveis((v) => !v)}
        >
          {filtrosVisiveis ? 'Fechar Filtros' : 'Filtros'}
        </button>

        {/* DESKTOP: Barra de busca + botão filtros lado a lado */}
        <div className="hidden md:flex items-center gap-3 mb-4 cursor-p bg-white rounded py-6 px-4">
          <input
            type="text"
            name="busca"
            placeholder="Pesquisar por Nome, Marca ou Categoria"
            value={filtros.busca}
            onChange={handleChangeFiltro}
            className="p-2 rounded border-1 text-white bg-cinza-escuro w-1/1 "
          />
          <button
            className="bg-azul-stockit text-white p-2 rounded w-32 cursor-pointer"
            onClick={() => setFiltrosVisiveis((v) => !v)}
          >
            {filtrosVisiveis ? 'Fechar Filtros' : 'Filtros'}
          </button>
        </div>
        {/* Barra de Filtros (igual para ambos, mas só aparece se aberto) */}
        {filtrosVisiveis && (
          <div className="bg-cinza-escuro p-6 rounded mb-6 flex flex-col md:flex-row gap-4 ">
            {/* Os filtros extras */}
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
        )}

        <div className="hidden md:grid md:grid-cols-7 md:grid-rows-none grid-rows-3 text-white bg-gray-800 p-4 font-semibold rounded-t-2xl mt-[8vh] flex">
          <span>Imagem</span>
          <span>ID</span>
          <span>Nome</span>
          <span>Marca</span>
          <span>Categoria</span>
          <span>Valor</span>
          <span>Estoque</span>
        </div>

        {produtosFiltrados.length === 0 && (
          <p className="text-cinza-escuro text-center md:p-1 p-6 bg-white md:pt-8 md:rounded-t-2xl rounded-t-2xl mt-[15vh]">
            Nenhum produto encontrado.
          </p>
        )}
<div className="flex flex-col gap-4 py-7 md:bg-white rounded-b-2xl">
  {produtosFiltrados.map((produto) => (
    <div
      key={produto.id}
      className="grid md:grid-cols-7 grid-cols-1 gap-4 bg-cinza-escuro md:rounded-none rounded-xl p-4 text-white"
    >
      {/* Desktop */}
      <div className="hidden md:flex justify-center md:justify-start items-center">
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
      <div className="hidden md:flex items-center">
        <span
          className="bg-gray-500/70 text-white px-4 py-1  font-bold rounded-full cursor-pointer hover:bg-gray-400 transition"
          title="Clique para copiar o ID"
          onClick={() => navigator.clipboard.writeText(produto.id)}
        >
          {produto.id}
        </span>
      </div>
      <div className="hidden md:flex items-center">{produto.nome}</div>
      <div className="hidden md:flex items-center">{produto.marca}</div>
      <div className="hidden md:flex items-center">{produto.categoria}</div>
      <div className="hidden md:flex items-center">
        R$ {Number(produto.valor).toFixed(2)}
      </div>
      <div className="hidden md:flex items-center">{produto.estoque}</div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-4">
        {/* Imagem */}
        <div className="flex-shrink-0">
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-16 h-16 object-cover rounded bg-white"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-700 flex items-center justify-center rounded">
              <span className="text-xs text-center text-white-700">Sem imagem</span>
            </div>
          )}
        </div>
        {/* Info principal */}
        <div className="flex flex-col flex-1">
          <span className="font-semibold text-base">{produto.nome}</span>
          <span className="text-sm text-gray-200">{produto.marca}</span>
        </div>
        {/* Valor */}
        <div className="font-bold text-xl ml-auto whitespace-nowrap">
          R$ {Number(produto.valor).toFixed(2).replace('.', ',')}
        </div>
      </div>
      {/* Mobile - tags */}
      <div className="md:hidden flex gap-1 justify-between items-center">
        <div className='flex gap-1 text-center justify-center items-center  ' >
        <span
          className="bg-gray-500/70 text-white text-xs px-3 py-1 rounded-full font-semibold cursor-pointer hover:bg-gray-400 transition"
          title="Clique para copiar o ID"
          onClick={() => navigator.clipboard.writeText(produto.id)}
        >
          #{produto.id}
        </span>
          <span className="bg-gray-500/70 text-white inline-block text-xs px-3 py-1 rounded-full font-semibold">{produto.categoria}</span>
        </div>
        <div className='flex items-center'>
          <span className=" text-white text-x px-3 py-1 rounded-full font-semibold">{produto.estoque} Uni.</span></div>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
}

export default ListaProdutos;
