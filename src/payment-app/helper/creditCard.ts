export const verifyCardNumber = (cardNumber: string) => {
  cardNumber = cardNumber.replace(/\s/g, '');
  if (cardNumber.length !== 16) {
      return false;
  }
  if (!/^\d+$/.test(cardNumber)) {
      return false;
  }
  return true;
}