function TextAboveMail(): void {
  const { hash } = window.location
  const divElements = document.querySelector('.client-email') as HTMLAnchorElement | null;
  const spanEmailAlreadyExist = document.querySelector('.client-email .email') as HTMLAnchorElement | null;

  if (spanEmailAlreadyExist !== null) {
    if (hash !== '#/email') {
      spanEmailAlreadyExist.style.display = "none";
    } else {
      spanEmailAlreadyExist.style.display = "unset";
    }
  }

  if (divElements!== null && hash === '#/email') {
    const texto = 'Ingresa tu correo electrónico';

    const newSpan = document.createElement('span')
    newSpan.className = 'email'
    newSpan.textContent = texto
    divElements.appendChild(newSpan)
  }
}

export default TextAboveMail
