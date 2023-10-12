const addressBarContent = new URLSearchParams(location.search);
const imgUrl = addressBarContent.get("urlOfImg");
const photographer = addressBarContent.get("photographer");
const photographer_url = addressBarContent.get("photographerWebsite");
const col = document.getElementById("column-1");
console.log(col);
const createCard = () => {
  col.innerHTML = `<div class="card">
      <img src="${imgUrl}" class="card-img-top" alt="image">
          <div class="card-body">
              <h5 class="card-title">${photographer}</h5>
              <p class="card-text">
                  <a href="${photographer_url}">Website</a>
              </p>
          </div>
    </div>`;
};

createCard();
