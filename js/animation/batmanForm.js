const BatmanForm = (() => {
    let batman,
        face,
        glasses,
        eyes,
        leftEar,
        rightEar,
        inputUser,
        inputEmail,
        inputPassword,
        inputPasswordConfirm,
        inputPermission,
        buttonLogin

    const maxCharsInput = 30
    const minFacePosition = -6
    const maxFacePosition = 6

    const setDomReferences = () => {
        batman = Element("#login-window #batman")
        face = Element("#login-window #batman #face")
        glasses = Elements("#login-window #batman #eyes #glasses")
        eyes = Elements("#login-window #batman #eyes > path")
        leftEar = Element("#login-window #batman #right-ear")
        rightEar = Element("#login-window #batman #left-ear")
        inputUser = Element(".parameter #user")
        inputEmail = Element(".parameter #email")
        inputPassword = Element(".parameter #password")
        inputPasswordConfirm = Element(".parameter #passwordConfirm")
        inputPermission = Element(".parameter #permission")
        buttonLogin = Element(".parameter #btLogin")
    }

    let currentStatus = {

    }

    const lookText = position => {
        const min = -7
        const max = 7
        const auxScale = Math.abs(reScaleRange(position, minFacePosition, maxFacePosition, min, max)) - max
        const yPosition = auxScale * -1
        const xScale = 1 - ((max - yPosition) / 150)
        const timeline = new TimelineLite()
        timeline
            .to(face, 0.4, {
                x: position,
                y: yPosition,
                scaleX: xScale,
                transformOrigin: "50% 50%"
            })
            .to(rightEar, 0.4, {
                x: position * 0.4,
                y: 0
            }, "-=0.4")
            .to(leftEar, 0.4, {
                x: position * 0.4,
                y: 0
            }, "-=0.4")

    }

    const typingSecret = () => {
        const timeline = new TimelineLite()
        timeline
            .to(glasses, 0.4, {
                alpha: 1
            })
    }

    const resetLook = () => {
        const timeline = new TimelineLite()
        timeline
            .to(face, 0.2, {
                x: 0,
                y: -5,
                scaleX: 1,
                transformOrigin: "50% 50%"
            })
            .to([rightEar, leftEar], 0.2, {
                x: 0,
                y: 0
            }, "-=0.2")
            .to(glasses, 0.4, {
                alpha: 0
            }, "-=0.2")
    }


    const getCoordenates = e => {
        const carPos = inputUser.selectionEnd
        const halfCharsInput = maxCharsInput / 2
        const position = carPos - halfCharsInput
        const result = reScaleRange(position, -halfCharsInput, halfCharsInput, minFacePosition, maxFacePosition)
        if (result < minFacePosition) {
            return minFacePosition
        }
        if (result > maxFacePosition) {
            return maxFacePosition
        }
        return result
    }

    const onPublicFocus = e => {
        const position = getCoordenates(e)
        lookText(position)
    }
    const onPublicBlur = e => {
        resetLook()
    }

    const onPublicInput = e => {
        const position = getCoordenates(e)
        lookText(position)
    }

    const onSecretFocus = e => {
        typingSecret()
    }

    const onSecretBlur = e => {
        resetLook()
    }

    const begin = noAnimationMode => {
        setDomReferences()
        resetLook()
    }

    const loop = () => {

    }

    const events = () => {
        if(inputUser){
            inputUser.addEventListener("focus", onPublicFocus)
            inputUser.addEventListener("blur", onPublicBlur)
            inputUser.addEventListener("input", onPublicInput)
        }
        if(inputEmail){
            inputEmail.addEventListener("focus", onPublicFocus)
            inputEmail.addEventListener("blur", onPublicBlur)
            inputEmail.addEventListener("input", onPublicInput)
        }
        if(inputPassword){
            inputPassword.addEventListener("focus", onSecretFocus)
            inputPassword.addEventListener("blur", onSecretBlur)
        }
        if(inputPasswordConfirm){
            inputPasswordConfirm.addEventListener("focus", onSecretFocus)
            inputPasswordConfirm.addEventListener("blur", onSecretBlur)
        }
    }

    return {
        start: () => {
            begin()
            loop()
            events()
        }
    }
})()