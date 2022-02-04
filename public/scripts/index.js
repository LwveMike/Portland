const selects = [...document.querySelectorAll('.my-select')];


// Initialization

selects.forEach(select => {
    let defaultValue = select.querySelector('.options').children[0].textContent;

    let selectedValue = select.querySelector('.my-select-selected');
    selectedValue.textContent = defaultValue;
});


const fromStringToBoolean = string => string === 'true' ? true : false;


const toggleSelect = (select) => {
    let visible = fromStringToBoolean(select.getAttribute('data-open'));

    changeArrow(visible, select);
    deleteSelected(select);

    select.setAttribute('data-open', !visible);
}


const deleteSelected = (select) => {
    const currentValue = select.querySelector('.my-select-selected').textContent;

    const options = [...select.querySelectorAll('.option')];

    options.forEach(option => {
        if (currentValue === option.textContent) {
            option.classList.remove('visible');
            option.classList.add('invisible');
        } else {
            option.classList.add('visible');
            option.classList.remove('invisible');
        }
    })
}

const changeArrow = (isOpen, select) => {
    const iconElement = select.querySelector('.icon');

    if (isOpen) {
        iconElement.style.transform = 'rotate(0deg)';
    } else {
        iconElement.style.transform = 'rotate(180deg)';
    }
}


const changeValue = (select, option) => {
    const valueElement = select.querySelector('.my-select-selected');

    const value = option.textContent;

    valueElement.textContent = value;
}



selects.forEach(select => {

    select.addEventListener('click', () => {
        toggleSelect(select);

        const options = [...select.querySelectorAll('.option')];

        options.forEach(option => {
            option.addEventListener('click', () => {
                changeValue(select, option);
            })
        })

    })
})










