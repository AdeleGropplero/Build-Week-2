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
      searchBar.style.maxWidth = "80%";

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

/* ------------------------------------------------------------------------------------------------------------ */
/* playbar */

/* const slider = document.getElementById("musicRange");

slider.addEventListener("input", function () {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  // Crea un gradiente che va dal bianco a sinistra (fino al valore) e grigio a destra
  if (slider.value <= slider.max) {
    slider.style.background = `linear-gradient(to right, rgb(255, 255, 255) ${value}%, #ddd ${value}%)`;
  }
}); */
/* ------------------------------------------------------------------------------------------------------------ */
/* Pare con API */
/* ---------------------------------------------------------------------------------  */
/* QUI STIAMO PRENDENDO LE CANZONI E GLI ALBUM PER LA PARTE CENTRALE ------------------------------------------------ */

const headerKeysAdele = {
  "x-rapidapi-key": "e749aa36bcmsh155faf2384d79a6p1a27bdjsn94b22b07ca21",
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
};

const headerKeysDavide = {
  "x-rapidapi-key": "79e73f6e23msh27cee76b6fac777p19859ejsnca84c5744e54",
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
};

const headerKeysMatteuccio = {
  "x-rapidapi-key": "4ab25cbbd8msh65706f56180c0dfp1e6d24jsna3b5d5575bb9",
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
};

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const params = [
  "eminem",
  "mannarino",
  "lazza",
  "radiohead",
  "883",
  "altj",
  "alter%20bridge",
  "salmo",
  "hozier",
  "mina",
  "muse",
  "pomme",
  "sia",
  "shiva"
];

let availableParams = [...params];

const getCards = function () {
  /* In caso volessimo generare SOLO le canzoni di -1- artista basterà 
  mettere il math.random fuori */
  const randomIndex = Math.floor(Math.random() * availableParams.length);
  const randomParam = availableParams.splice(randomIndex, 1)[0];

  console.log(`Artista selezionato: ${randomParam}`);

  fetch(url + randomParam, {
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
      const randomNumber = Math.floor(Math.random() * 15);

      const row = document.querySelector(".row-center-orizontal-cards");
      const col = document.createElement("div");
      col.className =
        "col-6 col-md-6 col-lg-4 col-xl-3 px-0 cols-center-orizontal-cards";

      const cardCenterOrizontal = document.createElement("div");
      cardCenterOrizontal.className = "card orizontal-card-central";

      const divCard = document.createElement("div");
      divCard.className = "d-flex";

      const divCardInterno = document.createElement("div");
      divCardInterno.className = "img-orizontal-card-central";

      const cardImg = document.createElement("img");
      cardImg.className = "img-fluid rounded img-aside";
      cardImg.src = `${oggetto.data[randomNumber].album.cover_small}`;

      const divInternissimo = document.createElement("div");

      const cardBody = document.createElement("div");
      cardBody.className = "card-body py-1 ps-2";

      const h5 = document.createElement("h5");
      h5.className = "card-title fs-6";
      h5.innerText = `${oggetto.data[randomNumber].album.title}`;
      h5.style.overflow = "hidden";
      h5.style.maxHeight = "20px";
      h5.style.maxWidth = "210px";

      const p1 = document.createElement("p");
      p1.className = "card-text testi7";
      p1.innerText = `${oggetto.data[randomNumber].artist.name}`;

      const playIcon = document.createElement("button");
      playIcon.className =
        "play-icon bi-play-circle-fill bg-transparent border-0";

      divCardInterno.appendChild(playIcon);

      row.appendChild(col);
      col.appendChild(cardCenterOrizontal);
      cardCenterOrizontal.appendChild(divCard);
      divCard.append(divCardInterno, divInternissimo);
      divCardInterno.appendChild(cardImg);
      divInternissimo.appendChild(cardBody);
      cardBody.append(h5, p1);
    })
    .catch((err) => console.log(err));
};

let availableParams2 = [...params];

