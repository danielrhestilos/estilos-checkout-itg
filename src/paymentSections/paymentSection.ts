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
const formatDateToYYYYMMDD= (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

let isExecuted = false

/**
 * The function sets the terms and conditions for an order form and saves the current date.
 */
const setTermsAndConditions = () => {
  if(!isExecuted){
    const currentDate = new Date()
    const formattedDate = formatDateToYYYYMMDD(currentDate);

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
loaderPromotions.className = "loader-promotions btn btn-success btn-large"


/**
 * The function `validateBuyButton` is responsible for handling the display of a loading spinner
 * within a payment button container, based on the provided `isActive` parameter.
 *
 * @param {boolean} isActive - A boolean value that indicates whether the loading spinner should be displayed
 * (`true`) or removed (`false`).
 *
 * @returns {void} This function does not return any value.
 */
const validateBuyButton = (isActive:boolean) => {
  const paymentButtonContainer = document.querySelector('.payment-submit-wrap')
  if (!paymentButtonContainer) return
  if (isActive) {
    paymentButtonContainer.appendChild(loaderPromotions)
  } else {
    paymentButtonContainer.removeChild(loaderPromotions)
  }

  return
}

document.addEventListener("loadingDiscounts", () => {
  validateBuyButton(true)
})

document.addEventListener("discountsLoaded", () => {
  validateBuyButton(false)
})

/**
 * The function `finishPayment` checks if the current URL hash is `#/payment`, and if so, it waits for
 * 700 milliseconds and then sets the terms and conditions.
 */
const finishPayment = () => {
  const { hash } = window.location
  if(hash === '#/payment'){
    setTimeout(() => {
      const btnFinishPayment = document.getElementById('payment-data-submit')
      if (btnFinishPayment) {
        setTermsAndConditions()
      }
    }, 700);
  }
}

$(window).on('componentValidated.vtex', () => {
  finishPayment()
})

export default finishPayment
