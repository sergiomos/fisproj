import Input from '../components/input'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Infinito() {
  const initialResult = {
    largura: 0,
    nivel: 0,
    px: 0,
    velocidade: 0,
    comprimentoOnda: 0,

  }

  const plank = 6.626E-34
  const hev = 4.136E-15
  const hj = 6.626E-34
  const c = 3E8

  const [xp, setXp] = useState("");
  const [a, setA] = useState("");
  const [k, setK] = useState("");
  const [m, setM] = useState(9.11E-31);
  const [result, setResult] = useState(initialResult)





  const precise = (n) => n.toPrecision(3)

  const paraEV = (n) => precise(n * 6.242E18);
  const paraNano = (n) => precise(n / 1e-9)
  const calcularL = () => precise((2 / Math.pow(a, 2)) * 1e9);
  const calcularP = () => precise(Math.pow(a, 2) * Math.pow(Math.sin(k * xp * (calcularL() * 1e-9)), 2))
  const calcularN = (e) => Math.round(k * calcularL() * 1e-9 / Math.PI)
  const calcularC = (e) => precise((hev * c / e))
  const calcularV = (e) => precise(Math.round(Math.sqrt(2 * e / m)))


  const limpar = () => {
    setA("");
    setK("");
    setXp("");
    setA("");
    setResult(initialResult);
  }

  const calcular = (e) => {
    e.preventDefault();
    setResult({
      largura: calcularL(),
      nivel: calcularN(),
      probabilidade: calcularP(),
      velocidade: calcularV(),
      comprimentoOnda: calcularC(),
    })
  }


  return (
    <div className='h-screen'>
      <header className='px-8 py-4 shadow flex justify-between'>
        <h1 className='text-cyan-300 text-lg font-bold'>A Dança das Particulas</h1>
        <div className='flex gap-8'>
          <Link href="/" className='rounded-sm bg-pink-300 text-slate-50 px-4 py-2 font-bold uppercase text-sm'>potencial unidimensional</Link>
          <Link href="/infinito" className='rounded-sm bg-pink-200 text-slate-50 px-4 py-2 font-bold uppercase text-sm'>potencial infinito unidimensional</Link>
        </div>
      </header>
      <main className='flex justify-center h-screen'>
        <section className='bg-slate-100 flex justify-center items-center py-8 w-screen'>
          <form className='w-80' onSubmit={calcular}>
            <fieldset className='flex flex-col gap-4'>
              <Input
                label="A"
                onChange={setA}
                type="number" value={a}
                required />
              <Input
                label=" K"
                onChange={setK} value={k}
                type="number"
                required />
              <Input
                label="X"
                onChange={setXp} value={xp}
                type="number"
                required />
            </fieldset>

            <fieldset className='flex justify-between mt-16'>
              <button type='submit' className='rounded-sm bg-pink-300 text-slate-50 px-8 py-2 font-bold uppercase text-sm'>calcular</button>
              <button type='button' className='rounded-sm bg-pink-300 text-slate-50 px-8 py-2 font-bold uppercase text-sm' onClick={limpar}>limpar</button>
            </fieldset>
          </form>
        </section>
        <section className='flex justify-center items-center py-8 w-screen'>
          <ul className='flex flex-col gap-2'>
            <li className='flex justify-between'>
              <span>
                Largura da Caixa:
              </span>
              <span className='font-bold'>{result.largura} nm               </span>
            </li>

            <li className='flex justify-between gap-4'>
              <span>
                Nível quântico da partícula:
              </span>
              <span className='font-bold'>{result.nivel}
              </span>
            </li>
            <li className='flex justify-between'>
              <span>
                Probabilidade:
              </span>
              <span className='font-bold'>{result.probabilidade} * dx</span>
            </li>


          </ul>

        </section>
      </main>
      <footer className='bg-zinc-800 text-slate-50 text-center py-3'>
        <strong className='text-pink-500'>Feito Por:</strong>
        <ul>
          <li>Sérgio Martins de Olivera Santos - 22.222.021-2</li>
          <li>Deise Adriana Silva Araujo - 22.222.024-6</li>
        </ul>
      </footer>
    </div>
  )
}
