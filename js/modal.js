/**
 *  Muestra un modal con el id especificado (sin #) Se añade el listener del evento que indica el cierre del modal solo si se acepta (más eficiente)
 * @param {string} modal_id
 * @param {string} title Titulo del modal
 * @param {string}  msg Mensaje con la pregunta que se planteará al usuario
 * @param {string} opt_ok_text Texto a mostrar en el botón de Aceptar. Si no existe, se mostrará el contenido en el html inicialmente.
 * @param {string} opt_cancel_text Texto a mostrar en el botón de Cancelar. Si no existe, se mostrará el contenido en el html inicialmente.
 * @param {callable} opt_ok_function Función a ejecutar si el usuario ha hecho clic en el botón de aceptar. Se deberá ejecutar después de cerrar el diálogo. Si no se aporta una función, simplemente se cerrará el diálogo.
 * @param {callable} opt_cancel_function Función a ejecutar si el usuario ha hecho clic en el botón de cancelar. Se deberá ejecutar después de cerrar el diálogo.  Si no se aporta una función, simplemente se cerrará el diálogo.
 
 */
function showModal(modal_id, title, msg,
    opt_ok_text = null,
    opt_cancel_text = null,
    opt_ok_function = null,
    opt_cancel_function = null) {


//Se crea con un objeto options, pero no se pedía en el 
let myModal = new bootstrap.Modal(document.getElementById(modal_id), {backdrop: 'static', keyboard: true, focus: true});

let modal_id_selector = '#' + modal_id;

let title_el = document.querySelector(modal_id_selector + ' #modal_title');
let msg_el = document.querySelector(modal_id_selector + '  #modal_msg');
let optok_el = document.querySelector(modal_id_selector + '  #opt_ok');
let optcancel_el = document.querySelector(modal_id_selector + '  #opt_cancel');

title_el.innerHTML = title;
msg_el.innerHTML = msg;


if (opt_ok_text !== null) {
    optok_el.innerHTML = opt_ok_text;
} else {
    optok_el.innerHTML = OK_TEXT;
}

if (opt_cancel_text !== null) {
    optcancel_el.innerHTML = opt_cancel_text;
} else {
    optcancel_el.innerHTML = CANCEL_TEXT;
}

let myModalEl = document.getElementById(modal_id);
//Este evento se dispara cuando se termina de mostrar el modal, tanto si el usuario ha hecho clic en OK, NOK o ninguna opción.


optok_el.onclick = function () {
    //establecemos los flags del botón sobre el que se ha hecho clic y  reiniciamos el valor del otro botón a false
    ok_clicked = true;
    cancel_clicked = false;

    myModalEl.addEventListener('hidden.bs.modal', function (event) {

        if (opt_ok_function !== null) {
            opt_ok_function();
        }

    }, {once: true});
    //Con once:true 
    //nos aseguramos de que solo se ejecute una vez y que justo después se quite el manejador de enventos
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener


    myModal.hide();



};
optcancel_el.onclick = function () {

    myModalEl.addEventListener('hidden.bs.modal', function (event) {

        if (opt_cancel_function !== null) {
            opt_cancel_function();
        }

    }, {once: true});
    //Con once:true 
    //nos aseguramos de que solo se ejecute una vez y que justo después se quite el manejador de enventos
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener


    myModal.hide();
};

//Establecemos el foco en OK button con el evento que nos avisa de que se ha mostrado el modal al usuario
/*Due to how HTML5 defines its semantics, the autofocus HTML attribute has no effect in Bootstrap modals. To achieve the same effect, use some custom JavaScript:
 * 
 */
myModalEl.addEventListener('shown.bs.modal', function () {
    optok_el.focus();
}, {once: true});

//Finalmente mostramos el modal
myModal.show();

}
