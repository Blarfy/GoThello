const popup = (prompt, func, buttonText) => {
    if (!buttonText) buttonText = 'OK';
    const popupContainer = document.createElement('div');
    popupContainerStyle(popupContainer);
    document.body.appendChild(popupContainer);
    const popup = document.createElement('div');
    popupStyle(popup);
    const popupText = document.createElement('p');
    popupText.innerText = prompt;
    popup.appendChild(popupText);
    const popupExitButton = document.createElement('div')
    popupButtonStyle(popupExitButton);
    popupExitButton.innerText = buttonText;
    popupExitButton.addEventListener('click', () => {
        if (func) func();
        popupContainer.remove();
    })
    popup.appendChild(popupExitButton);
    popupContainer.appendChild(popup);
}

const popupConfirm = (prompt, func, buttonYesText, buttonNoText) => {
    const popupContainer = document.createElement('div');
    popupContainerStyle(popupContainer);
    document.body.appendChild(popupContainer);
    const popup = document.createElement('div');
    popupStyle(popup);
    const popupText = document.createElement('p');
    popupText.innerText = prompt;
    popup.appendChild(popupText);

    const popupButtonContainer = document.createElement('div');
    popupButtonContainer.style.display = 'flex';
    popupButtonContainer.style.justifyContent = 'space-between';
    popup.appendChild(popupButtonContainer);
    const popupExitButton = document.createElement('div')
    const popupConfirmButton = document.createElement('div')
    popupButtonStyle(popupExitButton);
    popupExitButton.style.backgroundColor = '#bb4a4a';
    popupButtonStyle(popupConfirmButton);
    popupExitButton.innerText = buttonNoText ? buttonNoText : 'Cancel';
    popupConfirmButton.innerText = buttonYesText ? buttonYesText : 'Confirm';
    popupButtonContainer.appendChild(popupExitButton);
    popupButtonContainer.appendChild(popupConfirmButton);
    popupExitButton.addEventListener('click', () => {
        popupContainer.remove();
    })
    popupConfirmButton.addEventListener('click', () => {
        if (func) func();
        popupContainer.remove();
    })
    popupContainer.appendChild(popup);
}


const popupContainerStyle = (domObject) => {
    domObject.style.position = 'absolute';
    domObject.style.top = '0';
    domObject.style.left = '0';
    domObject.style.width = '100%';
    domObject.style.height = '100%';
    domObject.style.backgroundColor = 'rgba(0,0,0,0.5)';
    domObject.style.display = 'flex';
    domObject.style.justifyContent = 'center';
    domObject.style.alignItems = 'center';
}

const popupStyle = (domObject) => {
    domObject.style.backgroundColor = '#272522';
    domObject.style.color = 'white';
    domObject.style.fontFamily = "sans-serif"
    domObject.style.padding = '20px';
    domObject.style.borderRadius = '10px';
    domObject.style.borderColor = 'white';
    domObject.style.borderWidth = '0px';
    domObject.style.borderStyle = 'solid';
    domObject.style.boxShadow = '0 0 10px 0 rgba(0,0,0,0.5)';
    domObject.style.textAlign = 'center';
    domObject.style.minWidth = '300px';
    domObject.style.minHeight = '200px';
    domObject.style.display = 'flex';
    domObject.style.flexDirection = 'column';
    domObject.style.justifyContent = 'space-around';
}

const popupButtonStyle = (domObject) => {
    domObject.classList.add('button');
    domObject.style.minWidth = '100px';
    domObject.style.minHeight = '30px';
    domObject.style.margin = '0 auto';
}