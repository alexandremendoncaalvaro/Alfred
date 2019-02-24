function createParameters(query) {
    var regex = /\$(.*?)\$/g
    var match = query.match(regex)
    if (match) {
        displayParametersDiv()
        match.forEach(parameter => {
            if (!checkParameterInputExists(parameter))
                createParameterInput(parameter)
        });
    }

    removeOldParametersInput(match)

    return match
}

function createParameterInput(parameter) {
    parameter = parameter.replace(/\$/g, '')
    var divId = 'div' + parameter
    var labelId = 'label' + parameter
    var inputId = 'input' + parameter

    $("#parameters").append("<div id='" + divId + "' class='parameter'>")
    $("#" + divId + "").append("<label id='" + labelId + "'>" + parameter + "</label>")
    $("#" + divId + "").append("<input id='" + inputId + "'></input>")
    $("#parameters").append("</div>")
}

function checkParameterInputExists(parameter) {
    parameter = parameter.replace(/\$/g, '')

    var inputId = "input" + parameter
    var input = $('#' + inputId).length

    if (input) {
        return true
    }

    return false
}

function removeOldParametersInput(parameters) {
    var divs = $('div[id^="div"]')

    if (divs != null) {
        divs.each(function (index) {
            var id = $(this).attr('id')
            if (parameters == null) {
                $('#' + id).remove()
                removeParametersDiv()
            } else {
                var shouldRemove = true

                parameters.forEach(parameter => {
                    parameter = parameter.replace(/\$/g, '')
                    if (id == 'div' + parameter)
                        shouldRemove = false
                })

                if (shouldRemove)
                    $('#' + id).remove()
            }
        })
    }
}

const ParametersWindow = (() => {
    let textAreaDiv,
        parametersDiv

    let currentStatus = {
        opened: false
    }

    const openCloseAnimationTime = 0.6

    const setDomReferences = () => {
        textAreaDiv = Element('#textAreaDiv')
        parametersDiv = Element('#parametersDiv')
    }

    const open = () => {
        setDomReferences()
        const timeline1 = new TimelineLite()
        const timeline2 = new TimelineLite()
        const easeStyle = Elastic.easeOut.config(1, 0.3)

        timeline1
            .to(textAreaDiv, openCloseAnimationTime, {
                transformOrigin: "0% 50%",
                width: "70%",
                ease: easeStyle
            })
        timeline2
            .set(parametersDiv, {
                display: "block",
                width: "0%"
            })
            .to(parametersDiv, openCloseAnimationTime, {
                width: "30%",
                ease: easeStyle
            })
            .add(() => {
                currentStatus.opened = true
            })
    }

    const close = () => {
        setDomReferences()
        const timeline1 = new TimelineLite()
        const timeline2 = new TimelineLite()
        const easeStyle = Power4.easeIn

        timeline1
            .to(textAreaDiv, openCloseAnimationTime, {
                transformOrigin: "0% 50%",
                width: "100%",
                ease: easeStyle
            })
        timeline2
            .to(parametersDiv, openCloseAnimationTime, {
                width: "0%",
                ease: easeStyle
            })
            .set(parametersDiv, {
                display: "none",
            })
            .add(() => {
                currentStatus.opened = false
            })
    }

    return {
        open: () => {
            if (!currentStatus.opened) {
                open()
            }
        },
        close: () => {
            if (currentStatus.opened) {
                close()
            }
        }
    }
})()

const displayParametersDiv = () => {
    ParametersWindow.open()
}

const removeParametersDiv = () => {
    ParametersWindow.close()
}

function getParametersValues(parameters) {
    var values = []
    if (parameters != null) {
        parameters.forEach(p => {
            p = p.replace(/\$/g, '')
            var parameterValue = $('#input' + p).val()
            values.push({
                "name": '$' + p + '$',
                "value": parameterValue
            })
        })
    }
    return values
}