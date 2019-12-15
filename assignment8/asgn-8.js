function getJson(url) {
    return fetch(`https://pokeapi.co/api/v2/${url}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('error!');
                throw new Error('response not ok');
            }
        })
        .catch(err => {
            console.log('getJSON', err);
        })
}

document.getElementById("prev").disabled = true;
let page = 0;
let pokeList = new Array();

function display() {
    getJson('type/3').then(data => {
        console.log(data);
        pokeList = data.pokemon.map(item => {
            return `${item.pokemon.name}`;
        });
        const myList = document.getElementById("poke-list");
        myList.innerHTML = '';

        pokeList.forEach((item, index) => {
            if (Math.floor(index / 10) == page) {
                document.getElementById("poke-list").innerHTML += `<li>${item}</li>`;
            }

        });
        Array.from(myList.children).forEach((item) => {
            item.addEventListener('touchend', () => {
                window.location = `https://bulbapedia.bulbagarden.net/wiki/${item}_(Pokémon)`;
            });
        })
    });
}

function changePage(val) {
    page += val;
    if (page == 0) {
        document.getElementById("prev").disabled = true;
    } else {
        document.getElementById("prev").disabled = false;
    }
    if ((page + 1) * 10 > pokeList.length) {
        document.getElementById("next").disabled = true;
    } else {
        document.getElementById("next").disabled = false;
    }

    display();
}

function jumpPage() {
    page = prompt('Enter Page:') - 1;
    changePage(1);
}


display();