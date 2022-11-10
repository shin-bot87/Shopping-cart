//Author: Ivan Dapena Morillo


$(document).ready(function() {
    //entrarImagen
    $('#acceso-rapido > img').mouseenter(function() {
        $(this).addClass('seleccionado');
    });
    //salirImagen
    $('#acceso-rapido > img').mouseleave(function() {
        $(this).removeClass('seleccionado');
    });
    //borrarProducto
    $('#boton-borrar-ultimo').click(function() {
        $('#la-lista > li:last-child').slideUp('slow', function() {
            $(this).remove();
            if ($('#la-lista > li').length == 0) {
                mostrarListaVacia();
            }
        });
    });
    //borrarTodosProductos
    $('#boton-borrar-todo').click(function() {
        $('#la-lista > li').remove();
        mostrarListaVacia();
    });
    //insertarProductoEnLista
    $('#boton-insertar').click(function() {
        addElementInList($('#texto-producto').val());
        ocultarListaVacia();
    });
    //pulsarImagen
    $('#acceso-rapido').click(function(event) {
        addElementInList(event.target.alt);
        ocultarListaVacia();
    });
    //cargar la lista del usuario
    $('#boton-cargar-lista').click(function(event) {
        getUserInfo($('#usuario').val())
        .done(function(data) {
            data.productos.forEach((prod) => {
                addElementInList(prod.nombre, prod.comprado);
            });
        })
        .fail(function() {
            alert('No se puede cargar la lista');
        })

    });

});

//Oculta la imagen del carrito cuando hay elementos en la lista
function ocultarListaVacia() {
    $('#lista-vacia').removeClass('esVisible');
}

//Muestra la imagen del carrito cuando la lista esta vacia
function mostrarListaVacia() {
    $('#lista-vacia').addClass('esVisible');
    $('#lista-vacia > img').css('width', '0px');
    $('#lista-vacia > img').animate(

        {
            width:'200px'
        },
        500
    );
    
}

//FUNCION QUE DEVUELVE EL NOMBRE DE USUARIO INTRODUCIDO  
function getUserInfo(userName) {
    return $.getJSON(`${userName}.json`);
}

//FUNCION PARA SUBRAYAR EL TEXTO CUANDO SE HACE CLICK EN EL CHECKBOX
function addChangeEvent(inputEl) {
    inputEl.change(function(evento){
        let spanEl = $(evento.currentTarget).siblings('span.producto');
        spanEl.toggleClass('comprado');
    });
}

//FUNCION PARA ELIMINAR UN ELEMENTO AL HACER CLICK EN EL ICONO DE LA PAPELERA
function addRemoveEvent(ctaEl) {
    ctaEl.click(function(evento){
        $(evento.currentTarget).parent().slideUp( "slow", function() {
            $(evento.currentTarget).parent().remove();

            if ($('#la-lista > li').length == 0) {
                mostrarListaVacia();
            }

        });
        

    });
}


//FUNCION PARA AGREGAR ELEMENTOS A LA LISTA Y QUE EVALUA LA CLASE .marcar-comprado
function addElementInList(textContent, isComprado) {
    const classComprado = isComprado ? 'comprado' : '';
    const checked = isComprado ? 'checked' : '';
    const liEl = $('<li>');
    const inputEl = $(`<input class='marcar-comprado' type='checkbox' ${checked}/>`);
    const spanEl = $(`<span class='producto ${classComprado}'>${textContent}</span>`);
    const imgEl = $(`<img class='icono-borrar' src='img/delete-icon.png' alt='Borrar'>`);
    liEl
        .append(inputEl)
        .append(spanEl)
        .append(imgEl);

    $('#la-lista').append(liEl);

    addChangeEvent(inputEl);
    addRemoveEvent(imgEl)
    ocultarListaVacia();
}