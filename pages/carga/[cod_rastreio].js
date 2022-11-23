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
      <h1>{carga.cod_rastreamento}</h1>

      <h1>Origem: {carga.cidade_origem}</h1>
      <h1>Destino: {carga.cidade_destino}</h1>

      <h1>Localização atual: {carga.localizacao}</h1>

      <h1>Status: {carga.status}</h1>
      <h1>{moment(carga.data_limite).format("D/MM/YYYY")}</h1>

    </div>
  )
}
