const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}

const currentYearElement = document.querySelector('#currentyear');
const lastModifiedElement = document.querySelector('#lastModified');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}