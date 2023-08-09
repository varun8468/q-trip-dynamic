import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint + "/reservations/");
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tbody = document.getElementById("reservation-table");
  reservations.forEach((r) => {
    // let date = r.date.split("-").reverse().join("/");
    let d = new Date(r.date);
    let date = [d.getDate(), d.getMonth()+1, d.getFullYear(), ].join('/');
    let dateArr = r.date.split("-");
    let time = new Date(r.time);
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    let formattedTime = time.toLocaleDateString("en-IN", options);
    let tr = document.createElement("tr");
    tr.innerHTML = `
                            <td scope="col">${r.id}</td>
                            <td scope="col">${r.name}</td>
                            <td scope="col">${r.adventureName}</td>
                            <td scope="col">${r.person}</td>
                            <td scope="col">${date}</td>
                            <td scope="col">${r.price}</td>
                            <td scope="col">${formattedTime}</td>
                            <td scope="col" id="${r.id}">
                              <a  class="reservation-visit-button" href="/frontend/pages/adventures/detail/?adventure=${r.adventure}">Visit Adventure</a>
                            </td>`;
    tbody.append(tr);
  });

  if (reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
