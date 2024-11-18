import React, { useEffect, useState } from 'react'

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
  function isCartFullTextil() {
    try {
      const items: any = vtexjs.checkout.orderForm.items
      let flag = true
      for (let i = 0; i < items.length; i++) {
        const element = items[i]
        if (!element.productCategoryIds.includes('1000004')) {
          return false
        }
      }
      return flag
    } catch (error) {
      console.error('Error applying coupon:', error)
    }
  }

  const [selectedValue, setSelectedValue] = useState<string>()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    console.log('event.target.value: ', event.target.value)
    if (onChange) onChange(event)
  }


  return (
    <div className={styles['radio-group__container']}>
      <div className={styles['radio-group__body']}>
        <>{console.log('options',options)}</>
        
        {options.map((option) => (
          <>
            {console.log('isCartFullTextil():', isCartFullTextil())}
            {console.log('option.value:', option.value)}
            {(option.value === '6' ? isCartFullTextil() : true) && (
              <div
                key={option.value} // Asegúrate de que la key esté en el nivel superior del map.
                className={styles['radio-group__option--container']}
                style={{
                  fontSize: selectedValue === option.value ? '20px' : '18px',
                }}
              >
                <label className={styles['radio-group__option--body']}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleRadioChange}
                  />
                  {selectedValue === option.value /*&& option.value === '6' && isCartFullTextil()*/ && (
                    <div className={styles['radio-group__option--active']}></div>
                  )}
                </label>
                <span className={styles['radio-group__option-label']} style={{ fontSize: '14px' }}>
                  {option.label}
                </span>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
