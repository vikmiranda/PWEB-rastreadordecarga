import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import moment from 'moment'

import api from '../../services/api'

export async function getServerSideProps() {
  const { data } = await api.get()
  return {
    props: {
      cargas: data
    }
  }
}

export default function Index({ cargas }) {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('userLogged')
    if(!token) {
      router.push('/admin/login')
    }
  })

  async function handlerSubmit (e) {
    e.preventDefault()
    const { cidade_origem, cidade_destino, date } = e.target.elements
    try {
      const carga = await api.post('', {
        cidade_origem: cidade_origem.value,
        cidade_destino: cidade_destino.value,
        date: date.value
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handlerSubmit}>
          <input type="text" name="cidade_origem" placeholder="Cidade Origem"/>
          <input type="text" name="cidade_destino" placeholder="Cidade Destino"/>
          <input type="date" name="date" placeholder="Data para entrega"/>
          <button type="submit">Buscar</button>
        </form>
      </div>
      <div>
        <ul>
       {cargas.map((item,element) => (
          <li key={element}>
            <p>{item.cod_rastreamento}</p>
            <p>{item.cidade_origem}</p>
            <p>{item.cidade_destino}</p>
            <p>{item.status}</p>
            <p>{moment(item.data_limite).format("D/MM/YYYY")}</p>
            <button onClick={()=> {router.push(`/admin/edit_carga/${item.cod_rastreamento}`)}}>Abrir</button>
          </li>
        ))}        </ul>

      </div>
    </div>
  )
}