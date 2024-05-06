const { $ } = window

function otherDocument() {
  const { hash } = window.location

  if ($('input#client-document').css('display') !== 'none') {
    $('input#client-document').css('display', 'none')
    $('#no-document-key').trigger('click')
  }

  if (hash === '#/profile') {
    const interval = setInterval(() => {
      if ($('.client-document').css('display') === 'none' && !$('.select-document-custom').length) {
        pintaDataListDoc()
        clearInterval(interval)
      }
    }, 500)
  }
}

function pintaDataListDoc() {
  if (!($('#client-document-type').find('#tipoDocumts').length > 0)) {
    dataTipoDoc()

    $('#client-document-type').attr('list', 'tipoDocumts')

    $('#client-document-type').addClass('select-type-document')
    $('#client-document-type').css('display', 'none')
  } else {
    return null
  }
}

function dataTipoDoc() {

  const documentTypeSelect = document.createElement('select')
  documentTypeSelect.required = true;

  documentTypeSelect.className = 'select-document-custom'
  const opciones = ['','DNI', 'Carnet de extranjería']

  for (let i = 0; i < opciones.length; i++) {
    const opcion = document.createElement('option')

    opcion.text = opciones[i]
    opcion.value = opciones[i]
    documentTypeSelect.appendChild(opcion)
  }

  documentTypeSelect.addEventListener('change', () => {
    const seleccion = documentTypeSelect.value // Valor de la opción seleccionada

    $('#client-document-type').val(seleccion)
    const event = new Event(`change`, { bubbles: true })
    const hiddenInput = document.querySelector('#client-document-type')

    hiddenInput?.dispatchEvent(event)
  })

  $('.client-document-type').append(documentTypeSelect)
  $('.client-phone')[0].id = 'client-phone'
  $('.other-document').insertAfter('#client-phone')
}

export default otherDocument
