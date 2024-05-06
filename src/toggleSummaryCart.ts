const $ = window.$

const toggleSummaryCart = () => {
  const urlActiveToggle = '#/cart'
  if (window.location.hash !== urlActiveToggle) {
    $('.coupon-label').css('diplay', 'none')
    console.info(window.location.hash)
  }
}

export default toggleSummaryCart
