const setCustomData = (orderFormId: any, appId: string, data: { "terms-and-conditions"?: string; "other-person-receive-order"?: string; }) => {
  try {
      if(!orderFormId && !appId && !data)
          throw new Error('fail validation for request');
      const url = `/api/checkout/pub/orderForm/${orderFormId}/customData/${appId}`;
      fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify(data)
      });
  } catch(error) {
      console.error('setCustomData message: ', error);
  }
}

export default setCustomData
