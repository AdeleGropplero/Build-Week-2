/* ------------------------------------------------------------------------------------------------------------ */
/* carosello  aside*/
const content = document.querySelector(".content");
const scrollableContainer = document.querySelector(".scrollable-container");

content.addEventListener("scroll", () => {
  const scrollLeft = content.scrollLeft;

  if (scrollLeft > 0) {
    scrollableContainer.classList.add("start");
  } else {
    scrollableContainer.classList.remove("start");
  }
});

/* caroselli centrali*/

const contentCenter = document.querySelectorAll(".content-center");
const scrollableXContainerCenter = document.querySelectorAll(
  ".scrollableX-container-center"
);
contentCenter.forEach((singleContent) => {
  singleContent.addEventListener("scroll", () => {
    const scrollLeft = singleContent.scrollLeft;

    scrollableXContainerCenter.forEach((singleScrollable) => {
      if (scrollLeft > 0) {
        singleScrollable.classList.add("start");
      } else {
        singleScrollable.classList.remove("start");
      }
    });
  });
});

/* ------------------------------------------------------------------------------------------------------------ */
/* Search aside + dropdown */

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn-aside");
  const searchBar = document.getElementById("search-bar");
  const searchContainer = document.getElementById("search-container");
  const recenti = document.getElementById("recentiScoparsa");

  searchBtn.addEventListener("click", function () {
    if (searchBar.style.display === "none") {
      searchBar.style.display = "inline-block";
      searchBar.style.border = "none";
      searchBar.style.backgroundColor = "#222529";
      searchBar.style.borderRadius = "2px";
      searchContainer.style.backgroundColor = "#222529";
      searchContainer.style.borderRadius = "5px";
      searchContainer.style.maxWidth = "80%";

      recenti.style.display = "none";
    } else {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
      recenti.style.display = "block";
    }
  });

  document.addEventListener("click", function (event) {
    if (!searchContainer.contains(event.target)) {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
    }
  });
});

/*  card   Genera un colore RGB casuale*/
/* function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function assignRandomBackgroundColor() {
  const divInternoCol = document.querySelectorAll(".div-interno-col");
  divInternoCol.forEach((singolaCard) => {
    singolaCard.style.backgroundColor = getRandomColor();
  });
}
window.addEventListener("DOMContentLoaded", () => {
  assignRandomBackgroundColor();
}); */

/* Selezioniamo dinamicamente il colore medio delle img */
/* const ColorThief = require("color-thief"); */

const cards = document.querySelectorAll(".div-interno-col");

if (typeof ColorThief !== "undefined") {
  const colorThief = new ColorThief();

  // Per ogni card
  cards.forEach((card) => {
    const image = card.querySelector(".img-colore-sfondo"); /* prendo l'img*/

    /* in questo punto mi assicuro che l'immagine sia caricata */
    image.addEventListener("load", () => {
      const dominantColor = colorThief.getColor(image); // Restituisce [r, g, b]
      /* console.log(dominantColor); */

      card.style.backgroundColor = `rgb(${dominantColor.join(",")})`;
    });
  });
} else {
  console.error("Color Thief non è disponibile!");
}

/* QUI STIAMO PRENDENDO GLI ALBUM PER L'ASIDE ------------------------------------------------ */
let asideParamsAlbums = [
  "7577443",
  "215835692",
  "654526461",
  "8348500",
  "597803082"
];

const URLendPointAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const getAsideAlbums = function () {
  asideParamsAlbums.forEach((id) => {
    fetch(URLendPointAlbum + id, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "79e73f6e23msh27cee76b6fac777p19859ejsnca84c5744e54",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `Ci dispiace, non siamo riusciti a reperire i dati dell'artista.`
          );
        }
      })
      .then((oggetto) => {
        console.log(oggetto);

        const containerCards = document.querySelector("#containerCards");

        const cardAside = document.createElement("div");
        cardAside.className = "card card-aside";

        const divCard = document.createElement("div");
        divCard.className = "d-flex divCard";

        const divCardInterno = document.createElement("div");
        divCardInterno.className = "p-2 divInterno";

        const cardImg = document.createElement("img");
        cardImg.className = "img-fluid rounded img-aside";
        cardImg.src = `${oggetto.cover_small}`;

        const divInternissimo = document.createElement("div");

        const cardBody = document.createElement("div");
        cardBody.className = "card-body px-0 py-2 overflow-hidden";

        const h5 = document.createElement("h5");
        h5.className = "card-title fs-6";
        h5.innerText = `${oggetto.title}`;
        h5.style.overflow = "hidden";
        h5.style.maxHeight = "20px";
        h5.style.maxWidth = "210px";

        const p1 = document.createElement("p");
        p1.className = "card-text testi7";
        p1.innerText = `Album · ${oggetto.artist.name}`;

        const icon = document.createElement("i");
        icon.className = "bi bi-play-fill fs-2 rounded-circle";
        icon.id = "play-icon";

        containerCards.appendChild(cardAside);
        cardAside.appendChild(divCard);
        divCard.append(divCardInterno, divInternissimo);
        divCardInterno.appendChild(cardImg);
        divCard.appendChild(icon);
        divInternissimo.appendChild(cardBody);
        cardBody.append(h5, p1);
      })
      .catch((err) => console.log(err));
  });
};

/* FINE ALBUM ASIDE ---------------------------------------------------------------------------------  */
/* QUI STIAMO PRENDENDO GLI ARTISTI PER L'ASIDE ------------------------------------------------ */

let asideParamsArtist = ["3469", "13", "1188", "776", "996589"];
const URLendPointArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const getAsideArtists = function () {
  for (let i = 0; i < asideParamsArtist.length; i++) {
    const id = asideParamsArtist[i];
    fetch(URLendPointArtist + id, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "79e73f6e23msh27cee76b6fac777p19859ejsnca84c5744e54",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `Ci dispiace, non siamo riusciti a reperire i dati dell'artista.`
          );
        }
      })
      .then((oggetto) => {
        console.log(oggetto);

        const containerCards = document.querySelector("#containerCards");

        const cardAside = document.createElement("div");
        cardAside.className = "card card-aside";

        const divCard = document.createElement("div");
        divCard.className = "d-flex";

        const divCardInterno = document.createElement("div");
        divCardInterno.className = "p-2";

        const cardImg = document.createElement("img");
        cardImg.className = "img-fluid rounded img-aside rounded-circle";
        cardImg.src = `${oggetto.picture_small}`;

        const divInternissimo = document.createElement("div");

        const cardBody = document.createElement("div");
        cardBody.className = "card-body px-0 py-2 overflow-hidden";

        const h5 = document.createElement("h5");
        h5.className = "card-title fs-6";
        h5.innerText = `${oggetto.name}`;
        h5.style.overflow = "hidden";
        h5.style.maxHeight = "20px";
        h5.style.maxWidth = "210px";

        const p1 = document.createElement("p");
        p1.className = "card-text testi7";
        p1.innerText = `${oggetto.type}`;

        const icon = document.createElement("i");
        icon.className = "bi bi-play-fill fs-2 rounded-circle";
        icon.id = "play-icon";

        containerCards.appendChild(cardAside);
        cardAside.appendChild(divCard);
        divCard.append(divCardInterno, divInternissimo);
        divCardInterno.appendChild(cardImg);
        divCard.appendChild(icon);
        divInternissimo.appendChild(cardBody);
        cardBody.append(h5, p1);
      })
      .catch((err) => console.log(err));
  }
};
/* FINE ARTISTI ASIDE ---------------------------------------------------------------------------------  */

/* WINDOW ON LOAD */

window.addEventListener("DOMContentLoaded", function () {
  getAsideAlbums();

  getAsideArtists();
});
