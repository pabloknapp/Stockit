import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import Grafico from "../Assets/Icons/graf.png";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";

export default function GerarRelatorio() {
  const [produtos, setProdutos] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (usuario?.userId) {
      fetch(`http://localhost:3000/produtos?userId=${usuario.userId}`)
        .then((res) => res.json())
        .then((data) => setProdutos(data))
        .catch(() => {
          setProdutos([]);
          alert("Erro ao buscar produtos!");
        });
    }
  }, [usuario?.userId]);

  const gerarPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Relatório de Estoque", 14, 22);

    pdf.setFontSize(12);
    const headers = ["Nome", "Marca", "Categoria", "Estoque", "Valor"];
    const positionsX = [14, 60, 110, 150, 180];
    let startY = 30;

    headers.forEach((header, i) => {
      pdf.text(header, positionsX[i], startY);
    });

    startY += 6;

    produtos.forEach((produto) => {
      pdf.text(produto.nome, positionsX[0], startY);
      pdf.text(produto.marca, positionsX[1], startY);
      pdf.text(produto.categoria, positionsX[2], startY);
      pdf.text(String(produto.estoque), positionsX[3], startY);
      pdf.text(`R$ ${Number(produto.valor).toFixed(2)}`, positionsX[4], startY);
      startY += 6;

      if (startY > 280) {
        pdf.addPage();
        startY = 20;
      }
    });

    pdf.save("relatorio_estoque.pdf");
    Toast.fire({
      icon: "success",
      title: "PDF Gerado com Sucesso!"
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

  return (
    <div>
      <Menu />
      <div className="h-screen flex flex-col sm:flex-row bg-cinza md:pl-[15vw]">
        <main className="flex-1 flex flex-col items-center px-4 py-16">
          <h1 className="text-2xl sm:text-4xl text-cinza-escuro font-bold mb-16">Gerar relatório</h1>
          <div className="bg-white w-full max-w-md sm:max-w-xl rounded-lg shadow-md p-6 sm:p-10 flex flex-col items-center">
            <img
              src={Grafico}
              alt=""
              className="w-48 h-48 object-contain mb-6"
            />

            <button
              onClick={(gerarPDF)}
              disabled={produtos.length === 0}
              className="bg-azul-botao hover:bg-blue-500 cursor-pointer hover:scale-105 transition text-white px-6 py-3 rounded-full font-bold mt-6"
              
            >
              Gerar relatório em PDF
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
