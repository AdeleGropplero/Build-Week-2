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
      /* Fetch CANZONI */

      fetchArtistSongs(artista.name);
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'artista:", error);
    });
};

/* Fetch CANZONI */

const fetchArtistSongs = (artistName) => {
  const URLSongs = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`;

  fetch(URLSongs, {
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
    .then((songs) => {
      console.log("RISULTATOOOOOOOOOO:", songs);

      const bestSongs = songs.data.slice(0, 6); // Usa slice per prendere le prime 6 canzoni
      console.log("best:", bestSongs);

      const songList = document.querySelector(".songList"); // Assicurati che esista un elemento con questa classe
      songList.innerHTML = ""; // Pulisce eventuali contenuti esistenti nella lista

      bestSongs.forEach((song) => {
        const li = document.createElement("li"); // Crea un elemento list-item
        li.innerHTML = `
    <div class="card card-aside justify-content-between">
      <div class="d-flex">
        <div class="p-2">
          <img
            src="${song.album.cover_medium}" 
            class="img-fluid rounded img-aside"
            alt="${song.title}"
          />
        </div>
        <div
          class="px-3 py-1 d-flex align-content-center justify-content-between w-100 align-items-center align-self-center"
        >
          <div
            class="px-0 py-2 overflow-hidden  "
          >
            <h5 class="card-title fs-6">${song.title}</h5>
          </div>
          <div class="px-0 py-2">
            <span class="card-title fs-6">${song.rank} Ascolti</span>
          </div>
          <div class="spaceminutes py-0">
            <div class="d-flex justify-content-between">
              <button
                class="bg-transparent border border-0"
              >
                <div class="align-self-center">
                  <i class="bi bi-plus-circle"></i>
                </div>
              </button>
              <div
                class="align-self-end"
                style="padding-top: 14px"
              >
                <p>${Math.floor(song.duration / 60)}:${
          song.duration % 60 < 10 ? "0" : ""
        }${song.duration % 60} </p>
              </div>
              <button
                class="bg-transparent border border-0"
              >
                <div class="align-self-center">
                  <i class="bi bi-three-dots"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

        li.onclick = function () {
          // Controlla se esiste già un audio in riproduzione e lo interrompe
          const existingAudio = document.querySelector("audio");
          if (existingAudio) {
            existingAudio.pause();
            existingAudio.remove();
          }

          // Crea un nuovo elemento audio
          const audio = document.createElement("audio");
          audio.src = song.preview; // URL dell'anteprima audio
          audio.controls = true; // Mostra i controlli audio
          audio.autoplay = true; // Avvia la riproduzione automaticamente

          /* audio.controls.style.display = "none"; */

          // Aggiungi l'elemento audio al list-item o a un contenitore
          li.appendChild(audio);
        };

        songList.appendChild(li); // Aggiungi la card alla lista
      });
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
