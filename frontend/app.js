document.addEventListener('DOMContentLoaded', () => {
  const carList = document.getElementById('car-list');

  fetch("http://localhost:3000/api/cars") 
    .then(response => response.json())
    .then(cars => {
      console.log(cars);
      if (cars.length === 0) {
        carList.innerHTML = '<p>Ingen biler tilgængelige</p>';
        return;
      }

      cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'col-md-4';
        carElement.innerHTML = `
          <div class="card h-100">
          <div class="card-body">
          <h5 class="card-title">${car.brand} ${car.model}</h5>
          <p class="card-text">Pris: ${car.price} kr.</p>
           <button class="btn btn-primary" onclick="addToCart('${car._id}')">Tilføj til kurv</button>
        `;
        carList.appendChild(carElement);
      });
    })
    .catch(error => {
      console.error('Fejl:', error);
      carList.innerHTML = '<p>Kunne ikke hente biler.</p>';
    });
});

function addToCart(carId) {
  console.log(`Bil med ID ${carId} tilføjet til kurv`);
}
