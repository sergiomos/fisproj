import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const plank = 6.626E-34
const m = 1.673E-27

const calcularK = (n, largura) => Math.round(n * Math.PI / largura)
const calcularA = (largura) => Math.round((2 / largura) ** 0.5)
const calcularE = (n, l) => n ** 2 * plank ** 2 / (8 * m * l ** 2);
const paraEV = () => 2;
const calcularF = () => 2
const calcularC = () => 2
const calcularV = () => 2
const calcularB = () => 2
const calcularP = () => 2

export default function Home() {
  const [largura, setLargura] = useState();
  const [ni, setNi] = useState();
  const [nf, setNf] = useState();
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [result, setResult] = useState({
    a: 0,
    kNi: 0,
    kNf: 0,
    energiaJ: 0,
    energiaEV: 0,
    frequencia: 0,
    comprimentoDeOnda: 0,
    velocidade: 0,
    ondaDeBroglie: 0,
    probabilidade: 0
  })

  const limpar = () => {
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

  const calcular = (e) => {
    e.preventDefault();
    setResult({
      a: calcularA(largura),
      kNi: calcularK(ni, largura),
      kNf: calcularK(nf, largura),
      energiaJ: calcularE(ni, largura),
      energiaEV: calcularE(nf, largura),
      frequencia: calcularF(),
      comprimentoDeOnda: calcularC(),
      velocidade: calcularV(),
      ondaDeBroglie: calcularB(),
      probabilidade: calcularP()
    })
    limpar()
  }


  return (
    <div className='h-screen'>
      <header className='px-8 py-4 shadow'><h1 className='text-cyan-300 text-lg font-bold'>A Dança das Particulas</h1></header>
      <main className='flex justify-center h-screen'>
        <section className='bg-slate-100 flex justify-center items-center py-8 w-screen'>
          <form className='w-80' onSubmit={calcular}>
            <fieldset className='flex flex-col gap-4'>
              <label className='flex flex-col gap-2'>
                Largura da caixa
                <input type='number' className='rounded h-10 px-4 shadow' onChange={({ target }) => setLargura(target.value)} required></input>
              </label>
              <label className='flex flex-col gap-2'>
                Nível inicial da partícula
                <input type='number' className='rounded h-10  px-4 shadow' onChange={({ target }) => setNi(target.value)} required></input>
              </label>
              <label className='flex flex-col gap-2'>
                Nível final da partícula
                <input type='number' className='rounded h-10  px-4 shadow' onChange={({ target }) => setNf(target.value)} required></input>
              </label>
            </fieldset>

            <h3 className='font-bold text-lg text-violet-600 mt-8'>Dados para probabilidade</h3>
            <strong>P a menor igual a x menor igual a b</strong>
            <fieldset className='flex flex-col gap-4 mt-4 mb-8'>
              <label className='flex flex-col gap-2'>
                A
                <input type='number' className='rounded h-10  px-4 shadow' onChange={({ target }) => setA(target.value)} required></input>
              </label>
              <label className='flex flex-col gap-2'>
                B
                <input type='number' className='rounded h-10  px-4 shadow' onChange={({ target }) => setB(target.value)} required></input>
              </label>
            </fieldset>

            <fieldset className='flex justify-between'>
              <button type='submit' className='rounded-sm bg-pink-300 text-slate-50 px-8 py-2 font-bold uppercase text-sm'>calcular</button>
              <button type='button' className='rounded-sm bg-pink-300 text-slate-50 px-8 py-2 font-bold uppercase text-sm' onClick={limpar}>limpar</button>
            </fieldset>
          </form>
        </section>
        <section className='flex justify-center items-center py-8 w-screen'>
          <ul className='flex flex-col gap-2'>
            <li className='flex justify-between gap-4'>
              <span>
                Função de onda quântica Ni:
              </span>
              <span className='font-bold'>ψ(x) = {result.a} * sen({result.kNi}*x)
              </span>
            </li>

            <li className='flex justify-between'>
              <span>
                Função de onda quântica Nf:
              </span>
              <span className='font-bold'>ψ(x) = {result.a} * sen({result.kNf}*x)
              </span>
            </li>

            <li className='flex justify-between'>
              <span>
                Energia:
              </span>
              <span className='font-bold'>{result.energiaEV} eV</span>
            </li>
            <li className='flex justify-between'>
              <span>
                Energia:
              </span>
              <span className='font-bold'>{result.energiaJ} J</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Frequência:
              </span>
              <span className='font-bold'>{result.frequencia} Hz</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Comprimento de Onda:
              </span>
              <span className='font-bold'>{result.comprimentoDeOnda} m</span>
            </li >

            <li className='flex justify-between'>
              <span>
                Velocidade:
              </span>
              <span className='font-bold'>{result.velocidade} m/s</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Comprimento de Onda De Broglie:
              </span>
              <span className='font-bold'>{result.ondaDeBroglie} m</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Probabilidade:
              </span>
              <span className='font-bold'>{result.probabilidade}%</span>
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
