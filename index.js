/* ------------------------------------------------------------------------------------------------------------ */
/* carosello */
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

/* ------------------------------------------------------------------------------------------------------------ */
/* Search aside + dropdown */
/* const searchButtonAside = document.getElementById("search-btn-aside");
searchButtonAside.onclick = function () {
  const searchBar = document.getElementById("search-bar");
  searchBar.classList.toggle("clicked");
}; */
