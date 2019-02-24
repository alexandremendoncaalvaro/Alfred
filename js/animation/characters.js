const Alfred = (() => {
    let alfred,
        shadow,
        fullBody,
        legRightFull,
        armRightFullPos1,
        armRightFullPos2,
        armRightFullPos3,
        thumbRightPos3,
        armRightFull,
        armLeftFull,
        batsignRemoteButton,
        body,
        necktie,
        legLeftFull,
        head,
        mustache,
        eyes,
        belt,
        drop,
        animatedItens

    const timeline1 = new TimelineLite()
    const timeline2 = new TimelineLite()
    const timeline3 = new TimelineLite()
    const timeline4 = new TimelineLite()

    const setDomReferences = () => {
        alfred = Element("#alfred")
        shadow = Element("#alfred #shadow")
        fullBody = Element("#alfred #full-body")
        legRightFull = Element("#alfred #leg-right-full")
        armRightFullPos1 = Element("#alfred #arm-right-full-pos-1")
        armRightFullPos2 = Element("#alfred #arm-right-full-pos-2")
        armRightFullPos3 = Element("#alfred #arm-right-full-pos-3")
        thumbRightPos3 = Element("#alfred #hand-right-thumb-pos-3")
        armRightFull = Element("#alfred #arm-right-full")
        armLeftFull = Element("#alfred #arm-left-full")
        batsignRemoteButton = Element("#alfred #batsign-remote-button")
        body = Element("#alfred #body")
        necktie = Element("#alfred #necktie")
        legLeftFull = Element("#alfred #leg-left-full")
        head = Element("#alfred #head")
        mustache = Element("#alfred #mustache")
        eyes = Element("#alfred #eyes")
        belt = Element("#alfred #belt")
        drop = Element("#alfred #drop")
        animatedItens = [armRightFullPos2, armRightFullPos3, belt, drop]
    }

    const armPosition = {
        UP: 'up',
        BENDED: {
            OUTSIDE: 'bended.outside',
            INSIDE: 'bended.inside'
        },
        DOWN: 'down'
    }

    let currentStatus = {
        headSide: 1,
        rightArmPosition: armPosition.DOWN
    }

    const begin = devMode => {
        setDomReferences()

        timeline1
            .set(animatedItens, {
                autoAlpha: 0
            })

        if (devMode) {
            timeline1
                .set([fullBody, shadow], {
                    x: 0
                })
                .set(alfred, {
                    visibility: "visible",
                })
        } else {
            timeline1
                .set([fullBody, shadow], {
                    scale: 0.5,
                    transformOrigin: "50% 100%",
                    x: 150,
                    y: -50
                })
                .set(alfred, {
                    visibility: "visible",
                })
                .to([fullBody, shadow], 2.7, {
                    scale: 1,
                    transformOrigin: "50% 100%",
                    x: 0,
                    y: 0,
                    ease: Power1.easeOut
                })
            walk(3)
        }
    }

    const loop = () => {
        const timelineLoop = new TimelineLite({
            onComplete: function () {
                this.restart()
            }
        })

        timelineLoop
            .to(eyes, 0.1, {
                scaleY: 0,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 1,
                transformOrigin: "0% 50%"
            })
            .addPause(5)
    }

    const events = () => {
        head.addEventListener("click", () => {
            turnHead()
        })

        head.addEventListener("mouseover", () => {
            moveEyes(direction.UP)
        })

        head.addEventListener("mouseleave", () => {
            moveEyes(direction.CENTER)
        })

        body.addEventListener("click", () => {
            jump(50)
            openArms()
            setNoAnimationMode(false)
        })

        necktie.addEventListener("click", () => {
            jump(250)
            openArms()
            openArms()
            setNoAnimationMode(true)
        })

        armLeftFull.addEventListener("click", () => {
            openArms()
        })

        armRightFull.addEventListener("click", () => {
            openArms()
        })

        legLeftFull.addEventListener("click", () => {
            kickLeft()
        })

        legRightFull.addEventListener("click", () => {
            kickRight()
        })
    }

    const checkNoAnimationMode = () => {
        let isTrueSet = false
        if (Cookies.checkCookie("noAnimationMode")) {
            isTrueSet = (Cookies.getCookie("noAnimationMode") === 'true');
        }
        return isTrueSet
    }

    const walk = steps => {
        const stepSpeed = 0.5
        const kickAngle = 20
        const backKickAngle = -25
        const originRotationLeft = "right top"
        const originRotationRight = "right top"

        const timelineRight = new TimelineLite()
        const timelineLeft = new TimelineLite()

        timelineRight
            .to(legRightFull, stepSpeed, {
                rotation: backKickAngle,
                transformOrigin: originRotationRight
            })
        for (let index = 0; index < steps; index++) {
            timelineLeft
                .fromTo(legLeftFull, stepSpeed, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationLeft
                }, {
                    rotation: kickAngle,
                    transformOrigin: originRotationLeft
                })
                .to(legLeftFull, stepSpeed, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationLeft,
                    ease: Power1.easeOut
                })

            timelineRight
                .fromTo(legRightFull, stepSpeed, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationRight
                }, {
                    rotation: kickAngle,
                    transformOrigin: originRotationRight
                })
            if (index === steps - 2) {
                break
            }
            timelineRight
                .to(legRightFull, stepSpeed, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationRight,
                    ease: Power1.easeOut
                })
        }
        timelineLeft
            .to(legLeftFull, stepSpeed, {
                rotation: 0,
                transformOrigin: originRotationLeft
            })

        timelineRight
            .to(legRightFull, stepSpeed, {
                rotation: 0,
                transformOrigin: originRotationRight
            })
    }

    const turnHead = () => {
        currentStatus.headSide *= (-1)
        timeline1
            .to(head, .1, {
                scaleX: currentStatus.headSide,
                transformOrigin: "46% 50%"
            })
    }

    const moveEyes = moveDirection => {
        let xDirection, yDirection
        switch (moveDirection) {
            case direction.UP:
                xDirection = 0
                yDirection = -5
                break
            case direction.DOWN:
                xDirection = 0
                yDirection = 5
                break
            case direction.CENTER:
                xDirection = 0
                yDirection = 0
                break
            default:
                break
        }
        timeline1
            .to(eyes, 0.1, {
                x: xDirection,
                y: yDirection
            })
    }

    const jump = (height) => {
        const upSpeed = height * 0.1 / 50
        const downSpeed = 0.5 + ((height - 50) / 1000)
        timeline4
            .to(fullBody, upSpeed, {
                y: height * (-1)
            })
            .to(fullBody, downSpeed, {
                ease: Bounce.easeOut,
                y: 0
            })
            .to(shadow, upSpeed, {
                scale: 0.5,
                transformOrigin: "50% 50%"
            }, "-=" + (upSpeed + downSpeed))
            .to(shadow, downSpeed, {
                ease: Bounce.easeOut,
                scale: 1,
                transformOrigin: "50% 50%"
            }, "-=" + downSpeed)
    }

    const kickLeft = () => {
        timeline4
            .to(legLeftFull, .1, {
                rotation: "+=45",
                transformOrigin: "right top"
            })
            .to(legLeftFull, .1, {
                rotation: "-=45",
                transformOrigin: "right top"
            })
    }

    const kickRight = () => {
        timeline4
            .to(legRightFull, .1, {
                rotation: "+=45",
                transformOrigin: "right top"
            })
            .to(legRightFull, .1, {
                rotation: "-=45",
                transformOrigin: "right top"
            })
    }

    const openArms = () => {
        timeline2
            .to(armRightFull, .1, {
                rotation: "+=15",
                transformOrigin: "right top"
            })
            .to(armRightFull, .1, {
                rotation: "-=15",
                transformOrigin: "right top"
            })

        timeline3
            .to(armLeftFull, .1, {
                rotation: "-=15",
                transformOrigin: "right top"
            })
            .to(armLeftFull, .1, {
                rotation: "+=15",
                transformOrigin: "right top"
            })
    }

    const raiseRightArm = () => {
        if (currentStatus.rightArmPosition === armPosition.DOWN) {
            timeline1
                .staggerTo([
                    armRightFullPos1,
                    armRightFullPos2,
                    armRightFullPos3
                ], 0.01, {
                    autoAlpha: 1
                }, 0.05)
                .staggerTo([
                    armRightFullPos1,
                    armRightFullPos2
                ], 0.01, {
                    autoAlpha: 0
                }, 0.05)

            currentStatus.rightArmPosition = armPosition.BENDED.OUTSIDE
        }
    }

    const lowerRightArm = () => {
        if (currentStatus.rightArmPosition === armPosition.BENDED.OUTSIDE) {
            timeline1
                .staggerTo([
                    armRightFullPos3,
                    armRightFullPos2,
                    armRightFullPos1
                ], 0.01, {
                    autoAlpha: 1
                }, 0.05)
                .staggerTo([
                    armRightFullPos3,
                    armRightFullPos2
                ], 0.01, {
                    autoAlpha: 0
                }, 0.05)

            currentStatus.rightArmPosition = armPosition.DOWN
        }
    }

    const showBelt = (show = true) => {
        if (show) {
            timeline1
                .set(belt, {
                    scaleY: 0,
                    transformOrigin: "0% 50%"
                })
                .set(belt, {
                    autoAlpha: 1
                })
                .to(belt, 0.5, {
                    ease: Elastic.easeOut.config(1, 0.3),
                    scaleY: 1,
                    transformOrigin: "0% 50%"
                })
        } else {
            timeline1
                .to(belt, 0.3, {
                    ease: Back.easeIn.config(3),
                    scaleY: 0,
                    transformOrigin: "0% 50%"
                })
                .set(belt, {
                    autoAlpha: 0
                })
        }
    }

    const showDrop = (show = true) => {
        if (show) {
            timeline1
                .to(drop, 1, {
                    delay: 1,
                    autoAlpha: 1,
                    y: 30
                }, "-=1")
        } else {
            timeline1
                .to(drop, 1, {
                    y: 40,
                    autoAlpha: 0
                })
                .set(drop, {
                    y: 0
                })
        }
    }

    const pressBatsignRemoteButton = delay => {
        timeline1
            .to(thumbRightPos3, 0.1, {
                delay: delay,
                y: 2
            })
            .to(thumbRightPos3, 0.1, {
                y: 0
            })
            .to(batsignRemoteButton, 0.1, {
                y: 1
            }, "-=0.2")
            .to(batsignRemoteButton, 0.1, {
                y: 0
            })
    }

    return {
        checkNoAnimationMode: checkNoAnimationMode,
        start: noAnimationMode => {
            begin(noAnimationMode)
            loop()
            events()
        },
        setBatsignSelect: () => {
            showBelt()
            raiseRightArm()
            moveEyes(direction.DOWN)
            pressBatsignRemoteButton(0)
            Gotham.showBatsignal(timeline1, batsignalAction.SELECT, true)
            lowerRightArm()
            moveEyes(direction.CENTER)
            showBelt(false)
        },
        setBatsignInsert: () => {
            showBelt()
            raiseRightArm()
            moveEyes(direction.DOWN)
            pressBatsignRemoteButton(0)
            Gotham.showBatsignal(timeline1, batsignalAction.INSERT, true)
            lowerRightArm()
            moveEyes(direction.CENTER)
            showBelt(false)
        },
        setBatsignUpdate: () => {
            showBelt()
            raiseRightArm()
            moveEyes(direction.DOWN)
            pressBatsignRemoteButton(0)
            Gotham.showBatsignal(timeline1, batsignalAction.UPDATE, true)
            showDrop()
            lowerRightArm()
            moveEyes(direction.CENTER)
            showBelt(false)
            showDrop(false)
        },
        setBatsignDelete: () => {
            showBelt()
            raiseRightArm()
            moveEyes(direction.DOWN)
            pressBatsignRemoteButton(0)
            Gotham.showBatsignal(timeline1, batsignalAction.DELETE, true)
            showDrop()
            lowerRightArm()
            moveEyes(direction.CENTER)
            showBelt(false)
            showDrop(false)
        },
        setBatsignOff: () => {
            showBelt()
            raiseRightArm()
            moveEyes(direction.DOWN)
            pressBatsignRemoteButton(0)
            Gotham.showBatsignal(timeline1, batsignalAction.SELECT, false)
            lowerRightArm()
            moveEyes(direction.CENTER)
            showBelt(false)
        }
    }
})()

