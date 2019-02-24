const documentReady = () => {
    if (!Cookies.checkCookie('token')) {
        window.location.href = '\login.html'
    }

    const startObjects = () => {
        const noAnimationMode = Alfred.checkNoAnimationMode()
        BatAflec.start()
        Gotham.start(noAnimationMode)
        Alfred.start(noAnimationMode)

        if(Joker.checkJokerCookie()){
            Joker.start(noAnimationMode)
        }
        NavMenu.start(noAnimationMode)

        if (window.location.href.includes('history.html')) {
            prepareHistory()
        } else {
            prepareIndex()
        }
    }

    const svgList = ["batsignal", "moon", "sky", "gotham", "gotham-2", "batjet", "alfred", "joker", "joker-laugh", "bat-symbol-ico"]
    includeSvgs(svgList, startObjects)
}

const prepareIndex = () => {
    Query.start()
    setNoAnimationMode(true)
}

const prepareHistory = () => {
    QueryHistory.load(Cookies.getCookie('token'))
    setNoAnimationMode(true)
}

if (document.readyState !== 'loading') {
    documentReady();
} else {
    document.addEventListener('DOMContentLoaded', documentReady);
}