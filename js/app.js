console.log('Welcome to AllYouNeed Notes App');
showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById("addTxt");
    let headingTxt = document.getElementById("headingTxt");
    if (addTxt.value.length == 0) {
        alert("Please write something in text box!")

    }
    else if (headingTxt.value.length == 0) {
        alert("Please Give some 'Heading' To Your Note!")
    }
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push({text: addTxt.value, heading: headingTxt.value, date : new Date()});
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        headingTxt.value = "";
        // console.log(notesObj);
        showNotes();
    }
})

// function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index, i) {
        html += `<div class="container my-4" style="width: 344px;">

        <div class="noteCard card text-bg-dark mb-3" >
                <div class="card-header text-center bg-warning text-dark">Note ${index + 1}</div>
                <div class="card-body">
                    <h5 class="card-title"><b>${element.heading}</b></h5>
                    <p class="card-text"> ${element.text} </p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger my-2">Delete Note</button>
                </div>
                <div class="card-footer text-center text-light bg-secondary">
                    ${i.value = new Date(element.date).toLocaleTimeString([], 
                        {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `
        <div class="container"  style="width: "800";>
        <div class="card text-light bg-dark mb-3">
    <div class="card-header text-dark bg-warning"><b>AllYouNeed Notes App! </b>Message For You!</div>
    <div class="card-body">
        <p class="card-text"><h3>Nothing to show!</h3><h4><i> Use "Add a Note" section above to add notes.</i></h4> </p>
    </div>
    </div>
    </div>
    `

    
    }

}

// Function to delete a note
function deleteNote(index) {
    // console.log("I am Deleting", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// For Search
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input Event fired', inputVal);

    let noteCards =document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt =  element.querySelectorAll('p,h5')[0].innerText;
        
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';

        }
        else{
            element.style.display = 'none';
        }
        
        // console.log(cardTxt);
    })
})