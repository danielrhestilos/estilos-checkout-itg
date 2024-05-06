// Input.tsx
import type { ChangeEvent } from 'react'
import React, { FC, useState } from 'react'

import styles from '../../styles/common/input.module.css'
import Input from '../input/input'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const CardInput = ({ value, onChange }: InputProps) => {
  const [formattedValue, setFormattedValue] = useState(value)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\s/g, '') // Elimina todos los espacios en blanco de la entrada

    // Aplica la máscara 0000  0000  0000  0000 utilizando grupos y espacios en blanco
    const formatted = inputValue.replace(
      /(\d{4})(\d{0,4})(\d{0,4})(\d{0,4}).*/,
      (_, g1, g2, g3, g4) => {
        let result = g1

        if (g2) result = `${result} ${g2}`
        if (g3) result = `${result} ${g3}`
        if (g4) result = `${result} ${g4}`

        return result
      }
    )

    setFormattedValue(formatted)
    onChange({ ...event, target: { ...event.target, value: inputValue } })
  }

  return (
    <Input
      className={styles.commonInput}
      value={formattedValue}
      onChange={handleInputChange}
      maxLength={19} // Limita la longitud máxima del campo a la máscara completa (19 caracteres)
      placeholder="0000  0000  0000  0000" // Mostrará la máscara como placeholder
    />
  )
}

export default CardInput
