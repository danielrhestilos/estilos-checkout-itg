// get order form id to share the cart
async function renderSocialSellingAll() {
  await fetch('/api/checkout/pub/orderForm')
    .then((respose) => respose.json())
    .then((result) => {
      socialSellingContentAll(result.orderFormId)
    })
}

function socialSellingContentAll(sendId: string){
  // Verificar si ya se pintó el contenedor
  const existingContainer = document.querySelector('.containerShareCartAll');
  if (existingContainer) {
      return; // Si ya existe, no pintar de nuevo
  }

  // Crear el div contenedor
  const container = document.createElement('div');
  container.className = 'containerShareCartAll';

  // Crear el título
  const title = document.createElement('h2');
  title.className = 'titleShareCart';
  title.textContent = 'Comparte tu carrito';

  // Crear el div de iconos
  const iconContainer = document.createElement('div');
  iconContainer.className = 'containerShareIcons';

  // Crear los tres spans con enlaces
  const shareIcon1 = document.createElement('span');
  shareIcon1.className = 'shareIcon';
  const link1 = document.createElement('a');
  link1.href = `https://wa.me/?text=Este%20es%20el%20link%20de%20mi%20carrito:%20https://www.estilos.com.pe/checkout/?orderFormId=${sendId}%23/cart`;
  link1.textContent = '';
  link1.id = 'iconWhatsapp'
  shareIcon1.appendChild(link1);

  const shareIcon2 = document.createElement('span');
  shareIcon2.className = 'shareIcon';
  const link2 = document.createElement('a');
  link2.href = `https://www.facebook.com/dialog/send?&amp;link=https://www.estilos.com.pe/checkout/?orderFormId=${sendId}%23/cart`;
  link2.textContent = '';
  link2.id = 'iconMessenger'
  shareIcon2.appendChild(link2);

  const shareIcon3 = document.createElement('span');
  shareIcon3.className = 'shareIcon';
  const link3 = document.createElement('a');
  link3.href = `mailto:escribeuncorreo@correo.com?subject=Mi%20Carrito&body=Este%20es%20el%20link%20de%20mi%20carrito:%20https://www.estilos.com.pe/checkout/?orderFormId=${sendId}%23/cart`;
  link3.textContent = '';
  link3.id = 'iconMail'
  shareIcon3.appendChild(link3);

  // Agregar los spans al contenedor de iconos
  iconContainer.appendChild(shareIcon1);
  iconContainer.appendChild(shareIcon2);
  iconContainer.appendChild(shareIcon3);

  // Agregar elementos al contenedor principal
  container.appendChild(title);
  container.appendChild(iconContainer);

  // Agregar el contenedor al DOM
  const customWrap = document.querySelector('.custom-cart-template-wrap');

  if (customWrap) {
    customWrap?.appendChild(container);
  }
}

$(window).on('componentValidated.vtex', () => {
  renderSocialSellingAll()
})

export default renderSocialSellingAll
