$(document).ready(function () {
    // Getting references to our form and input
    var createButton = $("#createAccount");
    var emailInput = $("input#signup-email");
    var passwordInput = $("input#signup-password");
    var userName = $("input#user-name");
    var firstName = $("input#first-name");
    var lastName = $("input#last-name");
    // When the signup button is clicked, we validate the email and password are not blank
    createButton.on("click", function (event) {
        event.preventDefault();
        console.log(emailInput.val().trim())
        var userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            userName: userName.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.firstName || !userData.lastName || !userData.userName || !userData.email || !userData.password) {
            return;
        }
        console.log(userData.email)
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.firstName, userData.lastName, userData.userName, userData.email, userData.password);
        firstName.val("");
        lastName.val("");
        userName.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, userName, email, password) {

        $.ajax({
            method: "POST",
            url: "/api/signup",
            data: {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            }
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, handle it by throwing up a boostrap alert
        })

    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});