const BatAflec = (() => {
    const bataflec = Element("#bataflec")

    let currentStatus = {
        bataflecClothes: true
    }

    const changeClothes = () => {
        if (currentStatus.bataflecClothes) {
            bataflec.src = "./img/bataflec-2.png"
        } else {
            bataflec.src = "./img/bataflec.png"
        }
        currentStatus.bataflecClothes = !currentStatus.bataflecClothes
    }

    const begin = () => {
        bataflec.addEventListener("click", function () {
            changeClothes()
        })
    }

    return {
        start: () => {
            begin()
        }
    }
})()

const NavMenu = (() => {
    let menu,
        menuItens,
        buttonSave,
        buttonExecute,
        buttonLog,
        buttonBegining,
        buttonLogout,
        menuIcon,
        menuPin,
        batSymbol,
        batFullBody,
        wingLeft,
        wingRight

    let currentStatus = {
        pinned: false,
        opened: false,
        mouseOver: false
    }

    const batFlying = times => {
        const timelineLeft = new TimelineLite()
        const timelineRight = new TimelineLite()
        const easeStyle = Sine.easeOut
        let wingMoveTime = 0.1

        for (let index = 0; index < times + 2; index++) {
            if (index >= times) {
                wingMoveTime *= 2
            }
            timelineLeft
                .to(wingLeft, wingMoveTime, {
                    transformOrigin: "100% 50%",
                    scaleX: 0.1,
                    ease: easeStyle
                })
                .to(wingLeft, wingMoveTime, {
                    transformOrigin: "100% 50%",
                    scaleX: 1,
                    ease: easeStyle
                })
            timelineRight
                .to(wingRight, wingMoveTime, {
                    transformOrigin: "0% 50%",
                    scaleX: 0.1,
                    ease: easeStyle
                })
                .to(wingRight, wingMoveTime, {
                    transformOrigin: "0% 50%",
                    scaleX: 1,
                    ease: easeStyle
                })
        }
    }

    const getButtonQuantity = () => {
        var quantity = 0
        if(buttonLog){
            quantity++
        }
        if(buttonSave){
            quantity++
        }

        if(buttonExecute){
            quantity++
        }

        if(buttonExport){
            quantity++
        }

        if(buttonBegining){
            quantity++
        }

        if(buttonLogout){
            quantity++
        }
        return (quantity * 50) + 100
    }

    const openMenu = noAnimationMode => {
        const timeline = new TimelineLite()
        var menuSize = getButtonQuantity()
        if (noAnimationMode) {
            timeline
                .set(menu, {
                    transformOrigin: "50% 100%",
                    height: menuSize+"px",
                    borderRadius: "25px"
                })
                .set([menuItens, menuPin], {
                    display: "block"
                }, "-=0.3")
                .set(menuIcon, {
                    height: "75px"
                }, "-=0.3")
                .add(() => {
                    currentStatus.opened = true
                    if (!currentStatus.pinned && !currentStatus.mouseOver) {
                        closeMenu()
                    }
                })
        } else {
            timeline
                .to(menu, 0.5, {
                    transformOrigin: "50% 100%",
                    height: menuSize+"px",
                    borderRadius: "25px",
                    ease: Elastic.easeOut.config(1, 0.3)
                })
                .set([menuItens, menuPin], {
                    display: "block"
                }, "-=0.3")
                .set(menuIcon, {
                    height: "75px"
                }, "-=0.3")
                .add(() => {
                    currentStatus.opened = true
                    batFlying(4)
                    if (!currentStatus.pinned && !currentStatus.mouseOver) {
                        closeMenu()
                    }
                })
        }
    }

    const closeMenu = () => {
        const timeline = new TimelineLite()
        timeline
            .set([menuItens, menuPin], {
                display: "none"
            })
            .set(menuIcon, {
                height: "100px"
            })
            .to(menu, 0.5, {
                transformOrigin: "50% 100%",
                height: "100px",
                borderRadius: "50px",
                ease: Bounce.easeOut
            })
            .add(() => {
                currentStatus.opened = false
            })
    }

    const icoFlying = () => {
        const timeline = new TimelineLite()
        const currentHeight = window.screen.height

        batFlying(50)
        timeline
            .to(batSymbol, 3, {
                left: "-600px",
                top: `-${currentHeight}px`
            })
            .set(batSymbol, {
                display: "none"
            })
            .to(batSymbol, 10, {})
            .add(() => {
                batFlying(10)
            })
            .set(batFullBody, {
                y: 100
            })
            .set(batSymbol, {
                display: "block",
                left: "0px",
                top: "25px"
            })
            .to(batFullBody, 1, {
                y: 0,
                ease: Expo.easeOut
            })
    }

    const refreshPinStatus = () => {
        if (currentStatus.pinned) {
            menuPin.classList.add("menu-pinned")
        } else {
            menuPin.classList.remove("menu-pinned")
        }
    }

    const getMenuCookie = () => {
        if (Cookies.checkCookie("menu")) {
            var isTrueSet = (Cookies.getCookie("menu") === 'true');
            currentStatus.pinned = isTrueSet
        }
    }

    const setMenuCookie = () => {
        Cookies.createCookie("menu", currentStatus.pinned)
    }

    const setDomReferences = () => {
        menu = Element("#buttons-menu")
        menuItens = Elements("#buttons-menu > ul li")
        buttonLog = Element("[run-log]")
        buttonSave = Element("[run-save]")
        buttonExecute = Element("[run-execute]")
        buttonExport = Element("[run-export]")
        buttonBegining = Element("[run-begining]")
        buttonLogout = Element("[run-logout]")
        menuIcon = Element("#menu-icon")
        menuPin = Element("#pin-menu")
        batSymbol = Element("#bat-symbol-ico")
        batFullBody = Element("#bat-symbol-ico #bat-full-body")
        wingLeft = Element("#bat-symbol-ico #wing-left")
        wingRight = Element("#bat-symbol-ico #wing-right")
    }

    const begin = noAnimationMode => {
        setDomReferences()
        getMenuCookie()
        refreshPinStatus()
        const timeline = new TimelineLite()
        if (noAnimationMode) {
            timeline
                .set(menu, {
                    display: "block"
                })
        } else {
            timeline
                .to(menu, 0.5, {})
                .set(menu, {
                    display: "block",
                    autoAlpha: 0,
                    scale: 0.2
                })
                .to(menu, 0.4, {
                    autoAlpha: 1,
                    scale: 1
                })
                .to(batSymbol, 0.5, {
                    rotation: 1080,
                    transformOrigin: "50% 50%",
                    ease: Power1.easeOut
                }, "-=0.4")
        }
        timeline
            .add(() => {
                if (currentStatus.pinned) {
                    openMenu(noAnimationMode)
                }
            })
    }

    const events = () => {
        menu.addEventListener("mouseenter", () => {
            currentStatus.mouseOver = true
            if (!currentStatus.pinned && !currentStatus.opened) {
                openMenu()
            }
        })
        menu.addEventListener("mouseleave", () => {
            currentStatus.mouseOver = false
            if (!currentStatus.pinned && currentStatus.opened) {
                closeMenu()
            }
        })

        if(buttonLog){
            buttonLog.addEventListener("click", () => {
                window.location.href = '\history.html'
            })
        }

        if(buttonSave){
            buttonSave.addEventListener("click", () => {
                alert('Você está salvando a query')
            })
        }

        if(buttonExecute){
            buttonExecute.addEventListener("click", () => {
                Query.executar(parameters)
            })
        }

        if(buttonExport){
            buttonExport.addEventListener("click", () => {
                var table = ''

                if (window.location.href.includes('history.html'))
                    table = 'queryHistory'
                else if (window.location.href.includes('index.html'))
                        table = 'resultTable'

                if(table == '')
                    return
                ExcelExporter.exportExcel(table)
            })
        }

        if(buttonBegining){
            buttonBegining.addEventListener("click", () => {
                window.location.href = '\index.html'
            })
        }

        if(buttonLogout){
            buttonLogout.addEventListener("click", () => {
                Cookies.deleteCookie('token')
                window.location.href = '\login.html'
            })
        }

        menuPin.addEventListener("click", () => {
            currentStatus.pinned = !currentStatus.pinned
            setMenuCookie()
            refreshPinStatus()
        })

        batSymbol.addEventListener("click", () => {
            icoFlying()
        })
    }

    return {
        start: noAnimationMode => {
            begin(noAnimationMode)
            events()
        }
    }
})()