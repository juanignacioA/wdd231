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

const url = 'data/members.json';
const mainContainer = document.querySelector('main');
const gridButton = document.querySelector('#gridBtn');
const listButton = document.querySelector('#listBtn');

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    mainContainer.innerHTML = ""; 

    let pageTitle = document.createElement('h1');
    pageTitle.textContent = "Dolores Chamber of Commerce Business Directory";
    mainContainer.appendChild(pageTitle);

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('business-card');

        let name = document.createElement('h3');
        name.textContent = member.name;

        let tagline = document.createElement('p');
        tagline.classList.add('tagline');
        tagline.textContent = member.tagline;

        let email = document.createElement('p');
        email.textContent = `ADDRESS: ${member.addresses}`;

        let phone = document.createElement('p');
        phone.textContent = `PHONE: ${member.phone}`;

        let urlLink = document.createElement('p');
        urlLink.innerHTML = `URL: <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a>`;

        let membership = document.createElement('p');
        membership.classList.add('membership-level');
        let levelText = member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member";
        membership.textContent = `LEVEL: ${levelText}`;

        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(urlLink);
        card.appendChild(membership);

        mainContainer.appendChild(card);
    });
}

if (gridButton && listButton) {
    gridButton.addEventListener('click', () => {
        mainContainer.classList.add('grid-view');
        mainContainer.classList.remove('list-view');
    });

    listButton.addEventListener('click', () => {
        mainContainer.classList.add('list-view');
        mainContainer.classList.remove('grid-view');
    });
}

if (mainContainer) {
    getMembersData();
}