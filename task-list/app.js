
const buttonSelect = document.querySelector("#task-button");
        //console.log(buttonSelect)
    buttonSelect.addEventListener("click" , function(event) {
        event.preventDefault();
   
         const selectTaskList = document.querySelector(".card-title");
        //  console.log(selectTaskList)
        
         if(selectTaskList.innerText === "Task List"){
          selectTaskList.innerText = "Usama";
          selectTaskList.style.color = "gray";
         } 
          else{
            selectTaskList.innerText = "Task List"
            //selectTaskList.style.color = ""
          }


    });




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
  
 const selectAllLiElement = document.querySelectorAll("ul li:nth-child(even)");
 selectAllLiElement.forEach(function (usamahussain) {
        usamahussain.style.color = "blue"; 
        usamahussain.style.backgroundColor = "yellow";
      });
      const selectAllLiElement2 = document.querySelectorAll("ul li:nth-child(odd)");
          selectAllLiElement2.forEach(function (usama){
            usama.style.color = "red";
            usama.style.backgroundColor = "gray";
    });
    ///////////////////////////////////////////////////////////////////////////

    const collectionClick = document.querySelector(".collection");
    collectionClick.addEventListener("click" , function(event) {
               event.preventDefault();
               console.log(collectionClick)
           if(event.target.className === "fa fa-remove"){
            if(confirm ("are you sure")){
              event.target.parentElement.parentElement.remove();
            }
           }    
    })