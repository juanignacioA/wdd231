import { getMembersData } from './members.mjs';

const mainContainer = document.querySelector('main');
const gridButton = document.querySelector('#gridBtn');
const listButton = document.querySelector('#listBtn');

async function initDirectory() {
    const members = await getMembersData();
    displayMembers(members);
}

const displayMembers = (members) => {
    const oldCards = mainContainer.querySelectorAll('.business-card');
    oldCards.forEach(card => card.remove()); 

    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('business-card');

        let logo = document.createElement('img');
        logo.src = member.image;
        logo.alt = `Logo of ${member.name}`;
        logo.classList.add('member-logo');
        logo.setAttribute('loading', 'lazy');
        logo.width = 150;  
        logo.height = 120; 

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
        urlLink.innerHTML = `URL: <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a>`;

        let membership = document.createElement('p');
        membership.classList.add('membership-level');
        let levelText = member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member";
        membership.textContent = `LEVEL: ${levelText}`;

        card.appendChild(logo); 
        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(urlLink);
        card.appendChild(membership);

        fragment.appendChild(card);
    });

    mainContainer.appendChild(fragment);
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
    initDirectory();
}