const Joker = (() => {
    let joker,
        shadow,
        fullBody,
        body,
        head,
        legLeftFull,
        legRightFull,
        armRightFull,
        armLeftFull,
        eyes,
        flower,
        bang,
        laugh,
        laughHaHas,
        animatedItens

    const setDomReferences = () => {
        joker = Element("#joker")
        shadow = Element("#joker #shadow")
        fullBody = Element("#joker #full-body")
        body = Element("#joker #body")
        head = Element("#joker #head")
        legLeftFull = Element("#joker #left-leg-full")
        legRightFull = Element("#joker #right-leg-full")
        armLeftFull = Element("#joker #left-arm-full")
        armRightFull = Element("#joker #right-arm-full")
        eyes = Element("#joker #eyes")
        flower = Element("#joker #flower")
        bang = Element("#joker #bang")
        laugh = Element("#joker-laugh")
        laughHaHas = Elements("#joker-laugh>g")
        animatedItens = [bang, laughHaHas]
    }

    let currentStatus = {
        active: false
    }

    const begin = noAnimationMode => {
        setDomReferences()
        const timeline = new TimelineLite()
        const timeline2 = new TimelineLite()
        const enterDelay = 2

        if (noAnimationMode) {
            timeline
                .set([fullBody, shadow], {
                    x: 0,
                    y: 0
                })
                .set(animatedItens, {
                    autoAlpha: 0
                })
                .set(joker, {
                    visibility: "visible",
                })
        } else {
            timeline
                .set([fullBody, shadow], {
                    x: -160,
                    y: 70
                })
                .set(animatedItens, {
                    autoAlpha: 0
                })
                .set(joker, {
                    visibility: "visible",
                })
                .to(fullBody, enterDelay, {})
                .to([fullBody, shadow], 1.6, {
                    x: 0
                })
                .to([fullBody, shadow], 1.6, {
                    y: 0
                }, "-=1.6")
                .add(() => {
                    currentStatus.active = true
                    setJokerCookie(currentStatus.active)
                })

            timeline2
                .set(laugh, {
                    visibility: "visible",
                })
                .staggerTo(
                    laughHaHas, 0.1, {
                        autoAlpha: 1
                    }, -0.2)
                .staggerTo(
                    laughHaHas, 0.1, {
                        autoAlpha: 0
                    }, -0.2, "-=1")
                .set(laugh, {
                    visibility: "hidden",
                })
            walk(3, enterDelay)
        }
    }

    const loop = () => {
        const timelineLoop = new TimelineLite({
            onComplete: function () {
                this.restart()
            }
        })

        timelineLoop
            .to(head, 0.2, {
                rotation: 15,
                transformOrigin: "50% 50%"
            })
            .to(eyes, 2, {})
            .to(eyes, 0.1, {
                scaleY: 0,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 1,
                transformOrigin: "0% 50%"
            })
            .to(head, 0.2, {
                rotation: 0,
                transformOrigin: "50% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 0,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 1,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 1, {})
            .to(head, 0.2, {
                rotation: -10,
                transformOrigin: "50% 50%"
            })
            .to(eyes, 2, {})
            .to([armLeftFull, armRightFull], 0.5, {
                rotation: -30,
                transformOrigin: "50% 0%"
            })
            .to([armLeftFull, armRightFull], 0.5, {
                rotation: 0,
                transformOrigin: "50% 0%"
            })
            .to(head, 0.2, {
                rotation: 0,
                transformOrigin: "50% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 0,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 0.1, {
                scaleY: 1,
                transformOrigin: "0% 50%"
            })
            .to(eyes, 3, {})
    }

    const events = () => {
        fullBody.addEventListener("click", () => {
            getOut()
        })
    }

    const checkJokerCookie = () => {
        if (Cookies.checkCookie("joker")) {
            var isActivated = (Cookies.getCookie("joker") === 'true');
            currentStatus.active = isActivated
        }
        return currentStatus.active
    }

    const setJokerCookie = (newValue) => {
        Cookies.createCookie("joker", newValue)
    }

    const getOut = () => {
        const timeline = new TimelineLite()
        timeline
            .set(bang, {
                x: 0,
                y: 0,
                rotation: 10,
                transformOrigin: "50% 50%"
            })
            .fromTo(bang, 0.1, {
                autoAlpha: 0
            }, {
                autoAlpha: 1
            })
            .to(bang, 0.4, {
                autoAlpha: 0,
                rotation: -15,
                transformOrigin: "50% 50%"
            })
            .add(() => {
                currentStatus.active = false
                setJokerCookie(currentStatus.active)
            })
        jump(500)
    }

    const jump = (height) => {
        const timeline = new TimelineLite()
        const upSpeed = 0.5
        timeline
            .to(joker, 0.1, {})
            .to(fullBody, upSpeed, {
                y: height * (-1)
            })
            .to(shadow, upSpeed, {
                scale: 0.1,
                transformOrigin: "50% 50%"
            }, "-=" + (upSpeed))
            .set(joker, {
                visibility: "hidden",
            })
            .set([fullBody, shadow], {
                x: -150,
                y: 70,
                scale: 1
            })
    }

    const walk = (steps, delay = 0) => {
        const stepSpeed = 0.3
        const kickAngle = 20
        const backKickAngle = 30
        const originRotationLeft = "left top"
        const originRotationRight = "right top"

        const timelineRight = new TimelineLite()
        const timelineLeft = new TimelineLite()
        timelineLeft
            .to(fullBody, delay, {})
        timelineRight
            .to(fullBody, delay, {})

        timelineRight
            .to(legRightFull, stepSpeed, {
                rotation: -kickAngle,
                transformOrigin: originRotationRight
            })
        for (let index = 0; index < steps; index++) {
            timelineLeft
                .fromTo(legLeftFull, stepSpeed, {
                    rotation: -kickAngle,
                    transformOrigin: originRotationLeft
                }, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationLeft
                })
                .to(legLeftFull, stepSpeed, {
                    rotation: -kickAngle,
                    transformOrigin: originRotationLeft,
                    ease: Power1.easeOut
                })

            timelineRight
                .fromTo(legRightFull, stepSpeed, {
                    rotation: -kickAngle,
                    transformOrigin: originRotationRight
                }, {
                    rotation: backKickAngle,
                    transformOrigin: originRotationRight
                })
            if (index === steps - 2) {
                break
            }
            timelineRight
                .to(legRightFull, stepSpeed, {
                    rotation: -kickAngle,
                    transformOrigin: originRotationRight,
                    ease: Power1.easeOut
                })
        }
        timelineLeft
            .to(legLeftFull, stepSpeed, {
                rotation: 0,
                transformOrigin: originRotationLeft
            })

        timelineRight
            .to(legRightFull, stepSpeed, {
                rotation: 0,
                transformOrigin: originRotationRight
            })
    }

    return {
        start: noAnimationMode => {
            begin(noAnimationMode)
            loop()
            events()
        },
        checkJokerCookie: checkJokerCookie
    }
})()