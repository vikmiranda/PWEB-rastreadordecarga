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

      <h1>{carga.cidade_origem}</h1>
      <h1>{carga.cidade_destino}</h1>

      <h1>{carga.localizacao}</h1>
      <h1>{carga.status}</h1>
      {moment(carga.data_limite).format("D/MM/YYYY") }

    </div>
  )
}
