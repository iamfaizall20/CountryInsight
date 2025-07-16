// Input Field and Button
const SearchField = document.getElementById('searchField'),
    SearchButton = document.getElementById('searchButton'),
    DataSection = document.querySelector('.data-section'),
    FlagSection = document.querySelector('.flag-prt'),
    dropdown = document.getElementById('dropdown'); // dropdown <ul>

// Selectors
const countryName = document.querySelector('.countryName'),
    otherNames = document.querySelector('.otherName'),
    nativeLang = document.getElementById('nativeLang'),
    capital = document.getElementById('capital'),
    region = document.getElementById('region'),
    currency = document.getElementById('currency'),
    population = document.getElementById('population'),
    borders = document.getElementById('borders');

const countries = [
    "Afghanistan", "India", "China", "Japan", "Pakistan", "Bangladesh",
    "Indonesia", "Vietnam", "Thailand", "Malaysia", "Singapore", "Philippines",
    "Nepal", "Sri Lanka", "South Korea", "North Korea", "Saudi Arabia",
    "United Arab Emirates", "Qatar", "Kuwait", "Iran", "Iraq", "Israel",
    "Turkey", "Jordan", "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Poland",
    "Portugal", "Ireland", "Belgium", "Austria", "Czech Republic", "Greece",
    "United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Chile", "Peru", "South Africa", "Nigeria", "Egypt", "Kenya", "Morocco", "Algeria", "Australia", "New Zealand", "Russia", "Ukraine", "Kazakhstan", "Ethiopia", "Venezuela", "Myanmar"
];

// Focus input on any keypress
document.addEventListener('keydown', () => {
    SearchField.focus();
});

// Trigger fetch on Enter key
SearchField.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        FetchData();
    }
});

// Show suggestions on input
SearchField.addEventListener("input", () => {
    const value = SearchField.value.trim().toLowerCase();
    dropdown.innerHTML = "";

    if (value === "") {
        dropdown.style.display = "none";
        return;
    }

    const filtered = countries.filter(country =>
        country.toLowerCase().startsWith(value)
    );

    if (filtered.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    filtered.forEach(country => {
        const li = document.createElement("li");
        li.textContent = country;
        li.className = "dropdown-item";
        li.addEventListener("click", () => {
            SearchField.value = country;
            dropdown.style.display = "none";
            FetchData();
        });
        dropdown.appendChild(li);
    });

    dropdown.style.display = "grid";
    dropdown.style.opacity = "1";
});

// Hide dropdown when input loses focus
SearchField.addEventListener("blur", () => {
    setTimeout(() => {
        dropdown.style.display = "none";
    }, 150);
});

SearchButton.onclick = FetchData;

// Clear previous data
function clearExistingData() {
    countryName.textContent = "";
    otherNames.textContent = "";
    nativeLang.textContent = "";
    capital.textContent = "";
    region.textContent = "";
    currency.textContent = "";
    population.textContent = "";
    borders.textContent = "";
    FlagSection.innerHTML = "";
    DataSection.style.visibility = "hidden";
}

// Fetch API data
async function FetchData() {
    if (SearchField.value === '') {
        return;
    }
    const Name = SearchField.value;
    const URL = `https://restcountries.com/v3.1/name/${Name}?fullText=true`;

    clearExistingData();
    SearchButton.textContent = "Searching";

    try {
        let response = await fetch(URL);
        let CountryData = await response.json();

        if (response.ok) {
            DataSection.classList.add('loading');
            DataSection.style.visibility = "visible";

            setTimeout(() => {
                DataSection.classList.remove('loading');
                DataSection.style.pointerEvents = "auto";
                SearchButton.textContent = "Search";

                countryName.textContent = Name;
                otherNames.textContent = CountryData[0].altSpellings[2] || '';
                capital.textContent = CountryData[0].capital?.toString() || "N/A";
                nativeLang.textContent = Object.values(CountryData[0].languages || {}).toString() || "N/A";
                region.textContent = CountryData[0].region || "N/A";
                currency.textContent = Object.values(CountryData[0].currencies || {})[0]?.name || "N/A";
                population.textContent = CountryData[0].population || "N/A";
                borders.textContent = (CountryData[0].borders || []).join(", ") || "None";

                const FlagImage = CountryData[0].flags.png;
                FlagSection.innerHTML = `<img src="${FlagImage}" alt="Flag of ${Name}">`;
            }, 1500);
        } else {
            alert("Invalid Country Name");
            DataSection.classList.remove('loading');
            DataSection.style.pointerEvents = "auto";
            SearchButton.textContent = "Search";
            clearExistingData();
        }

        SearchField.value = "";
    } catch (error) {
        alert(error.message);
        DataSection.classList.remove('loading');
        DataSection.style.pointerEvents = "auto";
        SearchButton.textContent = "Search";
        clearExistingData();
    }
}
