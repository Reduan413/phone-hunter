const toggleSpinner = () => {
  document.getElementById("loader").classList.add("fade-out");
};
window.onload = () => {
  setInterval(function () {
    toggleSpinner();
  }, 0);
};

const searchMobile = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  searchField.value = "";
  //console.log(searchText);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (mobiles) => {
  const searchResult = document.getElementById("search-result");
  mobiles.slice(0, 20).forEach((mobile) => {
    console.log(mobile);
    const div = document.createElement("div");
    div.classList.add("col-3","rounded");
    div.innerHTML = `
        <div class="card ">
          <img src="${mobile.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${mobile.phone_name}</h3>
            <h5 class="card-text">Brand: ${mobile.brand}</h5>
            <div class="d-grid">
              <button class="btn btn-primary btn-lg btn-detail" onclick="loadeMobileDetail('${mobile.slug}')" type="button">Go Detail</button>
            </div>
          </div>
        </div> 
        `;
    searchResult.appendChild(div);
  });
};

const loadeMobileDetail = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.data));
}
