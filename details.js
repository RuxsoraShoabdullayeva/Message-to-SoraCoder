let list = document.querySelector(".list");

let params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function productID() {
  let res = await fetch(
    "https://shop-co-backend-k5f0.onrender.com/api/products",
    {
      method: "GET",
    },
  );

  let data = await res.json();
  console.log(data);

  data.forEach((productId) => {
    if (productId._id == id) {
     list.innerHTML = 
     ` <li class="item">
           <a href="./details.html?id=${productId._id}">
            <img src="${productId.images}" >
            <p class="title">${productId.title}</p>
            <p class="price">${productId.price}</p>
            <p class="category">${productId.category}</p>
           </a>
        </li>
`
    }
  });
}
productID();

