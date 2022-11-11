
console.log("Hi from cs js");
var items = document.querySelectorAll('.citem2')
//console.log(items);
items.forEach((el) => {
    const minPerSlide = 5
    let next = el.nextElementSibling
    console.log("next is "+next);
   
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }

        // true means node including inner content same is called.
        
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }

    //console.log("kdsankdnsa");
});