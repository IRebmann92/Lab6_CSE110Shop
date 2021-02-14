// product-item.js


class ProductItem extends HTMLElement {

  render() {
    const incart = this.getAttribute('incart');
    const imgUrl = this.getAttribute('img');
    const titleText = this.getAttribute('title');
    const id = this.getAttribute('id');
    const priceText = this.getAttribute('price');
    
    

    // start inner
    this.innerHTML = `
 
 
    <style>
  
    .price {
       color: white;
       font-size: 1.9em;
       font-weight: bold;
       margin: 0;
    }
  
    .product {
       align-items: center;
       background-color: black;
       border-radius: 7px;
       display: grid;
       grid-template-areas:
        'image'
        'title'
        'price'
        'add';
 
       grid-template-rows: 67% 11% 11% 11%;
       height: 650px;
       filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
       margin: 0 30px 30px 0;
       padding: 10px 20px;
       width: 250px;
 
    }
 
    .product > button {
       background-color: green;
       border: none;
       border-radius: 5px;
       color: white;
       justify-self: center;
       max-height: 40px;
       padding: 8px 20px;
       transition: 0.1s ease all;
    }
   
    .product > button:hover {
       background-color: cyan;
       cursor: pointer;
       transition: 0.1s ease all;
    }
 
    .product > img {
       align-self: center;
       justify-self: center;
       width: 100%;
    }
 
    .title {
       font-size: 1.4em;
       margin: 0;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
    }

    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
 
    </style>
 
    <li class="product">
 
      <img src="${imgUrl}" alt="${titleText}" width=200>
 
      <p class="title">${titleText}</p>
 
      <p class="price">${priceText}</p>
  
      ${incart == "false" || incart == "undefined" ?

      `<button onclick=remove_from_list('${id}')>Remove from Cart</button>`:
        `<button onclick=add_to_list('${id}')>Add to Cart</button>` 

        
      }
    </li>

    `
    // end inner
  }
  // end render
   
  connectedCallback() { 
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() { 
    return ['img', 'title', 'price', 'incart'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
   
}

customElements.define('product-item', ProductItem);
