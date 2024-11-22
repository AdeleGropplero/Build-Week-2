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

/* PARTE GET PER ARTISTA PERSONALIZZATO */

const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const fetchArtistData = (id) => {
  fetch(URL + id, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a7524d652amshb0c3cd3dd6a3172p181ad3jsn2d82a48da120",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Impossibile recuperare i dati dell'artista");
      }
    })
    .then((artista) => {
      console.log(artista);

      const cardArtist = document.getElementById("cardArtist");
      cardArtist.innerHTML = `
    <img
      src=${artista.picture_xl}
      class="card-img-artist object-fit-cover"
      alt="..."
    />
    <div
      id="textArtist"
      class="card-img-overlay d-flex align-items-end"
    >
      <div class="">
        <h1 class="card-title d-inline-block">${artista.name}</h1>
        <p class="d-inline-block">
          <i
            class="bi bi-patch-check-fill text-primary small d-inline-block"
          ></i>
        </p>
        <p class="card-text">
          <small>${artista.nb_fan} Ascoltatori mensili</small>
        </p>
      </div>
    </div>
  </div>
`;
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'artista:", error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get("id");

  if (artistId) {
    fetchArtistData(artistId);
  } else {
    console.error("ID artista non trovato nella query string");
  }
});
