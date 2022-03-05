const input = document.querySelector("#text");
const ul = document.querySelector(".suggestions");
const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//to put comma between numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//url adresinden json dosyasını alıyoruz.
fetch(url).then(data => data.json()).then(states => {

    //json dosyasını aldıktan sonra inputa yazılan değeri dinlemeye başlıyoruz.
    input.addEventListener("keyup", e => {
        ul.innerHTML = "";
        states.forEach(state => {

            if ((e.target.value) == "") {
                ul.innerHTML = "<li>filter for a city</li> <li>or a state</li>";
            } else if ((state.city.toLowerCase().indexOf(e.target.value) != -1) || (state.state.toLowerCase().indexOf(e.target.value) != -1)) {

                const numbercomma = numberWithCommas(state.population);

                //********************************************************************************************* */

                //yazdığımız inputla eşleşen city veya state bölümünün arka planını sarı yapıyoruz.
                const regex = new RegExp(e.target.value, 'gi');
                const cityName = state.city.replace(regex, `<span class="highlight">${e.target.value}</span>`);
                const stateName = state.state.replace(regex, `<span class="highlight">${e.target.value}</span>`);
                //******************************************************************************************** */

                html = `<li><span class="text-left">${cityName}, ${stateName}</span> <span class="text-right">${numbercomma}</span></li>`;
                ul.innerHTML += html;
            }
        });



    })
});