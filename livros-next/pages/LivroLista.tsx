import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../Componentes/Menu";
import {LinhaLivro} from "../Componentes/LinhaLivro";
import styles from "../styles/Home.module.css";

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const obterLivros = async () => {
      try {
        const resposta = await fetch(baseURL);
        const dados = await resposta.json();
        setLivros(dados);
        setCarregado(true);
      } catch (erro) {
        console.error("Erro ao obter livros:", erro);
      }
    };

    if (!carregado) {
      obterLivros();
    }
  }, [carregado]);

  const excluir = async (codigo: number) => {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, {
        method: "DELETE",
      });
      if (resposta.ok) {
        setCarregado(false);
      } else {
        console.error("Erro ao excluir livro");
      }
    } catch (erro) {
      console.error("Erro ao excluir livro:", erro);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Livros Next - Lista</title>
      </Head>
      <Menu />

      <main className={styles.main}>
        <h1>Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Editora</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
