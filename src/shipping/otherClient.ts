import setCustomData from '../utils/micro-services'

function createDivAndElements(): void {
  try {
    const { clientProfileData } = window.vtexjs.checkout.orderForm
    const contenedorPrincipalExists = document.querySelector('.contenedorPrincipal')
    if (contenedorPrincipalExists) {
      return
    }

    const existDataFromLocalStorage = sessionStorage.getItem('formData')
    var loadedDataFromLocalStorage = null

    const loadPreviousdata =
      sessionStorage.getItem('clientEmail') === clientProfileData?.email && existDataFromLocalStorage !== null

    if (loadPreviousdata && existDataFromLocalStorage !== null) {
      loadedDataFromLocalStorage = JSON.parse(existDataFromLocalStorage)
    }

    // Contenedor principal
    const contenedorPrincipal = document.createElement('div')
    contenedorPrincipal.className = 'contenedorPrincipal'

    // Parte checkbox
    const contenedorCheck = document.createElement('div')
    contenedorCheck.className = 'contenedorCheckbox'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'checkboxOtherPeople'
    checkbox.checked = loadedDataFromLocalStorage?.receivesDelivery

    const checkboxLabel = document.createElement('label')

    checkboxLabel.appendChild(checkbox)

    const labelText = document.createTextNode('Otra persona recibe el envío')

    checkboxLabel.appendChild(labelText)

    // Div oculto
    const hiddenDiv = document.createElement('div')
    hiddenDiv.className = 'contenedorDatosCliente'
    hiddenDiv.style.display = loadedDataFromLocalStorage?.receivesDelivery ? 'block' : 'none'

    // Nombre de quien recibe
    const contenedorNombre = document.createElement('div')
    contenedorNombre.className = 'contenedorNombre'

    const checkboxLabelWhoReceives = document.createElement('label')
    const labelTextWhoReceives = document.createTextNode('Quien recibe el envío')
    checkboxLabelWhoReceives.appendChild(labelTextWhoReceives)

    const whoReceives = document.createElement('input')
    whoReceives.type = 'text'
    whoReceives.className = 'OrdenClientName'
    whoReceives.id = 'OrdenClienteID'
    whoReceives.value = loadedDataFromLocalStorage?.clientName ?? ''
    whoReceives.required = true

    contenedorNombre.appendChild(checkboxLabelWhoReceives)
    contenedorNombre.appendChild(whoReceives)

    // Numero de telefono de quien recibe
    const contenedorTelefono = document.createElement('div')
    contenedorTelefono.className = 'contenedorTelefono'

    const phoneboxLabel = document.createElement('label')
    const phoneText = document.createTextNode('Celular')
    phoneboxLabel.appendChild(phoneText)

    const phoneInput = document.createElement('input')
    phoneInput.type = 'text'
    phoneInput.className = 'OrdenClientPhone'
    phoneInput.id = 'ordenClientPhone'
    phoneInput.value = loadedDataFromLocalStorage?.clientPhone ?? ''

    contenedorTelefono.appendChild(phoneboxLabel)
    contenedorTelefono.appendChild(phoneInput)

    // Email de quien recibe
    const contenedorEmail = document.createElement('div')
    contenedorEmail.className = 'contenedorEmail'

    const emailLabel = document.createElement('label')
    const emailText = document.createTextNode('Correo')
    emailLabel.appendChild(emailText)

    const emailInput = document.createElement('input')
    emailInput.type = 'text'
    emailInput.className = 'OrdenClientEmail'
    emailInput.id = 'ordenClientEmail'
    emailInput.value = loadedDataFromLocalStorage?.clientEmail ?? ''

    contenedorEmail.appendChild(emailLabel)
    contenedorEmail.appendChild(emailInput)

    // Contenedor de tipo de documento
    const documentTypeContainer = document.createElement('div')
    documentTypeContainer.className = 'documentType'

    // Numero de documento de quien recibe
    const documentTypeNumber = document.createElement('div')
    documentTypeNumber.className = 'documentTypeNumber'

    const documentInputLabel = document.createElement('label')
    const documentInputlabelText = document.createTextNode('Número de documento')
    documentInputLabel.appendChild(documentInputlabelText)

    const documentInput = document.createElement('input')
    documentInput.type = 'text'
    documentInput.className = 'OrdenClientDocumentNumber'
    documentInput.id = 'OrdenClientDocumentNumber'
    documentInput.value = loadedDataFromLocalStorage?.documentNumber ?? ''

    documentTypeNumber.appendChild(documentInputLabel)
    documentTypeNumber.appendChild(documentInput)

    // Seleccion de tipo de documento
    const documentTypeContainerDocument = document.createElement('div')
    documentTypeContainerDocument.className = 'documentTypeSelect'

    const selectInputLabel = document.createElement('label')
    const selectInputlabelText = document.createTextNode('Documento')
    selectInputLabel.appendChild(selectInputlabelText)

    const select = document.createElement('select')
    select.className = 'select'
    select.id = 'select'

    const dni = document.createElement('option')
    dni.value = 'DNI'
    dni.textContent = 'DNI'

    const foreigner = document.createElement('option')
    foreigner.value = 'Carnet de extranjeria'
    foreigner.textContent = 'Carnet de extranjeria'


    select.appendChild(dni)
    select.appendChild(foreigner)

    documentTypeContainerDocument.appendChild(selectInputLabel)
    documentTypeContainerDocument.appendChild(select)

    documentTypeContainer.appendChild(documentTypeContainerDocument)
    documentTypeContainer.appendChild(documentTypeNumber)

    // AppenChild del div oculto
    hiddenDiv.appendChild(contenedorNombre)
    hiddenDiv.appendChild(documentTypeContainer)
    hiddenDiv.appendChild(contenedorTelefono)
    hiddenDiv.appendChild(contenedorEmail)

    // Validacion para saber si el checkbox esta activo o no
    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        hiddenDiv.style.display = 'block'
      } else {
        hiddenDiv.style.display = 'none'
      }
    })

    contenedorPrincipal.appendChild(contenedorCheck)
    contenedorPrincipal.appendChild(hiddenDiv)
    contenedorCheck.appendChild(checkbox)
    contenedorCheck.appendChild(checkboxLabel)

    // Validacion para meter todo en el contenedor padre
    const googleParentContainer = document.querySelector('.vtex-omnishipping-1-x-address')
    if (googleParentContainer) {
      googleParentContainer.appendChild(contenedorPrincipal)
    }
    console.log("holaa")
    
    // Función para obtener los datos del formulario en un objeto JSON
    function getFormData() {
      const formData = {
        receivesDelivery: checkbox.checked,
        clientName: whoReceives.value,
        clientPhone: phoneInput.value,
        clientEmail: emailInput.value,
        documentType: select.value,
        documentNumber: documentInput.value,
      }

      if (!formData.clientName) {
        const pickupName = document.querySelector('#pickup-receiver') as HTMLInputElement
        if (pickupName) {
          formData.clientName = pickupName.value
        }
      }

      if (!formData.documentNumber) {
        const pickupDni = document.querySelector('#receiver-dni') as HTMLInputElement
        if (pickupDni) {
          formData.documentNumber = pickupDni.value
        }
      }

      return formData
    }

    // Función para manejar el evento click del botón "btn-go-to-payment"
    function handleGoToPaymentClick() {
      const formData = getFormData()
      console.log('Form Data:', formData)

      const orderFormId = window.vtexjs.checkout.orderForm.orderFormId
      const formDataValue = JSON.stringify(formData)
      const appId = 'additional-custom-data'
      const $data = {
        'other-person-receive-order': formDataValue,
      }
      sessionStorage.setItem('formData', JSON.stringify(formData))

      setCustomData(orderFormId, appId, $data)
    }

    // Asignar el evento click al botón "btn-go-to-payment"
    const btnGoToPayment = document.getElementById('btn-go-to-payment')
    if (btnGoToPayment) {
      btnGoToPayment.addEventListener('click', handleGoToPaymentClick)
    }
  } catch (error) {
    console.log('Ooopsss')
  }
}

$(window).on('componentValidated.vtex', () => {
  createDivAndElements()
})

export default createDivAndElements
