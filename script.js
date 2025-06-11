const coasterSlider = document.getElementById('coaster-amount');
const coasterValue = document.getElementById('coaster-value');
const pricePerCoasterDisplay = document.getElementById('price-per-coaster');
const totalPriceDisplay = document.getElementById('total-price');
const hiddenPricePerCoaster = document.getElementById('hidden-price-per-coaster');
const hiddenTotalPrice = document.getElementById('hidden-total-price');

function updatePrice() {
    const quantity = parseInt(coasterSlider.value);
    let pricePerCoaster;

    if (quantity <= 1000) {
        pricePerCoaster = 0.50;
    } else if (quantity <= 7000) {
        pricePerCoaster = 0.40;
    } else { // 7100 and more
        pricePerCoaster = 0.30;
    }

    const totalPrice = quantity * pricePerCoaster;

    // Update the quantity display
    if (quantity >= 10000) {
        coasterValue.textContent = '10,000+';
    } else {
        coasterValue.textContent = quantity;
    }

    // Update the price display
    pricePerCoasterDisplay.textContent = `£${pricePerCoaster.toFixed(2)}`;
    totalPriceDisplay.textContent = `£${totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Update hidden fields for form submission
    hiddenPricePerCoaster.value = `£${pricePerCoaster.toFixed(2)}`;
    hiddenTotalPrice.value = `£${totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

coasterSlider.addEventListener('input', updatePrice);

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', updatePrice);

//
// Form Submission Logic
//
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // !!! IMPORTANT !!!
    // You must replace this URL with the one you get from Google Apps Script.
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbwkuWi8XK7IMfgoTkEn4Lyl2tlb0WnIF5lU8fOanQZwDyCrbuJoYQnC_dsEZE6BvpIi/exec';

    // Get the original button text and set it to a "sending" state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Create a data object from the form
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Send the data using fetch
    fetch(googleScriptURL, {
        method: 'POST',
        mode: 'no-cors', // Important for sending to Google Scripts
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then(() => {
        // This part runs on a successful request, even with no-cors
        submitButton.textContent = 'Proposal Sent!';
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 3000); // Reset after 3 seconds
        contactForm.reset(); // Clear the form
        updatePrice(); // Reset the price calculator
    })
    .catch(error => {
        // Handle network errors
        console.error('Error:', error);
        submitButton.textContent = 'Error! Please try again.';
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 4000); // Reset after 4 seconds
    });
});

//
// Initialize Swiper
//
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
        }
      });
}); 