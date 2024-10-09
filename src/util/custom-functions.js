import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

export const notifySuccess = (message) => {
    iziToast.show({
        theme: 'light',
        color: 'green',
        message: message,
        position: 'topRight',
    });
}

export const notifyError = (message) => {
    iziToast.show({
        theme: 'light',
        color: 'red',
        message: message,
        position: 'topRight',
    });
}

export const notifyInfo = (message) => {
    iziToast.show({
        theme: 'light',
        color: 'blue',
        message: message,
        position: 'topRight',
    });
}

export const notifyWarning = (message) => {
    iziToast.show({
        theme: 'light',
        color: 'yellow',
        message: message,
        position: 'topRight',
    });
}