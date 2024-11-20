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

const contentCenter = document.querySelector(".content-center");
const scrollableXContainerCenter = document.querySelector(".scrollableX-container-center");

contentCenter.addEventListener("scroll", () => {
  const scrollLeft = contentCenter.scrollLeft;

  if (scrollLeft > 0) {
    scrollableXContainerCenter.classList.add("start");
  } else {
    scrollableXContainerCenter.classList.remove("start");
  }
});

/* ------------------------------------------------------------------------------------------------------------ */
/* Search aside + dropdown */
/* const searchButtonAside = document.getElementById("search-btn-aside");
searchButtonAside.onclick = function () {
  const searchBar = document.getElementById("search-bar");
  searchBar.classList.toggle("clicked");
}; */

/*barra di ricerca*/

/*document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn-aside");

  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.id = "search-bar";
  searchBar.className = "search-bar";
  searchBar.placeholder = "Cerca...";
  searchBar.style.display = "none";

  const parentContainer = searchBtn.parentElement;
  parentContainer.appendChild(searchBar);

  searchBtn.addEventListener("click", function () {
    if (searchBar.style.display === "none") {
      searchBar.style.display = "block";
      searchBar.focus();
    } else {
      searchBar.style.display = "none";
    }
  });
});*/

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn-aside");
  const searchBar = document.getElementById("search-bar");
  const searchContainer = document.getElementById("search-container");

  searchBtn.addEventListener("click", function () {
    if (searchBar.style.display === "none") {
      searchBar.style.display = "inline-block";
      searchBar.style.border = "none";
      searchBar.style.backgroundColor = "#222529";
      searchBar.style.borderRadius = "2px";
      searchContainer.style.backgroundColor = "#222529";
      searchContainer.style.borderRadius = "5px";
      searchContainer.style.width = "70%";
    } else {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
    }
  });

  document.addEventListener("click", function (event) {
    if (!searchContainer.contains(event.target)) {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
    }
  });
});
