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
  const { hash } = window.location

  if(hash == '#/cart'){
    // setTimeout(() => {
    //   let inputAddressQuery = document.querySelector("#ship-addressQuery")
    
    //   var input = document.getElementById('ship-addressQuery');
    //   var options = {
    //     bounds: new google.maps.LatLngBounds(
    //       new google.maps.LatLng(-18.347975, -81.369904), // Coordenadas aproximadas del extremo suroeste de Perú
    //       new google.maps.LatLng(-0.039281, -68.651978) // Coordenadas aproximadas del extremo noreste de Perú
    //     ),
    //     strictBounds: false,
    //     componentRestrictions: { country: 'PE' } // Restringe los resultados a Perú
    //   };
      
    //   var autocomplete = new google.maps.places.Autocomplete(input, options);
    //   console.log("autocomplete ->",autocomplete);
      
    //   let paragraphAddressQuery= document.querySelector(".ship-addressQuery");
    //   console.log("paragraphAddressQuery :",paragraphAddressQuery);
      
    // }, 3000);
  }
  if (hash === '#/shipping') {
  
    const availableAddressList = document.querySelectorAll('.vtex-omnishipping-1-x-addressItemOption')
    availableAddressList.forEach((addressElement) => {
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

$(window).on('addressSearchStart.vtex', (event:any, orderForm:any) => console.log("addressSearchStart.vtex "));	

$(window).on('componentValidated.vtex', () => {
  console.log("componentvalidated");
  editAddressData()
})
