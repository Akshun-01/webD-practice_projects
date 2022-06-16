let submit = document.querySelector(".submitBtn");
let ratings = document.querySelectorAll(".number");
let numberOfRatings = ratings.length;
let num = document.querySelector(".num");

let number;
 
for(let i=0; i<numberOfRatings; i++)
{
    ratings[i].addEventListener('click',()=>{
        ratings.forEach(element => {
            element.classList.remove("selected");
        });
        ratings[i].classList.add("selected");
        number = i+1;
    })
}

function onSubmit(number){
    num.innerHTML = number;
    document.querySelector(".start").classList.add("hide");
    document.querySelector(".end").classList.remove("hide");
}

submit.addEventListener('click', ()=>{ 
    onSubmit(number);
})

