function checkValidateEmptyDocument(): void {
  async function handleHashChange() {
    const { hash } = window.location

    const goProfileDiv = document.querySelector('a.goProfile') as HTMLAnchorElement | null

    if (hash !== '#/profile' && hash !== '#/cart' && hash !== '#/email') {
      var orderForm = await window.vtexjs.checkout.getOrderForm()
      const orderFormDocument = orderForm.clientProfileData?.document

      if (orderFormDocument === '' || orderFormDocument === null || orderFormDocument.length > 8 && orderFormDocument.length > 12) {
        goProfileDiv?.click()
      }
    }

    if (hash === '#/profile') {
      doValidations()
    }
  }

  function renderErrorMessage(newDocument: Element | null, textDescription: string | null) {
    const element = document.querySelector("span.help2.error2")
    if(!element){
      const divEditButton = document.createElement('span')

      divEditButton.className = 'help2 error2'
      divEditButton.textContent = textDescription

      divEditButton.style.fontSize= "11px"
      divEditButton.style.color= "#dd4b39"
      divEditButton.style.display= "block"
      divEditButton.style.lineHeight= "1.2em"
      divEditButton.style.marginTop= "5px"
      divEditButton.style.padding= "0"

      newDocument?.appendChild(divEditButton)
    }
  }

  function removeErrorMessage() {
    const element = document.querySelector("span.help2.error2")
    element?.remove()
  }

  function doValidations() {
    const inputDocument = document.querySelector<HTMLButtonElement>('input#client-new-document')
    const buttonGoShipping = document.querySelector<HTMLButtonElement>('button#go-to-shipping')

    setTimeout(async () => {

      if (inputDocument && buttonGoShipping) {
        buttonGoShipping.disabled = inputDocument.value === '' ? true : false

        if (inputDocument.value === '') {
          const newDocument = document.querySelector("p.client-new-document")
          renderErrorMessage(newDocument, 'Este campo es obligatorio')
        }

        const documentSelected = document.querySelector('#client-document-type') as HTMLInputElement | null

        inputDocument.addEventListener('input', (e: any) => {
          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')

          if(documentSelected?.value === 'DNI') {
            e.currentTarget.value.length == 8
            ? ((buttonGoShipping.disabled = false), removeErrorMessage())
            : (buttonGoShipping.disabled = true)

            if(e.currentTarget.value.length > 8) {
              const errorDni = document.querySelector("p.client-new-document")
              renderErrorMessage(errorDni, 'Campo DNI incorrecto')
            }
          }

          if(documentSelected?.value === 'Carnet de extranjería') {
            e.currentTarget.value.length == 12
            ? ((buttonGoShipping.disabled = false), removeErrorMessage())
            : (buttonGoShipping.disabled = true)

            if(e.currentTarget.value.length > 12)  {
              const errorCarnetExtranjeria = document.querySelector("p.client-new-document")
              renderErrorMessage(errorCarnetExtranjeria, 'Campo Carnet de extranjería incorrecto')
            }
          }
        })
      }
    }, 1000)
  }

  window.addEventListener('hashchange', handleHashChange)
}

export default checkValidateEmptyDocument
