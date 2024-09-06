function moveElementsToNewParent() {
  
  // Buscar el contenedor que tiene la clase
  const containerDiv = document.querySelector('.vtex-omnishipping-1-x-address');
  const newParentDiv = containerDiv?.querySelector('div');
  // Verificar que el contenedor exista
  if (containerDiv && !newParentDiv?.classList.contains("client-data-new")) {
    // Verificar que el nuevo div padre exista
    if (newParentDiv) {
      // Obtener los elementos <p> por sus clases

      const editar = document.createElement("p")

      editar.innerHTML= `<a id="orderform-minicart-to-cart-new" target="_self"   href="#/cart" style="margin-top:10px;display:block;"><strong style="color:#E91111;text-decoration:underline;">Cambiar datos de envío   <i class="icon-edit"></i></strong></a>`

      const element1 = document.querySelector('.ship-number');
      const element2 = document.querySelector('.ship-complement');
      const element3 = document.querySelector('.ship-reference');
      const element4 = document.querySelector('.ship-receiverName');
      const element5 = document.querySelector('.ship-street')





      newParentDiv.appendChild(editar);
      // Verificar si todos los elementos <p> existen
      if (element1 && element2 && element4) {
        // Mover los elementos <p> al nuevo div padre
    
        newParentDiv.appendChild(element1);
        newParentDiv.appendChild(element2);
        newParentDiv.appendChild(element4);
        // se hace la validacion ya que no siempre aparecen los elementos 3 y 5
        if(element3 && element5){
          newParentDiv.appendChild(element3);
          newParentDiv.appendChild(element5);

        }

      }
    }
  }
}

$(window).on('componentValidated.vtex', () => {
  moveElementsToNewParent()
})

export default moveElementsToNewParent;
