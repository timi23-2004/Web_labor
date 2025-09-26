const STAR_WARS_API_URL = 'https://swapi.dev/api/people/';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchButton').addEventListener('click', function() {
        fetchCharacters();
    });
});

const fetchCharacters = async () => {
    try {
        const characterList = document.getElementById('characterList');
        characterList.innerHTML = '<li class="show">Betöltés...</li>';
        
        const response = await fetch(STAR_WARS_API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        characterList.innerHTML = '';
  
        data.results.forEach((character, index) => {
            setTimeout(() => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${character.name}</strong><br>
                    <small>Magasság: ${character.height} cm, Tömeg: ${character.mass} kg</small>
                `;
                
                characterList.appendChild(listItem);
                
                setTimeout(() => {
                    listItem.classList.add('show');
                }, 50);
                
            }, index * 150);
        });
        
        console.log('Sikeresen betöltve:', data.results.length, 'karakter');
        
    } catch (error) {
        console.error('Hiba a karakterek betöltése során:', error);
        document.getElementById('characterList').innerHTML = 
            '<li class="show" style="color: red;">Hiba történt a karakterek betöltése során!</li>';
    }
}