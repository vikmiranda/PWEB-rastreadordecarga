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
    <div id="home">
      <div id="menu">
        <hr />
        <ul>
          <li><a href="/">Cargo Track</a></li>
          <li><a href="#criarcarga">Registro de Carga</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
        </ul>
      </div>
      <div id="content">
        <h2 className="header">Registro de Carga</h2>
        <form id="criarcarga" className="criarCarga" onSubmit={handlerSubmit}>
          <input type="text" name="cidade_origem" placeholder="Cidade Origem"/>
          <input type="text" name="cidade_destino" placeholder="Cidade Destino"/>
          <input type="date" name="date" placeholder="Data para entrega"/>
          <button type="submit">Buscar</button>
        </form>

        <div id="dashboard">
          <label>Fazer script de renderizar o contéudo apenas ao clicar no menu</label>
          <table>
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
            <tr>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <p>{item.cod_rastreamento}</p>
                    </li>
                ))}
              </td>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <p>{item.cidade_origem}</p>
                    </li>
                ))}
              </td>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <p>{item.cidade_destino}</p>
                    </li>
                ))}
              </td>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <p>{item.status}</p>
                    </li>
                ))}
              </td>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <p>{moment(item.data_limite).format("D/MM/YYYY")}</p>
                    </li>
                ))}
              </td>
              <td>
                {cargas.map((item,element) => (
                    <li key={element}>
                      <button onClick={()=> {router.push(`/admin/edit_carga/${item.cod_rastreamento}`)}}>Abrir</button>
                    </li>
                ))}
              </td>


            </tr>
          </table>

        </div>

        <h2 className="footer">Todos direitos reservados</h2>
      </div>
    </div>
  )
}