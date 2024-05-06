const { $ } = window

function hiddeOtherClient(): void{
  const { hash } = window.location
  const stateSelect = document.getElementById("ship-state") as HTMLSelectElement;
  const citySelect = document.getElementById("ship-city") as HTMLSelectElement;
  const neighborhoodSelect = document.getElementById("ship-neighborhood") as HTMLSelectElement;
  const contenedorPrincipal = document.querySelector(".contenedorPrincipal") as HTMLElement;

  if (stateSelect && citySelect && neighborhoodSelect) {
      const selectedState = stateSelect.value;
      const selectedCity = citySelect.value;
      const selectedNeighborhood = neighborhoodSelect.value;

      if (selectedState && selectedCity && selectedNeighborhood) {
        contenedorPrincipal.style.display = "block";
      } else {
        contenedorPrincipal.style.display = "none";
      }
  }
}

$(window).on('componentValidated.vtex', () => {
  hiddeOtherClient()
})

export default hiddeOtherClient;
