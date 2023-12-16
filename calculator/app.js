const Allbuttons = document.querySelector(".buttons");
const screenInput = document.querySelector(".screen");
const btnClear = document.querySelector(".btn-clear");
const selectEqualBtn = document.querySelector(".btn-equal");

// console.log(Allbuttons)
Allbuttons.addEventListener("click" , function(event){
    event.preventDefault();

        const currentElement = event.target;
        //  console.log(currentElement.classList, "currentElement");
       if(currentElement.classList.contains("btn")){
            // console.log("click on the button");
        
        const dataNumAttr = currentElement.getAttribute("data-num");
    
        screenInput.value += dataNumAttr;
       }
})
 btnClear.addEventListener("click" , function(event){
    event.preventDefault();

    screenInput.value = "";
 })

  selectEqualBtn.addEventListener("click" , function(event){
    event.preventDefault();
 
  screenInput.value = eval(screenInput.value);


  })
  function testOnlyLetters (string= ""){
    return /[a-zA-Z]+$/.test(string);
  }