import Head from 'next/head'
import { useRouter } from 'next/router'
import '../styles/Home.module.scss'

export default function Home() {
  const router = useRouter()
  return (
    <div >
      <Head>
        <title>Rastreio de carga</title>
        <meta name="description" content="Rastrear carga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="home">
          <div id="menu">

          </div>
          <div id="content">
              <div className="divMessagem">
                  <form onSubmit={(e) => {
                      e.preventDefault()
                      const cod_rastreio = e.target[0].value
                      router.push(`/carga/${cod_rastreio}`)
                  }}>
                      <label htmlFor="cod_rastreio">Código de rastreio</label>
                      <input type="text" placeholder="Código de rastreio" />
                      <button type="submit">Rastrear</button>
                  </form>
              </div>
          </div>
      </div>
    </div>
  )
}
