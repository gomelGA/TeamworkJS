function registerAction() {
    let registrationData = {
        username: $('#username').val(),
        password: $('#password').val(),
        age: $('#age').val(),
        gender: $('input[name="gender"]:checked').val()
    };

    $.ajax({
            url: "/registerUser",
            type: 'POST',
            data: registrationData,
            success: function(res) {
                console.log(res)
            }
        }
    );
}