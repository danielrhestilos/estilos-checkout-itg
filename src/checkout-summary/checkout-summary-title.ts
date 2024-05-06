function addTitleSummary(): void {

  if (document.querySelector(".summary-title-cont")) {
    return;
  }

  const divContenedor = document.createElement("div");
  divContenedor.classList.add("summary-title-cont");

  const titulo = document.createElement("h3");
  titulo.classList.add("summary-title-text");
  titulo.textContent = "Resumen de pago";

  divContenedor.appendChild(titulo);

  const divResumen = document.querySelector(".forms.coupon-column.summary-coupon-wrap.text-center");

  if (divResumen) {
    divResumen.insertBefore(divContenedor, divResumen.firstChild);
  }
}

$(window).on('componentValidated.vtex', () => {
  addTitleSummary()
})

export default addTitleSummary
