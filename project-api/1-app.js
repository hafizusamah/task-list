const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;
const tbody = document.querySelector("#todos-listing");
const createPostForm = document.getElementById("create-post-form");
const postTitleInputField = document.querySelector("#post_title");
const postBodyInputField = document.querySelector("#post_body");
const editPostForm = document.querySelector("#edit-post-form");
const editPostTitleField = document.querySelector("#edit_post_title");
const editPostBodyField = document.querySelector("#edit_post_body");
const editPostIdField = document.querySelector("#edit_post_id");
createPostForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const createPostFormBtn = document.querySelector("#create-post-form button");
  // console.log("click")
  const postTitleInputFieldValue = postTitleInputField.value;
  const postBodyInputFieldValue = postBodyInputField.value;
  // console.log(postBodyInputFieldValue , "value")
  // console.log(postTitleInputFieldValue , "value")
  
  if (!postTitleInputFieldValue || !postBodyInputFieldValue) {
    alert("please fill the input values");
    return;
  }
  const body = {
    title: postTitleInputFieldValue,
    body: postBodyInputFieldValue,
  };

  createPostFormBtn.setAttribute("disabled", "disabled");
   
  // console.log(body , "body")
  
  fetch(apiBaseUrl , {
    method: "POST" , 
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })
  .then(async function(data) {
    const jsonData = await data.json();
    console.log(jsonData, "jsonData")
    postTitleInputField.value = "";
    postBodyInputField.value = "";
    $("#create-post").modal("hide");
  createPostFormBtn.removeAttribute("disabled", "disabled");


  })
})
const getPostById = function(postId) {
   return fetch(`${apiBaseUrl}/${postId}`)
    .then(function(data) {
      return data.json();
    })
    .then(function(data) {
      console.log(data, "data");
      return data;
    })
    .catch(console.error);
};
tbody.addEventListener("click", async function(event) {
  event.preventDefault();
  const currentElement = event.target;
  // console.log(currentElement.classList.contains("delete-btn") ,"click ");
  if(currentElement.classList.contains("delete-btn") &&
  confirm("Are you sure ?")){
    const postId = currentElement.getAttribute("data-post-id");
    // console.log(postId)
    // console.log(currentElement.closest("tr").querySelector("tr td:first-child").innerText)
    // const postId = currentElement.closest("tr").querySelector("tr td:first-child").innerText;
    fetch(`${apiBaseUrl}/${postId}`, {
      method:"DELETE",
    }).then(async function(data) {
      const convertDataToJson = await data.json();
      // console.log(convertDataToJson, "convertDataToJson");
      currentElement.closest("tr").remove();
    //   setTimeout(function(){
    //     // console.log(currentElement.closest("tr"), "post-id")
    //     alert("your data delete succecsfully")
    // },5000 );
    })
    .catch(console.error);
  }
  if (currentElement.classList.contains("edit-btn")) {
    const postId = currentElement.getAttribute("data-post-id");
    const singleData =  await getPostById(postId);
    $("#edit-post").modal("show");
    console.log(singleData, "singleData");
    editPostTitleField.value = singleData?.title;
    editPostBodyField.value = singleData?.body;
    editPostIdField.value = singleData?.id;
  }
});

editPostForm.addEventListener("submit", function(event) {
  event.preventDefault();
  // console.log("click")
  const editPostIdFieldValue = editPostIdField?.value;
  const editPostBodyFieldValue = editPostBodyField?.value;
  const editPostTitleFieldValue = editPostTitleField?.value;
  
  if (
    !editPostIdFieldValue ||
    !editPostBodyFieldValue ||
    !editPostTitleFieldValue
  ) {
    alert("oops something went wrong! we cannot edit the post");
    return;
  }
  const body = {
    title: editPostTitleFieldValue,
    body: editPostBodyFieldValue,
  }; 
  fetch(`${apiBaseUrl}/${editPostIdFieldValue}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (data) => {
      // const jsonData = await data.json();
      // console.log(jsonData, "jsonData");
      $("#edit-post").modal("hide");
    })
    .catch((error) => {
      console.error(error);
    });

})




























fetch(apiBaseUrl)
.then(function(response){
  return response.json();
})
.then(function(data) {
  let output = "";
  // console.log(data , "data")
  // return;
  data?.forEach(function (singleData) {
    output += `<tr>
    <td>${singleData?.id}</td>
    <td>${singleData?.userId}</td>
    <td>${singleData?.title}</td>
    <td>
     <a class="btn btn-primary edit-btn"  data-post-id="${singleData?.id}" href="#edit-post">Edit</a>
     </td>
    <td>
    <a href="#" class="btn btn-danger delete-btn" data-post-id="${singleData?.id}" >Delete</a>
    </td>
  </tr>`;
  tbody.innerHTML = output;
  });
})
.catch(function(error) {
  console.log(error, "error");
});