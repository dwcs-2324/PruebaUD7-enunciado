

const BASE_URL = "http://localhost:3000/controller/FrontController.php";


const OK_TEXT = "Aceptar";
const CANCEL_TEXT = "Cancelar";

const ADMIN_ROLE = 1;
//Page titles
const LOGIN_TITLE = 'Login';
const REGISTER_TITLE = "Regístrese aquí";
//Ids de las vistas
const LOGIN_VIEW_ID = "login";
const REGISTER_VIEW_ID = "registerSection";
const MAIN_VIEW_ID = "main";
var viewIdsArray = [LOGIN_VIEW_ID, REGISTER_VIEW_ID, MAIN_VIEW_ID];
//Tipos de mensajes
const ERROR_MSG_TYPE = "danger";
const SUCCESS_MSG_TYPE = "success";




window.onload = onceLoaded;


function onceLoaded() {

    console.log("window loaded");
    document.querySelector('#formLogin').onsubmit = loginJSON;
    document.querySelector('#formLogout').onsubmit = function (event) {
        //evitamos que se envíe el formulario
        event.preventDefault();
        showModal('spa_modal', 'Confirmación',
                '¿Está seguro/a de que desea cerrar sesión?',
                'Sí', 'No', logout, null);
    };
    getRoles();

    document.querySelector("#loginLink").onclick = () => {
        showView(LOGIN_VIEW_ID);
        setPageTitle(LOGIN_TITLE);
        setEmail('')
    }

    

}



/**
 * Muestra un mensaje o no en función del parámatro show(true/false). 
 * @param {string} msg  mensaje a mostrar
 * @param {boolean} show true/false para indicar si se mostrará o no el mensaje
 * @param {string} type será del tipo (success/danger, otros por definir) de Bootstrap mediante las constantes ERROR_MSG_TYPE y SUCCESS_MSG_TYPE
 */
function showMsg(msg, show, type) {
    var divMsg = document.getElementById("divMsg");
    if (show) {
        divMsg.innerHTML = msg;
        divMsg.classList.remove('invisible');
        divMsg.classList.forEach(cssClass => {
            if (cssClass.startsWith('alert-')) {
                divMsg.classList.remove(cssClass);
            }
        });
        divMsg.classList.add('alert-' + type);

        setTimeout(function () {
            divMsg.innerHTML = '';
            divMsg.classList.add('invisible');
        }
        , 2000);
    } else {
        divMsg.innerHTML = '';
        divMsg.classList.add('invisible');
    }
}


function setPageTitle(title) {
    titleEl = document.getElementById('pageTitle');
    titleEl.innerHTML = title;
}


/**
 * Muestra la section de la vista cuyo id se envía por parámetro y oculta las demás secciones del array viewIdsArray.
 * Para que tenga efecto el viewId tiene que formar parte del array viewIdsArray
 * @param {string} viewId cadena de texto con el id de la vista a mostrar. Se recomienda uso de constantes definidas globalmente.
 */
function showView(viewId) {


    let usuarioCabecera = document.getElementById('userHeader');


    for (let index = 0; index < viewIdsArray.length; index++) {
        const tempViewId = viewIdsArray[index];
        if (tempViewId === viewId) {
            show(document.getElementById(viewId), true);
        } else {
            show(document.getElementById(tempViewId), false);
        }
    }

    show(usuarioCabecera, (viewId === MAIN_VIEW_ID));



}


/**
 * Establece el email en la cabecera. Si se pasa cadena vacía, vacía el contenido del main
 * @param {string} email email a mostrar en cabecera o cadena vacía para vaciar la cabecera y el main
 */
function setEmail(email) {
    let emailHeader = document.getElementById('email_header');
    emailHeader.innerHTML = email;
    show(emailHeader, true);
    if (email === '') {
        show(emailHeader, false);
        let mainContent = document.getElementById(MAIN_VIEW_ID + 'Content');
        mainContent.innerHTML = '';
    }
}

/**
 * Muestra el mensaje de disponibilidad de email o su falta de disponibilidad, cambiando el estilo css en cada caso
 * @param {boolean} available true si está disponible, false en caso contrario
 */
function showEmailFeedback(available) {
    let email = document.getElementById('emailRegister');
    let emailFeedback = document.getElementById('emailFeedback');

    if (available) {
        addAvailableCssClass(email, true);
        addAvailableCssClass(emailFeedback, true);
        emailFeedback.innerHTML = email.value + " está disponible";

        show(emailFeedback, true);
    } else {
        addAvailableCssClass(email, false);
        addAvailableCssClass(emailFeedback, false);

        emailFeedback.innerHTML = email.value + " no está disponible";
        show(emailFeedback, true);

    }
}

/**
 * Añada una clase css para mostrar disponibilidad/falta de disponibilidad a un elmento HTML
 * @param {HTMLElement} htmlElement elemento que recibirá la clase css
 * @param {boolean} available true si está disponible, false en caso contrario
 */
function addAvailableCssClass(htmlElement, available) {
    if (available) {
        htmlElement.classList.remove('unavailable');
        htmlElement.classList.add('available');
    } else {
        htmlElement.classList.remove('available');
        htmlElement.classList.add('unavailable');
    }
}

/**
 * Muestra/oculta un elemento html
 * @param {HTMLElement} htmlElement objeto html a mostrar/ocultar
 * @param {boolean} show true para mostrar, false para ocultar 
 */
function show(htmlElement, show) {
    if (show) {
        // hay que mostrar 
        htmlElement.classList.remove('d-none');
    } else {
        // hay que ocultar
        htmlElement.classList.add('d-none');
    }
}