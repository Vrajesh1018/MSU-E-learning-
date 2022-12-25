const sideNavDropdownBtn = document.getElementById("side-nav-dropdown-btn");
const sideNavDropdown = document.getElementById("side-nav-course-dropdown");
let clicked = false;
sideNavDropdownBtn.addEventListener("click", () => {
  if (!clicked) {
    sideNavDropdown.style.display = "block";
  } else {
    sideNavDropdown.style.display = "none";
  }
  clicked = !clicked;
});
