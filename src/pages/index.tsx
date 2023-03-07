import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './styles.module.css'

const inter = Inter({ subsets: ['latin'] })
const url = process.env.URL || 'http://localhost:3000'

type Presente = {
  _id: number,
  nome: string,
  presente: string,
}

export default function Home({data}: { data: Presente[]}) {
  const [presentes, setPresentes] = useState<Presente[]>(data)

  return (
    <>
      <h1>Cha de Casa Nova</h1>
      <ul id="myUL">
        {
          presentes.map((presente) => (
            <li key={presente._id}>
              {presente.presente}
            </li>
          ))
        }
        <li>Hit the gym</li>
        <li className="checked">Pay bills</li>
        <li>Meet George</li>
        <li>Buy eggs</li>
        <li>Read a book</li>
        <li>Organize office</li>
      </ul>
    </>
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