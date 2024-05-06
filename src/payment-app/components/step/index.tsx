import type { FC } from 'react'
import React from 'react'

import styles from './step.module.css'

interface StepProps {
  subtitle?: string | React.ReactNode
  title?: string | React.ReactNode
  children: React.ReactNode
  id?: string
}

const Step: FC<StepProps> = ({ title, subtitle, children, id }) => {
  return (
    <section id={id} className={styles['payment-step__container']}>
      <div className={styles['payment-step__header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['payment-step__body']}>
        {typeof subtitle === 'string' ? <h3>{subtitle}</h3> : subtitle ?? <></>}
        {children}
      </div>
    </section>
  )
}

export default Step
