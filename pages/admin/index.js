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

  async function menuClick(e) {
    const criarcarga = document.getElementById('criarcarga');
    const dashboard = document.getElementById('dashboard');
    if (e.target.id === "registrarCarga") {
      dashboard.className = "openInfoMenu";
      criarcarga.classList.remove("openInfoMenu");
    } else if (e.target.id === "visualizarDashboard") {
      criarcarga.className = "openInfoMenu";
      dashboard.classList.remove("openInfoMenu");
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
          <li><button id="registrarCarga" onClick={menuClick}>Registro de Carga</button></li>
          <li><button id="visualizarDashboard" onClick={menuClick}>Dashboard</button></li>
          <li><button onClick={handleSubimitLogout}>Sair</button></li>
        </ul>
      </div>
      <div id="content">
        <div id="criarcarga">
          <form id="formCriarcarga" className="criarCarga" onSubmit={handlerSubmit}>
            <label>Cidade de Origem:</label>
            <select name="cidade_origem">
              <option value="">Selecione cidade</option>
              <option value="Macapá">Macapá</option>
              <option value="Belém">Belém</option>
              <option value="São Luis">São Luis</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Natal">Natal</option>
              <option value="Recife">Recife</option>
              <option value="Maceió">Maceió</option>
              <option value="Aracáju">Aracáju</option>
              <option value="Salvador">Salvador</option>
              <option value="Vitória">Vitória</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Santos">Santos</option>
            </select>
            <label>Cidade de Destino:</label>
            <select name="cidade_destino" placeholder="Cidade Destino">
              <option value="">Selecione cidade</option>
              <option value="Macapá">Macapá</option>
              <option value="Belém">Belém</option>
              <option value="São Luis">São Luis</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Natal">Natal</option>
              <option value="Recife">Recife</option>
              <option value="Maceió">Maceió</option>
              <option value="Aracáju">Aracáju</option>
              <option value="Salvador">Salvador</option>
              <option value="Vitória">Vitória</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Santos">Santos</option>
            </select>
            <label>Data de Chegada Limite:</label>
            <input type="date" name="date" placeholder="Data para entrega" />
            <button type="submit">Cadastrar Carga</button>
          </form>
        </div>

        <div id="dashboard" className="openInfoMenu">
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
      </div>

      <script type="text/javascript" src="../../assets/menu.js"></script>
    </div>
  )
}