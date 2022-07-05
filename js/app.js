showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
const hiddenId = document.querySelector(".hidden-id");
let addTxt = document.getElementById("addTxt");
let headingTxt = document.getElementById("headingTxt");

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (addTxt.value === "" || headingTxt.value === "") {
    alert("Enter appropriate heading and text");
    return;
  }

  if (hiddenId.value) {
    const newNotes = notes.map((element) => {
      if (element.date === hiddenId.value) {
        return {
          heading: headingTxt.value,
          text: addTxt.value,
          date: element.date,
        };
      }
      return element;
    });

    localStorage.setItem("notes", JSON.stringify(newNotes));
  } else {
    notes.push({
      heading: headingTxt.value,
      text: addTxt.value,
      date: Date().toString(),
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  hiddenId.value = "";
  addTxt.value = "";
  headingTxt.value = "";
  addBtn.innerText = "Add Note";

  showNotes();
});

// function to show notes from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index, i) {
    html += `<div  class="container my-4" style="width: 344px;">
    
        <div class="noteCard card text-bg-dark mb-3" title="Click to edit" data-key="${
          element.date
        }">
                <div class="card-header text-center bg-warning text-dark"> ${
                  element.heading
                }</div>
                <div class="card-body">
                    <p class="card-text"> ${element.text} </p>
                    <button id="${index}" data-key="${
      element.date
    }" class="delete-btn btn btn-outline-danger my-2">Delete Note</button>
                </div>
                <div class="card-footer text-center text-light bg-secondary">
                    ${(i.value = new Date(element.date).toLocaleTimeString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }))}
                </div>
            </div>
            </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `
        <div class="container"  style="width: "800";>
        <div class="card text-light bg-dark mb-3">
    <div class="card-header text-dark bg-warning"><b>AllYouNeed Notes App! </b>Message For You!</div>
    <div class="card-body">
        <p class="card-text"><h3>Nothing to show!</h3><h4><i> Use "Add a Note" section above to add notes.</i></h4> </p>
    </div>
    </div>
    </div>
    `;
  }

  // Add delete functionality
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((element) => {
    element.addEventListener("click", handleDelete);
  });

  // Add edit functionality
  const noteCards = document.querySelectorAll(".noteCard");

  noteCards.forEach((element) => {
    element.addEventListener("click", handleEdit);
  });
}

function handleDelete(event) {
  event.stopPropagation(); // Stops the event from propogating
  const key = this.getAttribute("data-key");

  const notes = JSON.parse(localStorage.getItem("notes"));

  const newNotes = [];
  notes.forEach((element) => {
    if (element.date === key) {
      return;
    }
    return newNotes.push(element);
  });

  localStorage.setItem("notes", JSON.stringify(newNotes));
  showNotes();
}

// For Search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input Event fired', inputVal);

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.querySelectorAll("p,h5")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

    // console.log(cardTxt);
  });
});

// Edit function
function handleEdit(event) {
  const key = this.getAttribute("data-key");
  const notes = JSON.parse(localStorage.getItem("notes"));
  const currentNote = notes.filter((element) => {
    if (element.date === key) {
      return element;
    }
  });
  addBtn.innerText = "Edit Note";

  hiddenId.value = key;
  addTxt.value = currentNote[0].text;
  headingTxt.value = currentNote[0].heading;
}
