import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div >
      <Head>
        <title>Rastreio de carga</title>
        <meta name="description" content="Rastrear carga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div >
        <form
          onSubmit={
            (e) => {
              e.preventDefault()
              const cod_rastreio = e.target[0].value
              router.push(`/carga/${cod_rastreio}`)
            }
          }
        >
          <label htmlFor="cod_rastreio">Código de rastreio</label>
          <input type="text" placeholder="Código de rastreio" />
          <button type="submit">Rastrear</button>
        </form>
      </div>
    </div>
  )
}
