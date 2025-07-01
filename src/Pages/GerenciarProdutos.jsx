import Menu from '../Components/Menu';
import '../Styles/Variables.css';
import IconsCaixa3 from '../Assets/Icons/icon-caixa3.png';
import IconsCaixa2 from '../Assets/Icons/icon-caixa2.png';
import IconsPlanilha from '../Assets/Icons/icon-planilha.png';
import IconsMais from '../Assets/Icons/icon-mais2.png';
import IconsMenos from '../Assets/Icons/icons-menos.png';
import IconsCaneta from '../Assets/Icons/icon-caneta.png';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function GerenciarProdutos() {
  const [mostrarFormCriar, setMostrarFormCriar] = useState(false);
  const [mostrarFormExcluir, setMostrarFormExcluir] = useState(false);
  const [mostrarFormEditar, setMostrarFormEditar] = useState(false);

  const [produtoNovo, setProdutoNovo] = useState({
    nome: '',
    marca: '',
    categoria: '',
    estoque: '',
    valor: '',
    imagem: ''
  });

  const [idExcluir, setIdExcluir] = useState('');

  const [produtoEditar, setProdutoEditar] = useState({
    id: '',
    nome: '',
    marca: '',
    categoria: '',
    estoque: '',
    valor: '',
    imagem: ''
  });

  const usuario = JSON.parse(localStorage.getItem('user'));

  // Criar Produto
  const handleCriarProduto = async (e) => {
    e.preventDefault();

    const produtoCompleto = {
      ...produtoNovo,
      userId: usuario?.userId
    };

    await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoCompleto)
    });

    await fetch('http://localhost:3000/historico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: usuario?.userId,
        titulo: 'Novo Produto adicionado',
        descricao: `${usuario?.nome} criou o produto ${produtoNovo.nome} às ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
      })
    });

    alert("Produto criado com sucesso!");

    setProdutoNovo({
      nome: '',
      marca: '',
      categoria: '',
      estoque: '',
      valor: '',
      imagem: ''
    });
    setMostrarFormCriar(false);
  };

  // Excluir Produto
  const handleExcluirProduto = async (e) => {
    e.preventDefault();

    // Buscar o produto antes de excluir
    const resposta = await fetch(`http://localhost:3000/produtos/${idExcluir}`);

    if (!resposta.ok) {
      alert("Produto não encontrado! Verifique o ID.");
      return;
    }

    const produtoEncontrado = await resposta.json();

    await fetch(`http://localhost:3000/produtos/${idExcluir}`, {
      method: 'DELETE'
    });

    const historicoResponse = await fetch('http://localhost:3000/historico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: usuario?.userId,
        titulo: 'Produto deletado',
        descricao: `${usuario?.nome} deletou o produto ${produtoEncontrado.nome} às ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
      })
    });

    if (!historicoResponse.ok) {
      console.error('Erro ao salvar histórico:', await historicoResponse.text());
      alert("Erro ao salvar histórico!");
    } else {
      console.log('Histórico salvo com sucesso.');
    }

    alert("Produto excluído com sucesso!");
    setIdExcluir('');
    setMostrarFormExcluir(false);
  };

  // Editar Produto
  const handleEditarProduto = async (e) => {
    e.preventDefault();

    const id = produtoEditar.id;

    const resposta = await fetch(`http://localhost:3000/produtos/${id}`);
    if (!resposta.ok) {
      alert("Produto não encontrado!");
      return;
    }
    const produtoOriginal = await resposta.json();

    const produtoAtualizado = {
      nome: produtoEditar.nome !== "" ? produtoEditar.nome : produtoOriginal.nome,
      marca: produtoEditar.marca !== "" ? produtoEditar.marca : produtoOriginal.marca,
      categoria: produtoEditar.categoria !== "" ? produtoEditar.categoria : produtoOriginal.categoria,
      estoque: produtoEditar.estoque !== "" ? Number(produtoEditar.estoque) : produtoOriginal.estoque,
      valor: produtoEditar.valor !== "" ? Number(produtoEditar.valor) : produtoOriginal.valor,
      imagem: produtoEditar.imagem !== "" ? produtoEditar.imagem : produtoOriginal.imagem,
    };

    await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoAtualizado)
    });

    const campos = ["nome", "marca", "categoria", "estoque", "valor", "imagem"];
    let camposAlterados = [];

    campos.forEach((campo) => {
      let valorOriginal = produtoOriginal[campo];
      let valorNovo = produtoEditar[campo];

      if (campo === "estoque" || campo === "valor") {
        valorOriginal = Number(valorOriginal);
        valorNovo = valorNovo === "" ? "" : Number(valorNovo);
        if (valorNovo !== "" && valorNovo !== valorOriginal) {
          camposAlterados.push(campo);
        }
      } else {
        valorOriginal = valorOriginal?.toString() ?? "";
        valorNovo = valorNovo?.toString() ?? "";
        if (valorNovo !== "" && valorNovo !== valorOriginal) {
          camposAlterados.push(campo);
        }
      }
    });

    if (camposAlterados.length > 0) {
      const historicoResponse = await fetch('http://localhost:3000/historico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: usuario?.userId,
          titulo: 'Produto editado',
          descricao: `${usuario?.nome} alterou ${camposAlterados.join(", ")} do produto ${produtoOriginal.nome} às ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
        })
      });

      if (!historicoResponse.ok) {
        console.error('Erro ao salvar histórico:', await historicoResponse.text());
        alert("Erro ao salvar histórico!");
      } else {
        console.log('Histórico salvo com sucesso.');
      }
    }

    alert("Produto atualizado com sucesso!");

    setProdutoEditar({
      id: '',
      nome: '',
      marca: '',
      categoria: '',
      estoque: '',
      valor: '',
      imagem: ''
    });
    setMostrarFormEditar(false);
  };

  return (
    <>
      <Menu />
      <div className="flex h-full">
        <main className="bg-cinza min-h-screen w-full md:pl-[15vw] p-6 md:p-12">
          <h1 className="text-3xl mt-2 my-24 md:text-left font-bold block">Gerenciar Produtos</h1>
          <ul className="flex flex-col gap-8">
            {/* Adicionar Produto */}
            <li className="flex items-center justify-between md:justify-between">
              <div className="flex items-center gap-12">
                <img src={IconsCaixa3} alt="" className="w-6" />
                <p className="text-base md:text-2xl font-bold">Adicionar Produto</p>
              </div>
              <button
                onClick={() => setMostrarFormCriar(!mostrarFormCriar)}
                className="bg-verde-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer"
              >
                <img src={IconsMais} alt="" className="w-4 md:w-5" />
              </button>
            </li>

            {mostrarFormCriar && (
              <form onSubmit={handleCriarProduto} className="bg-cinza-escuro p-6 rounded-lg text-white flex flex-col gap-3 md:w-1/2 mt-2">
                <input placeholder="Nome" className="p-2 border-1 rounded" value={produtoNovo.nome} onChange={e => setProdutoNovo({...produtoNovo, nome: e.target.value})} required />
                <input placeholder="Marca" className="p-2 border-1 rounded" value={produtoNovo.marca} onChange={e => setProdutoNovo({...produtoNovo, marca: e.target.value})} required />
                <input placeholder="Categoria" className="p-2 border-1 rounded" value={produtoNovo.categoria} onChange={e => setProdutoNovo({...produtoNovo, categoria: e.target.value})} required />
                <input placeholder="Estoque" type="number" className=" p-2 border-1 rounded" value={produtoNovo.estoque} onChange={e => setProdutoNovo({...produtoNovo, estoque: e.target.value})} required />
                <input placeholder="Valor" type="number" className="p-2 border-1 rounded" value={produtoNovo.valor} onChange={e => setProdutoNovo({...produtoNovo, valor: e.target.value})} required />
                <input placeholder="URL da Imagem" className="p-2 border-1 rounded" value={produtoNovo.imagem} onChange={e => setProdutoNovo({...produtoNovo, imagem: e.target.value})} />
                <button type="submit" className="bg-verde-botao mt-[6%] p-2 rounded hover:bg-green-500 hover:cursor-pointer">Criar novo produto</button>
              </form>
            )}

            {/* Excluir Produto */}
            <li className="flex items-center justify-between md:justify-between">
              <div className="flex items-center gap-12">
                <img src={IconsCaixa2} alt="" className="w-6" />
                <p className="text-base md:text-2xl font-bold">Remover produto</p>
              </div>
              <button
                onClick={() => setMostrarFormExcluir(!mostrarFormExcluir)}
                className="bg-vermelho-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer"
              >
                <img src={IconsMenos} alt="" className="w-4 md:w-5" />
              </button>
            </li>

            {mostrarFormExcluir && (
              <form onSubmit={handleExcluirProduto} className="bg-cinza-escuro p-6 rounded-lg text-white flex flex-col gap-3 md:w-1/2 mt-2">
                <input placeholder="Insira o ID do produto para excluir" className="p-2 rounded border-1" value={idExcluir} onChange={e => setIdExcluir(e.target.value)} required />
                <button type="submit" className="bg-vermelho-botao mt-[6%] p-2 rounded hover:bg-red-500 cursor-pointer">Excluir Produto</button>
              </form>
            )}

            {/* Editar Produto */}
            <li className="flex items-center justify-between md:justify-between">
              <div className="flex items-center gap-12">
                <img src={IconsPlanilha} alt="" className="w-6" />
                <p className="text-base md:text-2xl font-bold">Editar produto</p>
              </div>
              <button
                onClick={() => setMostrarFormEditar(!mostrarFormEditar)}
                className="bg-azul-botao rounded-xl p-2 md:p-3 hover:scale-105 transition cursor-pointer"
              >
                <img src={IconsCaneta} alt="" className="w-4 md:w-5" />
              </button>
            </li>

            {mostrarFormEditar && (
              <form onSubmit={handleEditarProduto} className="bg-cinza-escuro p-6 rounded-lg text-white flex flex-col gap-3 md:w-1/2 mt-2">
                <input placeholder="ID do produto a editar" className="p-2 rounded border-1" value={produtoEditar.id} onChange={e => setProdutoEditar({...produtoEditar, id: e.target.value})} required />
                <input placeholder="Novo nome" className="p-2 rounded border-1" value={produtoEditar.nome} onChange={e => setProdutoEditar({...produtoEditar, nome: e.target.value})} />
                <input placeholder="Nova marca" className="p-2 rounded border-1" value={produtoEditar.marca} onChange={e => setProdutoEditar({...produtoEditar, marca: e.target.value})} />
                <input placeholder="Nova categoria" className="p-2 rounded border-1" value={produtoEditar.categoria} onChange={e => setProdutoEditar({...produtoEditar, categoria: e.target.value})} />
                <input placeholder="Novo estoque" type="number" className="p-2 rounded border-1" value={produtoEditar.estoque} onChange={e => setProdutoEditar({...produtoEditar, estoque: e.target.value})} />
                <input placeholder="Novo valor" type="number" className="p-2 rounded border-1" value={produtoEditar.valor} onChange={e => setProdutoEditar({...produtoEditar, valor: e.target.value})} />
                <input placeholder="Nova URL da imagem" className="p-2 rounded border-1" value={produtoEditar.imagem} onChange={e => setProdutoEditar({...produtoEditar, imagem: e.target.value})} />
                <button type="submit" className="bg-azul-botao mt-[6%] p-2 rounded hover:bg-blue-500 hover:cursor-pointer">Salvar Alterações</button>
              </form>
            )}
          </ul>
        </main>
      </div>
    </>
  );
}



export default GerenciarProdutos;
