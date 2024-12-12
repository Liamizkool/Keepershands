document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);
    showSlide(currentSlide);
});


    // Weather API functionality
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const getWeatherBtn = document.getElementById('get-weather');
    const weatherContainer = document.getElementById('weather-container');

    getWeatherBtn.addEventListener('click', () => {
        const latitude = latitudeInput.value || 53.35; // Default latitude
        const longitude = longitudeInput.value || -6.26; // Default longitude

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                if (data && data.current_weather) {
                    const { temperature, windspeed } = data.current_weather;
                    weatherContainer.innerHTML = `
                        <h3>Current Weather</h3>
                        <p><strong>Temperature:</strong> ${temperature}°C</p>
                        <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
                    `;
                } else {
                    weatherContainer.innerHTML = `<p>Unable to fetch weather data.</p>`;
                }
            })
            .catch(() => {
                weatherContainer.innerHTML = `<p>Error fetching weather data.</p>`;
            });
    });

    // Cookie consent popup
    const cookiePopup = document.createElement('div');
    cookiePopup.id = 'cookie-popup';
    cookiePopup.innerHTML = `
        <p>We use cookies to ensure you get the best experience on our website. <button id="accept-cookies">Accept</button></p>
    `;
    document.body.appendChild(cookiePopup);

    const acceptCookiesBtn = document.getElementById('accept-cookies');
    acceptCookiesBtn.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
    });