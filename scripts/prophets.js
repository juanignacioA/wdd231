const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets); 
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // 1. Crear el elemento <section> para la tarjeta
        let card = document.createElement('section');
        
        // 2. Crear el h2 para el nombre completo
        let fullName = document.createElement('h2');
        
        // 3. Crear el elemento img para el retrato
        let portrait = document.createElement('img');

        // 4. Llenar el h2 con el nombre usando un template string
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // 5. Configurar la imagen (atributos src, alt, loading, etc.)
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // 6. Agregar (append) el h2 e img a la sección 'card'
        card.appendChild(fullName);
        card.appendChild(portrait);

        // 7. Agregar la tarjeta completa al contenedor principal div#cards
        cards.appendChild(card);
    });
}