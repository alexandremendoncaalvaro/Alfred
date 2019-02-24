const documentReady = () => {
    if (Cookies.checkCookie('token')) {
        window.location.href = '\index.html'
    }

    setNoAnimationMode(false)

    const startObjects = () => {
        BatAflec.start()
        BatmanForm.start()
    }

    const svgList = ["login-window"]
    includeSvgs(svgList, startObjects)
}

const requestLogin = () => {
    var user = $('#user').val()
    var password = $('#password').val()
    UserService.login(user,password)

}

if (document.readyState !== 'loading') {
    documentReady();
} else {
    document.addEventListener('DOMContentLoaded', documentReady);
}