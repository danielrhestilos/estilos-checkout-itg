
async function renderBackground() {
  const { hash } = window.location

  var emailContainer = document.querySelector(".form-page.client-pre-email.anim-death.anim-current") as HTMLAnchorElement | null
  var profileContainer = document.querySelector("div#client-profile-data .step.accordion-group.client-profile-data") as HTMLAnchorElement | null
  var shippingContainer = document.querySelector("div#shipping-data") as HTMLAnchorElement | null

  const actionsMap: any = {
      '#/email': {
          emailContainer: 'unset',
          profileContainer: 'unset',
          shippingContainer: 'unset',
      },
      '#/profile': {
          emailContainer: '#F5F5F5',
          profileContainer: 'unset',
          shippingContainer: 'unset',
      },
      '#/shipping': {
          emailContainer: '#F5F5F5',
          profileContainer: '#F5F5F5',
          shippingContainer: 'unset',
      },
      '#/payment': {
          emailContainer: '#F5F5F5',
          profileContainer: '#F5F5F5',
          shippingContainer: '#F5F5F5',
      },
  }


  const handleBackground = (div: HTMLAnchorElement | null, background: string) => {
      if (div) {
          div.style.background = background;
          div.style.boxShadow =  background !== "unset" ? "0px 1px 3px 1px rgba(0, 0, 0, 0.10)": "unset"
      }
  }

  if (Object.keys(actionsMap).includes(hash)) {
      const actions = actionsMap[hash]

      handleBackground(emailContainer, actions.emailContainer)
      handleBackground(profileContainer, actions.profileContainer)
      handleBackground(shippingContainer, actions.shippingContainer)
  } else {
      ; ('')
  }
}

export default renderBackground
