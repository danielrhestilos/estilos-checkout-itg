// Select.tsx
import type { FC, ChangeEvent } from 'react'
import React from 'react'

import styles from '../../styles/common/input.module.css'
import selectStyles from './select.module.css'
import svgIcon from '../../assets/icons/chevron-dwon.svg'

interface SelectProps extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({ options, value, onChange, placeholder }) => (
  <select
    className={`${styles.commonInput} ${selectStyles.customSelect}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      backgroundImage: `url(${svgIcon})`,
    }}
  >
    <option value={''} selected disabled>
      {placeholder}
    </option>
    {options.map((option, i) => (
      <option key={i} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default Select
