
const toggleSpinner = () => {
    document.getElementById('loader').classList.add('fade-out');
};
window.onload = () => {
  setInterval(function () {
    toggleSpinner();
  }, 3000);
};


const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = "";
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data));
}

const displaySearchResult = (mobiles) => {
    const searchResult = document.getElementById('search-result');
    mobiles.slice(0, 20).forEach((mobile) => {
        console.log(mobile);
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div>
        <img src="${mobile.image}" alt="" />
        <h2>${mobile.phone_name}</h2>
        </div>
        `
        searchResult.appendChild(div);
    });
}


