// profile content
const editButton = document.querySelector(".profile__buttons-edit");
const addButton = document.querySelector('.profile__buttons-add');
const profileName = document.querySelector(".profile__title");
const aboutName = document.querySelector('.profile__subtitle');
const aboutInfo = document.querySelector('.popup__form-field_type_about');
const name = document.querySelector('.popup__form-field_type_name');
const imageTitle = document.querySelector('.popup__form-field_type_title');
const imageUrl = document.querySelector('.popup__form-field_type_link');
// card functionality
const initialCards = [
  {
    name: "Scranton",
    link: "images/Scranton.jpeg"
  },
  {
    name: "Silicon Valley",
    link: "images/SiliconValley.png"
  },
  {
    name: "E Corp",
    link: "images/ECorp.jpeg"
  },
  {
    name: "Downton",
    link: "images/Downton.jpeg"
  },
  {
    name: "Pawnee",
    link: "images/pawnee.jpeg"
  },
  {
    name: "Disney World",
    link: "images/disneyworld.jpeg"
  }
];

//creating cards
//card image functionality for popups ...in progress

const imagePopup = document.querySelector('.popup__image');
const loveButtons = document.querySelectorAll(".card__lovebutton");
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const photoPopup = document.querySelector('.popup__image-photo');


const loveButtonUpdate = function () {
  this.classList.toggle("card__lovebutton_active");
};

const openPhoto = function () {
  imagePopup.style.display = 'block';
  photoPopup.src = this.src;
  popupDiv.style.visibility = "visible";

}

const cardRender = function (card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__caption').textContent = card.name;
  cardElement.querySelector('.card__lovebutton').addEventListener('click', loveButtonUpdate);
  cardElement.querySelector('.card__image').addEventListener('click', openPhoto);
  cards.prepend(cardElement);
};

initialCards.forEach(card => {
  cardRender(card);
})


// popup functionality
const popupDiv = document.querySelector('.popup');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const form = document.querySelectorAll('.popup__form')
const closeButton = document.querySelectorAll('.popup__form-close')




//create an element for the like button everytime a card renders
const showEdit = function () {
  name.value = profileName.textContent;
  aboutInfo.value = aboutName.textContent;
  popupDiv.style.visibility = "visible";
  editPopup.style.display = 'block'
}

const showAdd = function () {
  popupDiv.style.visibility = "visible";
  addPopup.style.display = 'block'
}

const closePopup = function () {
  popupDiv.style.visibility = "hidden";
  addPopup.style.display = 'none'
  editPopup.style.display = 'none'
  imagePopup.style.display = 'none'
}



const updateProfile = function (event) {
  event.preventDefault();
  profileName.textContent = name.value;
  aboutName.textContent = aboutInfo.value;
  closePopup();
};


const createCard = function (event) {
  event.preventDefault();
  //grab information add to object and add to beginnning of array
  var obj = { name: imageTitle.value, link: imageUrl.value };
  initialCards.unshift(obj);
  cardRender(obj)
  closePopup();
  document.querySelector('.popup__form_type_add').reset();
}



//events

form.forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('popup__form_type_add')) {
      createCard(event)
    } else {
      updateProfile(event)
    }

  });
})

loveButtons.forEach(function (button) {
  button.addEventListener("click", loveButtonUpdate);
});
editButton.addEventListener('click', showEdit)
addButton.addEventListener('click', showAdd);
closeButton.forEach((button) => {
  button.addEventListener('click', function (event) {
    closePopup();
  })
})



