// Input Field and Button
const SearchField = document.getElementById('searchField'),
    SearchButton = document.getElementById('searchButton'),
    DataSection = document.querySelector('.data-section'),
    FlagSection = document.querySelector('.flag-prt');

// Selectors
const
    countryName = document.querySelector('.countryName'),
    otherNames = document.querySelector('.otherName'),
    nativeLang = document.getElementById('nativeLang'),
    capital = document.getElementById('capital'),
    region = document.getElementById('region'),
    currency = document.getElementById('currency'),
    population = document.getElementById('population'),
    borders = document.getElementById('borders');



SearchButton.onclick = async () => {

    const Name = SearchField.value;
    const URL = `https://restcountries.com/v3.1/name/${Name}?fullText=true`;

    try {
        let response = await fetch(URL);
        let CountryData = await response.json();

        if (response.ok) {
            DataSection.style.visibility = "visible";
            countryName.textContent = Name;
            otherNames.textContent = CountryData[0].altSpellings[Object.keys(CountryData[0].altSpellings)[2]]
            capital.textContent = CountryData[0].capital.toString();
            nativeLang.textContent = Object.values(CountryData[0].languages).toString();
            region.textContent = CountryData[0].region;
            currency.textContent = Object.values(CountryData[0].currencies)[0].name;
            population.textContent = CountryData[0].population;
            borders.textContent = CountryData[0].borders.join(", ");

            const FlagImage = CountryData[0].flags.png;

            FlagSection.innerHTML =
                `<img src = "${FlagImage}" >`

        } else {
            alert("Invalid Country Name");
        }
        SearchField.value = "";
    } catch (error) {
        alert(error.message);
    }

}