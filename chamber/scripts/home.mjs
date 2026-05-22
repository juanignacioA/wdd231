import { getMembersData } from './members.mjs';

const featuredContainer = document.querySelector('#featured-members-container');

async function initHome() {
    const members = await getMembersData();
    
    // Filtramos para mostrar solo miembros destacados (Gold=3 o Silver=2)
    const featuredMembers = members.filter(member => member.membershipLevel >= 2);
    
    // Opcional: Mezclar el array para que varíen los 3 miembros que aparecen
    const directThree = featuredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    displayHomeCards(directThree);
}

const displayHomeCards = (selectedMembers) => {
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = ""; // Limpiamos solo la sección de destacados de la Home

    selectedMembers.forEach(member => {
        let card = document.createElement('div');
        card.classList.add('home-business-card'); // Una clase CSS diferente para darles estilos más chicos

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        
        featuredContainer.appendChild(card);
    });
}

if (featuredContainer) {
    initHome();
}