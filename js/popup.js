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
    domObject.style.backgroundColor = '#123351';
    domObject.style.color = 'white';
    domObject.style.fontFamily = "ChunkFive, sans-serif"
    domObject.style.padding = '20px';
    domObject.style.borderRadius = '10px';
    domObject.style.borderColor = 'white';
    domObject.style.borderWidth = '3px';
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