/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(game => {
        // Create the game card element
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        
        // Set the inner HTML of the game card
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" />
        <h2>${game.name}</h2>
        <p>Backers: ${game.backers.toLocaleString()}</p>
        <p>Amount Pledged: $${game.pledged.toLocaleString()}</p>
        <p class="description">${game.description}</p>
        `;
        
        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);

        // if search is equal game name

        
        // Add an event listener to toggle the description visibility
        gameCard.addEventListener("click", () => {
            const description = gameCard.querySelector('.description');
            description.classList.toggle('show'); // Toggle the visibility of the description
        });
    });
}

// Ensure GAMES_JSON and gamesContainer are defined before calling the function
addGamesToPage(GAMES_JSON);



        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = ` $ ${totalRaised } `;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `11`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
   
    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
   
    // use the function we previously created to add the unfunded games to the DOM
   addGamesToPage(unfundedGames);
   return unfundedGames
  
};





// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    let fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    return fundedGames

};


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
};

//selecting search box
const search = document.getElementsByClassName("search");


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
 document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
 document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
 document.getElementById("all-btn").addEventListener("click", showAllGames);

 



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
function countUnfundedGames() {
    const unfundedGames = filterUnfundedOnly();
    const totalGoal = unfundedGames.reduce ((sum, game) => sum + game.goal, 0);
    return totalGoal;
};

console.log(countUnfundedGames());



// create a string that explains the number of unfunded games using the ternary operator
   
const unfundedGames = filterUnfundedOnly();

const info = unfundedGames.length === 1 
    ? '1 game is unfunded.' 
    : `${unfundedGames.length} games unfunded`;
    console.log(info);

// create a new DOM element containing the template string and append it to the description container

function sumFundedGames () {
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    const fundedSum = fundedGames.reduce((sum, game) => sum + game.goal, 0);
    return fundedSum;
    }
    
const update =` A total of ${sumFundedGames()} has been raised for ${filterFundedOnly().length} games.
But we still have ${info} to archive its goal!`

const infoContainer = document.createElement ('div');
infoContainer.classList.add("info");
infoContainer.innerHTML = update;
descriptionContainer.appendChild(infoContainer);



console.log(update);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, ...restOfGames] = sortedGames;
console.log('Top 1:', firstGame);
console.log('Top 2:', secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element

const { name: firstGameName } = firstGame;
const { name: secondGameName } = secondGame;

const topGame = document.createElement("div");
topGame.textContent = firstGameName; 
firstGameContainer.appendChild(topGame);
// do the same for the runner up item

const runGame = document.createElement("div");
runGame.textContent = secondGameName;
secondGameContainer.appendChild(runGame);
console.log(firstGame);


//function to search by game e show its description on its card

const searchBar = document.getElementById("search");

// Function to handle searching
function searchGames() {
    const query = searchBar.value.toLowerCase(); // Get the search query and convert it to lowercase
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(query)); // Filter games based on search query
    deleteChildElements(gamesContainer); // Clear the current game container
    addGamesToPage(filteredGames); // Display the filtered games
}

// Add event listener to search bar
searchBar.addEventListener("input", searchGames);