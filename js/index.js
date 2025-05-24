/****************************************side navbar**************************************************** */

$(".open-close").click(function () {
  //close list
  if ($(".list").css("left") == "0px") {
    $(".list").css("left", "-300px")
    $(".taps").css("margin-left", "0px")
    $(".open-close").addClass("fa-grip-lines").removeClass("fa-x")
    $("li").animate({ paddingTop: "250px", opacity: "0" }, 1000)

  }


  else {
    //open list
    console.log($(".list").css("left"));
    $(".list").css("left", "0px")
    $(".taps").css("margin-left", "250px")
    $(".open-close").removeClass("fa-grip-lines").addClass("fa-x")
    $("li").animate({ paddingTop: "25px", opacity: "1" }, 1000)




  }

})
/*******************************************side navbar******************************************************** */

/********************************************back to top******************************************************** */


let searchTop = $("#search").offset().top;

$(window).scroll(function () {
  let windowTop = $(window).scrollTop();
  if (windowTop > searchTop) {
    $("#backToTop").addClass("hide");
  } else {
    $("#backToTop").removeClass("hide");
  }
});

$("#backToTop").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});

/********************************************back to top******************************************************** */


/********************************************get now playing*************************************************** */
var results;

$(".links ul").on("click", "li", async function () {
  let apis = $(this).data("api");
  if (!apis) return;

  $("html, body").animate({ scrollTop: 0 }, "slow");

  let myapi;
  if (apis === "trending") {
    myapi = `https://api.themoviedb.org/3/trending/movie/day?api_key=e172d090ec0f9315e8a5f1d49903aedf`;
  } else {
    myapi = `https://api.themoviedb.org/3/movie/${apis}?api_key=e172d090ec0f9315e8a5f1d49903aedf`;
  }

  try {
    let data = await fetch(myapi);
    let final = await data.json();
    results = final.results;
    console.log(results);
    display_moives();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

$(document).ready(async function () {
  let defaultAPI = "https://api.themoviedb.org/3/movie/now_playing?api_key=e172d090ec0f9315e8a5f1d49903aedf";
  try {
    let data = await fetch(defaultAPI);
    let final = await data.json();
    results = final.results;
    display_moives();
  } catch (error) {
    console.error("Error loading default movies:", error);
  }
});

function display_moives() {
  var cartona = ``

  for (let i = 0; i < results.length; i++) {
    cartona += `
       <div class=" main-card col-lg-4 col-md-6 col-sm-12 my-4 ">
                <div class="my-card overflow-hidden position-relative">
                    <div class="card-image">
                        <img src="https://image.tmdb.org/t/p/original/${results[i].poster_path}" class="w-100"
                            alt="">
                    </div>

                    <div class="layer position-absolute text-white p-4  leftMove">
                        <h2 class="title title-animate">${results[i].title}</h2>
                        <p class="mx-auto parag">${results[i].overview}</p>
                        <h4 class="date"> Release Date : <span>${results[i].release_date}</span> </h4>
                        <h4 class="rounded-circle bg-transparent rate d-flex justify-content-center align-items-center ">${results[i].vote_average.toFixed(1)}</h4>

                    </div>
                </div>
      </div>
    
    `
  }
  $("#moive").html(cartona)

  $(".my-card").on("mouseenter", animateright);


  $(".my-card").on("mouseleave", animateLeft);



}


/********************************************get now playing*************************************************** */


/********************************************Animation*********************************************************** */
function animateLeft() {
  $(this).find($(".layer")).addClass("leftMove")
  $(this).find($(".layer")).removeClass("rightMove")
  $(this).find($(".parag")).removeClass("paragraphShake")
  $(this).find($(".parag")).addClass("paragraphleave")
  $(this).find($(".title")).addClass("title-animation_out")
  $(this).find($(".title")).removeClass("title-animation_in")
  $(this).find($(".date")).addClass("date-out")
  $(this).find($(".date")).removeClass("date-in")
  $(this).find($(".rate")).addClass("rate-out")
  $(this).find($(".rate")).removeClass("rate-in")


}
function animateright() {
  $(this).find($(".layer")).removeClass("leftMove")
  $(this).find($(".layer")).addClass("rightMove")
  $(this).find($(".parag")).addClass("paragraphShake")
  $(this).find($(".parag")).removeClass("paragraphleave")
  $(this).find($(".title")).removeClass("title-animation_out ")
  $(this).find($(".title")).addClass("title-animation_in ")
  $(this).find($(".date")).removeClass("date-out")
  $(this).find($(".date")).addClass("date-in")
  $(this).find($(".rate")).addClass("rate-in")
  $(this).find($(".rate")).removeClass("rate-out")




}

/********************************************Animation*********************************************************** */




/********************************Search*************************************** */


$("#Search").on("keyup", async function () {
  let input_data = $(this).val().trim();

  if (input_data.length === 0) {
    let defaultAPI = "https://api.themoviedb.org/3/movie/now_playing?api_key=e172d090ec0f9315e8a5f1d49903aedf";
    try {
      let data = await fetch(defaultAPI);
      let final = await data.json();
      results = final.results;
      display_moives();
    } catch (error) {
      console.error("Error loading default movies:", error);
    }
    return;
  }
  let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=e172d090ec0f9315e8a5f1d49903aedf&query=${encodeURIComponent(input_data)}`;

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    results = data.results;
    display_moives();
  } catch (error) {
    console.error("Search error:", error);
  }

});

/********************************Search*************************************** */



/********************************REGEX*************************************** */
let yourname = document.querySelector(".yourName")
let youremail = document.querySelector(".yourEmail")
let yourphone = document.querySelector(".yourPhone")
let yourage = document.querySelector(".yourAge")
let yourpassword = document.querySelector(".yourPassword")
let rePassword = document.querySelector(".yourRePassword")
function nameValidation() {

  var regex = /^[A-za-z0-9]{3,15}$/;

  if (regex.test(yourname.value) || yourname.value == "") {
    console.log("tmam");
    $("#nameError").addClass("d-none")
    return true

  }
  else {
    console.log("msh");
    $("#nameError").removeClass("d-none")
    return false
  }
}
$(".yourName").on("input", function () {
  nameValidation()
})


function emailValidation() {

  var regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{3}$/;

  if (regex.test(youremail.value) || youremail.value == "") {
    console.log("tmam");
    $("#emailError").addClass("d-none")

    return true
  }
  else {
    console.log("msh");
    $("#emailError").removeClass("d-none")
    return false
  }
}
$(".yourEmail").on("input", function () {
  emailValidation()
})

function phoneValidation() {

  let regex = /^(01)[0125][0-9]{8}$/;

  if (regex.test(yourphone.value) || yourphone.value == "") {
    console.log("tmam");
    $("#phoneError").addClass("d-none")

    return true
  }
  else {
    console.log("msh");
    $("#phoneError").removeClass("d-none")
    return false
  }
}
$(".yourPhone").on("input", function () {
  phoneValidation()
})
function ageValidation() {

  let regex = /^(1[6-9]|[2-7][0-9]|80)$/;

  if (regex.test(yourage.value) || yourage.value == "") {
    console.log("tmam");
    $("#ageError").addClass("d-none")
    return true

  }
  else {
    console.log("msh");
    $("#ageError").removeClass("d-none")
    return false
  }
}
$(".yourAge").on("input", function () {
  ageValidation()
})
function passwordValidation() {

  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (regex.test(yourpassword.value) || yourpassword.value == "") {
    console.log("tmam");
    $("#passwordError").addClass("d-none")

    return true
  }
  else {
    console.log("msh");
    $("#passwordError").removeClass("d-none")
    return false

  }
}
$(".yourPassword").on("input", function () {
  passwordValidation()
})

function rePasswordValidation() {

  let mypassword = yourpassword.value

  if (rePassword.value == mypassword || rePassword.value == "") {
    console.log("tmam");
    $("#rePasswordError").addClass("d-none")
    return true

  }
  else {
    console.log("msh");
    $("#rePasswordError").removeClass("d-none")
    return false

  }
}
$(".yourRePassword").on("input", function () {
  rePasswordValidation()
})








function checkAll() {
  if (nameValidation() && emailValidation() && ageValidation() && phoneValidation() && passwordValidation() && rePasswordValidation()) {
    $(".mybtn").removeAttr("disabled");  
    $(".mybtn").removeClass("shakebtn bg-danger");
    }
  else {
    $(".mybtn").attr("disabled", true)
    $(".mybtn").addClass("shakebtn bg-danger")
     
  }
}





$(".yourName, .yourEmail, .yourPhone, .yourAge, .yourPassword, .yourRePassword").on("input", function () {
  nameValidation();
  emailValidation();
  phoneValidation();
  ageValidation();
  passwordValidation();
  rePasswordValidation();
  checkAll();
});

checkAll();

function buttonValidationtrue() {
  $(".mybtn").addClass("button_shake")
  $(".mybtn").removeClass("button_start")

}

function buttonValidationfasle() {
  $(".mybtn").removeClass("button_shake")
  $(".mybtn").addClass("button_start")


}