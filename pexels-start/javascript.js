const loadButton = document.getElementById("load-button");
const loadButton2 = document.getElementById("load-button-2");
const imgs = Array.from(document.getElementsByClassName("card-img-top"));
const hideButtons = Array.from(
  document.querySelectorAll(".btn-group button:nth-of-type(2)")
);
const viewButtons = Array.from(
  document.querySelectorAll(".btn-group button:nth-of-type(1)")
);
const modalImg = document.querySelector(".modal-body img");
const small = Array.from(document.getElementsByTagName("small"));
const searchForm = document.getElementsByTagName("form")[0];

const hideCards = function (e) {
  e.target.closest(".card").remove();
};

hideButtons.forEach((button) => {
  button.innerText = "Hide";
  button.addEventListener("click", hideCards);
});

viewButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const cardDiv = e.target.closest(".card");
    const img = cardDiv.getElementsByTagName("img")[0];
  });
});

// Aggiungiamo la possibilità di cliccare sull'immagine e sul titolo per arrivare
// nella pagina dei dettagli.
const goToDetails = function (imgUrl, photographer, photographerWebsite) {
  location.href = `./details.html?urlOfImg=${imgUrl}&photographer=${photographer}&photographerWebsite=${photographerWebsite}`;
};

url1 = "https://api.pexels.com/v1/search?query=[your-query]";
url2 = "https://api.pexels.com/v1/search?query=[your-secondary-query]";
url3 = "https://api.pexels.com/v1/search?query=nature";

const renderImgs = (array) => {
  array.forEach((element, i) => {
    imgs[i].src = element.src.original;
    // Aggiungo un add event listener per la pagina dei dettagli
    imgs[i].addEventListener("click", function () {
      goToDetails(
        element.src.original,
        element.photographer,
        element.photographer_url
      );
    });
  });
};

const changeText9mins = (array) => {
  small.forEach((element, i) => {
    element.innerText = array[i].id;
  });
};

const getImages = (url) => {
  fetch(url, {
    headers: {
      Authorization: "5RKicZfAEfo8m1JX6yT1vyTmAYDVq4777xWQyZfx1QBRZM4xWq7CeS1i",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("nope");
      }
    })
    .then((data) => {
      const arrayOfImgs = data.photos;

      changeText9mins(arrayOfImgs);
      renderImgs(arrayOfImgs);
    })
    .catch((err) => {
      console.log(err);
    });
};

// LOAD BUTTONS

loadButton.addEventListener("click", function () {
  getImages(url1);
});

loadButton2.addEventListener("click", function () {
  getImages(url2);
});

// SEARCH BAR
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchInputValue = document.getElementsByTagName("input")[0].value;

  const urlToUse = `https://api.pexels.com/v1/search?query=${searchInputValue}`;
  getImages(urlToUse);
});
