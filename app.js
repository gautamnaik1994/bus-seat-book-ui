var tableBody = document.querySelector("#busTableBody");
var totalSeats = 20;
var seatsOnEachRow = 2;
var selectedSeats = [31, 41, 61]; //can be empty or can be pre populated from server

function generateBus() {
  for (var i = 0; i < totalSeats / seatsOnEachRow; i++) {
    tableBody.appendChild(createRow(i));
  }
}

function createRow(rowNumber) {
  var seatRow = document.createElement("tr");
  for (var i = 0; i < seatsOnEachRow + 1; i++) {
    //if middle column, then create empty
    if (i == seatsOnEachRow / 2) {
      seatRow.appendChild(createMiddlePassge());
    } else if (i < seatsOnEachRow / 2) {
      seatRow.appendChild(createSeat(rowNumber, i));
    }
    // following code ensures that seats get proper number and id
    // after middle number was skipped to create passage
    else {
      seatRow.appendChild(createSeat(rowNumber, i - 1));
    }
  }
  return seatRow;
}

function createMiddlePassge() {
  var passage = document.createElement("td");
  passage.textContent = "  ";
  return passage;
}

function createSeat(rowNumber, seatIndex) {
  var seat = document.createElement("td");
  var id = parseInt(rowNumber.toString() + seatIndex.toString());
  seat.setAttribute("id", id);
  seat.textContent = id.toString();
  seat.classList.add("seat");

  //Check if seat is occupied by someone
  if (selectedSeats.includes(id)) {
    // if there in selected list then add disabled css and do not add click listener
    seat.classList.add("disabled");
  } else {
    //if not their in selected list then only add click listener
    seat.addEventListener("click", seatOnclickListener);
  }
  return seat;
}

function seatOnclickListener(e) {
  //console.log("clicked", e);
  var clickedSeat = e.target;
  //console.log(" Id ", clickedSeat.id);
  if (selectedSeats.includes(clickedSeat.id)) {
    var index = selectedSeats.indexOf(clickedSeat.id);
    if (index > -1) {
      selectedSeats.splice(index, 1);
    }
    clickedSeat.classList.remove("selected");
  } else {
    selectedSeats.push(clickedSeat.id);
    clickedSeat.classList.add("selected");
  }
  console.log(selectedSeats);
  printList();
}

function printList() {
  var seatList = document.querySelector("#seatList");
  seatList.textContent = selectedSeats.join(", ");
}

generateBus();
printList();
