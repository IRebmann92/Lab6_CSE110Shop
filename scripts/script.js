// Script.js

let list = JSON.parse(localStorage.getItem("list"));
let counter = document.querySelector("#cart-count");
if (!list) {
  list = {};
}
// getting type err with query selector fixed but still remove from cart shows
function count_list() {
  let count = 0;
  for (prop in list) {
    if (list[prop] == true) {
      count++;
    }
  }
  counter.textContent = count;
}

count_list();
// pull list on browser start
window.addEventListener('DOMContentLoaded', () => {
// puling list from url then local storing 
  if (!localStorage.getItem("products")) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("products", JSON.stringify(data));
        create_cards(data);
      }
      );
  }
  else {
    let data = localStorage.getItem("products");
    data = JSON.parse(data);
    create_cards(data);
  }
});


// create cards 
function create_cards(data) {
  let list = document.querySelector("#product-list");
  for (let i in data) {
    let prodItem = document.createElement("product-item");
    let prod = data[i];
    prodItem.setAttribute("img", prod.image);
    prodItem.setAttribute("title", prod.title);
    prodItem.setAttribute("price", "$" + prod.price);
    prodItem.setAttribute("id", "prod" + prod.id);
    prodItem.setAttribute("in_list", list["prod" + prod.id]);
    list.appendChild(prodItem);
  }
}



function add_to_list(id) {
  list[id] = true;
  localStorage.setItem("list", JSON.stringify(list));
  let card = document.querySelector("#" + id);
  card.setAttribute("in_list", "true");
  count_list();
}



function remove_from_list(id) {
  list[id] = false;
  localStorage.setItem("list", JSON.stringify(list));
  let card = document.querySelector("#" + id);
  card.setAttribute("in_list", "false");
  count_list();
}
