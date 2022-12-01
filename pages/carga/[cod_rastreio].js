import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import api from '../../services/api'


export default function Index ( ) {
  const router = useRouter()
  const { cod_rastreio } = router.query
console.log(cod_rastreio)
  const [carga, setCarga] = useState({})
  useEffect(() => {
    const getCarga = async () => {
      const { data } = await api.get(`/cod_rastreio/${cod_rastreio}`);
      setCarga(data);
    }
    getCarga()
  }, [cod_rastreio])

  if(!carga) {
    return <div>Carregando...</div>
  }
  const historico = carga.historico
  //console.log(carga.historico)
  return (
    <div>
        <div className="paginaRastreio">
            <div className="rastreioCarga">

                <p>Acompanhe sua carga!</p>
                <h1>{carga.cod_rastreamento}</h1>

                <label>Origem:</label>
                <span>{carga.cidade_origem}</span>

                <label>Destino:</label>
                <span>{carga.cidade_destino}</span>

                <label>Status:</label>
                <span>{carga.status}</span>

                <label>Previsão de Entrega:</label>
                <span>{moment(carga.data_limite).format("D/MM/YYYY")}</span>

                <h2>Histórico</h2>

                <table>
                    <tr>
                        <th>Data</th>
                        <th>Tipo de Evento</th>
                        <th>Local</th>
                    </tr>
                    {
              historico?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <li>
                        <p>
                        {item.data_local}
                        </p>
                      </li>
                      </td>
                    <td>
                    <li>
                        <p>
                        {item.evento_local}
                        </p>
                      </li>
                    </td>
                    <td>
                      <li>
                        <p>
                        {item.nome_local}
                        </p>
                      </li>
                    </td>
                  </tr>
              ))
            }

                </table>
            </div>
        </div>
    </div>
  )
}
