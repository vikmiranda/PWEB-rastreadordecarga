import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import moment from 'moment'

import api from '../../services/api'
import Link from 'next/link'

export async function getServerSideProps() {
  const { data } = await api.get("/rota/get")
  return {
    props: {
      rotas: data
    }
  }
}

export default function Index({ rotas }) {
  const router = useRouter()
  // useEffect(() => {
  //   const token = localStorage.getItem('userLogged')
  //   if (!token) {
  //     router.push('/admin/login')
  //   }
  // })
  
  const cidades = rotas.nome
    console.log(cidades)

  async function handlerSubmit(e) {
    e.preventDefault()
    const { _id } = e.target.elements
    try {
      await api.put('', {
        id: _id.value

      })
    } catch (error) {
      console.log(error)
    }
  }

  async function menuClick(e) {
    if (e.target.id === "voltar") {
        try {
            router.push('/admin')
          } catch (error) {
            console.log(error)
          }
    } 
  };

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
          <li><button id="voltar" onClick={menuClick}>Voltar</button></li>
        </ul>
      </div>

      
      <div id="content">

        <div id="dashboard" className="">
          <h2>teste teste</h2>
          <table>
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Data</th>
              <th>Rotas</th>
            </tr>
            {
              rotas.map((item, index) => (
                  <tr key={index}>
                    <th>{item.nome}</th>
                    <td>
                      <li>
                       
                      </li>
                    </td>
                    <td>
                      <li>
                        <p>{}</p>
                      </li>
                    </td>
      
                    <td>
                      <li>
                        <button onClick={() => { router.push(`/admin/edit_carga/${item.cod_rastreamento}`) }}>Escolher Rota</button>
                      </li>
                    </td>
                  </tr>
              ))
            }
          </table>

          
        </div>

      </div>

      <script type="text/javascript" src="../../assets/menu.js"></script>
    </div>
  )
}