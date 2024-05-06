import { request } from "../hooks/useApiRequest"
import { OrderForm } from "../typings/orderForm"
import { loadingDiscounts, discountsLoaded } from "../../custom-events";

/**
 * The `EventQueue` class is designed to manage and process a queue of events in a sequential manner.
 * When events are added to the queue, they are processed one at a time, and each event triggers
 * an asynchronous request and handling logic.
 */
class EventQueue {

  queue: any[];
  running: boolean;

   /**
   * Initializes a new instance of the `EventQueue` class with an empty queue and sets the initial state
   * of the queue as not running.
   */
  constructor() {
    this.queue = [];
    this.running = false;
  }

  /**
   * Adds an event to the queue. If the queue length exceeds 2, it discards the oldest event.
   *
   * @param {any} eventData - The event data to be added to the queue.
   */
  addEvent(eventData: any) {
    if (this.queue.length > 2) {
      const lastEvent = this.queue.pop()
      this.queue = [lastEvent]
    }
    this.queue.push(eventData);

    if (!this.running) {
      this.processQueue();
    }
  }

  /**
   * Processes the events in the queue sequentially.
   */
  async processQueue() {

    if (this.queue.length === 0) {
      this.running = false;
      return;
    }

    this.running = true;
    const eventData = this.queue.shift();

    try {
      document.dispatchEvent(loadingDiscounts)
      await new Promise(resolve => setTimeout(async () => {
        try {
          await request({
            url: `/_v/promotion-provider/notification/${eventData}`,
            headers: {
              'checkout.vtex.com': `__ofid=${eventData}`,
            },
            method: 'POST',
          })
          await window.vtexjs.checkout.getOrderForm();
          document.dispatchEvent(discountsLoaded)
          resolve(null)
        } catch (error: any) {
          document.dispatchEvent(discountsLoaded)
          console.error(`Error al cargar los descuentos ${error.message}`);
          eventQueue.addEvent(eventData);
          resolve(null)
        }
      }, 1000))
    } catch (error) {
      document.dispatchEvent(discountsLoaded)
      console.error(`Error al procesar evento: ${eventData}`);
      eventQueue.addEvent(eventData);
    }

    this.processQueue();
  }
}


const eventQueue = new EventQueue();

let enable = true;

export const disableLoadDiscounts = () => {
  enable = false;
}

/**
 * Listens for the 'orderFormUpdated.vtex' event and adds an event to the `EventQueue` when
 * certain conditions are met.
 *
 * @param {any} evt - The event object.
 * @param {OrderForm} changedOrderForm - The updated order form data.
 */
window.$(window).on('orderFormUpdated.vtex', async function (evt: any, changedOrderForm: OrderForm) {
  try {
    if (!enable) return
    if (eventQueue.running) return
    eventQueue.addEvent(changedOrderForm?.orderFormId);
    evt.preventDefault()
  } catch (error) {
    console.info('No se obtuvieron descuentos')
    console.error(error)
  }
})
