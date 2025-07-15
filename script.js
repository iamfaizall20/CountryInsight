
const fetchData = async () =>{
    
    const countryName = "pakistan";
    const URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    let response  = await fetch(URL);
    let data = await response.json();

    console.log(data[0]);
}
fetchData();
