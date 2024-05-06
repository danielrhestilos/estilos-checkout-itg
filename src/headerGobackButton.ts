/**
 * The function `chageAnonimousUser` changes the current user to an anonymous user and reloads the
 * page.
 */
function chageAnonimousUser() {
  const { orderFormId } = window.vtexjs.checkout

  const request = new XMLHttpRequest()

  request.open('GET', `/checkout/changeToAnonymousUser/${orderFormId}`)
  request.setRequestHeader('content-type', 'application/json')
  request.setRequestHeader('accept', 'application/json')
  request.send(null)

  window.location.reload()
}

const centerLogo = () => {
  const customMargin = document.querySelector(".go-back-container")?.clientWidth
  const logoPosition = document.querySelector(".goback-and-logo-container .logoHeader") as HTMLAnchorElement | null

  logoPosition !== null ? logoPosition.style.marginRight  = `${customMargin}px` : ''
}

async function renderHeaderGoBackButton() {
  centerLogo()

  const { hash } = window.location

  const goHomeDiv = document.querySelector('a.goHome') as HTMLAnchorElement | null
  const goCartDiv = document.querySelector('a.goCart') as HTMLAnchorElement | null
  const goEmailDiv = document.querySelector('a.goEmail') as HTMLAnchorElement | null
  const goProfileDiv = document.querySelector('a.goProfile') as HTMLAnchorElement | null
  const goShippingDiv = document.querySelector('a.goShipping') as HTMLAnchorElement | null

  // Asign onClick event
  if (goEmailDiv) {
    goEmailDiv.addEventListener('click', chageAnonimousUser)
  }

  const actionsMap: any = {
    '#/cart': {
      goHomeDiv: 'block',
      goCartDiv: 'none',
      goEmailDiv: 'none',
      goProfileDiv: 'none',
      goShippingDiv: 'none',
    },
    '#/email': {
      goHomeDiv: 'none',
      goCartDiv: 'block',
      goEmailDiv: 'none',
      goProfileDiv: 'none',
      goShippingDiv: 'none',
    },
    '#/profile': {
      goHomeDiv: 'none',
      goCartDiv: 'none',
      goEmailDiv: 'block',
      goProfileDiv: 'none',
      goShippingDiv: 'none',
    },
    '#/shipping': {
      goHomeDiv: 'none',
      goCartDiv: 'none',
      goEmailDiv: 'none',
      goProfileDiv: 'block',
      goShippingDiv: 'none',
    },
    '#/payment': {
      goHomeDiv: 'none',
      goCartDiv: 'none',
      goEmailDiv: 'none',
      goProfileDiv: 'none',
      goShippingDiv: 'block',
    },
  }

  const handleDisplay = (div: HTMLAnchorElement | null, display: string) => {
    if (div) {
      div.style.display = display
    }
  }

  if (Object.keys(actionsMap).includes(hash)) {
    const actions = actionsMap[hash]

    handleDisplay(goHomeDiv, actions.goHomeDiv)
    handleDisplay(goCartDiv, actions.goCartDiv)
    handleDisplay(goEmailDiv, actions.goEmailDiv)
    handleDisplay(goProfileDiv, actions.goProfileDiv)
    handleDisplay(goShippingDiv, actions.goShippingDiv)
  } else {
    ;('')
  }
}

export default renderHeaderGoBackButton
