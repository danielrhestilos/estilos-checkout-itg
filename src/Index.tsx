import React from 'react'
import { createRoot } from 'react-dom/client'
import renderSocialSelling from './social-selling'
import { renderCheckTermPolicies } from './payment'
import renderSocialSellingAll from './social-selling/social-selling-all'
import TextAboveMail from './personalData/personal-data'
import toggleDivVisibility from './personalData/hidde-section'
import renderHeaderStepper from './headerStepper'
import otherDocument from './personalData/document-personal-data'
import checkValidateEmptyDocument from './personalData/validate-document-profile'
import renderHeaderGoBackButton from './headerGobackButton'
import renderBackground from './renderBackground'
import renderCardEstilos from './renderCardEstilos'
import { editAddressData } from './editAddressData'
import moveElementsToNewParent from './shipping/changeElementsParent'
import createDivAndElements from './shipping/otherClient'
import addClassToFirstChild from './shipping/changeClassName'
import toggleSummaryCart from './toggleSummaryCart'
import handleClientPreEmail from './shipping/handleClientPreEmail'
import hiddeOtherClient from './shipping/hiddeOtherClient'
import finishPayment from './paymentSections/paymentSection'
import addTitleSummary from './checkout-summary/checkout-summary-title'
import PaymentApp from './payment-app/app'
import './custom-events'
import { initWhoReceives } from './shipping/whoReceives'

const $ = window.$

const buildComponent = (id: string, component: React.ReactNode) => {
  const container = document.querySelector('#checkoutMainContainer')

  if (!container) return
  const div = document.createElement('div')

  div.setAttribute('id', id)
  container.append(div)
  createRoot(div).render(component)
}

const handleBuilderTarjetaEstilos = () => {
  const rootNode = document.querySelector('#checkoutMainContainer')

  if (!rootNode) return

  const paymentObserver = new MutationObserver(() => {
    const paymentAppContainer = document.getElementById('paymentApp')
    const botonTarjetaEstilos = document.querySelector('#payment-group-TarjetaEstilosPaymentGroup')

    // eslint-disable-next-line no-restricted-globals
    if (
      window.location.hash === '#/payment' &&
      rootNode &&
      !paymentAppContainer &&
      botonTarjetaEstilos &&
      botonTarjetaEstilos.classList.contains('active')
    ) {
      // Shipping
      buildComponent('paymentApp', <PaymentApp />)
    }

    if (paymentAppContainer) {
      paymentObserver.disconnect()
    }
  })

  paymentObserver.observe(rootNode, { childList: true, subtree: true })
}

window.addEventListener('DOMContentLoaded', () => {
  handleBuilderTarjetaEstilos()
  window.addEventListener('hashchange', handleBuilderTarjetaEstilos)

  renderHeaderStepper()
  window.addEventListener('hashchange', renderHeaderStepper)

  window.addEventListener('hashchange', renderHeaderGoBackButton)

  renderBackground()
  window.addEventListener('hashchange', renderBackground)

  renderCardEstilos()
  window.addEventListener('hashchange', renderCardEstilos)

  renderSocialSelling()
  renderSocialSellingAll()

  TextAboveMail()
  window.addEventListener('hashchange', TextAboveMail)

  toggleDivVisibility()

  otherDocument()
  window.addEventListener('hashchange', otherDocument)

  checkValidateEmptyDocument()
  window.addEventListener('hashchange', checkValidateEmptyDocument)

  editAddressData()


  moveElementsToNewParent()
  createDivAndElements()
  addClassToFirstChild()
  window.addEventListener('hashchange', toggleSummaryCart)
  handleClientPreEmail()
  hiddeOtherClient()
  finishPayment()
  addTitleSummary()
  initWhoReceives()
})

$(document).ajaxComplete(() => {
  //paymentTest()
})

$(document).ajaxStop(() => {
  setTimeout(() => {
    renderCheckTermPolicies()
    renderHeaderGoBackButton()
  }, 1500);
})
