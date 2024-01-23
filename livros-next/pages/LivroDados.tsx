import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../Componentes/Menu";
import ControleEditora from "../Classes/controle/ControleEditora";
import styles from "../styles/Home.module.css";

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const [codEditora, setCodEditora] = useState(0);
    const navigate = useRouter();

    
  useEffect(() => {
    const obterOpcoes = () => {
      const editoras = controleEditora.getEditoras();
      const opcoes = editoras.map((editora) => ({
        value: editora.codEditora,
        text: editora.nome,
      }));
      setOpcoes(opcoes);
    };

    obterOpcoes();
  }, []);

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const livro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autores.split("\n"),
    };

    try {
      const resposta = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });

      if (resposta.ok) {
        navigate.push("/LivroLista");
      } else {
        console.error("Erro ao incluir livro");
      }
    } catch (erro) {
      console.error("Erro ao incluir livro:", erro);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Livros Next - Dados</title>
      </Head>
      <Menu />

      <main className={styles.main}>
        <h1>Dados do Livro</h1>
        <form onSubmit={incluir}>
          {}
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
