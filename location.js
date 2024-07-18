function getLocation() {
    const status = document.getElementById('status');
    const address = document.getElementById('address');
    const button = document.getElementById('getLocationBtn');

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch the address using reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || 'Not found';
                const postcode = data.address.postcode || 'N/A';

                status.textContent = '';
                address.textContent = `${city} ${postcode}`;

                // Hide the button after the location is found
                button.style.display = 'none';
            })
            .catch(() => {
                status.textContent = 'Unable to retrieve address';
            });
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("getLocationBtn");
    button.addEventListener("click", getLocation);
});
