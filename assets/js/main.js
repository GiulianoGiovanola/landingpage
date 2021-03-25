$( document ).ready(function() {
    console.log( "ready!" );

    //Validacion mail
    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)@\w+([-.]\w+)\.\w+([-.]\w+)*$/.test(value);
        },
        "Ingresá una dirección de email"
    );

    $( "#main_form" ).validate({
        rules: {
            "nombre": {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            "email": {
                required: {
                    depends: function () {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                customemail: true
            },
            "sexo":{
                required: true
            },
            "comentarios": {
                required: true
            },
        },
        messages:{
            "nombre": "Ingresa tu nombre",
            "email": "Ingresa tu email valido",
            "sexo": "Ingresa tu valor",
            "comentarios": "Ingresa tus comentarios"
        },
        submitHandler: function(form){
            //$(form).submit();

            $ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                beforeSend: function(){
                    $('.respuesta_form').html('Espera...')
                },
                success: function(response){
                    console.log(response)
                    $('.respuesta_form').show();
                    $('.respuesta_form').html('Gracias ' + response.nombre + ' por su mensaje')
                }
            })
        }
      });
});