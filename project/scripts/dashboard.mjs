// URL of your JSON data
const url = 'data/habits.json';
const container = document.querySelector('#habit-container');
const modal = document.querySelector('#habit-modal');

// Modal Elements
const modalTitle = document.querySelector('#modal-title');
const modalDesc = document.querySelector('#modal-desc');
const modalDiff = document.querySelector('#modal-diff');
const closeModal = document.querySelector('#close-modal');

let allHabits = []; // Store fetched data globally

// Fetch Data with Try...Catch
async function fetchHabits() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allHabits = await response.json();
        displayHabits(allHabits); // Initial display
    } catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = `<p>Sorry, we couldn't load the habits at this time.</p>`;
    }
}

// Display dynamically (Template Literals + DOM Manipulation)
function displayHabits(habits) {
    container.innerHTML = ''; // Clear container
    const fragment = document.createDocumentFragment();

    // Array Method: forEach
    habits.forEach(habit => {
        const card = document.createElement('article');
        card.classList.add('habit-card');
        
        // Generamos el HTML interno usando las clases modernas (badges)
        card.innerHTML = `
            <div class="card-header">
                <h3>${habit.title}</h3>
                <span class="badge">${habit.category}</span>
            </div>
            <p class="desc">${habit.description}</p>
            <div class="card-footer">
                <span class="difficulty ${habit.difficulty.toLowerCase()}">${habit.difficulty}</span>
                <button class="details-btn" data-id="${habit.id}">Details</button>
            </div>
        `;
        
        // Event Listener for Modal inside the loop
        const btn = card.querySelector('.details-btn');
        btn.addEventListener('click', () => openDialog(habit));

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// Modal Logic
function openDialog(habit) {
    modalTitle.textContent = habit.title;
    modalDesc.textContent = habit.description;
    modalDiff.textContent = habit.difficulty;
    modal.showModal(); // Native HTML dialog API
}

closeModal.addEventListener('click', () => {
    modal.close();
});

// Array Method: filter (Bonus for Wayfinding/Interactivity)
document.querySelector('#filter-health').addEventListener('click', () => {
    const healthHabits = allHabits.filter(h => h.category === 'Health');
    displayHabits(healthHabits);
});

document.querySelector('#filter-mind').addEventListener('click', () => {
    const mindHabits = allHabits.filter(h => h.category === 'Mind');
    displayHabits(mindHabits);
});

document.querySelector('#filter-all').addEventListener('click', () => {
    displayHabits(allHabits);
});

// Initialize
fetchHabits();