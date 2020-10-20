

const searchForm = document.querySelector("input");
const searchResultDiv = document.querySelector(".search-result");
// const container = document.querySelector(".container");
// let searchQuery = "";
// const APP_KEY = "d45e7af646msh5ad016ffb0f335dp15393bjsn337df5e06fbd";

//   const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://rapidapi.p.rapidapi.com/list.php?i=list",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
// 		"x-rapidapi-key": "d45e7af646msh5ad016ffb0f335dp15393bjsn337df5e06fbd"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });



//   async function fetchAPI() {
//     const baseURL = `https://www.thecocktaildb.com/api/json/v1/{APP_KEY}/search.php?s={searchQuery}`
//     const response = await fetch(baseURL);
//     const data = await response.json();
//     generateHTML(data.hits);
//     console.log(data);
//   }

//global variable, get input value despite it changing 
const searchCocktail = document.getElementById('cocktailBar');

searchCocktail.addEventListener('change', () => {
    const searchValue = searchCocktail.value;
    getCocktailByName(searchValue);
})

function getCocktailByName(cocktail) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        .then((response) => response.json())
        .then((cocktailData) => {
            displayinputvalue(cocktailData)
        })
        .catch((error) => {
            if (document.getElementById("searchCocktail").value == "") {
                showErrMsg(error)
            } else {
                hideErrMsg(error)
            };
        })
}

//Function that creates what to display in html, called when clicking on moodButton
function displayrandomCocktail(cocktailData) {
    const { drinks } = cocktailData;
    const cocktailpictureElement = document.getElementById('cocktailPicture');
    let cocktailPicture = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`;

    cocktailpictureElement.innerHTML = cocktailPicture;

    //display first cocktailinfo
    const cocktailTitleElement = document.getElementById('cocktailTitle');

    let cocktailInfo = `
    <h4 class="cocktailName"> ${drinks[0].strDrink} </h4>
    <p class="typeOfglass">Type of glass:</p><p>${drinks[0].strGlass}</p>
    </br><p class="howToMake">How to make:</p>`

    cocktailTitleElement.innerHTML = cocktailInfo;


    //display second cocktailinfo
    const cocktailInfoElement = document.getElementById('howTo');

    let result = '';
    for (var i = 1; i <= 15; i++) {
        let measures = 'strMeasure' + i;
        let ingridients = 'strIngredient' + i;
        if ((drinks[0][measures]) && (drinks[0][ingridients]) !== "") {
            result = result + ` <p>${drinks[0][measures]} ${drinks[0][ingridients]}</p>`;

            cocktailInfoElement.innerHTML = result;
        };
    }


    //display third cocktailinfo
    const cocktailInstructionsElement = document.getElementById('instructions');
    let instructions = `
    </br><p>${drinks[0].strInstructions}</p>`;

    cocktailInstructionsElement.innerHTML = instructions;

}


//Function that creates what to display in html
//it is being called when clicking on shakebutton to display info from input value
function displayinputvalue(cocktailData) {
    const { drinks } = cocktailData;
    const cocktailpictureElement = document.getElementById('cocktailPicture');
    let cocktailPicture = `
    <img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`;

    cocktailpictureElement.innerHTML = cocktailPicture;

    //display first cocktailinfo
    const cocktailTitleElement = document.getElementById('cocktailTitle');

    let cocktailInfo = `
    <h4 class="cocktailName"> ${drinks[0].strDrink} </h4>
    <p class="typeOfglass">Type of glass:</p><p>${drinks[0].strGlass}</p>
    </br><p class="howToMake">How to make:</p>`

    cocktailTitleElement.innerHTML = cocktailInfo;


    //display second cocktailinfo
    const cocktailInfoElement = document.getElementById('howTo');

    let result = '';
    for (var i = 1; i <= 15; i++) {
        let measures = 'strMeasure' + i;
        let ingridients = 'strIngredient' + i;
        if ((drinks[0][measures]) && (drinks[0][ingridients]) !== "") {
            result = result + ` <p>${drinks[0][measures]} ${drinks[0][ingridients]}</p>`;

            cocktailInfoElement.innerHTML = result;
        };
    }


    //display third cocktailinfo
    const cocktailInstructionsElement = document.getElementById('instructions');
    let instructions = `
    </br><p>${drinks[0].strInstructions}</p>`;

    cocktailInstructionsElement.innerHTML = instructions;

}
