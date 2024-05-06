import type { ChangeEvent, FC, MouseEvent } from 'react'
import React, { useCallback, useEffect, useState, useRef } from 'react'

import './styles/common/colors.css'
import useOrderForm from './hooks/useOrderForm'
import NumericKeypad from './components/keypad'
import Select from './components/select/select'
import Step from './components/step'
import useRp3 from './hooks/useRp3'
import RadioGroup from './components/radio/radio'
import { verifyCardNumber } from './helper/creditCard'
import SpinnerLoader from './components/loader'
import type { Payload } from './typings/payload'
import styles from './index.module.css'
import useApiRequest, { request } from './hooks/useApiRequest'
import SimulationTable from './components/simulation/simulation-table'
import { currencyFormatter, isTarjetaEstilosPayment, scrollToTarget } from './utils'
import { OrderForm } from './typings/orderForm'
import { LoaderContext } from './context/loader.context'
import { useFullScreenLoader } from './hooks/fullScreenLoader'
import FullScreenLoader from './components/screen-loader'
import CardInput from './components/card-input'
import "./discounts/discounts"
import AlertModal from './components/alert'
import { useModal } from './context/modal.context'
import { loadingDiscounts, discountsLoaded } from '../custom-events'
import { disableLoadDiscounts } from './discounts/discounts'

interface Props {
  payload?: Payload
}

