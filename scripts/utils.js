import { Card } from "./Card.js"
import * as constant from "./constants.js"
import {closeOpenedPopup, closePopupWithEscape} from "./index.js"

function closePopup(popupElement) {
    constant.popup.classList.remove('popup_active')
    popupElement.classList.remove('popup__container_active')
    document.removeEventListener("keydown", closePopupWithEscape)
}

function openPopup(popupElement) {
        constant.popup.classList.add('popup_active')
        popupElement.classList.add('popup__container_active')
        document.addEventListener("keydown", closePopupWithEscape)
}

export {closePopup, openPopup}