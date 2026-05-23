import { getWeatherData } from './weather.mjs';

document.addEventListener("DOMContentLoaded", () => {

    async function loadFeaturedMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            
            const featured = members.filter(m => m.membershipLevel >= 2);
            
            featured.sort(() => 0.5 - Math.random());
            
            const selected = featured.slice(0, 3);
            
            const container = document.querySelector('#spotlights-container');
            container.innerHTML = selected.map(m => {
                let levelText = m.membershipLevel === 3 ? "Gold" : 
                                m.membershipLevel === 2 ? "Silver" : "Member";

                return `
                    <div class="card spotlight-card">
                        <img src="${m.image}" alt="${m.name}" class="member-logo">
                        <h3>${m.name}</h3>
                        <p class="membership-level">${levelText} Member</p>
                        <p><em>${m.tagline}</em></p>
                        <p>${m.phone}</p>
                        <a href="${m.website}" target="_blank">Visit Website</a>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error("Error loading members:", error);
            document.querySelector('#spotlights-container').innerHTML = "<p>Could not load members.</p>";
        }
    }

    loadFeaturedMembers();

    getWeatherData();
});

async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        
        const container = document.querySelector('#events-container');
        
        const eventsHTML = events.map(event => `
            <div class="event-item" style="margin-bottom: 1.5rem;">
                <h3>${event.title}</h3>
                <p><strong>${event.date}</strong></p>
                <p>${event.description}</p>
            </div>
        `).join('');
        
        container.innerHTML = `<h2>Upcoming Events</h2>` + eventsHTML;
    } catch (error) {
        console.error("Error loading events:", error);
    }
}

loadEvents();