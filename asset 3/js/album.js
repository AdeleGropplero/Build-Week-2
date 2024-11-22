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

/* PARTE GET PER ALBUM PERSONALIZZATO */

const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const fetchAlbumData = (id) => {
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
    .then((album) => {
      console.log(album);

      const cardAlbum = document.getElementById("cardAlbum");
      cardAlbum.innerHTML = `
 <div class="album-img d-flex px-3 gap-3 py-4">
                  <img
                  src= ${album.cover_medium}
                    alt="..."
                    style="
                      max-width: 27%;
                      height: 27%;
                      border-radius: 6px;
                      object-fit: contain;
                      box-shadow: 2px 1px 10px black;
                    "
                  />

                  <div
                    class="album-title d-flex flex-column justify-content-between"
                  >
                    <p class="py-1">Album</p>

                    <h1 class="fw-bold titleAlbum">${album.title}</h1>
                    <div class="d-flex align-items-baseline">
                      <img
                      src= ${album.artist.picture_small}
                       alt=""
                        class="rounded-circle"
                        style="width: 9%; object-fit: contain"
                      />
                      <div class="px-2 align-self-end">
                        <h6 class="fw-bold">${album.artist.name}</h6>
                      </div>
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
  const albumId = params.get("id");

  if (albumId) {
    fetchAlbumData(albumId);
  } else {
    console.error("ID artista non trovato nella query string");
  }
});
