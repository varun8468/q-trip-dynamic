import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  addCityToDOM('london', 'London', 'London', 'https://upload.wikimedia.org/wikipedia/commons/8/82/London_Big_Ben_Phone_box.jpg');
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/cities");
    let data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.getElementById("data");
  data.innerHTML += `
                <div id=${id} class="card-container col-12 col-sm-6 col-lg-3 mb-4">
                  <a href="pages/adventures/?city=${id}">
                    <div class="tile">
                      <div class="tile-text">
                        <h5>${city}</h5>
                        <p>${description}</p>
                      </div>
                      <img class="rounded-3 img-fluid" src=${image} alt="">
                    </div>
                  </a>
                </div>
               `;
}

export { init, fetchCities, addCityToDOM };
