"use strict";

(function () {
    let Contacto = {};

    Contacto = (function () {

        let eventos = () => {

            let formContacto = $("#formContacto");

            formContacto.validate({
                rules: {
                    nombre: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    celular: {
                        required: true,
                        digits: true,
                        minlength: 7
                    },
                    empresa: "required",
                    metraje: "required"
                },
                messages: {
                    nombre: "Por favor, ingrese su nombre.",
                    email: {
                        required: "Por favor, ingrese un correo electrónico.",
                        email: "Por favor, ingrese un correo electrónico válido."
                    },
                    celular: {
                        required: "Por favor, ingrese un número de contacto.",
                        minlength: "Por favor, no escriba menos de {0} caracteres.",
                        digits: "Por favor, escriba sólo dígitos."
                    },
                    empresa: "Este campo es obligatorio.",
                    metraje: "Este campo es obligatorio."
                },
                event: "blur",
                debug: false,
                errorElement: "label",
                submitHandler: function (form) {
                    $('#formContacto').fadeOut('fast', function () {
                        $("#result").show();
                        $("#result").html("<img src='assets/images/loader.gif' style='vertical-align:middle;margin:0 10px 0 0' /><span>Processing ...</span>");
                    });
                    var parametros = formContacto.serialize();
                    $.ajax({
                        type: "POST",
                        url: formContacto.attr('action'),
                        contentType: "application/x-www-form-urlencoded",
                        //processData: true,
                        data: parametros,
                        success: function (msg) {
                            $("#result").hide();
                            $("#mensajePanel").fadeIn("fast");
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                }
            });
        };

        return {
            init: function () {
                eventos();
            }
        };

    }());

    Contacto.init();

} () );

alert(123)