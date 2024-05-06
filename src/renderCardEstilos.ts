async function renderCardEstilos() {
  const { hash } = window.location

  const rootNode = document.querySelector('#checkoutMainContainer')

  if (!rootNode) return

  const observer = new MutationObserver(() => {
    const paymentEstilos = document.querySelector(
      '#payment-group-TarjetaEstilosPaymentGroup'
    ) as HTMLAnchorElement | null

    const flagAlreadyExist = document.querySelector('.payment-group-item-cards-estilos') as HTMLAnchorElement | null

    if (paymentEstilos !== null && hash === '#/payment' && flagAlreadyExist === null) {
      const newSpan = document.createElement('span')
      newSpan.className = 'payment-group-item-cards-estilos'
      const spanEstilos = document.createElement('span')
      spanEstilos.className = 'card-flag Estilos'
      newSpan.appendChild(spanEstilos)
      paymentEstilos.appendChild(newSpan)
    }

    if (paymentEstilos) {
      observer.disconnect()
    }
  })

  observer.observe(rootNode, { childList: true, subtree: true })
}

export default renderCardEstilos
