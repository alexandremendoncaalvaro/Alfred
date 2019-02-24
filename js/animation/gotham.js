const Gotham = (() => {
    let gotham,
        gotham2,
        sky,
        fog,
        fogForm,
        atmosfereForm,
        skySvgPlace,
        starsPlace,
        baseStar,
        moon,
        batjet,
        batjetTop,
        batjetSide,
        batjet45,
        batsignal,
        batSelect,
        batUpdate,
        batInsert,
        batDelete,
        astronaut,
        sqlEditor,
        animatedItens

    const timeline1 = new TimelineLite()

    const setDomReferences = () => {
        gotham = Element("#gotham")
        gotham2 = Element("#gotham-2")
        sky = Element("#sky")
        fog = Element("#fog")
        fogForm = Element("#fog>rect")
        atmosfereForm = Element("#atmosfere>rect")
        skySvgPlace = Element("#skySvgPlace")
        starsPlace = Element("#starsPlace")
        baseStar = Element(".star")
        moon = Element("#moon")
        batjet = Element("#batjet>#ship")
        batjetTop = Element("#batjet #ship-top")
        batjetSide = Element("#batjet #ship-side")
        batjet45 = Element("#batjet #ship-45")
        batsignal = Element("#batsignal")
        batSelect = Element("#bat-select")
        batUpdate = Element("#bat-update")
        batInsert = Element("#bat-insert")
        batDelete = Element("#bat-delete")
        astronaut = Element("#astronaut")
        sqlEditor = Element("#sqlEditorPlace")
        animatedItens = [batjetTop, batjet45]
    }

    let currentStatus = {
        easterEggMoon: false,
        easterEggBatman: false,
        easterEggAlfred: false,
        easterEggBatmobile: false,
        easterEggJoker: false,
        easterEggCity: false,
        animationBatjetRunning: false
    }

    const begin = noAnimationMode => {
        setDomReferences()
        onresize()

        timeline1
            .set(gotham, {
                webkitFilter: "brightness(0.4)",
                filter: "brightness(0.4)"
            })
            .set(gotham2, {
                scaleX: -1,
                webkitFilter: "brightness(0.1)",
                filter: "brightness(0.1)"
            })
            .set(sky, {
                webkitFilter: "brightness(0.4)",
                filter: "brightness(0.4)"
            })
            .set(fog, {
                autoAlpha: 0.3
            })
            .set([batsignal, batSelect, batUpdate, batInsert, batDelete, animatedItens], {
                autoAlpha: 0
            })

        if (noAnimationMode) {
            timeline1
                .set([gotham, gotham2], {
                    y: 0,
                    visibility: "visible"
                })
                .set(sqlEditor, {
                    y: 0,
                    visibility: "visible"
                })
                .set(sky, {
                    autoAlpha: 1,
                    visibility: "visible"
                })
                .set(moon, {
                    y: 0,
                    visibility: "visible"
                })
        } else {
            timeline1
                .set([gotham, gotham2], {
                    y: -500,
                    visibility: "visible"
                })
                .set(sqlEditor, {
                    y: -600,
                    visibility: "visible"
                })
                .set(sky, {
                    autoAlpha: 0,
                    visibility: "visible"
                })
                .set(moon, {
                    y: -300,
                    visibility: "visible"
                })
                .staggerTo([gotham, gotham2], 2.5, {
                    y: 0,
                    ease: Bounce.easeOut
                }, 0.1)
                .to(sky, 2, {
                    autoAlpha: 1
                }, "-=2")
                .to(sqlEditor, 2, {
                    y: 0,
                    ease: Elastic.easeOut
                }, "-=0.2")
        }
    }

    const loop = () => {
        const timelineLoop = new TimelineLite()
        timelineLoop
            .to(moon, 2, {
                y: 0,
                ease: Bounce.easeOut
            }, 1.5)
            .to(moon, 5, {
                y: -50,
                ease: Power1.easeInOut,
                repeat: -1,
                yoyo: true
            })
    }

    const events = () => {
        animateStars()
    }

    const validateEasterEggs = queryEasterEgg => {
        queryEasterEgg = queryEasterEgg.toUpperCase()

        const easterEggMoon = validateAnyInString(["LUA", "ASTRONAUTA","MOON","ASTRONAULT"], queryEasterEgg)
        const easterEggBatman = validateAnyInString(["BATMAN", "CÉU", "SKY", "STAR", "ESTRELA", "JET", "JATO", "MORCEGO"], queryEasterEgg)
        const easterEggAlfred = validateAnyInString(["BATMOBILE", "BATMÓVEL","BATMOVEL"], queryEasterEgg)
        const easterEggBatmobile = validateAnyInString(["ALFRED", "MORDOMO","BUTLER"], queryEasterEgg)
        const easterEggJoker = validateAnyInString(["JOKER", "CORINGA", "HAHAHA", "KKK"], queryEasterEgg)
        const easterEggCity = validateAnyInString(["CITY", "CIDADE", "PRÉDIO", "BUILDING"], queryEasterEgg)

        if (easterEggMoon && !currentStatus.easterEggMoon) {
            showAstronaut()
            console.log('You found the EasterEgg "Moon"!')
        }
        currentStatus.easterEggMoon = easterEggMoon

        if (easterEggBatman && !currentStatus.easterEggBatman) {
            showBatjet()
            console.log('You found the EasterEgg "Batman"!')
        }
        currentStatus.easterEggBatman = easterEggBatman

        if (easterEggAlfred && !currentStatus.easterEggAlfred) {
            console.log('You found the EasterEgg "Alfred"!')
        }
        currentStatus.easterEggAlfred = easterEggAlfred

        if (easterEggBatmobile && !currentStatus.easterEggBatmobile) {
            console.log('You found the EasterEgg "Batmobile"!')
        }
        currentStatus.easterEggBatmobile = easterEggBatmobile

        if (easterEggJoker && !currentStatus.easterEggJoker) {
            if (!Joker.checkJokerCookie()) {
                Joker.start()
            }
            console.log('You found the EasterEgg "Joker"!')
        }
        currentStatus.easterEggJoker = easterEggJoker

        if (easterEggCity && !currentStatus.easterEggCity) {
            console.log('You found the EasterEgg "City"!')
        }
        currentStatus.easterEggCity = easterEggCity
    }

    const showAstronaut = () => {
        timeline1
            .set(moon, {
                attr: {
                    viewBox: "0 0 180 350"
                }
            })
            .fromTo(astronaut, 4, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0
            }, {
                x: -30,
                y: 40,
                scale: 2,
                rotation: "-=80",
                transformOrigin: "right top",
                ease: Power1.easeInOut,
            })
            .to(astronaut, 4, {
                x: -30,
                y: -40,
                scale: 1,
                rotation: "-=10",
                transformOrigin: "right top",
                ease: Power1.easeInOut,
            })
            .set(moon, {
                attr: {
                    viewBox: "0 0 180 180"
                }
            })
    }

    const showBatjet = () => {
        if (!currentStatus.animationBatjetRunning) {
            currentStatus.animationBatjetRunning = true

            const timeline2 = new TimelineLite()
            const timeline3 = new TimelineLite()

            timeline2
                .set(batjetSide, {
                    autoAlpha: 1
                })
                .set(batjet, {
                    y: 100,
                    x: -300,
                    scale: 0.4,
                    visibility: "visible"
                })
                .to(batjet, 3, {
                    x: 2000,
                    ease: Power0.easeNone,
                })
                .set(batjet, {
                    y: 0,
                    scaleX: -1,
                    scale: 1
                })
                .to(batjet, 2, {
                    x: 0,
                    ease: SlowMo.ease.config(0.7, 0.7, false)
                })

            timeline3
                .to(sqlEditor, 3, {
                    y: 200,
                    ease: Power4.easeOut
                })
                .staggerTo([
                    batjetSide,
                    batjet45,
                    batjetTop
                ], 0.1, {
                    autoAlpha: 1
                }, 0.1)
                .staggerTo([
                    batjetSide,
                    batjet45,
                ], 0.1, {
                    autoAlpha: 0
                }, 0.1, "-=0.2")
                .to(batjetTop, 2, {})
                .set(animatedItens, {
                    autoAlpha: 0
                })
                .to(sqlEditor, 0.5, {
                    y: 0
                })
                .add(() => {
                    currentStatus.animationBatjetRunning = false
                })
        }
    }

    const showBatsignal = (timeline, batText, turnOn = true) => {
        let batTextAction

        switch (batText) {
            case batsignalAction.SELECT:
                batTextAction = batSelect
                break
            case batsignalAction.INSERT:
                batTextAction = batInsert
                break
            case batsignalAction.UPDATE:
                batTextAction = batUpdate
                break
            case batsignalAction.DELETE:
                batTextAction = batDelete
                break
            default:
                break
        }

        if (turnOn) {
            timeline
                .to([batsignal, batSelect, batUpdate, batInsert, batDelete], 0.1, {
                    autoAlpha: 0
                })
                .to([batsignal, batTextAction], 1, {
                    autoAlpha: 1
                })
        } else {
            timeline
                .to([batsignal, batSelect, batUpdate, batInsert, batDelete], 0.1, {
                    autoAlpha: 0
                })
        }
    }

    const resizeElementsForWindow = width => {
        const timeline = new TimelineLite()
        timeline
            .set([gotham, gotham2], {
                attr: {
                    viewBox: "0 0 " + width + " 190"
                }
            })
            .set(sky, {
                attr: {
                    viewBox: "0 0 " + width + " 400"
                }
            })
            .set([atmosfereForm, fogForm, starsPlace], {
                width: width
            })
    }

    const animateStars = () => {
        const width = 3840 //max 4k resolution
        const height = 300
        const frag = document.createDocumentFragment()
        const appearMin = 0.3
        const appearMax = 0.8
        const delayMin = 2
        const delayMax = 6
        const durationMin = 0.3
        const durationMax = 1
        const numAnimations = 50
        const numStars = 300
        const stars = []
        const eases = []

        const random = (min, max) => {
            if (max == null) {
                max = min
                min = 0
            }
            if (min > max) {
                const tmp = min
                min = max
                max = tmp
            }
            return min + (max - min) * Math.random()
        }

        const createStar = () => {
            var star = baseStar.cloneNode(true)
            frag.appendChild(star)

            TweenLite.set(star, {
                rotation: random(360),
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                x: random(width),
                y: random(height),
            })

            var tl = new TimelineMax({
                repeat: -1,
                yoyo: true
            })

            for (let i = 0; i < numAnimations; i++) {
                const ease1 = eases[Math.floor(random(numAnimations))]
                const ease2 = eases[Math.floor(random(numAnimations))]
                const alpha = random(0.7, 1)
                const scale = random(0.15, 0.4)
                const appear = "+=" + random(appearMin, appearMax)
                const delay = "+=" + random(delayMin, delayMax)
                const duration1 = random(durationMin, durationMax)
                const duration2 = random(durationMin, durationMax)

                tl.to(star, duration1, {
                        autoAlpha: alpha,
                        scale: scale,
                        ease: ease1
                    }, delay)
                    .to(star, duration2, {
                        autoAlpha: 0,
                        scale: 0,
                        ease: ease2
                    }, appear)
            }

            tl.progress(random(1))

            return {
                element: star,
                timeline: tl
            }
        }

        for (let i = 0; i < numAnimations; i++) {

            const ease = new RoughEase({
                template: Linear.easeNone,
                strength: random(1, 3),
                points: Math.floor(random(50, 200)),
                taper: "both",
                randomize: true,
                clamp: true
            })

            eases.push(ease)
        }

        for (let i = 0; i < numStars; i++) {
            stars.push(createStar())
        }
        skySvgPlace.removeChild(baseStar)
        starsPlace.appendChild(frag)
    }

    return {
        start: noAnimationMode => {
            begin(noAnimationMode)
            loop()
            events()
        },
        showAstronaut: showAstronaut,
        showBatjet: showBatjet,
        showBatsignal: (timeline, battext, turnOn) => {
            showBatsignal(timeline, battext, turnOn)
        },
        resizeElementsForWindow: width => {
            resizeElementsForWindow(width)
        },
        validateEasterEggs: queryEasterEgg => {
            validateEasterEggs(queryEasterEgg)
        }
    }
})()