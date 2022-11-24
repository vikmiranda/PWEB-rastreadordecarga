import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import moment from 'moment'

import api from '../../services/api'
import Link from 'next/link'

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
    if (!token) {
      router.push('/admin/login')
    }
  })

  async function handlerSubmit(e) {
    e.preventDefault()
    const { cidade_origem, cidade_destino, date } = e.target.elements
    try {
      await api.post('', {
        cidade_origem: cidade_origem.value,
        cidade_destino: cidade_destino.value,
        date: date.value
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubimitLogout = async (e) => {
    e.preventDefault()
    try {
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home">
      <div id="menu">
        <hr />
        <ul>
          <li><Link href={"/admin/carga"}>Registro de Carga</Link></li>
          <li><Link href={"/dashboard"}>Dashboard</Link></li>
          <li><button onClick={handleSubimitLogout}>
            Sair
          </button></li>
        </ul>
      </div>
      <div id="content">
        <h2 className="header">Registro de Carga</h2>
        <form id="criarcarga" className="criarCarga" onSubmit={handlerSubmit}>
          <input type="text" name="cidade_origem" placeholder="Cidade Origem" />
          <input type="text" name="cidade_destino" placeholder="Cidade Destino" />
          <input type="date" name="date" placeholder="Data para entrega" />
          <button type="submit">Buscar</button>
        </form>

        <div id="dashboard">
          {/*<label>Fazer script de renderizar o contéudo apenas ao clicar no menu</label>*/}
          <table>
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
            {
              cargas.map((item, index) => (
                <tr key={index}>
                  <td>
                    <li>
                      <p>{item.cod_rastreamento}</p>
                    </li>
                  </td>
                  <td>
                    <li>
                      <p>{item.cidade_origem}</p>
                    </li>
                  </td>
                  <td>
                    <li>
                      <p>{item.cidade_destino}</p>
                    </li>
                  </td>
                  <td>
                    <li>
                      <p>{item.status}</p>
                    </li>
                  </td>
                  <td>
                    <li>
                      <p>{moment(item.data_limite).format("D/MM/YYYY")}</p>
                    </li>
                  </td>
                  <td>
                    <li>
                      <button onClick={() => { router.push(`/admin/edit_carga/${item.cod_rastreamento}`) }}>Abrir</button>
                    </li>
                  </td>
                </tr>
              ))}
          </table>

        </div>

        <h2 className="footer">Todos direitos reservados</h2>
      </div>
    </div>
  )
}