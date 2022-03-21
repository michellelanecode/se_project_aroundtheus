var editButton = document.querySelector('.profile__buttons_edit')
var popup = document.querySelector('.popup')
var closeButton = document.querySelector('.popup__form-close')
var profileName =;
var aboutMe =;

//update about me with information put into modal window





console.log(editButton);
//onclick, change display on the edit button to block instead of hidden

console.log(popup);
editButton.addEventListener('click', function (event){
		event.preventDefault();
		popup.style.display = 'block';
})

closeButton.addEventListener('click', function (event) {
	event.preventDefault();
		popup.style.display = 'none';
})