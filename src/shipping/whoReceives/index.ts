export const initWhoReceives = () => {
  const insertDniField = () => {
    const btnPayment: any = document.querySelector('#btn-go-to-payment')
    btnPayment.style.display = 'none'
    const existField = document.querySelector('#receiver-dni')
    if (existField) return
    const containerElem = document.querySelector('.vtex-omnishipping-1-x-container')
    if (!containerElem) return false
    const newLabel = document.createElement('label')
    newLabel.setAttribute('class', 'vtex-omnishipping-1-x-label')
    newLabel.innerText = 'DNI del responsable'
    const newInput = document.createElement('input')
    newInput.setAttribute('type', 'text')
    newInput.setAttribute('class', 'input-xlarge')
    newInput.setAttribute('name', 'receiver-dni')
    newInput.setAttribute('id', 'receiver-dni')
    const errorMessage = document.createElement('small')
    errorMessage.setAttribute('style', 'color:red;display:none')
    // const btnPayment: any = document.querySelector('#btn-go-to-payment')
    newInput.addEventListener('input', function () {
      var regexDNI = /^\d{8}$/
      var dni = this.value

      if (regexDNI.test(dni)) {
        errorMessage.style.display = 'none'
        btnPayment.style.display = 'block'
      } else {
        errorMessage.innerHTML = 'Formato incorrecto, debe ser un número de 8 dígitos.'
        errorMessage.style.display = 'block'
        errorMessage.style.fontSize = '1rem'
        if (btnPayment) {
          btnPayment.style.display = 'none'
        }
      }
    })

    containerElem.appendChild(newLabel)
    containerElem.appendChild(newInput)
    containerElem.appendChild(errorMessage)
  }

  const verifyWhoReceivesInput = () => {
    // console.log("VERIFICANDO QUIEN RECIBE");

    const receiverButton = document.querySelector('.shp-pickup-receiver__btn')
    if (receiverButton) {
      receiverButton.addEventListener('click', () => {
        setTimeout(() => {
          insertDniField()
        }, 10)
      })
    }
  }

  $(window).on('componentValidated.vtex', () => {
    verifyWhoReceivesInput()
  })
}
