import { stringify } from 'querystring'
import { OrderForm,Item } from './typings/orderForm'

export function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export const isTarjetaEstilosPayment = (orderForm: OrderForm): boolean => {
  const selectedPayment = orderForm.paymentData.payments[0]
  console.log("* selectedPayment ",selectedPayment);
  
  const { paymentSystem } = selectedPayment
  console.log("* paymentSystem ",paymentSystem);
  
  const paymentSystems = orderForm.paymentData.paymentSystems
  console.log("* paymentSystems ",paymentSystems);
  
  const paymentSystemData = paymentSystems.find((paymentSystemData) => paymentSystemData.id === parseInt(paymentSystem))
  console.log("* paymentSystemData ",paymentSystemData);
  
  if (!paymentSystemData) return false
  const { groupName } = paymentSystemData
  console.log("* groupName ",groupName);
  
  return groupName === 'TarjetaEstilosPaymentGroup'
}
export const isYapePayment = (orderForm: OrderForm): boolean => {
  const selectedPayment = orderForm.paymentData.payments[0]
  const { paymentSystem } = selectedPayment
  const paymentSystems = orderForm.paymentData.paymentSystems
  const paymentSystemData = paymentSystems.find((paymentSystemData) => paymentSystemData.id === parseInt(paymentSystem))
  if (!paymentSystemData) return false
  const { groupName } = paymentSystemData
  return groupName === 'custom203PaymentGroupPaymentGroup'
}

export const isComboPayment = (orderForm : OrderForm):boolean => {
  let item = orderForm.items.find ((item:Item)=>item.name.toLocaleLowerCase().startsWith("combo tarjeta"))
  if(item){
    return true
  }
  return false
}

export const is6MsiPromo = (orderForm : OrderForm):boolean => {
  let item = orderForm.items.find ((item:Item)=>item.name.toLocaleLowerCase().startsWith("combo tarjeta"))
  if(item){
    return true
  }
  return false
}



export const scrollToTarget = function (target: string, container = '#paymentapp-container') {
  try {
    const containerEl = document.querySelector(container) as HTMLDivElement
    const targetEl = document.querySelector(target) as HTMLDivElement
    if (!containerEl) return
    if (!targetEl) return
    containerEl.scrollTo({
      behavior: 'smooth',
      top: targetEl.offsetTop,
      // left: targetEl.offsetLeft
    })
  } catch (error) {
    console.error(error)
  }
}

// Función para encriptar datos
export const encrypt = (data: string, object = false) => {
  const key = new Date().toISOString()
  let encryptedData = ''
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    encryptedData += String.fromCharCode(charCode)
  }

  const resultData = {
    data: btoa(encryptedData),
    timestamp: key,
  }

  return object ? resultData : JSON.stringify(resultData)
}

export const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN', // Código de moneda para el Nuevo Sol peruano (PEN)

  // Opciones para redondear a números enteros si eso es lo que deseas.
  minimumFractionDigits: 2, // Establece el número mínimo de decimales a 2
  maximumFractionDigits: 2, // Establece el número máximo de decimales a 2
})
