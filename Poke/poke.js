// use of fetch
const data = fetch('data.json');
// then method call. Only gets call in the result
data.then(response => {
    //get a response from json file
        return response.json();
    console.log('response', response)
    //get data from json file
}).then(stuff => {
    console.log(stuff);
});
console.log(data);

//USE API JSON DATA
const baseUrl = 'https://pokeapi.co/api/v2/';

// use data from baseUrl
function getJson(url) {
    //either `https://pokeapi.co/api/v2/${url}` OR baseUrl + url
    return fetch(`https://pokeapi.co/api/v2/${url}`).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            // console.log before the throw so that it is shown
            console.log('error!');
            throw new Error('response not ok');
        }
    }).catch(err => {
        console.log('getJSON', err);
    });
}

// // get element frmo HTML file
// const myList = document.getElementById('list');
// getJson('type/3').then(data => {
//     console.log(data);
//     const newArray = data.pokemon.map(item => {
//         return `<li>${item.pokemon.name}</li>`;
//     }).join('');
//     console.log(newArray);
//     //Display data from API on screen for user
//     myList.innerHTML = newArray;
// });


document.getElementById("prev").disabled = true;
let page = 0;
let pokeList = new Array();

function display() {
    getJson('type/3').then(data => {
    console.log(data);
    pokeList = data.pokemon.map(item => {
        return `${item.pokemon.name}`;
    });
    const myList = document.getElementById("list");
    myList.innerHTML = '';

    pokeList.forEach((item, index) => {
        if(Math.floor(index / 10) == page){
        document.getElementById("list").innerHTML += `<li>${item}</li>`;
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

function jumpPage(){
    page = prompt('Enter Page:') -1;
    changePage(0);
}

display();