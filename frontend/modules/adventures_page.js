import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const param = new URLSearchParams(search);
  let city = param.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/adventures?city=" + city);
    let data = res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  const data = document.getElementById("data");
  adventures.forEach((a) => {
    data.innerHTML +=`
                      
    <a href="detail/?adventure=${a.id}" id=${a.id} class="col-12 col-sm-6 col-lg-3 mb-4">
                          
                              <div class="activity-card" >
                                  <div class="category-banner">${a.category}</div>
                                  <img src=${a.image} alt="">
                                  <div class="bottom">
                                    <div>${a.name}</div>
                                    <div>₹${a.costPerHead}</div>
                                  </div>
                                  <div class="bottom">
                                    <div>Duration</div>
                                    <div>${a.duration}</div>
                                  </div>
                              </div>
                            </div>
                          </a>
                      
                      `;
  });
  
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredList = list.filter(f => {
    return f.duration >= low && f.duration <= high;
  });
  return filteredList;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList);
 

  // let res = [];

  // for(let i =0; i<list.length; i++){
  //   for(let j=0; j<categoryList.length; j++){
  //     if(list[i].category == categoryList[j]){
  //       res.push(list[i]);
  //     }
  //   }
  // }
  // console.log(res);

  let myMap = new Map();
  for(let i=0; i<categoryList.length; i++){
    let currentElement = categoryList[i];
    if(!myMap.get(currentElement))
      myMap.set(currentElement, i+1);
  }
  const res = list.filter(e=> myMap.get(e.category));
  return res;

} 

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  let filteredList = [];
  let durationArr = filters.duration.split('-');
  
  if(filters.category.length > 0 && filters.duration == ''){
    filteredList = filterByCategory(list, filters.category);
    return filteredList;
  }
  else if(filters.duration.length > 0 && filters.category.length == 0){
    
    filteredList = filterByDuration(list, parseInt(durationArr[0]), parseInt(durationArr[1]));
    return filteredList;
  }
  else if(filters.duration.length > 0 && filters.category.length !== 0){
    let listByCategory = filterByCategory(list, filters.category);
    let listByDuration = filterByDuration(list, parseInt(durationArr[0]), parseInt(durationArr[1]));

    filteredList = listByCategory.filter(value => listByDuration.includes(value));
    return filteredList;
  }
  
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filter = JSON.stringify(filters);
  localStorage.setItem('filters', filter);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filter = JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let data = document.getElementById('category-list');
  filters.category.forEach(f => {
    data.innerHTML += `<div class="category-filter">
                          ${f} 
                          <button id="cancel-button">x<button>
                        </div>`
    document.getElementById('cancel-button').onclick = function (){
      clearPill(filters.category, f);
    }                  
  });
  

}

function clearPill(categories, category){
  // for(let i=0; i<categories.length; i++){
  //   if(categories[i]==category){
  //     categories.splice(i,1);
  //   }
  // }

  console.log(categories, category)
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
