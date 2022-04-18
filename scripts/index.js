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
const subtitle = document.querySelector('.popup__image-text');

const updateLikeButton = function(button) {
    button.classList.toggle("card__lovebutton_active");
};

const openImagePopup = function(photoInfo) {
    subtitle.textContent = photoInfo.name;
    photoPopup.src = photoInfo.link;
    photoPopup.alt = photoInfo.name;
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
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__caption').textContent = name;
    cardElement.querySelector('.card__lovebutton').addEventListener('click', function(event) {
        updateLikeButton(event.target)
    });
    cardImage.addEventListener('click', function(event) {
        const obj = { name: event.target.alt, link: event.target.src };
        openImagePopup(obj)
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
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const closeButton = document.querySelectorAll('.popup__form-close')
const profileSubmitForm = document.querySelector('.popup__form_type_edit');
const cardCreateForm = document.querySelector('.popup__form_type_add');
const addPopupSubmitButton = addPopup.querySelector(".popup__button");
const disableButtonClass = "popup__button_disabled"
const showEdit = function() {
    name.value = profileName.textContent;
    aboutInfo.value = aboutName.textContent;
    openPopup(editPopup);
}

const showAdd = function() {
    openPopup(addPopup)
    disableSubmitButton(addPopupSubmitButton, disableButtonClass);
}

const closePopup = function(popupElement) {
    popup.classList.remove('popup_active')
    popupElement.classList.remove('popup__container_active')
    document.removeEventListener("keydown", closePopupWithEscape)
}

const openPopup = function(popupElement) {
    popup.classList.add('popup_active')
    popupElement.classList.add('popup__container_active')
    document.addEventListener("keydown", closePopupWithEscape)
}

const fillProfileForm = function() {
    profileName.textContent = name.value;
    aboutName.textContent = aboutInfo.value;
}

const updateProfile = function(event) {
    event.preventDefault();
    fillProfileForm();
    closePopup(editPopup);
};


const closeOpenedPopup = function() {
    const openedPopup = document.querySelector('.popup__container_active')
    closePopup(openedPopup);
}

const closePopupWithEscape = function(event) {
    if (event.key === "Escape") {
        closeOpenedPopup();
    }
}

//events
popup.addEventListener('mousedown', function(event) {
    if (event.target === event.currentTarget) {
        closeOpenedPopup()
    }
});


profileSubmitForm.addEventListener('submit', updateProfile);

cardCreateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newCard = { name: imageTitle.value, link: imageUrl.value }
    renderCard(createCard(newCard));
    closePopup(addPopup);
    cardCreateForm.reset();
})

editButton.addEventListener('click', showEdit)

addButton.addEventListener('click', showAdd);

closeButton.forEach((button) => {
    button.addEventListener('click', function(event) {
        closeOpenedPopup();
    })
})