let hero = []
let filteredHero = []
var start = 0, end

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then(r => r.json()).then(loadData)
function loadData(heroes) {
    hero = heroes
    filteredHero = [...hero]
    const sortBtn = document.getElementById('sort')
    const input = document.getElementById('input')
    const divi = document.getElementById('diviPage')
    let Hero = []
    for (let i = 0; i <20; i++) {
        Hero.push(filteredHero[i])
    }
    display(Hero)
    input.addEventListener("input", () => {
        const s = input.value.toLowerCase()
        filteredHero = hero.filter(h => h.name.toLowerCase().includes(s))
        display(filteredHero)
    })
    let asc = true

    sortBtn.addEventListener('click', () => {
        filteredHero.reverse()
        asc = !asc
        if (asc) {
            sortBtn.textContent = " ↓"
        } else {
            sortBtn.textContent = " ↑"
        }
        display(filteredHero)
    })

    const buttons = document.querySelectorAll('.sort');

    let sorthero = [...filteredHero]
    sorthero = sortfullName(sorthero)
    let sortheroPower = [...filteredHero]
    sortheroPower = sortPower(sortheroPower)
    let sortheroraace = [...filteredHero]
    sortheroraace = sortRace(sortheroraace)
    let sorthergender = [...filteredHero]
    sorthergender = sortGender(sorthergender)
    let sortherh = [...filteredHero]
    sortherh = sorth(sortherh)
    let sortherw = [...filteredHero]
    sortherw = sortw(sortherw)
    let sortherpob = [...filteredHero]
    sortherpob = sortPoB(sortherpob)
    let sortheralign = [...filteredHero]
    sortheralign = sortAlinm(sortheralign)
    let cop = []
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {


            if (index == 0) {
                display(sorthero.reverse())
                cop = [...sorthero]
            }
            if (index == 1) {
                display(sortheroPower.reverse())
                cop = [...sortheroPower]
            }
            if (index == 2) {
                display(sortheroraace.reverse())
                cop = [...sortheroraace]
            }
            if (index == 3) {
                display(sorthergender.reverse())
                cop = [...sorthergender]
            }
            if (index == 4) {
                display(sortherh.reverse())
                cop = [...sortherh]
            }
            if (index == 5) {
                display(sortherw.reverse())
                cop = [...sortherw]
            }
            if (index == 6) {
                display(sortherpob.reverse())
                cop = [...sortherpob]
            }
            if (index == 7) {
                display(sortheralign.reverse())
                cop = [...sortheralign]
            }
        });
    });

    const r = document.getElementById('r')
    const l = document.getElementById('l')

    divi.addEventListener('change', () => {
        if (cop.length == 0) {
            cop = [...filteredHero]

        }
        if (divi.value == 'all') {
            end = cop.length
        } else {
            end = divi.value
        }
        let Hero = []
        for (let i = start; i < end; i++) {
            Hero.push(cop[i])
        }
        display(Hero)

    })
    r.addEventListener('click', () => {
        start -= Number(end)
        let Hero = []

        if (start < 0) {
            start = 0
        }
        if (start + Number(end) > filteredHero.length) {
            start = filteredHero.length - Number(end)
        }
        for (let i = start; i < start + Number(end); i++) {
            Hero.push(filteredHero[i])
        }
        display(Hero)
    })
    l.addEventListener('click', () => {
        start += Number(end)
        let Hero = []
        if (start < 0) {
            start = 0
        }
        if (start + Number(end) > filteredHero.length) {
            start = filteredHero.length - Number(end)
        }
        for (let i = start; i < start + Number(end); i++) {
            Hero.push(filteredHero[i])
        }
        display(Hero)
    })
}

