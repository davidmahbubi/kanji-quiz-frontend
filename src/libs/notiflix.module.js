/**
 * Notiflix
 * 
 * https://www.notiflix.com/documentation
 */

import Notiflix from 'notiflix';

Notiflix.Notify.Init({
    // closeButton: true,
    cssAnimationStyle: 'from-right',
    success: {
        background: '#8900CE',
        notiflixIconColor: '#ffffff'
    },
    failure: {
        notiflixIconColor: '#ffffff'
    },
    warning: {
        notiflixIconColor: '#ffffff'
    }
});

Notiflix.Confirm.Init({
    okButtonBackground: '#8900CE',
    titleColor: '#8900CE',
    cssAnimationStyle: 'zoom',
})

window.Notiflix = Notiflix;