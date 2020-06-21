import Notiflix from 'notiflix';

Notiflix.Notify.Init({
    closeButton: true,
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

window.Notiflix = Notiflix;