const getArtists = function () {
  /* In caso volessimo generare SOLO le canzoni di -1- artista basterà 
  mettere il math.random fuori */

  const randomIndex = Math.floor(Math.random() * availableParams2.length);
  const randomParam = availableParams2.splice(randomIndex, 1)[0];

  console.log(`Artista selezionato: ${randomParam}`);

  fetch(url + randomParam, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e749aa36bcmsh155faf2384d79a6p1a27bdjsn94b22b07ca21",
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

      /*    const randomIndex = Math.floor(Math.random() * availableParams.length);
      const randomParam = availableParams.splice(randomIndex, 1)[0];
 */
      const randomNumber = Math.floor(Math.random() * 15);

      const contentsCenter = document.querySelectorAll(".singoli");

      contentsCenter.forEach((content) => {
        const cardCenterContent = document.createElement("div");
        cardCenterContent.className = "card-center-content";

        const divCard = document.createElement("div");
        divCard.className = "card border-0";

        const cardImg = document.createElement("img");
        cardImg.className = "card-img-top rounded-4";
        cardImg.src = `${oggetto.data[randomNumber].album.cover_medium}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const p = document.createElement("p");
        p.className = "card-title";
        p.innerText = `${oggetto.data[randomNumber].album.title}`;
        p.style.overflow = "hidden";
        p.style.maxHeight = "50px";

        const p1 = document.createElement("p");
        p1.className = "card-text";
        p1.innerText = `${oggetto.data[randomNumber].artist.name}`;

        content.appendChild(cardCenterContent);
        cardCenterContent.appendChild(divCard);
        divCard.append(cardImg, cardBody);
        cardBody.append(p, p1);
      });
    })
    .catch((err) => console.log(err));
};

let availableParams3 = [...params];
const getArtists2 = function () {
  /* In caso volessimo generare SOLO le canzoni di -1- artista basterà 
  mettere il math.random fuori */
  const randomIndex = Math.floor(Math.random() * availableParams3.length);
  const randomParam = availableParams3.splice(randomIndex, 1)[0];

  console.log(`Artista selezionato: ${randomParam}`);

  fetch(url + randomParam, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e749aa36bcmsh155faf2384d79a6p1a27bdjsn94b22b07ca21",
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
      const randomNumber = Math.floor(Math.random() * 15);

      const contentsCenter = document.querySelectorAll(".radio");

      contentsCenter.forEach((content) => {
        const cardCenterContent = document.createElement("div");
        cardCenterContent.className = "card-center-content";

        const divCard = document.createElement("div");
        divCard.className = "card border-0";

        const cardImg = document.createElement("img");
        cardImg.className = "card-img-top rounded-4";
        cardImg.src = `${oggetto.data[randomNumber].album.cover_medium}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const p = document.createElement("p");
        p.className = "card-title";
        p.innerText = `${oggetto.data[randomNumber].album.title}`;
        p.style.overflow = "hidden";
        p.style.maxHeight = "50px";

        const p1 = document.createElement("p");
        p1.className = "card-text";
        p1.innerText = `${oggetto.data[randomNumber].artist.name}`;

        content.appendChild(cardCenterContent);
        cardCenterContent.appendChild(divCard);
        divCard.append(cardImg, cardBody);
        cardBody.append(p, p1);
      });
    })
    .catch((err) => console.log(err));
};

let generi = [
  "576" /* Classical instrumental */,
  "87" /* Musica dal mondo */,
  "455" /* Rock */,
  "6" /* Electro */,
  "84" /* Europa Vox */,
  "10" /* Rock */,
  "11" /* Musica francese di varietà*/,
  "16" /* Pop */,
  "18" /* Dance floor */
];
let availableParams4 = [...generi];
const getGeneri = function () {
  /* In caso volessimo generare SOLO le canzoni di -1- artista basterà 
  mettere il math.random fuori */
  const randomIndex = Math.floor(Math.random() * availableParams4.length);
  const randomParam = availableParams4.splice(randomIndex, 1)[0];

  console.log(`Artista selezionato: ${randomParam}`);

  fetch(url + randomParam, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4ab25cbbd8msh65706f56180c0dfp1e6d24jsna3b5d5575bb9",
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
      const randomNumber = Math.floor(Math.random() * 15);

      const contentsCenter = document.querySelectorAll(".generi");

      contentsCenter.forEach((content) => {
        const cardCenterContent = document.createElement("div");
        cardCenterContent.className = "card-center-content";

        const divCard = document.createElement("div");
        divCard.className = "card border-0";

        const cardImg = document.createElement("img");
        cardImg.className = "card-img-top rounded-4";
        cardImg.src = `${oggetto.data[randomNumber].album.cover_medium}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const p = document.createElement("p");
        p.className = "card-title";
        p.innerText = `${oggetto.data[randomNumber].album.title}`;
        p.style.overflow = "hidden";
        p.style.maxHeight = "50px";

        const p1 = document.createElement("p");
        p1.className = "card-text";
        p1.innerText = `${oggetto.data[randomNumber].artist.name}`;

        content.appendChild(cardCenterContent);
        cardCenterContent.appendChild(divCard);
        divCard.append(cardImg, cardBody);
        cardBody.append(p, p1);
      });
    })
    .catch((err) => console.log(err));
};

/* ---------------------------------------------------------------------------------  */
/* FINE PARTE CENTRALE ------------------------------------------------ */

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
        const containerCards = document.querySelector("#containerCards");

        const cardAside = document.createElement("div");
        cardAside.className = "card card-aside";

        cardAside.addEventListener("click", () => {
          window.location.href = `/album.html?id=${oggetto.id}`;
        });

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
        "x-rapidapi-key": "a7524d652amshb0c3cd3dd6a3172p181ad3jsn2d82a48da120",
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
        const containerCards = document.querySelector("#containerCards");

        const cardAside = document.createElement("div");
        cardAside.className = "card card-aside";

        cardAside.addEventListener("click", () => {
          window.location.href = `/artist.html?id=${oggetto.id}`;
        });

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
/* FINE ARTISTI ASIDE --------------------------------------------------------------------------------  */

/* LINEAR GRADIENT SULLA HOME  ---------------------------------------------------------------------------------   */

/* WINDOW ON LOAD  ---------------------------------------------------------------------------------  */

window.addEventListener("DOMContentLoaded", function () {
  /*   for (let i = 0; i < 8; i++) {
    getCards();
  }

  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      getArtists();
    }
  }, 500);

  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      getArtists2();
    }
  }, 900);

  for (let i = 0; i < 10; i++) {
    getGeneri();
  }

  getAsideAlbums();

  getAsideArtists(); */
});
