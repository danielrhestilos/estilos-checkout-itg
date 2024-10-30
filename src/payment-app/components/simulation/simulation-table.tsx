import React, { useEffect, useState } from 'react'
import styles from './simulation-table.module.css'
import type { Simulation } from '../../typings/types'
import { scrollToTarget } from '../../utils'

type SimulationTableProps = {
  id?: string
  simulation: Simulation[]
  onChangeFullscreen?: (fullscreen: boolean) => void
  setMainTotal:(total:number) => void,
}

const SimulationTable: React.FC<SimulationTableProps> = ({
  id,
  simulation,
  onChangeFullscreen ,
  setMainTotal
}) => {

  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [renderItems, setRenderItems] = useState<Simulation[]>([])


  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  useEffect(() => {
    if(simulation){
      setMainTotal(simulation.reduce((accumulator: number, data: Simulation) => {
        const amount = Number(data.InstallmentDeferredCapitalAmount);
        return accumulator + Number(amount.toFixed(2));
        }, 0));
    }
  }, [simulation]);


  useEffect(() => {
    if (!onChangeFullscreen) return
    onChangeFullscreen(fullscreen)
  }, [fullscreen])

  useEffect(() => {
    if (!simulation) return
    if (fullscreen) {
      setRenderItems(simulation)

      return
    }
    setRenderItems(simulation.slice(0, 3))
    setTimeout(() => {
      scrollToTarget(`#${id}`)
    }, 1000);
  }, [fullscreen, simulation])

  return simulation ? (
    <section
      id={id}
      className={fullscreen ? styles['simulation-table-fullscreen'] : ''}
    >

      <table className={styles['simulation-table']}>
        <thead>
          <tr>
            <th className={styles['term-number']}>Cuota</th>
            <th>Fecha</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {renderItems.map((data: Simulation) => (
            <tr key={data.InstallmentNumber}>
              <td className={styles['term-number']}>
                {`${data.InstallmentNumber}°`}
              </td>
              <td>{data.PaymentDate}</td>
              <td>{data.InstallmentDeferredCapitalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {fullscreen ? (
        <button data-style="simple" onClick={toggleFullscreen}>
          volver
        </button>
      ) : simulation.length > 3 ? (
        <button onClick={toggleFullscreen}>ver todas las cuotas</button>
      ) : (
        <></>
      )}

    </section>
  ) : (
    <></>
  )
}

export default SimulationTable
