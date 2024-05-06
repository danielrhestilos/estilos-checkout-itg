import { Children } from 'react'

function addClassToFirstChild(): void {
  const divPadre = document.querySelector('.vtex-omnishipping-1-x-address')
  if (divPadre?.children?.length) {
    const newParentDiv = divPadre.querySelector('div')
    if (!newParentDiv.className.includes('client-data-new')) {
      newParentDiv.classList.add('client-data-new')
    }
  }
}

$(window).on('componentValidated.vtex', () => {
  addClassToFirstChild()
})

export default addClassToFirstChild