const PaymentForm: FC<Props> = () => {
  const { orderForm, getOrderForm, loading: loadingOrderForm, updatePaymentOrderForm } = useOrderForm()

  const {
    getCardInfo,
    getPaymentMethods,
    paymentMethods,
    getSimulation,
    simulation,
    cardInfo,
  } = useRp3()

  const { showLoader, toggleLoader, showScreenLoader, hideScreenLoader } = useFullScreenLoader()
  const { showAlertModal, hideModal: hideAlertModal } = useModal();

  const [cardNumber, setCardNumber] = useState<string>('')
  const [paymentType, setPaymentType] = useState<string>('')
  const [selectedTerm, setSelectedTerm] = useState<string>('')

  const [headerImage, setHeaderImage] = useState('')
  const [simulationFullscreen, setSimulationFullscreen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const checkoutButtonRef = useRef<HTMLButtonElement | null>(null)
  const customCheckoutPaymentButton = useRef<HTMLButtonElement | null>(null)

  const [validPromotion, setValidPromotion] = useState(false)
  const [loadingPromotions, setLoadingPromotions] = useState(false)

  const { data, isLoading, error: configError } = useApiRequest<any>('/_v/api/tarjeta-estilos/getconfig', 'GET')

  const [mainTotal,setMainTotal] = useState<number>(0);

  const cancelPayment = async () => {
    setShowModal(false)
    await updatePaymentOrderForm({
      paymentType: '',
      installments: '',
    })
    setCardNumber('')
    setSelectedTerm('')
    setPaymentType('')
    hideAlertModal()
  }

  const loadOrderForm = async () => {
    await getOrderForm()
  }

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
    canEnablePayment()
  }

  const handlePaymentTypeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentType(e.target.value)
    scrollToTarget('#step-3')
    setSelectedTerm('')
    await updatePaymentOrderForm({
      paymentType: e.target.value,
      installments: selectedTerm,
    })
    canEnablePayment()
  }

  const handleTermChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    toggleLoader()
    setMainTotal(0)
    setSelectedTerm(event.target.value)
    canEnablePayment()
    await updatePaymentOrderForm({
      paymentType,
      installments: event.target.value,
    })

    try {
      document.dispatchEvent(loadingDiscounts)
      const response = await request<any>({
        url: `/_v/promotion-provider/notification/${orderForm?.orderFormId}`,
        headers: {
          'checkout.vtex.com': `__ofid=${orderForm?.orderFormId}`,
        },
        method: 'POST',
        body: {},
      })
      if (response.status === 'error') {
        showAlertModal({
          title: 'Espera un momento',
          message: response.message,
          onRetry: () => {
            hideAlertModal()
          },
          onCancel: () => {
            hideAlertModal()
          },
          show: true,
          image: headerImage
        })
        setValidPromotion(false)
        document.dispatchEvent(discountsLoaded)
        canEnablePayment()
        return;
      }
      setValidPromotion(true)
      document.dispatchEvent(discountsLoaded)
      canEnablePayment()
    } catch (error) {
      console.error(error)
      setValidPromotion(true)
      document.dispatchEvent(discountsLoaded)
      toggleLoader()
      canEnablePayment()
    } finally {
      setTimeout(() => {
        loadOrderForm()
        toggleLoader()
        document.dispatchEvent(discountsLoaded)
        canEnablePayment()
      }, 500)
    }
  }

  const loadCardInfo = async () => {
    if (!orderForm) return
    const {
      clientProfileData: { document },
    } = orderForm

    const result = await getCardInfo(cardNumber, document, '')
    if (!result) {
      showAlertModal({
        title: 'Espera un momento',
        message: 'No se pudo obtener la información de la tarjeta, por favor verifica tu información',
        onRetry: () => {
          cancelPayment()
        },
        onCancel: () => {
          cancelPayment()
        },
        show: true,
        image: headerImage
      })
    }
  }

  const loadPaymentTypes = async () => {
    await getPaymentMethods(cardNumber)
  }

  const loadSimulation = async () => {
    if (!cardInfo || !cardInfo.CardAccount) return
    toggleLoader()
    const simulationData = {
      accountNumber: cardInfo.CardAccount.toString(),
      paymentType: parseInt(paymentType, 10),
      installments: selectedTerm,
      term: parseInt(selectedTerm, 10),
      capital: orderForm?.value,
    }

    await getSimulation(simulationData)
    toggleLoader()
  }

  useEffect(() => {
    loadOrderForm()
  }, [])

  useEffect(() => {
    if (!orderForm) return
    const valid = verifyCardNumber(cardNumber)
    console.log('valid daniel ',valid)
    if (valid) {
      loadCardInfo()
      loadPaymentTypes()
      scrollToTarget('#step-2')
    }
  }, [cardNumber, orderForm])

  const changeSimulationFullscreen = (fullscreen: boolean) => {
    setSimulationFullscreen(fullscreen)
    if (!fullscreen) scrollToTarget('#simulation')
  }

  const confirmPayment = () => {

    if (!orderForm?.paymentData.payments) return

    const checkoutPaymentButton = getCheckoutPaymentButton()
    const customCheckoutPaymentButton = getCustomCheckoutPaymentButton()

    if (!checkoutPaymentButton || !customCheckoutPaymentButton) return

    checkoutPaymentButton.style.display = 'block'
    customCheckoutPaymentButton.style.display = 'none'

    setTimeout(() => {
      disableLoadDiscounts()
      checkoutPaymentButton.click()
      setShowModal(false)
    }, 1000);
  }

  const getCheckoutPaymentButton = () => {
    if (!!checkoutButtonRef.current) return checkoutButtonRef.current;

    const paymentButtons = document.querySelectorAll('#payment-data-submit')

    const visiblePaymentButton = Array.from(paymentButtons).find((paymentButton) => {
      return paymentButton.checkVisibility()
    }) as HTMLButtonElement
    checkoutButtonRef.current = visiblePaymentButton;
    return visiblePaymentButton
  }

  const getCustomCheckoutPaymentButton = () => {
    if (!!customCheckoutPaymentButton.current) return customCheckoutPaymentButton.current;

    const visiblePaymentButton = getCheckoutPaymentButton()

    if (!visiblePaymentButton) return null

    const buttonPaymentParent = visiblePaymentButton.parentNode

    if (!buttonPaymentParent) return null

    const paymentButton = document.createElement('button')

    paymentButton.id = 'payment-data-submit-custom'
    paymentButton.className = 'submit btn btn-success btn-large btn-block'
    const visibleButtonText = visiblePaymentButton.querySelector('span')
    const newButtonText = document.createElement('span')
    newButtonText.innerText = visibleButtonText?.innerText || ''
    paymentButton.appendChild(newButtonText)
    paymentButton.addEventListener('click', async () => {
      setShowModal(true)
      await loadOrderForm()
    })

    buttonPaymentParent.appendChild(paymentButton)

    customCheckoutPaymentButton.current = paymentButton

    return paymentButton
  }

  const canEnablePayment = () => {
    if (!orderForm) return false
    if (!cardNumber || cardNumber === '') return false
    if (!paymentType || paymentType === '') return false
    if (!selectedTerm || selectedTerm === '') return false
    if (!validPromotion) return false
    if (showLoader) return false

    return true
  }

  useEffect(() => {
    if (!data) return
    const imageConfig = data.find((config: any) => config.Name === 'HEADER_IMAGE')

    if (imageConfig) {
      setHeaderImage(imageConfig.Value)
    }
  }, [data, isLoading, configError])

  useEffect(() => {
    window.$(window).on('orderFormUpdated.vtex', function (evt: any, changedOrderForm: OrderForm) {
      /* get all payment buttons and detect what is visible */
      const visiblePaymentButton = getCheckoutPaymentButton()

      if (!visiblePaymentButton) return
      if (!changedOrderForm) return

      const isTarjetaEstilos = isTarjetaEstilosPayment(changedOrderForm)

      const customCheckoutPaymentButton = getCustomCheckoutPaymentButton()
      if (!customCheckoutPaymentButton) return
      if (isTarjetaEstilos) {
        customCheckoutPaymentButton.style.display = 'block'
      } else {
        customCheckoutPaymentButton.style.display = 'none'
      }
    })
  }, [])

  useEffect(()=>{
    loadSimulation()
  },[selectedTerm])

  useEffect(() => {
    document.addEventListener("loadingDiscounts", () => {
      console.log("loadingDiscounts")
      setLoadingPromotions(true)
      showScreenLoader()
    })

    document.addEventListener("discountsLoaded", () => {
      console.log("discountsLoaded")
      setLoadingPromotions(false)
      hideScreenLoader()
    })

    return () => {
      document.removeEventListener("loadingDiscounts", () => {
        console.log("loadingDiscounts")
        setLoadingPromotions(true)
        showScreenLoader()
      })

      document.removeEventListener("discountsLoaded", () => {
        console.log("discountsLoaded")
        setLoadingPromotions(false)
        hideScreenLoader()
      })
    }
  }, [])

  return showModal ? (
    <LoaderContext.Provider value={{ showLoader, toggleLoader }}>
      <div className={styles['modal-background']}>
        <>{console.log("paymentType ",paymentType)}</>
        <section className={styles.wrapper}>
          <FullScreenLoader />
          <header className={styles['header-paymentapp']}>
            <img src={headerImage} alt="header" />
          </header>
          <main id={'paymentapp-container'} className={`${styles.body} ${simulationFullscreen ? styles['simulation-fullscreen'] : ''}`}>
            <form>
              <Step title="Paso 1" subtitle="Ingresa el número de tu Tarjeta Estilos" id={'step-1'}>
                <CardInput value={cardNumber} onChange={handleCardNumberChange} />
              </Step>

              <Step title="Paso 2" subtitle="Selecciona la forma de pago" id={'step-2'}>
                {cardNumber ? (
                  paymentMethods?.types ? (
                    <RadioGroup options={paymentMethods?.types || []} onChange={handlePaymentTypeChange} />
                  ) : (
                    <SpinnerLoader />
                  )
                ) : (
                  <></>
                )}
              </Step>
              <Step title="Paso 3" subtitle="Seleccione el número de cuotas" id={'step-3'}>
                <Select
                  options={paymentType && paymentMethods ? paymentMethods?.terms[parseInt(paymentType, 10) - 1] : []}
                  value={selectedTerm}
                  onChange={handleTermChange}
                  placeholder="Número de cuotas"
                />
                {/* <button type="button" data-style="primary" disabled={!paymentType || !selectedTerm} onClick={loadSimulation}>
                  Calcular cuotas
                </button> */}
              </Step>
            </form>


            <SimulationTable id='simulation' simulation={simulation} onChangeFullscreen={changeSimulationFullscreen}  setMainTotal={setMainTotal} />

            {showPasswordModal && (
              <NumericKeypad
                show={showPasswordModal}
                onClick={() => null}
                onClose={() => {
                  setShowPasswordModal(false)
                }}
              />
            )}
          </main>
          <footer className={styles['footer-paymentapp']}>
            {orderForm ? <p className={styles['checkout-total-installments']} >Total al contado: {currencyFormatter.format(orderForm?.value / 100)}</p> : <></>}
            {( mainTotal != 0 && simulation && paymentType!='' && paymentType!='1') ? <p className={styles['checkout-total-installments']} >Total en cuotas: {currencyFormatter.format(mainTotal)}</p> : <></>}
            <button disabled={!canEnablePayment() || loadingPromotions} data-style="primary" onClick={confirmPayment}>
              Confirmar
            </button>
            <button data-style="simple" onClick={cancelPayment}>
              Cancelar
            </button>
          </footer>
          <AlertModal />
        </section>
      </div>
    </LoaderContext.Provider >
  ) : <></>
}

export default PaymentForm
