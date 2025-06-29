import '../Styles/Variables.css';
import Logo from '../Assets/logo-stockit.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Login realizado:', user);
        navigate('/home');
      } else {
        setErro('Usuário ou senha inválidos.');
      }
    } catch (error) {
      console.error(error);
      setErro('Erro ao tentar fazer login.');
    }
  };

  return (
    <>
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-cinza
          p-4
        "
      >
        <form
          onSubmit={handleLogin}
          className="
            bg-cinza-escuro
            w-full
            max-w-md
            p-8
            rounded-lg
            flex
            flex-col
            gap-5
            text-gray-200
            shadow-lg
          "
        >
          <div className="flex justify-center">
            <img
              src={Logo}
              alt="StockitLogo"
              className="w-48 md:w-64 h-auto mb-6"
            />
          </div>

          <h1 className="text-white text-2xl md:text-3xl font-bold text-center my-8">
            Fazer login no Stockit
          </h1>

          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 hover:border-blue-800 transition-all duration-200 focus:border-blue-700"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full p-3 bg-white text-black rounded border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
            placeholder="Senha"
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <input
            className="w-full p-3 mt-10 bg-azul-botao cursor-pointer rounded-lg font-bold text-white hover:bg-blue-500 transition-all duration-200"
            type="submit"
            value="Entrar"
          />

          {erro && (
            <p className="text-red-500 text-center">{erro}</p>
          )}

          <p className="text-center text-gray-300">
            Não possui uma conta?{" "}
            <a
              className="font-semibold text-white hover:text-blue-400 transition-all duration-200"
              href="/cadastro"
            >
              Criar aqui
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
