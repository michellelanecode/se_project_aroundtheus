var editButton = document.querySelector('.profile__buttons_edit')
var popup = document.querySelector('.popup')
var closeButton = document.querySelector('.popup__form-close')
var profileName = document.querySelector('.profile__title');
var aboutMe = document.querySelector('.profile__subtitle');
var modalWindow = document.querySelector('.popup__form')
var first = document.getElementById('first')
var last = document.getElementById('last')

editButton.addEventListener('click', function (event){
		event.preventDefault();
		popup.style.display = 'block';
})

closeButton.addEventListener('click', function (event) {
	event.preventDefault();
		popup.style.display = 'none';

})

modalWindow.addEventListener('submit', function (event){
		event.preventDefault();
		profileName.innerHTML = first.value;
		aboutMe.innerHTML = last.value;
		popup.style.display = 'none';
})
