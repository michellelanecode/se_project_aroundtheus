var editButton = document.querySelector(".profile__buttons-edit");
var popup = document.querySelector(".popup");
var closeButton = document.querySelector(".popup__form-close");
var profileName = document.querySelector(".profile__title");
var aboutMe = document.querySelector(".profile__subtitle");
var modalWindow = document.querySelector(".popup__form");
var first = document.getElementById("first");
var last = document.getElementById("last");
var loveButton = document.querySelectorAll(".card__lovebutton");


editButton.addEventListener("click", function (event) {
  event.preventDefault();
  popup.style.visibility= "visible";
});

closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  popup.style.visibility = "hidden";
});

modalWindow.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.innerHTML = first.value;
  aboutMe.innerHTML = last.value;
  popup.style.visibility= "hidden";
});

loveButton.forEach(function (node) {
  node.addEventListener("click", function (event) {
    if (node.classList.contains("card__lovebutton_disabled")) {
      node.className  = "card__lovebutton_active card__lovebutton"
    } else {
      node.className  = "card__lovebutton_disabled card__lovebutton"
    }
  });
});

// loveButton.addEventListener("click", function (event) {

//   if (loveButton.className === "card__lovebutton_active") {
//     loveButton.className = "card__lovebutton";
//   }
//   loveButton.className = "card__lovebutton_active";
// });
