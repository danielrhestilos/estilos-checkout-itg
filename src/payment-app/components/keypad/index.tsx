import React, { useEffect, useState } from 'react'

import { shuffle } from '../../utils'
import styles from './keypad.module.css'
import Input from '../input/input'
import AlertModal from '../alert'

type NumericKeypadProps = {
  onClick: (value: string) => void
  show: boolean
  onClose: () => void
}

const NumericKeypad = ({
  onClick,
  show = false,
  onClose,
}: NumericKeypadProps) => {
  const [numbers, setNumbers] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [placeHolder, setPlaceholder] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setNumbers(shuffle(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']))
  }, [])

  const handleClick = (selectedNumber: string) => {
    const newValue = `${value}${selectedNumber}`

    setValue(newValue)
    setPlaceholder(
      newValue
        .split('')
        .map(() => '*')
        .join('')
    )
    onClick?.(selectedNumber)
  }

  return show ? (
    <div className={styles['modal-password']}>
      <div className={styles['keypad-container']}>
        <div className={styles['password-field']}>
          <h3>Ingresa la contraseña</h3>
          <Input
            value={placeHolder}
            onChange={() => null}
            contentEditable={false}
          />
        </div>
        <div className={styles['keypad-body']}>
          {numbers.map((number) => (
            <button
              type="button"
              className={styles['keypad-number']}
              key={number}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <div className={styles['button-container']}>
        <button
          data-style="primary"
          onClick={() => {
            setShowModal(true)
          }}
        >
          CONFIRMAR
        </button>
        <button
          data-style="simple"
          onClick={() => {
            setShowModal(false)
            onClose()
          }}
        >
          cancelar
        </button>
      </div>
      <AlertModal
        show={showModal}
        message=""
        title="Compra realizada con éxito!"
        onRetry={() => {
          setShowModal(false)
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      />
    </div>
  ) : (
    <></>
  )
}

export default NumericKeypad
