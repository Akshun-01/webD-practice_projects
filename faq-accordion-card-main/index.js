let arrows = document.querySelectorAll(".arrow");
let question = document.querySelectorAll(".question");
let text = document.querySelectorAll(".text");

let count = Array(5).fill(0);

arrows.forEach((element, i) => {
    element.parentNode.addEventListener('click', () => {

        text[i].classList.toggle("hide");
        question[i].classList.toggle("bold");
        arrows[i].classList.toggle("imgarrow");
    })
});
