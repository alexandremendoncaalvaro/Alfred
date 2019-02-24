const documentReady = () => {
    if (!Cookies.checkCookie('token')) {
        window.location.href = '\login.html'
    }

    const startObjects = () => {
        BatAflec.start()
        BatmanForm.start()
    }

    const svgList = ["login-window"]
    includeSvgs(svgList, startObjects)
}

const requestRegister = () => {
    var user = $('#user').val()
    var email = $('#email').val()
    var password = $('#password').val()
    var passwordConfirm = $('#passwordConfirm').val()
    var permission = $('#permission').val()
    var token = Cookies.getCookie('token')
    var valid = validateInputs(user, email, password, passwordConfirm, permission)

    if(!valid)
        return;

    $.confirm({
        title: 'Last step:',
        content: 'Are you a robot?',
        buttons: {
            No: function(){
                $.alert('Right...')
                UserService.register(token, user,password, email, permission)
            },
            Yes: function(){
                $.alert('Liar!!')
                UserService.register(token, user,password, email, permission)
            }
        }
    })
}

const validateInputs = (user, email, password, passwordConfirm, permission) => {
    if(password != passwordConfirm){
        alert('The passwords does not match.')
        return false;
    }
    if(user == ''){
        alert('User required!')
        return false;
    }
    if(email == ''){
        alert('E-mail required!')
        return false;
    }
    if(password == ''){
        alert('Password required!')
        return false;
    }
    if(passwordConfirm == ''){
        alert('Confirm your password!')
        return false;
    }
    if(permission == '' || (permission != 1 && permission !=2 && permission != 3)){
        alert('Permission required! (1 = Developer, 2 = Support, 3 = Admin)')
        return false;
    }

    return true;
}

if (document.readyState !== 'loading') {
    documentReady();
} else {
    document.addEventListener('DOMContentLoaded', documentReady);
}