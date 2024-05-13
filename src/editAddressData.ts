const { $ } = window

function handleClick() {
  $('button#edit-address-button').trigger('click')
}

/**
 * The `editAddressData` function adds an edit button to each available address element on a shipping
 * page.
 * @returns null if the hash in the window location is not '#/shipping' or if there are no available
 * address elements with a class name of 'vtex-omnishipping-1-x-addressItemOption' that do not already
 * have a child element with a class name of 'icon-edit'.
 */
export function editAddressData() {
  console.log("edit address data");
  
  const { hash } = window.location

  if (hash === '#/shipping') {
    const availableAddressList = document.querySelectorAll('.vtex-omnishipping-1-x-addressItemOption')

    availableAddressList.forEach((addressElement) => {
      console.log("addressElement :",addressElement)
      const dato = Object.entries(addressElement.children).filter(([, block]) => {
        if (block.className === 'icon-edit') {
          return true
        }

        return false
      })

      if (!dato.length) {
        const divEditButton = document.createElement('i')

        divEditButton.className = 'icon-edit'

        divEditButton.addEventListener('click', () => {
          handleClick()
        })
        addressElement.appendChild(divEditButton)
      } else {
        return null
      }
    })
  } else {
    return null
  }
}

$(window).on('componentValidated.vtex', () => {
  console.log("componentvalidated");
  
  editAddressData()
})
