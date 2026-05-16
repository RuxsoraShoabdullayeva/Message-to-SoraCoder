let list = document.querySelector(".list");
let cards = document.querySelector(".cards");
let item = document.querySelector(".item");

async function getProducts() {
  let res = await fetch(
    "https://shop-co-backend-k5f0.onrender.com/api/products",
    {
      method: "GET",
    },
  );
  let data = await res.json();
  console.log(data);

  productsRender(data, list);
}

getProducts();

function productsRender(arr, ul) {
  ul.innerHTML = arr
    .map(
      (element) =>
        ` <li class="item">
            <p class="title">${element.title}</p> <br>
            <p class="description">${element.description || ""}</p> <br>
            <p class="price">${element.price}</p> <br> 
            <p class="category">${element.category}</p> <br>
            <img src="${element.images?.[0] || "placeholder.jpg"}">
        </li>
`,
    )
    .join("");
}

//ADD PRODUCT
let form = document.querySelector(".form");
let btn = document.querySelector(".btn");
let modal = document.querySelector(".modal");

function openModal() {
  if (!modal) return;
  modal.classList.toggle("active");
}

let titleInput = document.querySelector(".title");
let descInput = document.querySelector(".description");
let priceInput = document.querySelector(".price");
let categoryInp = document.querySelector(".category");
let imagesInp = document.querySelector(".images");
let typeInp = document.querySelector(".type");
let colorsInp = document.querySelector(".colors");
let sizeInp = document.querySelector(".size");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!imagesInp.files.length) {
    console.log("Rasm tanlanmagan");
    return;
  }

  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("description", descInput?.value);
  formData.append("price", priceInput.value);
  formData.append("category", categoryInp.value);
  formData.append("type", typeInp.value);
  formData.append("colors", colorsInp.value);
  formData.append("size", sizeInp.value);
  formData.append("images", imagesInp.files[0]);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  addProduct(formData);
  getProducts();
});

async function addProduct(formDataParam) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVjODM1ZGFlZDE3OGE1NTQyYzdlZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYWRtaW4iLCJsYXN0TmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzc4OTIzMDY3LCJleHAiOjE3NzkwMDk0Njd9.FwrId7KDoweuafhyesJzeleZ3F0JZesqwyifAyDzPoU";

  let response = await fetch(
    "https://shop-co-backend-k5f0.onrender.com/api/products/with-images",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataParam,
    },
  );

  let data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Mahsulot qoshilmadi");
  }
}