function display(heroList) {
    const table = document.getElementById('table')
    table.innerHTML = ''


    heroList.forEach((element, i) => {
        const tr = document.createElement('tr')

        const icons = document.createElement('td')
        const name = document.createElement('td')
        const fname = document.createElement('td')
        const power = document.createElement('td')
        const race = document.createElement('td')
        const gender = document.createElement('td')
        const height = document.createElement('td')
        const weight = document.createElement('td')
        const pob = document.createElement('td')
        const alignment = document.createElement('td')


        if (element.images.xs) {
            const img = document.createElement('img')
            img.src = element.images.xs
            img.width = 40
            icons.appendChild(img)
        }
        name.textContent = element.name || "-"
        fname.textContent = element.biography.fullName || "-"
        pob.textContent = element.biography.placeOfBirth || "-"
        alignment.textContent = element.biography.alignment || "-"

        let powers = ""
        for (let stat in element.powerstats) {
            powers += `${stat}: ${element.powerstats[stat]} \n`
        }

        power.innerHTML = powers.replace(/\n/g, '<br>')
        race.textContent = element.appearance.race || "-"
        gender.textContent = element.appearance.gender || "-"
        height.textContent = element.appearance.height[1] || "-"
        weight.textContent = element.appearance.weight[1] || "-"

        tr.append(icons, name, fname, power, race, gender, height, weight, pob, alignment)
        table.appendChild(tr)
    });
}
function sortfullName(array) {

    return array.sort((a, b) => {
        if (a.biography.fullName < b.biography.fullName) {
            return -1;
        }
        if (a.biography.fullName > b.biography.fullName) {
            return 1;
        }
        return 0;
    })


}
function sortPower(array) {
    return array.sort((a, b) => {
        if (a.powerstats.intelligence == null) {
            return -1
        }
        if (a.powerstats.intelligence < b.powerstats.intelligence) {
            return -1;
        }
        if (a.powerstats.intelligence > b.powerstats.intelligence) {
            return 1;
        }
        return 0;
    })
}
function sortRace(array) {
    return array.sort((a, b) => {
        if (a.appearance.race == null) {
            return -1
        }
        if (a.appearance.race < b.appearance.race) {
            return -1;
        }
        if (a.appearance.race > b.appearance.race) {
            return 1;
        }
        return 0;
    })
}
function sortGender(array) {
    return array.sort((a, b) => {
        if (a.appearance.gender < b.appearance.gender) {
            return -1;
        }
        if (a.appearance.gender > b.appearance.gender) {
            return 1;
        }
        return 0;
    })
}
function sorth(array) {
    return array.sort((a, b) => {
        let ah = a.appearance.height[1]
        let bh = b.appearance.height[1]
        if (!ah) return 1;
        if (!bh) return -1;
        let [aw, aunit] = ah.split(' ');
        let [bw, bunit] = bh.split(' ');
        aw = parseFloat(aw);
        bw = parseFloat(bw);
        if (aunit === 'meters') aw *= 100;
        if (bunit === 'meters') bw *= 100;
        if (isNaN(aw)) return 1;
        if (isNaN(bw)) return -1;
        if (aw < bw) {
            return -1;
        }
        if (aw > bw) {
            return 1;
        }
        return 0;
    })
}
function sortw(array) {
    return array.sort((a, b) => {
        let awt = a.appearance.weight[1]
        let bwt = b.appearance.weight[1]
        if (!awt) return 1;
        if (!bwt) return -1;
        let [aw, aunit] = awt.split(' ');
        let [bw, bunit] = bwt.split(' ');
        aw = parseFloat(aw);
        bw = parseFloat(bw);
        if (aunit === 'tons') aw *= 1000;
        if (bunit === 'tons') bw *= 1000;
        if (isNaN(aw)) return 1;
        if (isNaN(bw)) return -1;
        if (aw < bw) {
            return -1;
        }
        if (aw > bw) {
            return 1;
        }
        return 0;
    })
}
function sortPoB(array) {
    return array.sort((a, b) => {

        if (a.biography.placeOfBirth < b.biography.placeOfBirth) {
            return -1;
        }
        if (a.biography.placeOfBirth > b.biography.placeOfBirth) {
            return 1;
        }
        return 0;
    })
}
function sortAlinm(array) {
    return array.sort((a, b) => {
        if (a.biography.alignment < b.biography.alignment) {
            return -1;
        }
        if (a.biography.alignment > b.biography.alignment) {
            return 1;
        }
        return 0;
    })
}
