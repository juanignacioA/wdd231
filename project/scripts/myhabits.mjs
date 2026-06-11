// scripts/myhabits.mjs

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('my-habits-container');
    const storedHabits = JSON.parse(localStorage.getItem('myHabits')) || [];

    if (storedHabits.length === 0) {
        container.innerHTML = `<p style="text-align: center;">No habits found. Go to "Add Habit" to create one!</p>`;
        return;
    }

    // Build the list
    const fragment = document.createDocumentFragment();

    storedHabits.forEach(habit => {
        const card = document.createElement('article');
        card.classList.add('habit-card');
        
        // This must match the 'name' attributes in your HTML form exactly
        card.innerHTML = `
            <div class="card-header">
                <h3>${habit.habitName || 'Untitled'}</h3>
                <span class="badge">${habit.category || 'General'}</span>
            </div>
            <p class="desc">${habit.description || 'No description provided.'}</p>
            <div class="card-footer">
                <span class="difficulty">${habit.difficulty || 'Medium'}</span>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
});