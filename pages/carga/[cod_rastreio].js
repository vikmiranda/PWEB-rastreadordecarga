import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import api from '../../services/api'


export default function Index () {
  const router = useRouter()
  const { cod_rastreio } = router.query

  const [carga, setCarga] = useState({})

  useEffect(() => {
    const getCarga = async () => {
      const { data } = await api.get(`/cod_rastreio/${cod_rastreio}`);
      setCarga(data)
    }
    getCarga()
  }, [cod_rastreio])


  if(!carga) {
    return <div>Carregando...</div>
  }

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

                <label>Localização atual:</label>
                <span>{carga.localizacao}</span>

                <label>Status:</label>
                <span>{carga.status}</span>

                <label>Previsão de Entrega:</label>
                <span>{moment(carga.data_limite).format("D/MM/YYYY")}</span>
            </div>
        </div>
    </div>
  )
}
