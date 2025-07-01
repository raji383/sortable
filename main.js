fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then(r => r.json()).then(loadData)
let hero = []
function loadData(heroes) {
    hero = heroes
    const table = document.getElementById('table')
    hero.forEach(element => {
        const tr = document.createElement('tr')
        table.append(tr)
        const icon = document.createElement('th'), name = document.createElement('th'), fname = document.createElement('th'), power = document.createElement('th'), race = document.createElement('th'), gander = document.createElement('th'), h = document.createElement('th'), w = document.createElement('th'), pob = document.createElement('th'), alignment = document.createElement('th')
        tr.append(icon, name, fname, power, race, gander, h, w, pob, alignment)
        
    });

}
