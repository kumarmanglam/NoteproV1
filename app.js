


let notes = [];
const init = () => {
  const data = localStorage.getItem("notes");
  notes = data ? JSON.parse(data) : [];
  notesView();
  // emptyView(data);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const title = document.querySelector(".title");
  const text = document.querySelector(".text");
  if(title.value || text.value){
  const note = {
    'id': Date.now(),
    'title': title.value,
    'text': text.value,
    'type': ""
  }
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  title.value = "";
  text.value = "";


  const main = document.querySelector(".main");


  main.appendChild(createCard(note))
}
}

const createCard = (note) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id",note.id);
  card.setAttribute("draggable",true);
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragover", dragOver);
  card.addEventListener("drop", drop);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  const head = document.createElement("p");
  head.classList.add("head");
  head.textContent = note.title;
  const body = document.createElement("p");
  body.classList.add("body");
  body.textContent = note.text;
  const cardActions = document.createElement("div");
  cardActions.classList.add("card-actions")
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  const deleteIcon = document.createElement('img');
  deleteIcon.src = "./icons/delete-icon.svg";
  deleteIcon.classList.add("delete-icon");
  deleteIcon.setAttribute("onclick","handleDelete(event)")
  card.appendChild(cardContent);
  cardContent.appendChild(head);
  cardContent.appendChild(body);
  card.appendChild(cardActions);
  cardActions.appendChild(delBtn);
  delBtn.appendChild(deleteIcon);
  return card;
}
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
}
function dragOver(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  const sourceCardId = event.dataTransfer.getData("text/plain");
  const targetCardId = event.target.dataset.id;

  // Get the source and target card elements
  const sourceCard = document.querySelector(`[data-id="${sourceCardId}"]`);
  const targetCard = document.querySelector(`[data-id="${targetCardId}"]`);

  // Get the parent element of the cards
  const parentElement = sourceCard.parentNode;

  // Swap the positions of the source and target cards
  const sourceIndex = Array.from(parentElement.children).indexOf(sourceCard);
  const targetIndex = Array.from(parentElement.children).indexOf(targetCard);

  if (sourceIndex !== -1 && targetIndex !== -1) {
    if (sourceIndex < targetIndex) {
      parentElement.insertBefore(targetCard, sourceCard);
    } else {
      parentElement.insertBefore(sourceCard, targetCard.nextSibling);
    }
  }
}
const notesView = () => {
  const main = document.querySelector(".main");
  main.innerHTML="";
  notes.forEach(
    note => {
      const newNote= createCard(note);
      main.appendChild(newNote);
    }
  )
}
const handleDelete = (event) => {
  console.log("hi");
  console.log(event.target.parentElement.parentElement.parentElement);
  const currCard = event.target.parentElement.parentElement.parentElement
  const currId = currCard.getAttribute("data-id")
  console.log(currId);
  const newNotes = notes.filter(note => note.id != currId);
  console.log(newNotes);
  notes = newNotes;
  localStorage.setItem("notes",JSON.stringify(notes));
  notesView();
}
// const emptyView = (data) => {
//   const empty = document.createElement("div");
//   empty.classList.add("empty")
//   const p = document.createElement("p");
//   p.textContent = "Notes you add appear here"
//   empty.appendChild(p);

//   const main = document.querySelector(".main");
//   if(!data){
//     main.appendChild(empty);
//   }
// }

function showTitle() {
  const titleInput = document.querySelector('.input.title');
  titleInput.classList.add('focus-visible');
}
// function hideTitle() {
//   console.log("hiis")
//   const titleInput = document.querySelector('.input.title');
//   // titleInput.classList.remove('focus-visible');
//   titleInput.style.display = "none"; 
// }
init();