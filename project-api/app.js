const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;
const createPostForm = document.querySelector("#create-post-form");
const postTitleInputField = document.querySelector("#post_title");
const createPostFormBtn = document.querySelector("#create-post-form button");
const postBodyInputField = document.querySelector("#post_body");
const tbody = document.querySelector("#todos-listing");
fetch(apiBaseUrl)
.then((response) => response.json())
// .then((response) => console.log(response, "response"));
.then((data) => {
  // console.log(data, "data");
  // return
  let output = "";
  data?.forEach((singleData) => {
    output += `<tr>
    <td>${singleData?.id}</td>
    <td>${singleData?.userId}</td>
    <td>${singleData?.title}</td>
    <td>
     <a class="btn btn-primary edit-btn"  href="#edit-post" data-post-id="${singleData?.id}">Edit</a>
     </td>
    <td>
    <a href="#" class="btn btn-danger delete-btn" data-post-id="${singleData?.id}">Delete</a>
    </td>
  </tr>`;
  });
    tbody.innerHTML = output;
})
.catch((error) => {
  console.log(error);
})

createPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const postTitleInputValue = postTitleInputField?.value;
  const postBodyValue = postBodyInputField?.value;

  if (!postTitleInputValue || !postBodyValue) {
    alert("please fill the input values");
    return;
  }

  const body = {
    title: postTitleInputValue,
    body: postBodyValue,
  };

  createPostFormBtn.setAttribute("disabled", "disabled");


  fetch(apiBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (data) => {
      const jsonData = await data.json();
      console.log(jsonData.title, "jsonData");
        const createElement = document.createElement("tr")
        createElement.innerHTML = `<td>${jsonData?.id}</td>
        <td>20</td>
        <td>${jsonData?.title}</td>
        <td>
         <a class="btn btn-primary edit-btn"  href="#edit-post" data-post-id="${jsonData?.id}">Edit</a>
         </td>
        <td>
        <a href="#" class="btn btn-danger delete-btn" data-post-id="${jsonData?.id}">Delete</a>
        </td>`;
        tbody.append(createElement);
      postTitleInputField.value = "";
      postBodyInputField.value = "";
      $("#create-post").modal("hide");
      createPostFormBtn.removeAttribute("disabled");
      await getPosts();

      selectLoader.style.display = "none";
    })
    .catch((error) => {
      // console.log(error)'
      createPostFormBtn.removeAttribute("disabled");
      alert("oops something went wrong");
      selectLoader.style.display = "none";
    });
});
