// 1. Creamos la función sin parámetros
function handleClientPreEmail() {
  var { hash } = window.location
  // 2. Obtenemos el email del input con id "client-pre-email"
  var emailInput = document.getElementById("client-pre-email") as HTMLInputElement
  const email = emailInput.value; // Obtenemos el valor del input

  // 3. Verificamos si hay un email almacenado en sessionStorage
  const storedEmail = sessionStorage.getItem('clientEmail')

  // 4. Si el email almacenado no es el mismo que el nuevo email, borramos todos los datos de sessionStorage
  if (storedEmail && storedEmail !== email && hash === '#/email') {
    sessionStorage.removeItem('clientEmail')
  }

  // Asociamos la función al botón con id "btn-client-pre-email"
  const btnGuardarEmail = document.getElementById("btn-client-pre-email");
  btnGuardarEmail?.addEventListener('click', function () {
    // 5. Guardamos el nuevo email en sessionStorage
    sessionStorage.setItem('clientEmail', email)
  })
}

$(window).on('componentValidated.vtex', () => {
  handleClientPreEmail()
})

export default handleClientPreEmail
