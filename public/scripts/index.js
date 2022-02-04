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


const hideSelect = (select) => {
    let visible = false;
    deleteSelected(select);

    select.setAttribute('data-open', visible);

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

    select.addEventListener('blur', () => {
        hideSelect(select);
    });

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






// Special Sections

const toggleSections = (section) => {
    let visible = fromStringToBoolean(section.getAttribute('data-opened'));

    const iconElement = section.querySelector('.icon');

    const itemsLength = section.querySelectorAll('.item').length;
    const rem = parseInt(window.getComputedStyle(section, null).fontSize);

    let heightpx = itemsLength * rem * 4;

    const sectionData = section.querySelector('.section-data');

    if (visible) {
        iconElement.style.transform = 'rotate(0deg)';

        let interval = setInterval(() => {
            if (heightpx > 0) {
                sectionData.style.height = `${heightpx - 1}px`;
                heightpx--;
            } else {
                clearInterval(interval);
            }

        }, 10 - itemsLength);

    } else {
        iconElement.style.transform = 'rotate(90deg)';

        let h = 0;
        let interval = setInterval(() => {
            if (h <= heightpx) {
                sectionData.style.height = `${h + 1}px`;
                h++;
            } else {
                clearInterval(interval);
            }

        }, 10 - itemsLength);


    }

    section.setAttribute('data-opened', !visible);

}


const closeSections = (section) => {
    const iconElement = section.querySelector('.icon');
    iconElement.style.transform = 'rotate(0deg)';

    const itemsLength = section.querySelectorAll('.item').length;
    const rem = parseInt(window.getComputedStyle(section, null).fontSize);

    let heightpx = itemsLength * rem * 4;

    const sectionData = section.querySelector('.section-data');

    let interval = setInterval(() => {
        if (heightpx > 0) {
            sectionData.style.height = `${heightpx - 1}px`;
            heightpx--;
        } else {
            clearInterval(interval);
        }

    }, 10 - itemsLength);



    section.setAttribute('data-opened', "false");
}



const sections = [...document.querySelectorAll('.special-section')];


let prevSection = null;

sections.forEach(section => {

    section.addEventListener('click', (event) => {
        if (event.target == section.children[0] || event.target == section.children[0].children[0] || event.target == section.querySelector('.icon')) {
            if (!prevSection) {
                prevSection = section;
                toggleSections(section);

            } else if (prevSection === section) {
                toggleSections(section);
            } else {
                closeSections(prevSection);
                prevSection = section;
                toggleSections(section);

            }

        }
    })
})













