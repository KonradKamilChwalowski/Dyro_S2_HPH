const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Na korytarzu półmrok... Nie wiesz gdzie może czaić się Dy-Roo, dlatego stąpasz ostrożnie… wtem z oddali słychać hałas!',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Schowaj się do szafki',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Ze strachu chowasz się do najbliższej szafki, nr 234, która okazuje się portalem do mrocznego warsztatu w innym wymiarze...',
        tlo: 'url("img/Hałas.png")',
        options: [
            {
                text: 'Rozejrzyj się przez otwór szafki!',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Widzisz Dy-Roo grzebiącego przy silniku samochodu: Dodge Charger R/T!',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"JAKA KOZACKA FURA!!!" (rozmowa)',
                nextText: "Rozmowa_S"
            },
            {
                text: 'Wygooglaj markę auta i sprawdź jego wady i zalety! (badania)',
                nextText: "Google"
            },
            {
                text: 'Spróbuj podejść bliżej samochodu i go uszkodzić! (skradanie)',
                nextText: "Skradanie"
            },
            {
                text: 'Rzuć się na nieświadomego Dy-Roo z bronią (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Rozmowa_S",
        text: 'Dy-Roo uśmiecha się od ucha do ucha. "DZIĘKUJĘ! TO WYJĄTKOWY SAMOCHÓD, JEST ZACZAROWANY!"',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Zaczarowany? Powie Pan coś więcej?" (rozmowa)',
                nextText: "Zaczarowany"
            },
            {
                text: '"Wyjątkowy? Ma pewnie dla Pana jakąś wartość!" (rozmowa)',
                nextText: "Wyjątkowy"
            },
            {
                text: '"Mam coś idealnie dla Pana!" Wyciągnij zawieszkę do powieszenia na lusterku! (daj prezent)',
                nextText: "Zawieszka"
            },
            {
                text: '"Chce mnie Pan wziąć na przejażdżkę?" (rozmowa)',
                nextText: "Przejażdżka"
            }
        ]
    },
    {
        id: "Zaczarowany",
        text: '"MOGĘ CO NAJWYŻEJ ZDRADZIĆ, ŻE POSIADA SPECJALNE PALIWO! HAHAHA!',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Dobra, znajdę sobie w Internecie, co to za paliwo." Wyciągnij telefon! (badania)',
                nextText: "Złe_badania"
            },
            {
                text: '"Mam coś idealnie dla Pana!" Wyciągnij zawieszkę do powieszenia na lusterku! (daj prezent)',
                nextText: "Zawieszka"
            },
            {
                text: '"Chce mnie Pan wziąć na przejażdżkę?" (rozmowa)',
                nextText: "Przejażdżka"
            },
            {
                text: 'Lepiej powiedz nam co to za paliwo, bo jak nie... (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Wyjątkowy",
        text: '"TAAAAK, WYSTĄPIŁ W MOIM ULUBIONYM FILMIE. BYŁO TAM TEŻ INNE AUTO, KTÓRE MOŻE MU DORÓWNAĆ, ALE JA WOLĘ MOJE"',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Dobra, znajdę sobie w Internecie co może go pokonać." Wyciągnij telefon! (badania)',
                nextText: "Złe_badania"
            },
            {
                text: '"Mam coś idealnie dla Pana!" Wyciągnij zawieszkę do powieszenia na lusterku! (daj prezent)',
                nextText: "Zawieszka"
            },
            {
                text: '"Chce mnie Pan wziąć na przejażdżkę?" (rozmowa)',
                nextText: "Przejażdżka"
            },
            {
                text: 'Lepiej powiedz nam co mu dorównuje, bo jak nie... (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Złe_badania",
        text: '"MŁODZIEŻ KORZYSTA Z TELEFONU?! WON MI STĄD!" Wracasz przez portal do szkoły i widzisz jak Dy-Roo Cię goni',
        tlo: 'url("img/Ucieczka.png")',
        options: [
            {
                text: 'Broń się! (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Zawieszka",
        text: '"O KURCZĘ, DZIĘKUJĘ!" PRAWIE TAKA SAMA JAK W MOIM ULUBIONYM FILMIE: <BULLITT>',
        tlo: 'url("img/Zawieszka.png")',
        options: [
            {
                text: '"Proszę bardzo! Niech Pan sobie przy nim majstruje dalej, a my sobie pójdziemy!" (powrót)',
                nextText: "Sukces"
            }
        ]
    },
    {
        id: "Przejażdżka",
        text: '"CHYBA JESTEŚCIE NIEPOWAŻNI, JESZCZE MI W NIM NASYFICIE! WON MI STĄD!" Wracasz przez portal do szkoły i widzisz jak Dy-Roo Cię goni.',
        tlo: 'url("img/Ucieczka.png")',
        options: [
            {
                text: 'Broń się! (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Google",
        text: 'W warsztacie nie ma zasięgu. Cofasz się przez portal i odchodzisz szukając zasięgu.',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Szukaj zasięgu! (badania)',
                nextText: "Google2"
            }
        ]
    },
    {
        id: "Google2",
        text: 'Szukająsz zasięgu dalej.',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Szukaj zasięgu! (badania)',
                nextText: "Google3"
            }
        ]
    },
    {
        id: "Google3",
        text: 'Szukając zasięgu od kilkunastu minut wpadasz na Dy-Roo. "TO TY SZPIEGOWAŁEŚ W MOIM WARSZTACIE?"',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Broń się! (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Atak",
        text: 'Dyro łamie Twoją obronę i powala Cię jednym ciosem. Ostatnie co widzisz to brudne od samochodowego smaru ręce...',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Skradanie",
        text: 'Udało Ci się zakraść do auta. Jesteś bardzo blisko Dy-Ra. Co robisz?',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: 'Rozłącz akumulator! (akcja)',
                nextText: "Akumulator"
            },
            {
                text: 'Wsyp cukier do baku! (akcja)',
                nextText: "Cukier"
            },
            {
                text: 'Przetnij przewody hamulcowe! (akcja)',
                nextText: "Hamulce"
            },
            {
                text: 'Zatkaj rurę wydechową ziemniakiem! (akcja)',
                nextText: "Ziemniak"
            }
        ]
    },
    {
        id: "Akumulator",
        text: 'Ten tani zabieg nie powstrzyma Dy-Roo. Jest tak pełen energii, że wystarczyłoby na rok dla małego miasta, a co dopiero by odpalić auto. Iskra z akumulatora trafia Cię w czoło i paraliżuje...',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Cukier",
        text: 'Dy-Roo dostrzega Cię i krzyczy: "SŁODKIE, ALE NIEEFEKTYWNE, NIE SŁODZĘ KAWY I HERBATY, A MOJE SAMOCHODY TEŻ IGNORUJĄ CUKIER! NIECH NO JA CIĘ DORWĘ!',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: 'Uciekaj przez portal! (ucieczka)',
                nextText: "Ucieczka"
            }
        ]
    },
    {
        id: "Hamulce",
        text: 'Dy-Roo dostrzega Cię i krzyczy: "NIE MASZ ZAHAMOWAĆ! ALE JA POTRAFIĘ HAMOWAĆ JAK FRED FLINSTON! NIECH NO JA CIĘ DORWĘ!',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: 'Uciekaj przez portal! (ucieczka)',
                nextText: "Ucieczka"
            }
        ]
    },
    {
        id: "Ziemniak",
        text: 'Zatykasz dziurę i odchodzisz w pobliże portalu. Po 15 min Dy-Roo odpala furę, a moc silnika zmienia ziemniaka we frytki! Jesteś w szoku!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Będąc w szoku krzyknąłeś "JAKA MOC!!!" (rozmowa)',
                nextText: "Rozmowa_S"
            }
        ]
    },
    {
        id: "Ucieczka",
        text: 'Uciekasz przed Dy-Roo i wybiegasz na korytarz, on jednak wciąż Cię goni!',
        tlo: 'url("img/Ucieczka.png")',
        options: [
            {
                text: 'Broń się! (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Sukces",
        text: 'Uszedłeś z życiem, brawo!',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Zagraj jeszcze raz!',
                nextText: "Start1"
            }
        ]
    }
]

startGame()
