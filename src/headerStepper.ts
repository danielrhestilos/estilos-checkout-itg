async function renderHeaderStepper() {
  const { hash } = location
  const elements = [
    { hr: document.querySelector('hr.profile')!, div: document.querySelector('div.profile')! },
    { hr: document.querySelector('hr.shipping')!, div: document.querySelector('div.shipping')! },
    { hr: document.querySelector('hr.payment')!, div: document.querySelector('div.payment')! },
  ]

  elements.forEach((element) => {
    element.hr.classList.remove('inActive')
    element.div.classList.remove('inActive')
  })

  if (hash === '#/cart') {
    elements.forEach((element) => {
      element.hr.classList.add('inActive')
      element.div.classList.add('inActive')
    })
  } else if (hash === '#/profile' || hash === '#/email') {
    elements.slice(1).forEach((element) => {
      element.hr.classList.add('inActive')
      element.div.classList.add('inActive')
    })
  } else if (hash === '#/shipping') {
    elements.slice(2).forEach((element) => {
      element.hr.classList.add('inActive')
      element.div.classList.add('inActive')
    })
  }

  var emailSection = document.querySelector('.cart-template.mini-cart.span4') as HTMLAnchorElement | null
  var shippingSection = document.querySelector('#shipping-data') as HTMLAnchorElement | null
  var paymentSection = document.querySelector('#payment-data') as HTMLAnchorElement | null
  var emailSectionContainer = document.querySelector('.orderform-template-holder.span8') as HTMLAnchorElement | null
  var emailSectionContainerInOtherSpace = document.querySelector('fieldset.pre-email.row-fluid') as HTMLAnchorElement | null


  if(hash === '#/email'){
    emailSection !== null ? emailSection.style.display = "none" : ''
    shippingSection !== null ? shippingSection.style.display = "none" : ''
    paymentSection !== null ? paymentSection.style.display = "none" : ''
    emailSectionContainer !== null ? emailSectionContainer.style.maxWidth  = "unset" : ''
    emailSectionContainerInOtherSpace !== null ? emailSectionContainerInOtherSpace.style.width  = "" : ''
  } else {
    emailSection !== null ? emailSection.style.display = "block" : ''
    shippingSection !== null ? shippingSection.style.display = "block" : ''
    paymentSection !== null ? paymentSection.style.display = "block" : ''
    emailSectionContainer !== null ? emailSectionContainer.style.maxWidth  = "" : ''
    emailSectionContainerInOtherSpace !== null ? emailSectionContainerInOtherSpace.style.width  = "100%" : ''
  }
}

export default renderHeaderStepper
