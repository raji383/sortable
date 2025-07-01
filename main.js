let hero = []
let filteredHero = []
var start = 0, end, n = 0

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then(r => r.json()).then(loadData)
function loadData(heroes) {
    hero = heroes
    filteredHero = [...hero]
    const sortBtn = document.getElementById('sort')
    const input = document.getElementById('input')
    const divi = document.getElementById('diviPage')
    display(filteredHero)
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
    const r = document.getElementById('r')
    const l = document.getElementById('l')

    divi.addEventListener('change', () => {
        if (end == 'all') {
            end = filteredHero.length
        } else {
            end = divi.value
        }
        let Hero = []
        for (let i = start; i < end; i++) {
            Hero.push(filteredHero[i])
        }
        display(Hero)

    })
    r.addEventListener('click', () => {
        n -= Number(end)
        let Hero = []
       
        if (n < 0) {
            n = 0
        }
        if (n + Number(end) > filteredHero.length) {
            n = filteredHero.length - Number(end)
        }
        for (let i = n; i < n + Number(end); i++) {
            Hero.push(filteredHero[i])
        }
        display(Hero)
    })
    l.addEventListener('click', () => {
        n += Number(end)
        let Hero = []
        if(n < 0) {
            n = 0
        }
        if (n + Number(end) > filteredHero.length) {
            n = filteredHero.length - Number(end)
        }

        for (let i = n; i < n + Number(end); i++) {
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

        power.textContent = powers
        race.textContent = element.appearance.race || "-"
        gender.textContent = element.appearance.gender || "-"
        height.textContent = element.appearance.height[1] || "-"
        weight.textContent = element.appearance.weight[1] || "-"

        tr.append(icons, name, fname, power, race, gender, height, weight, pob, alignment)
        table.appendChild(tr)
    });
}
