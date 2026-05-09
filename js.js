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
  productsRender(data, cards);
}

getProducts();

function productsRender(arr, ul) {
  ul.innerHTML = arr.map(
    (element) =>
      ` <li class="item">
           <a href="./details.html?id=${element._id}">
            <img src="${element.images}" >
            <p class="title">${element.title}</p>
            <p class="price">${element.price}</p>
            <p class="category">${element.category}</p>
           </a>
        </li>
`,
  );
}


