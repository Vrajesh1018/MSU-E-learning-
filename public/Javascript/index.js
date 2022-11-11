// document.querySelectorAll(".signUp-button")[0].addEventListener("click", function () {
//     document.getElementById("popup").style.display = "flex";
// });

// document.getElementById("close").addEventListener("click", function () {
//   document.getElementById("popup").style.display = "none";
//   console.log("Hello");
// });


  $(".cards").slick({
    arrows: true,
    dots:true,
    infinite:true,
    slidesToShow: 4,
    slidesToScroll: 4,
  });

const labels = document.querySelectorAll(".sign-in-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 100}ms">${letter}</span>`
    )
    .join("");
});

// On scroll the color of navbar change

$(document).scroll(function () {
  var $nav = $(".navbar");
  $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
});

$(document).ready(() => {
  $("#li-cse").on("click", () => {});
});

//   carousel JS
var items = document.querySelectorAll(".citem");
console.log(items);
items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }

  //   console.log("kdsankdnsa");
});


