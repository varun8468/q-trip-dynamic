import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  let id = param.get("adventure");
  return id;


  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url = config.backendEndpoint + "/adventures/detail?adventure="+adventureId;
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }catch (error){
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-content").textContent = adventure.content;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle;
  let images = adventure.images;
  images.forEach(image => {
    let element = document.createElement('div');
    element.innerHTML += `<img class="activity-card-image" src=${image}>`;
    document.getElementById('photo-gallery').append(element);
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML= `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
let carouseInner = document.querySelector('.carousel-inner');
  console.log(carouseInner)
  images.forEach((image,index, arr)=>{
    let element = document.createElement('div');
    if(index == 0){
      element.classList.add('carousel-item', 'active', 'activity-card-image');
      element.innerHTML = `<img src="${image}" class="d-block w-100" alt="...">`
      carouseInner.appendChild(element); 
    }else {
      element.classList.add('carousel-item', 'activity-card-image');
      element.innerHTML = `<img src="${image}" class="d-block w-100" alt="...">` 
      carouseInner.appendChild(element); 
    }


  });

  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = persons * adventure.costPerHead;
  document.getElementById('reservation-cost').innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');
  const name = form.elements['name'];
  const person = form.elements['person'];
  const date = form.elements['date'];

  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const data = {
      name:name.value,
      person:person.value,
      date:date.value,
      adventure:adventure.id
    }

    postData(data);
    
  });
}

const postData = async (data) => {
  const url = config.backendEndpoint + "/reservations/new";

  try{
    return await fetch(url, {
      method: "POST",
      body:JSON.stringify(data),
      headers:{
        "content-type":"application/json; charset=UTF-8",
      },
    }).then((res)=> {
      alert("Success!")
      return res.json()
    })
  }catch(error){
    alert("Failed!")
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = "block";
  }else document.getElementById('reserved-banner').style.display = "none";

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
