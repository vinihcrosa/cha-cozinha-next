import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'

import styles from './styles.module.css'
import { render } from 'react-dom'

const inter = Inter({ subsets: ['latin'] })
const url = process.env.URL || 'http://localhost:3000'

type Presente = {
  _id: string,
  nome: string,
  presente: string,
}

export default function Home({data}: { data: Presente[]}) {
  const [presentes, setPresentes] = useState<Presente[]>(data)
  const [presentesSelecionado, setPresentesSelecionado] = useState<string[]>([])
  const [totalPresentes, setTotalPresentes] = useState<number>(0)
  const [nome, setNome] = useState<string>('');
  const [qtdPessoas, setQtdPessoas] = useState<number>(0);

  console.log('renderizou')
  
  function handleSelecionaPresente(id: string) {
    const isPresenteSelecionado = presentesSelecionado.includes(id)
    console.log(id, " -> ", isPresenteSelecionado)
    if (isPresenteSelecionado) {
      presentesSelecionado.splice(presentesSelecionado.indexOf(id), 1)
      setPresentesSelecionado(presentesSelecionado)
      setTotalPresentes(totalPresentes - 1)
    } else {
      presentesSelecionado.push(id)
      setPresentesSelecionado(presentesSelecionado)
      setTotalPresentes(totalPresentes + 1)
    }
    console.log(presentesSelecionado)
  }



  useEffect(() => {
    console.log('useEffect')
    console.log(presentesSelecionado)
  }, [presentesSelecionado, totalPresentes])

  function isPresenteSelecionado(id: string) {
    return presentesSelecionado.includes(id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cha de Casa Nova</h1>
        <span>Um novo Lar</span>
      </div>

      <div className={styles.nameContainer}>
        <div className={styles.formConatainer}>
          <span className={styles.tituloNome}>Coloque o seu nome aqui</span>
          <input 
            type="text" 
            placeholder="Nome" 
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className={styles.nameInput}
          />
        </div>
        <div className={styles.formConatainer}>
          <span className={styles.tituloNome}>Quantas pessoas vem com voce?</span>
          <input 
            type="number" 
            placeholder="Nome" 
            onChange={(e) => setQtdPessoas(+e.target.value)}
            value={qtdPessoas}
            className={styles.nameInput}
          />
        </div>
        <h3 className={styles.tituloPresentesSelecionados}>Presentes Selecionados</h3>
        <div className={styles.presentContainer}> 
        {
          presentes.map((presente) => {
            if(!presentesSelecionado.includes(presente._id)) return null
            return (
              <div key={presente._id} className={styles.presente}>
                <div className={styles.presenteName}>{presente.presente}</div>
                <button 
                  key={presente._id} 
                  onClick={() => {
                  handleSelecionaPresente(presente._id)
                  }}
                  className={ styles.btnPresente }
                >
                  Retirar
                </button>
              </div>
            )
          })
        }
        </div>
        <div className={styles.btnEnviarContainer}>
          <button className={styles.btnEnviar}>Enviar</button>
        </div>
      </div>

      <div className={styles.presentContainer}>
          {
            presentes.map((presente) => (
              !isPresenteSelecionado(presente._id) &&
              <div key={presente._id} className={styles.presente}>
                <div className={styles.presenteName}>{presente.presente}</div>
                <button 
                  key={presente._id} 
                  onClick={() => {
                  handleSelecionaPresente(presente._id)
                  }}
                  className={ styles.btnPresente }
                >Selecionar</button>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${url}/api/presente`)
  return {
    props: {
      data: data.data
    }
  }
}