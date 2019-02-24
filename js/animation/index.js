const direction = {
    CENTER: 'center',
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'

}

const batsignalAction = {
    SELECT: 'select',
    UPDATE: 'update',
    INSERT: 'insert',
    DELETE: 'delete'
}

const Element = (element) => {
    return document.querySelector(element)
}

const Elements = (element) => {
    return document.querySelectorAll(element)
}


const onresize = () => {
    const width = document.body.clientWidth
    if (typeof Gotham !== 'undefined') {
        Gotham.resizeElementsForWindow(width)
    }
}

const crossMultiplication = (x2, y1, y2) => {
    const x1 = (x2 * y1) / y2
    return x1
}

const reScaleRange = (value, minInput, maxInput, minOutput, maxOutput) => {
    const deltaValue = value - minInput
    const deltaInput = maxInput - minInput
    const deltaOutput = maxOutput - minOutput

    const result = ((deltaValue / deltaInput) * deltaOutput) + minOutput

    return result
}

window.addEventListener("resize", onresize)

const includeSvg = (personalizedAttribute) => {
    return new Promise((resolve, reject) => {
        const path = `svg/${personalizedAttribute}.svg`
        const ajax = new XMLHttpRequest()
        ajax.open("GET", path, true)
        ajax.send()
        ajax.onload = (e) => {
            const svgPlace = document.querySelector(`[svg-${personalizedAttribute}]`)
            svgPlace.outerHTML = ajax.responseText
            resolve()
        }
    })
}

const includeSvgs = (personalizedAttributes, callback) => {
    const allSvgs = personalizedAttributes.map(includeSvg)
    Promise.all(allSvgs).then(callback)
}

const validateAnyInString = (commands, query) => {
    let lastIndex = -1
    commands.forEach(command => {
        const currentindex = query.indexOf(command)
        lastIndex = currentindex > lastIndex ? currentindex : lastIndex
    });
    const result = lastIndex !== -1
    return result
}

const validateOrderInString = (commands, query) => {
    let lastIndex = -1
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index];
        const currentindex = query.indexOf(command)
        lastIndex = currentindex > lastIndex ? currentindex : -1
        if (lastIndex === -1) {
            return false
        }
    }
    return lastIndex
}

const setNoAnimationMode = noAnimationMode => {
    Cookies.createCookie("noAnimationMode", noAnimationMode)
}