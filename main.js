const TABLE_COLUMNS = [
    { key: "icon", label: "Icon" },
    { key: "name", label: "Name" },
    { key: "fullName", label: "Full Name" },
    { key: "powerstats", label: "Powerstats" },
    { key: "race", label: "Race" },
    { key: "gender", label: "Gender" },
    { key: "height", label: "Height" },
    { key: "weight", label: "Weight" },
    { key: "placeOfBirth", label: "Place Of Birth" },
    { key: "alignment", label: "Alignment" }
];

let allHeroes = [];
let filteredHeroes = [];
let currentPage = 1;
let pageSize = 20;
let currentSort = { key: "name", dir: "asc" };
let searchTerm = "";

function normalizeValue(val) {
    if (typeof val === "string") {
      
        const m = val.match(/-?\d+(\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
    }
    if (typeof val === "number") return val;
    return null;
}

function getCellValue(hero, key) {
    switch (key) {
        case "icon":
            return hero.images?.xs || "";
        case "name":
            return hero.name || "";
        case "fullName":
            return hero.biography?.fullName || "";
        case "powerstats":
            return hero.powerstats || {};
        case "race":
            return hero.appearance?.race || "";
        case "gender":
            return hero.appearance?.gender || "";
        case "height":
            return hero.appearance?.height?.[1] || hero.appearance?.height?.[0] || "";
        case "weight":
            return hero.appearance?.weight?.[1] || hero.appearance?.weight?.[0] || "";
        case "placeOfBirth":
            return hero.biography?.placeOfBirth || "";
        case "alignment":
            return hero.biography?.alignment || "";
        default:
            return "";
    }
}

function compareValues(a, b, key) {
    if (key === "powerstats") {
        const sum = obj => Object.values(obj || {}).reduce((acc, v) => acc + (isNaN(v) ? 0 : Number(v)), 0);
        const aSum = sum(a.powerstats);
        const bSum = sum(b.powerstats);
        if (isNaN(aSum)) return 1;
        if (isNaN(bSum)) return -1;
        return aSum - bSum;
    }
    if (key === "height" || key === "weight") {
        const aVal = normalizeValue(getCellValue(a, key));
        const bVal = normalizeValue(getCellValue(b, key));
        if (aVal === null) return 1;
        if (bVal === null) return -1;
        return aVal - bVal;
    }
    const aVal = getCellValue(a, key);
    const bVal = getCellValue(b, key);
    if (!aVal) return 1;
    if (!bVal) return -1;
    return String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: "base" });
}

function sortHeroes(heroes, sort) {
    const sorted = [...heroes];
    sorted.sort((a, b) => {
        let cmp = compareValues(a, b, sort.key);
        if (sort.dir === "desc") cmp = -cmp;
        return cmp;
    });
    return sorted;
}

function filterHeroes(heroes, term) {
    if (!term) return heroes;
    const t = term.toLowerCase();
    return heroes.filter(h => (h.name || "").toLowerCase().includes(t));
}

function paginateHeroes(heroes, page, size) {
    if (size === "all") return heroes;
    size = Number(size);
    const start = (page - 1) * size;
    return heroes.slice(start, start + size);
}

function renderTable(heroes) {
    const container = document.getElementById("table-container");
    container.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    TABLE_COLUMNS.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.label;
        th.dataset.key = col.key;
        if (currentSort.key === col.key) {
            th.classList.add(currentSort.dir === "asc" ? "sort-asc" : "sort-desc");
        }
        th.addEventListener("click", () => {
            if (currentSort.key === col.key) {
                currentSort.dir = currentSort.dir === "asc" ? "desc" : "asc";
            } else {
                currentSort.key = col.key;
                currentSort.dir = "asc";
            }
            update();
        });
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    heroes.forEach(hero => {
        const row = document.createElement("tr");
        TABLE_COLUMNS.forEach(col => {
            const td = document.createElement("td");
            if (col.key === "icon") {
                const img = document.createElement("img");
                img.src = getCellValue(hero, "icon");
                img.alt = hero.name;
                img.className = "hero-icon";
                td.appendChild(img);
            } else if (col.key === "powerstats") {
                const stats = hero.powerstats || {};
                td.innerHTML = Object.entries(stats)
                    .map(([k, v]) => `<span title="${k}">${k[0].toUpperCase() + k.slice(1)}: ${v}</span>`)
                    .join("<br>");
            } else {
                td.textContent = getCellValue(hero, col.key);
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

function renderPagination(total, page, size) {
    const pagDiv = document.getElementById("pagination");
    pagDiv.innerHTML = "";
    if (size === "all") return;
    size = Number(size);
    const pageCount = Math.ceil(total / size);
    if (pageCount <= 1) return;
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === page) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            update();
        });
        pagDiv.appendChild(btn);
    }
}

function update() {
    filteredHeroes = filterHeroes(allHeroes, searchTerm);
    const sorted = sortHeroes(filteredHeroes, currentSort);
    let paged = paginateHeroes(sorted, currentPage, pageSize);
    renderTable(paged);
    renderPagination(filteredHeroes.length, currentPage, pageSize);
}

function onSearch(e) {
    searchTerm = e.target.value;
    currentPage = 1;
    update();
}

function onPageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    update();
}

function setupControls() {
    document.getElementById("search").addEventListener("input", onSearch);
    document.getElementById("pageSize").addEventListener("change", onPageSize);
}

function loadData(heroes) {
    allHeroes = heroes;
    setupControls();
    update();
}

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(r => r.json())
    .then(loadData)
    .catch(e => {
        document.getElementById("table-container").textContent = "Failed to load data.";
        console.error(e);
    });
