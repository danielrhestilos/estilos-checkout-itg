import React, { useState } from 'react'

import styles from './radio.module.css'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  options: RadioOption[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => { 
  const [selectedValue, setSelectedValue] = useState<string>()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    if (onChange) onChange(event)
  }

  return (
    <div className={styles['radio-group__container']}>
      <div className={styles['radio-group__body']}>
        {options.map((option) => (
          <div
            className={styles['radio-group__option--container']}
            style={{
              fontSize: selectedValue === option.value ? '20px' : '18px',
            }}
          >
            <label
              className={styles['radio-group__option--body']}
              key={option.value}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleRadioChange}
              />
              {selectedValue === option.value && (
                <div className={styles['radio-group__option--active']}></div>
              )}
            </label>
            <span className={styles['radio-group__option-label']}>
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
