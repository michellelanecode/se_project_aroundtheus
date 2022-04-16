// profile content
const editButton = document.querySelector(".profile__buttons-edit");
const addButton = document.querySelector('.profile__buttons-add');
const profileName = document.querySelector(".profile__title");
const aboutName = document.querySelector('.profile__subtitle');
const aboutInfo = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.popup__input_type_name');
const imageTitle = document.querySelector('.popup__input_type_title');
const imageUrl = document.querySelector('.popup__input_type_link');


// card functionality
const initialCards = [{
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

//card functionality

const imagePopup = document.querySelector('.popup__image');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const photoPopup = document.querySelector('.popup__image-photo');


const updateLikeButton = function(button) {
    button.classList.toggle("card__lovebutton_active");
};

const createPopup = function(photoInfo) {
    const subtitle = document.querySelector('.popup__image-text');
    subtitle.textContent = photoInfo.name;
    photoPopup.src = photoInfo.link;
    openPopup(imagePopup);
}

const deletePhoto = function(element) {
    const elementToRemove = element.closest('.card')
    elementToRemove.remove()
}

const renderCard = function(cardElement) {
    cards.prepend(cardElement);
}

const createCard = function({ name, link }) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__caption').textContent = name;
    cardElement.querySelector('.card__lovebutton').addEventListener('click', function(event) {
        updateLikeButton(event.target)
    });
    cardElement.querySelector('.card__image').addEventListener('click', function(event) {
        const obj = { name: event.target.alt, link: event.target.src };
        createPopup(obj)
    });
    cardElement.querySelector('.card__deletebutton').addEventListener('click', function(event) {
        deletePhoto(event.target);
    });
    return cardElement;
};

initialCards.forEach(cardObj => {
    renderCard(createCard(cardObj))
})



// popup functionality
const popupDiv = document.querySelector('.popup');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const closeButton = document.querySelectorAll('.popup__form-close')
const profileSubmitForm = document.querySelector('.popup__form_type_edit');
const cardCreateForm = document.querySelector('.popup__form_type_add');


//create an element for the like button everytime a card renders
const showEdit = function() {
    name.value = profileName.textContent;
    aboutInfo.value = aboutName.textContent;
    openPopup(editPopup);
}

const showAdd = function() {
    openPopup(addPopup)
}

const closePopup = function(popupElement) {
    popupDiv.classList.remove('popup_active')
    popupElement.classList.remove('popup__container_active')
}

const openPopup = function(popupElement) {
    popupDiv.classList.add('popup_active')
    popupElement.classList.add('popup__container_active')
}

const updateProfile = function(event) {
    event.preventDefault();
    profileName.textContent = name.value;
    aboutName.textContent = aboutInfo.value;
    closePopup(editPopup);
};






//events

//function for create button need event listener to call create card out of info
profileSubmitForm.addEventListener('submit', updateProfile);
//function for submit button to update profile with info
cardCreateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newCard = { name: imageTitle.value, link: imageUrl.value }
        renderCard(createCard(newCard));
        closePopup(addPopup);
        cardCreateForm.reset();
    })
    //event listener for edit button clicks to open edit profile modal
editButton.addEventListener('click', showEdit)
    //event listener for add button click to open add card modal
addButton.addEventListener('click', showAdd);
//event listener for each close button to close open popup
closeButton.forEach((button) => {
    button.addEventListener('click', function(event) {
        const eleToClose = event.target.closest('.popup > div');
        closePopup(eleToClose);
    })
})