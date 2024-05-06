function toggleDivVisibility(): void {
  function handleHashChange() {

    const { hash } = window.location
    var profileContainer = document.querySelector("div#client-profile-data .step.accordion-group.client-profile-data") as HTMLAnchorElement | null
    var shippingContainer = document.querySelector("div#shipping-data") as HTMLAnchorElement | null
    var paymentContainer = document.querySelector("div#payment-data") as HTMLAnchorElement | null


    const actionsMap: any = {
      '#/email': {
          profileContainer: 'none',
          shippingContainer: 'none',
          paymentContainer: 'none',
      },
      '#/profile': {
          profileContainer: 'block',
          shippingContainer: 'none',
          paymentContainer: 'none',
      },
      '#/shipping': {
          profileContainer: 'block',
          shippingContainer: 'block',
          paymentContainer: 'none',
      },
      '#/payment': {
          profileContainer: 'block',
          shippingContainer: 'block',
          paymentContainer: 'block',
      },
    }

    const handleDisplay = (div: HTMLAnchorElement | null, display: string) => {
      if (div) {
        div.style.display = display
      }
    }

    if (Object.keys(actionsMap).includes(hash)) {
      const actions = actionsMap[hash]

      handleDisplay(profileContainer, actions.profileContainer)
      handleDisplay(shippingContainer, actions.shippingContainer)
      handleDisplay(paymentContainer, actions.paymentContainer)
    } else {
      ;('')
    }
  }

  window.addEventListener('hashchange', handleHashChange)
}

export default toggleDivVisibility
