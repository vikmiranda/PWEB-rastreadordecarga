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

      <div className="home homePrincipal">
          <div>
              <h1>Rastreio de Carga</h1>
              <p>Rastrei sua carga com código de rastreio</p>
          </div>

          <form className="divMessagem"
                onSubmit={(e) => {
                        e.preventDefault()
                        const cod_rastreio = e.target[0].value
                        router.push(`/carga/${cod_rastreio}`)
                    }}>
              <div>
                  <label htmlFor="cod_rastreio">Código de rastreio</label>
                  <input type="text" placeholder="Código de rastreio" />
                  <hr/>
                  <button type="submit">Rastrear</button>
              </div>
          </form>
      </div>
    </div>
  )
}
