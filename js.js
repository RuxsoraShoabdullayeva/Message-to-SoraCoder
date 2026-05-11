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


function productsRender(arr, ul) {
  ul.innerHTML = arr.map(
      (element) =>
        ` <li class="item">
            <p class="title">${element.title}</p> <br>
            <p class="description">${element.description}</p> <br>
            <p class="price">${element.price}</p> <br> 
            <p class="category">${element.category}</p> <br>
            <img src="${element.images?.[0] || 'placeholder.jpg'}">
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


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let titleInput = document.querySelector(".title").value;
  let descInput = document.querySelector(".description").value;
  let priceInput = document.querySelector(".price").value;
  let categoryInp = document.querySelector(".category").value;
  let imagesInp = document.querySelector('.images').value;

  let title = titleInput;
  let description = descInput;
  let price = priceInput;
  let category = categoryInp;
  let images = imagesInp;

  addProduct(title, description, price, category, images);
});

async function addProduct(title, description, price, category, images) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDBhYTVlNTQ2NzFiZWY1MTcyNjIxOCIsImVtYWlsIjoicnV4c29yYTQ0QGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoicnV4c29yYSIsImxhc3ROYW1lIjoiVmFsaXlldmEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Nzg0Mjg1MTAsImV4cCI6MTc3ODUxNDkxMH0.3OXBWCwQ-zAlrqRi8SjHBqMXBR97aY4_2DG13eZDW3c";
  let response = await fetch(
    "https://shop-co-backend-k5f0.onrender.com/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        category: category,
        images: [images],
      }),
    },
  );

  let data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Mahsulot qoshilmadi");
  }
}

getProducts();
