// Input.tsx
import React from 'react'

import styles from '../../styles/common/input.module.css'

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`${styles.commonInput} ${
        props.className ? props.className : ''
      }`}
    />
  )
}

export default Input
