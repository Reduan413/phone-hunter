const toggleSpinner = (displayStyle) => {
  document.getElementById("loader").style.display = displayStyle;
};

const toggleSearchResult = (displayStyle) => {
  document.getElementById("search-mobile").style.display = displayStyle;
};


const searchMobile = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  //display loader
  toggleSpinner("block");
  toggleSearchResult("none");

  //clear data
  searchField.value = "";
  
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (mobiles) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  mobiles.slice(0, 20).forEach((mobile) => {
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
  toggleSpinner("none");
  toggleSearchResult("block");
};

const loadeMobileDetail = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayMobileDetail(data.data));
}

const displayMobileDetail = (mobile) => {
  const mobileDetail = document.getElementById("mobile-details");
  mobileDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add('card', 'mb-3');
  div.style.maxWidth  = "95%";
  div.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4 mobile-img">
          <img
            src="${mobile.image}"
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">${mobile.name}</h2>
            <p class="card-text">
              <span>Exp:</span> ${mobile.releaseDate}
            </p>
            
            <table class="table">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"><h4>Main Features</h4></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">ChipSet</th>
                    <td>${mobile.mainFeatures.chipSet}</td>
                  </tr>
                  <tr>
                    <th scope="row">Display Size</th>
                    <td>
                    ${mobile.mainFeatures.displaySize}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Memory</th>
                    <td colspan="2">
                    ${mobile.mainFeatures.memory}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Sensors</th>
                    <td colspan="2">
                     ${mobile.mainFeatures.sensors.map((sensor)=>{
                        return`  ${sensor}  `
                     })}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Storage</th>
                    <td colspan="2">
                    ${mobile.mainFeatures.storage}
                    </td>
                  </tr>
                </tbody>
              </table>
            </table>
            ${mobile.others?
              `<table class="table">
                <thead>
                  <tr>
                    <th scope="col"><h4>Other Information</h4></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Bluetooth</th>
                    <td>${mobile.others.Bluetooth}</td>
                  </tr>
                  <tr>
                    <th scope="row">GPS</th>
                    <td colspan="2">
                    ${mobile.others?.GPS}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">NFC</th>
                    <td colspan="2">
                    ${mobile.others?.NFC}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Radio</th>
                    <td colspan="2">${mobile.others?.Radio}</td>
                  </tr>
                  <tr>
                    <th scope="row">USB</th>
                    <td colspan="2">${mobile.others?.USB}</td>
                  </tr>
                  <tr>
                    <th scope="row">WLAN</th>
                    <td colspan="2">${mobile.others?.WLAN}</td>
                  </tr>
                </tbody>
              </table>`:''}
          </div>
        </div>
    </div>`;
  mobileDetail.appendChild(div);
};