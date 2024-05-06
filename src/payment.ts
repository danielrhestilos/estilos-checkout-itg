const $ = window.$

const renderCheckTermPolicies = () => {
  const existContenedorPrincipal = document.querySelector('.summaryTemplateHolder--content')

  if (existContenedorPrincipal) {
    return null
  }

  // Contenedor principal
  const contenedorPrincipal = document.createElement('div')
  contenedorPrincipal.className = 'summaryTemplateHolder--content'

  // Parte checkbox
  const contenedorCheck = document.createElement('div')
  contenedorCheck.className = 'contenedorCheckbox'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = 'opt-in-terms-and-polices'

  const checkboxLabel = document.createElement('span')
  checkboxLabel.className = 'summaryTemplateHolder--text'

  checkboxLabel.appendChild(checkbox)

  const labelText = document.createTextNode('Acepto ')

  const link = document.createElement('a')
  link.href = '/terminos-y-condiciones'
  link.target = '_blank'
  link.textContent = 'términos y condiciones'

  checkboxLabel.appendChild(labelText)
  checkboxLabel.appendChild(link)

  $('#cart-to-orderform').attr('disabled', 'disabled')
  $('#cart-to-orderform').css('pointer-events', 'none')

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      $('#cart-to-orderform').removeAttr('disabled')
      $('#cart-to-orderform').css('pointer-events', 'visible')
    } else {
      $('#cart-to-orderform').attr('disabled', 'disabled')
      $('#cart-to-orderform').css('pointer-events', 'none')
    }
  })

  contenedorPrincipal.appendChild(contenedorCheck)

  contenedorCheck.appendChild(checkbox)
  contenedorCheck.appendChild(checkboxLabel)

  const buttonPlaceOrderWrapper = document.querySelector('.summary-template-holder .cart-links-bottom')
  buttonPlaceOrderWrapper?.appendChild(contenedorPrincipal)
}

const paymentTest = () => {
  // coupon place holder
  if ($('.coupon-fieldset #cart-coupon').length > 0) {
    $('.coupon-fieldset #cart-coupon').attr('placeholder', 'Ingresa tú código')
  }

  // END coupon place holder
  //
  $('.coupon-fields #cart-coupon-add').text('APLICAR CÓDIGO')
  $('.btn-place-order-wrapper #cart-to-orderform').text('FINALIZAR COMPRA')
  $('.link-choose-more-products-wrapper #cart-choose-more-products').text('SEGUIR COMPRANDO')
}

export { paymentTest, renderCheckTermPolicies }
