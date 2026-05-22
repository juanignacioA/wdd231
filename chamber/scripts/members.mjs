const url = 'data/members.json';

export async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error cargando los miembros:", error);
        return [];
    }
}