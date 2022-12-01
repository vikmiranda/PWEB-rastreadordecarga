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
  // useEffect(() => {
  //   const token = localStorage.getItem('userLogged')
  //   if (!token) {
  //     router.push('/admin/login')
  //   }
  // })
  
  // separando as cargas por status
  const cargas_registradas = []
  const cargas_roteadas = []
  const cargas_entregues = []


  async function menuButton(e) {
    const botaoMenu = document.querySelector('.botaoMenu');
    const menu = document.querySelector('.menu-lateral');

    botaoMenu.addEventListener('click', () => {
      menu.classList.toggle('menu-lateral--ativo')
    })
  }



  cargas.forEach(element => {
    if (element.status == 'registrado' && element.rotas == undefined){
      cargas_registradas.push(element)
    }
    else if (element.status == 'entregue'){
      cargas_entregues.push(element)
    }
    else{
      cargas_roteadas.push(element)
    }
  });

  async function handlerSubmit(e) {
    e.preventDefault()
    const { cidade_origem, cidade_destino, date } = e.target.elements
    console.log(cidade_origem, cidade_destino, date )
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


  async function AttCarga(e) {
    e.preventDefault()
    const { cod_rastreio, cidade_atual, tipo_evento } = e.target.elements
    
    const id = cargas.find(element => element.cod_rastreamento == cod_rastreio.value)._id
   
    try {
      await api.put(`/${id}`, {
        historico: {nome_local: cidade_atual.value,
                    data_local: moment(),
                    evento_local: tipo_evento.value}
        
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function menuClick(e) {
    const criarcarga = document.getElementById('criarcarga');
    const dashboard = document.getElementById('dashboard');
    const atualizarcarga = document.getElementById('atualizarcarga'); 
    if (e.target.id === "registrarCarga") {
      tabelaComRastreio.className = "openInfoMenu";
      tabelaSemRastreio.className = "openInfoMenu";
      tabelaEntregada.className = "openInfoMenu";
      dashboard.className = "openInfoMenu";
      atualizarcarga.className = "openInfoMenu";
      criarcarga.classList.remove("openInfoMenu");
    } else if (e.target.id === "visualizarDashboard") {
      criarcarga.className = "openInfoMenu";
      atualizarcarga.className = "openInfoMenu";
      dashboard.classList.remove("openInfoMenu");
      tabelaComRastreio.classList.remove("openInfoMenu");
      tabelaSemRastreio.classList.remove("openInfoMenu");
      tabelaEntregada.classList.remove("openInfoMenu");
    } else if (e.target.id === "atualizarCarga") {
      tabelaComRastreio.className = "openInfoMenu";
      tabelaSemRastreio.className = "openInfoMenu";
      tabelaEntregada.className = "openInfoMenu";
      dashboard.className = "openInfoMenu";
      criarcarga.className = "openInfoMenu";
      atualizarcarga.classList.remove("openInfoMenu");
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
      <button className="botaoMenu" aria-label="Menu" onClick={menuButton}>
        <i></i>
      </button>
      <div id="menu" className="menu-lateral">
        <hr />
        <ul>
          <li><button id="registrarCarga" onClick={menuClick}>Registro de Carga</button></li>
          <li><button id="visualizarDashboard" onClick={menuClick}>Dashboard</button></li>
          <li><button id="atualizarCarga" onClick={menuClick}>Atualizar Carga</button></li>
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
          <h2>Carga Não Roteada</h2>
          <table id="tabelaSemRastreio" className="openInfoMenu">
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Data</th>
              <th>Rotas</th>
            </tr>
            {
              cargas_registradas.map((item, index) => (
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
                        <p>{moment(item.data_limite).format("D/MM/YYYY")}</p>
                      </li>
                    </td>
                    <td>
                      <li>
                        <button onClick={() => { router.push(`/admin/rotas_disponiveis`) }}>Escolher Rota</button>
                      </li>
                    </td>
                  </tr>
              ))
            }
          </table>

          <h2>Carga Roteada</h2>
          <table id="tabelaComRastreio" className="openInfoMenu">
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
            {
              cargas_roteadas.map((item, index) => (
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
                </tr>
              ))
            }
          </table>

          <h2>Carga Reivindicada</h2>
          <table id="tabelaEntregada" className="openInfoMenu">
            <tr>
              <th>Codigo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Data</th>
            </tr>
            {
              cargas_entregues.map((item, index) => (
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
                        <p>{moment(item.data_limite).format("D/MM/YYYY")}</p>
                      </li>
                    </td>

                  </tr>
              ))
            }
          </table>

        </div>

        <div id="atualizarcarga" className="openInfoMenu">
          <form id="formAtualizarCarga" className="criarCarga" onSubmit={AttCarga}>
            <label>Código de Rastreio:</label>
            <input name= "cod_rastreio"/>
            <label>Cidade Atual:</label>
            <select name="cidade_atual">
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
            <label>Tipo de evento:</label>
            <select name="tipo_evento">
              <option value="">Selecione evento</option>
              <option value="Custom">Custom</option>
              <option value="Descarregar">Descarregar</option>
              <option value="Reivindicar">Reivindicar</option>
              <option value="Receber">Receber</option>
              <option value="Carregar">Carregar</option>
            </select>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>

    </div>
  )
}