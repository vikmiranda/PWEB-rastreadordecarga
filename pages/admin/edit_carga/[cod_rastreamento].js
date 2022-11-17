import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import api from '../../../services/api'

export default function Index() {
  const router = useRouter()
  const { cod_rastreamento } = router.query
  const [carga, setCarga] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('userLogged')
    if (!token) {
      router.push('/admin/login')
    }

    const getCarga = async () => {
      const { data } = await api.get(`/cod_rastreio/${cod_rastreamento}`);
      setCarga(data)
    }
    getCarga()
  }, [cod_rastreamento, router])

  async function handlerSubmit(e) {
    try {
      const data = {
        cidade_origem: carga.cidade_origem,
        cidade_destino: carga.cidade_destino,
        status: carga.status,
        localizacao: carga.localizacao,
        data_limite: carga.data_limite
      }
      await api.put(
        `/${carga._id}`,
        data
      )
    } catch (error) {
      console.log(error)
    }
  }

  function handlerChange(e) {
    setCarga({
      ...carga,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <form onSubmit={handlerSubmit}
        onChange={handlerChange}>
        <label htmlFor="cidade_origem">Cidade Origem</label>
        <input type="text" name="cidade_origem" placeholder={carga.cidade_origem} />

        <label htmlFor="cidade_destino">Cidade Destino</label>
        <input type="text" name="cidade_destino" placeholder={carga.cidade_destino} />

        <label htmlFor="date">Data para entrega</label>
        <input type="text" name="localizacao" placeholder={carga.localizacao} />

        <label htmlFor="date">Data para entrega</label>
        <input type="text" name="status" placeholder={carga.status} />

        <label htmlFor="date">Data para entrega</label>
        <input type="date" name="date" placeholder={moment(carga.data_limite).format("D/MM/YYYY")} />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  )
}
