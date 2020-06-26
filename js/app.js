console.log("welcome to my notes app.");
shownotes();
// if user Add a Note 

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    shownotes();
});

// function to show element by local storage 
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
                 <div class="notecard w-3yellow my-2 mx-2 " style="width: 18rem; border:1px solid black;">
                      <div class="card-body">
                         <h5 class="card-title"> ${element.title} </h5>
                         <p class="card-text"> ${ element.text}</p>
                             <button id="${index}" onclick="deleteNote(this.id)"class="btn btn-primary">Delete Note </button>
                         </div>
                  </div> `;
    });
    notesobj = JSON.parse(notes);
    let notesElm = document.getElementById("notes");
    if(notesobj.length != 0){
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// function to Deletenotes
function deleteNote(index) {
    //  console.log(`I am deleting a note`, index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}


let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {

    let inputval = search.value.toLowerCase();
    console.log('input event fired', inputval);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardtxt);

    })

})


