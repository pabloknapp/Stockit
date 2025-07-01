import { useState } from 'react';
import '../Styles/Variables.css';
import Logo from '../Assets/logo-stockit.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
    Toast.fire({
      icon: "error",
      title: "As senhas não coincidem!"
    });
      return;
    }

    // Verifica se já existe usuário com o mesmo e-mail
    const verificaEmail = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(form.email)}`);
    const usuarios = await verificaEmail.json();
    if (usuarios.length > 0) {
      Toast.fire({
        icon: "error",
        title: "E-mail já cadastrado!"
      });
      return;
    }

    const novoUsuario = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      userId: Date.now().toString()
    };

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoUsuario)
    });

    if (response.ok) {
      
      setForm({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      });
      navigate("/login");
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <>
      <div
        className="
          min-h-screen
          flex
          md:items-center
          justify-center
          bg-cinza
          md:p-4
        "
      >
        <form
          onSubmit={handleSubmit}
          className="
            bg-cinza-escuro
            w-full
            max-w-md
            p-8
            md:rounded-lg
            flex
            flex-col
            gap-5
            text-gray-200
            shadow-lg
          "
        >
          <div className="flex justify-center">
            <img src={Logo} alt="StockitLogo" className="w-48 md:w-64 h-auto mb-6" />
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-4 mt-2">
            Criar sua conta
          </h1>
          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 hover:border-blue-800 transition-all duration-200 focus:border-blue-700"
            placeholder="Nome de Usuário"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 hover:border-blue-800 transition-all duration-200 focus:border-blue-700"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
            placeholder="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
            placeholder="Confirmar Senha"
            type="password"
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 mt-8 bg-azul-botao cursor-pointer rounded-lg font-bold text-white hover:bg-blue-500 transition-all duration-200"
            type="submit"
            value="Cadastrar"
          />
          <p className="text-center text-gray-300">
            Já possui uma conta?{" "}
            <a
              className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
              href="/login"
            >
              Entrar aqui
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
