$( document ).ready(function() {
    console.log( "ready!" );

    //Validacion mail
    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
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
            "email": "Ingresa un email valido",
            "sexo": "Ingresa tu valor",
            "comentarios": "Ingresa tus comentarios"
        },
        submitHandler: function(form){
            //$(form).submit();

            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                beforeSend: function(){
                    $('.respuesta_form').html('Espera...')
                },
                success: function(response){
                    console.log(response)
                    $('.respuesta_form').show();
                    $('.respuesta_form').html('Gracias ' + response.nombre + ' por su mensaje');
                    $('.listado').html(' ');
                    loadLeads();
                }
            })
        }
      });

    const loadLeads = () =>{
        $.ajax({
            url: 'https://prog-3-leads-api-rest.vercel.app/leads',
            type: 'GET',
            success: function(response){
                $('.listado').html(' ');
                response.forEach(element => {
                    $('.listado').append('<li>' + element.nombre + '</li>')
                    if(element.sexo === "M" || element.sexo === "Male" || element.sexo === "male" || element.sexo === "H" || element.sexo === "Hombre" || element.sexo === "hombre" || element.sexo === "Masculino" || element.sexo === "masculino"){
                        $('.listado').append('<li> Masculino </li>')
                    }else if (element.sexo === "F" || element.sexo === "Female" || element.sexo === "female" || element.sexo === "Mujer" || element.sexo === "mujer" || element.sexo === "Femenino" || element.sexo === "femenino"){
                        $('.listado').append('<li> Femenino </li>')
                    }else{
                        $('.listado').append('<li> Otro </li>')
                    }
                    $('.listado').append('<li>' + element.comentarios + '</li>')
                });
            }
        })
    }

    loadLeads()
});