import setCustomData from '../utils/micro-services'

const $ = window.$
/**
 * The function `formatDateToYYYYMMDD` takes a `Date` object as input and returns a formatted string in
 * the format "YYYY-MM-DD".
 * @param {Date} date - The `date` parameter is of type `Date` and represents the date that you want to
 * format.
 * @returns The function `formatDateToYYYYMMDD` returns a string in the format "YYYY-MM-DD",
 * representing the year, month, and day of the given date.
 */
const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

let isExecuted = false

/**
 * The function sets the terms and conditions for an order form and saves the current date.
 */
const setTermsAndConditions = () => {
  if (!isExecuted) {
    const currentDate = new Date()
    const formattedDate = formatDateToYYYYMMDD(currentDate)

    const formData = {
      termsConditions: true,
      dateTerms: formattedDate,
    }
    const orderFormId = window.vtexjs.checkout.orderForm.orderFormId
    const appId = 'additional-custom-data'

    const formDataValue = JSON.stringify(formData)
    const $data = {
      'terms-and-conditions': formDataValue,
    }
    setCustomData(orderFormId, appId, $data)
    isExecuted = true
  }
}

/**
 * Create and configure elements for the loader and spinner.
 */
const loaderPromotions = document.createElement('span')
const spinner = document.createElement('i')
spinner.className = 'icon-spinner icon-spin'
loaderPromotions.appendChild(spinner)
loaderPromotions.className = 'loader-promotions btn btn-success btn-large'

/**
 * The function `validateBuyButton` is responsible for handling the display of a loading spinner
 * within a payment button container, based on the provided `isActive` parameter.
 *
 * @param {boolean} isActive - A boolean value that indicates whether the loading spinner should be displayed
 * (`true`) or removed (`false`).
 *
 * @returns {void} This function does not return any value.
 */
const validateBuyButton = (isActive: boolean) => {
  const paymentButtonContainer = document.querySelector('.payment-submit-wrap')
  if (!paymentButtonContainer) return
  if (isActive) {
    paymentButtonContainer.appendChild(loaderPromotions)
  } else {
    paymentButtonContainer.removeChild(loaderPromotions)
  }

  return
}

document.addEventListener('loadingDiscounts', () => {
  validateBuyButton(true)
})

document.addEventListener('discountsLoaded', () => {
  validateBuyButton(false)
})

/**
 * The function `finishPayment` checks if the current URL hash is `#/payment`, and if so, it waits for
 * 700 milliseconds and then sets the terms and conditions.
 */

function addBusinessDays(date: any, daysStr: any) {
  // Función auxiliar para verificar si es fin de semana (no hábil)
  function isWeekend(date: any) {
    const day = date.getDay()
    // return day === 0 || day === 6;
    return day === 0 // Domingo = 0, Sábado = 6
  }

  // Extraer el número de días del formato 'Xbd'
  const days = parseInt(daysStr.replace('bd', ''), 10)
  console.log('days daniel ', days)
  let esTarde = false
  // Verifica si es después del mediodía
  const hours = date.getHours()
  let remainingDays = days
  if (hours >= 12) {
    esTarde = true
    remainingDays += 1
  }

  let resultDate = new Date(date)

  while (remainingDays > 0) {
    resultDate.setDate(resultDate.getDate() + 1) // Avanza un día

    // Solo cuenta si no es fin de semana
    if (!isWeekend(resultDate)) {
      remainingDays-- // Solo restar días si es hábil
    }
  }

  return { resultDate, esTarde }
}

function formatDate(date: any) {
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()
  const month = months[date.getMonth()]

  return `${dayOfWeek} ${dayOfMonth} ${month}`
}

const finishPayment = () => {
  const { hash } = window.location
  if (hash === '#/payment') {
    setTimeout(() => {
      const btnFinishPayment = document.getElementById('payment-data-submit')
      if (btnFinishPayment) {
        setTermsAndConditions()
      }
      // const selectedSla = window?.vtexjs?.checkout?.orderForm.shippingData.logisticsInfo[0].selectedSla
      // const slas = window?.vtexjs?.checkout?.orderForm.shippingData.logisticsInfo[0].slas
      // const slaObject = slas.find((item: any) => item.id == selectedSla)
      // const transitTime = slaObject.transitTime
      // const today = new Date()
      // console.log('transitTime ->', transitTime)

      // const { resultDate, esTarde } = addBusinessDays(today, transitTime)
      // const formattedDate = formatDate(resultDate) 

      // const element = document.querySelector('.vtex-omnishipping-1-x-SummaryItemInfo')

      // if (element) {
      //   if (!element.innerHTML.includes(formattedDate)) {
      //     if (transitTime == "1bd" || transitTime=='1d') {
            
      //       if (esTarde) {
      //         element.innerHTML += `<strong style="font-size:14px;">LLega:  ${formattedDate}</strong>`
      //       } else {
      //         element.innerHTML += `<strong style="font-size:14px;">LLega:  Mañana (${formattedDate})</strong>`
      //       }
      //     } else {
      //       element.innerHTML += `<strong style="font-size:14px;">LLega a partir de: ${formattedDate}</strong>`
      //     }
      //   }
      // } else {
      //   console.error('El elemento no fue encontrado en el DOM.')
      // }
    }, 700)
  }
}

$(window).on('componentValidated.vtex', () => {
  finishPayment()
})

export default finishPayment
