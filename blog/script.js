document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // Dark/Light mode
    const themeSwitch = document.getElementById('theme-switch');
    const cardElement = document.querySelector('.darkBtn');

    if (!cardElement) {
        console.error('Element with class "darkBtn" not found.');
        return;
    }

    let darkmode = localStorage.getItem('darkmode');

    const enableDarkmode = () => {
        cardElement.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
    };

    const disableDarkmode = () => {
        cardElement.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
    };

    if (darkmode === "active") enableDarkmode();

    themeSwitch.addEventListener('click', () => {
        darkmode = localStorage.getItem('darkmode');
        darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
    });

    // Like with heart
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(function (button) {
        button.parentElement.addEventListener('click', function () {
            incrementLike(button);
        });
    });
});

function incrementLike(element) {
    let parentSpan = element.parentElement;
    let likeCountElement = parentSpan.querySelector('.like-count');
    let currentCount = parseInt(likeCountElement.innerText);

    if (!parentSpan.classList.contains('liked')) {
        currentCount += 1;
        parentSpan.classList.add('liked');
        element.style.color = 'red'; 
    } else {
        currentCount -= 1;
        parentSpan.classList.remove('liked');
        element.style.color = ''; 
    }

    likeCountElement.innerText = currentCount;
}
