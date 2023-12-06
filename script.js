const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const buyButton = document.getElementById('buyButton');
const resetButton = document.getElementById('resetButton');

populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //copy selected seats into arr
    // map through array
    //return new array of indexes

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

function handleBuyButtonClick() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    if (selectedSeats.length === 0) {
        alert('Por favor, selecciona al menos un asiento antes de comprar.');
        return;
    }

    alert('¡Compra realizada con éxito!');

    selectedSeats.forEach((seat) => {
        seat.classList.remove('selected');
        seat.classList.add('occupied', 'purchased'); // Agrega una nueva clase 'purchased'
    });

    // Actualizar el contador y el total después de restablecer los asientos
    updateSelectedCount();

    const alertElement = document.getElementById('purchaseAlert');
    alertElement.classList.add('show');

    // Opcional: Puedes ocultar la alerta después de cierto tiempo
    setTimeout(() => {
        alertElement.classList.remove('show');
    }, 3000); 
}

// Función para manejar el clic en el botón de reseteo
function handleResetButtonClick() {
    const purchasedSeats = document.querySelectorAll('.row .seat.purchased');

    purchasedSeats.forEach((seat) => {
        seat.classList.remove('occupied', 'purchased');
    });

    // Actualizar el contador y el total después de resetear los asientos
    updateSelectedCount();
}

buyButton.addEventListener('click', handleBuyButtonClick);
resetButton.addEventListener('click', handleResetButtonClick);

updateSelectedCount();