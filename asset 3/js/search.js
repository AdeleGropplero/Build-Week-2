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
function getRandomColor() {
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
});
