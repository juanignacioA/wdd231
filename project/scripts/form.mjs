// scripts/form.mjs

const form = document.querySelector('.habit-form');

if (form) {
    form.addEventListener('submit', (e) => {
        // 1. Stop the browser from submitting the form the old-fashioned way
        e.preventDefault();

        // 2. Get the data
        const formData = new FormData(form);
        const newHabit = Object.fromEntries(formData.entries());
        newHabit.id = Date.now(); // Add unique ID

        // 3. Save to localStorage
        const storedHabits = JSON.parse(localStorage.getItem('myHabits')) || [];
        storedHabits.push(newHabit);
        localStorage.setItem('myHabits', JSON.stringify(storedHabits));

        // 4. Redirect to success page
        window.location.href = 'success.html';
    });
}