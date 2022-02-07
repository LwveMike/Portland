
// helper functions

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


const rotateIcon = (icon, deg) => {
    icon.style.transform = `rotate(${deg}deg)`;
}




const toggleVisual = (section) => {

    let visible = fromStringToBoolean(section.getAttribute('data-opened'));
    const arrowIcon = section.querySelector('.icon');
    const sectionData = section.querySelector('.section-data');
    const itemsLength = sectionData.querySelectorAll('.item').length;



    if (visible) {
        rotateIcon(arrowIcon, 0);
        sectionData.style.maxHeight = '0';
    } else {
        rotateIcon(arrowIcon, 90);
        sectionData.style.maxHeight = `${itemsLength * 4.01}rem`;
    }

    section.setAttribute('data-opened', !visible);

}

const closeVisual = (section) => {

    const arrowIcon = section.querySelector('.icon');
    const sectionData = section.querySelector('.section-data');

    rotateIcon(arrowIcon, 0);
    sectionData.style.maxHeight = '0';

    section.setAttribute('data-opened', false);

}






// Initialization


const selectInit = () => {
    const selects = [...document.querySelectorAll('.my-select')];

    selects.forEach(select => {
        let defaultValue = select.querySelector('.options').children[0].textContent;

        let selectedValue = select.querySelector('.my-select-selected');
        selectedValue.textContent = defaultValue;
    });

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

}


const visualInit = () => {

    let prevSection = null;


    const sections = document.querySelectorAll('.special-section');

    sections.forEach(section => {
        const visual = section.querySelector('.visual');

        visual.addEventListener('click', () => {

            if (prevSection === null) {
                prevSection = section;
                toggleVisual(prevSection);
            } else if (prevSection === section) {
                toggleVisual(section);
            } else {
                closeVisual(prevSection);
                prevSection = section;
                toggleVisual(section);
            }


        })
    })

}




// main


(function main() {
    selectInit();
    visualInit()
})();


















