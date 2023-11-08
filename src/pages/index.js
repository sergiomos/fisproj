import Input from '../components/input'
import { useEffect, useState } from 'react'

export default function Home() {
  const [largura, setLargura] = useState("");
  const [ni, setNi] = useState("");
  const [nf, setNf] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [m, setM] = useState(9.11E-31);
  const [tipoParticula, setTipoParticula] = useState('eletron')
  const initialResult = {
    a: 0,
    kNi: 0,
    kNf: 0,
    energiaIJ: 0,
    energiaIEV: 0,
    energiaFJ: 0,
    energiaFEV: 0,
    energiaJ: 0,
    energiaEV: 0,
    frequencia: 0,
    comprimentoDeOnda: 0,
    velocidadeI: 0,
    velocidadeF: 0,
    ondaDeBroglieI: 0,
    ondaDeBroglieF: 0,
    probabilidadeI: 0,
    probabilidadeF: 0
  }
  const [result, setResult] = useState(initialResult)

  useEffect(() => {
    switch (tipoParticula) {
      case 'eletron':
        setM(9.11E-31);
        break;
      case 'proton':
        setM(1.673E-27);
        break;
      default:
        setTipoParticula('eletron');
        break;
    }

  }, [tipoParticula])


  const plank = 6.626E-34
  const hev = 4.136E-15
  const hj = 6.626E-34
  const c = 3E8

  const precise = (n) => n.toPrecision(3)

  const calcularK = (n, largura) => precise(Math.round(n * Math.PI / largura))
  const calcularA = (largura) => precise(Math.round((2 / largura) ** 0.5))
  const calcularE = (n, l) => precise(n ** 2 * plank ** 2 / (8 * m * l ** 2));
  const paraEV = (n) => precise(n * 6.242E18);
  const paraNano = (n) => precise(n / 1e-9)
  const calcularF = (l) => precise(c / l)
  const calcularC = (e) => precise((hev * c / e))
  const calcularV = (e) => precise(Math.round(Math.sqrt(2 * e / m)))
  const calcularB = (e) => precise(hj / Math.sqrt(2 * m * e))


  const calcularT = (l, n, p) => (n * Math.PI / l) * p
  const integral = (i, f, n) => (2 * f - 2 * i - Math.sin(2 * f) + Math.sin(2 * i)) / (2 * n * Math.PI)


  const teste = (n, l, a, b) => {
    const ti = calcularT(l, n, a);
    const tf = calcularT(l, n, b);

    return precise(integral(ti, tf, n) * 100);
  }


  const limpar = () => {
    setLargura("");
    setNi("");
    setNf("");
    setA("");
    setB("");
    setResult(initialResult);
    setTipoParticula('eletron')
  }

  const calcular = (e) => {
    e.preventDefault();
    setResult({
      a: calcularA(largura),
      kNi: calcularK(ni, largura),
      kNf: calcularK(nf, largura),
      energiaIJ: calcularE(ni, largura),
      energiaIEV: paraEV(calcularE(ni, largura)),
      energiaFJ: calcularE(nf, largura),
      energiaFEV: paraEV(calcularE(nf, largura)),
      energiaJ: calcularE(nf, largura) - calcularE(ni, largura),
      energiaEV: paraEV(calcularE(nf, largura) - calcularE(ni, largura)),
      frequencia: calcularF(calcularC(paraEV(calcularE(nf, largura) - calcularE(ni, largura)))),
      comprimentoDeOnda: calcularC(paraEV(calcularE(nf, largura) - calcularE(ni, largura))),
      velocidadeI: calcularV(calcularE(ni, largura)),
      velocidadeF: calcularV(calcularE(nf, largura)),
      ondaDeBroglieI: calcularB(calcularE(ni, largura)),
      ondaDeBroglieF: calcularB(calcularE(nf, largura)),
      probabilidadeI: teste(ni, largura, a, b),
      probabilidadeF: teste(nf, largura, a, b)
    })
  }


  return (
    <div className='h-screen'>
      <header className='px-8 py-4 shadow'><h1 className='text-cyan-300 text-lg font-bold'>A Dança das Particulas</h1></header>
      <main className='flex justify-center h-screen'>
        <section className='bg-slate-100 flex justify-center items-center py-8 w-screen'>
          <form className='w-80' onSubmit={calcular}>
            <fieldset className='flex flex-col gap-4'>
              <div className='flex gap-8 justify-center mb-2'>
                <label for="eletron">
                  <input
                    type='radio'
                    id="eletron"
                    name="tipo_de_particula"
                    value="eletron"
                    onChange={({ target }) => setTipoParticula(target.value)}
                    checked={tipoParticula == 'eletron' ? true : false}
                  />
                  Elétron
                </label>

                <label for="proton">
                  <input type='radio'
                    id="proton"
                    name="tipo_de_particula"
                    value="proton"
                    onChange={({ target }) => setTipoParticula(target.value)}
                    checked={tipoParticula == 'proton' ? true : false}
                  />
                  Proton
                </label>
              </div>


              <Input
                label="Largura da caixa"
                onChange={setLargura}
                type="number" value={largura}
                required />
              <Input
                label=" Nível inicial da partícula"
                onChange={setNi} value={ni}
                type="number"
                required />
              <Input
                label="Nível final da partícula"
                onChange={setNf} value={nf}
                type="number"
                required />
            </fieldset>

            <h3 className='font-bold text-lg text-violet-600 mt-8'>Dados para probabilidade</h3>
            <strong>P a menor igual a x menor igual a b</strong>
            <fieldset className='flex flex-col gap-4 mt-4 mb-8'>
              <Input
                label="A"
                onChange={setA}
                type="number" value={a}
                required />
              <Input
                label="B"
                onChange={setB}
                type="number" value={b}
                required />
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
                Energia Nível {ni}:
              </span>
              <span className='font-bold'>{result.energiaIJ} J <span className='font-normal'>ou</span> {result.energiaIEV} eV</span>
            </li>
            <li className='flex justify-between'>
              <span>
                Energia Nível {nf}:
              </span>
              <span className='font-bold'>{result.energiaFJ} J <span className='font-normal'>ou</span> {result.energiaFEV} eV</span>
            </li>
            <li className='flex justify-between'>
              <span>
                Energia Total:
              </span>
              <span className='font-bold'>{result.energiaJ} J <span className='font-normal'>ou</span> {result.energiaEV} eV</span>
            </li>
            <li className='flex justify-between'>
              <span>
                Comprimento de Onda:
              </span>
              <span className='font-bold'>{result.comprimentoDeOnda} m <span className='font-normal'>ou</span> {paraNano(result.comprimentoDeOnda)} nm</span>
            </li >

            <li className='flex justify-between'>
              <span>
                Frequência:
              </span>
              <span className='font-bold'>{result.frequencia} Hz</span>
            </li>



            <li className='flex justify-between'>
              <span>
                Velocidade Nível {ni}:
              </span>
              <span className='font-bold'>{result.velocidadeI} m/s</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Velocidade Nível {nf}:
              </span>
              <span className='font-bold'>{result.velocidadeF} m/s</span>
            </li>


            <li className='flex justify-between'>
              <span>
                Comprimento de Onda De Broglie Nível {ni}:
              </span>
              <span className='font-bold'>{result.ondaDeBroglieI} m</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Comprimento de Onda De Broglie Nível {nf}:
              </span>
              <span className='font-bold'>{result.ondaDeBroglieF} m</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Probabilidade Nível {ni}:
              </span>
              <span className='font-bold'>{result.probabilidadeI}%</span>
            </li>

            <li className='flex justify-between'>
              <span>
                Probabilidade Nível {nf}:
              </span>
              <span className='font-bold'>{result.probabilidadeF}%</span>
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
