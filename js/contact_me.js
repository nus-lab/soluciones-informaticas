$(function () {

    $("#contact-form").on("submit", function (event) {
        event.preventDefault();

        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();

        if (!name || !email || !message) {
            alert("Completa todos los campos");
            return;
        }

        var telegramURL =
            "https://api.telegram.org/bot1317860382:AAG8V1yhqiyWUZPj_j0at8wu6ddot5SP90Q/sendMessage" +
            "?chat_id=263109730" +
            "&text=" +
            encodeURIComponent(
                "📩 Nuevo mensaje\n\n" +
                "👤 Nombre: " + name +
                "\n📧 Correo: " + email +
                "\n💬 Mensaje: " + message
            );

        fetch(telegramURL)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    $("#success").html(`
                        <div class="alert alert-success">
                            <strong>Gracias ${name}, tu mensaje fue enviado.</strong>
                        </div>
                    `);
                    $("#contact-form")[0].reset();
                } else {
                    alert("No se pudo enviar el mensaje.");
                }
            })
            .catch(() => {
                alert("Error de conexión con Telegram.");
            });

    });

});
