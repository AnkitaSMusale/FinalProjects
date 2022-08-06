// ********************************************** //
window.addEventListener('DOMContentLoaded',() => {
  axios.get("https://crudcrud.com/api/94a4057889c8431b82e6b45be31e1786/AddProduct")
     .then((data) => {
      //console.log(data);
      if(data.request.status === 200){
        const products = data.data;
        console.log(products);
        const parentSecton = document.getElementById('newproducts');
        products.forEach(product => {
          
          const productHTML = `
            <div id="newdiv" class="newdiv">
              <h4>${product.title}</h4>
              <img src=${product.img}></img> 
              <h4>Deccription : ${product.descr}</h4>
              <h4>Price : $ ${product.price}</h4>
              <button type="submit "  id="btn1" class="shop-item-button">Add to Cart</button>
                   
            </div>
              `;
          parentSecton.innerHTML += productHTML;    
        });
      }
     })
})
// ********************************************** //
const hamburgerbtn = document.getElementById("hamburgerbtn");
const hamburgernav = document.getElementById("nav1");

hamburgerbtn.addEventListener("click", () => {
  hamburgernav.classList.toggle("active");
  hamburgerbtn.classList.toggle("active");
})


/**********************************************/

const cart = document.querySelector(".hamburger-nav ")
const close = document.getElementById("close1");

close.addEventListener('click' , () => {
  cart.classList.toggle("active");
})

const gotocart = document.getElementById("gotocart");

gotocart.addEventListener('click' , () => {
  cart.classList.toggle("active");
})
/*******************************************/

function updatetotal(){
  var cart_content = document.getElementsByClassName('cart_content')[0];
  var cartBoxes = cart_content.getElementsByClassName("cartbox");
  var total=0;
  for(var i=0; cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart_prod_price')[0];
    var quantityElement = cartBox.getElementsByClassName('cartquantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$',""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    total = Math.round(total*100)/100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
  }
}
//updatetotal();



function quantityChanged(event){
  var qinput = event.target;
  if(isNaN(qinput.value) || qinput <=0){
    qinput.value=1;
  }
  updatetotal();
}
//************************************************************/
const cart_items = document.getElementById('cart_content');
const parentContainer = document.getElementById('EcommerceContainer');

parentContainer.addEventListener('click',(e)=>{
  
    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.id;
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = document.querySelector(`#${id} h4`).innerText;
        if(!(document.querySelector(`#in-cart-${id}`))){
          createNotification();
        }
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
        const cart_item = document.createElement('div');
        cart_item.classList.add('cartbox');
        cart_item.setAttribute('id',`in-cart-${id}`);
        cart_item.innerHTML = `
        <img src="${img_src}" alt="" class="cartimg">
        <div class="detailbox">
        <div class="cart_prod_title">${name} </div>
        <div class="cart_prod_price">${price}</div>
        <input type="number" value="1" class="cartquantity">
        </div>
        `;
        cart_items.appendChild(cart_item);
     }
    updatetotal();
    var quantityInput = document.getElementsByClassName('cartquantity');
    for(var i=0; quantityInput.length; i++){
    var input = quantityInput[i];
    input.addEventListener('change',quantityChanged);
    }
})

function createNotification(){
          const container = document.getElementById('toasting');
          const notify = document.createElement('div');
          notify.classList.add('toast');
          notify.innerText = "Product successfully added to the cart" ;
  
          container.appendChild(notify);

          setTimeout(() => {
             notify.remove();
          }, 3000);
}










// ******************************************************* //
//var addCart = document.getElementsByClassName('shop-item-button');
/*var addCart = document.getElementById('btn1');
for(var i=0; quantityInput.length; i++){
  var button = addCart[i];
  button.addEventListener('click',addcartClicked);
}

function addcartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product__title')[0].innerText;
  var price = shopProducts.getElementsByClassName('product__price')[0].innerText;
  var image = shopProducts.getElementsByClassName('product_img')[0].src;
  console.log(title,price,image);
  addProductToCart(title,price,image);
  updatetotal();
}

function addProductToCart(title,price,image){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cartbox")
  var cartItems = document.getElementsByClassName("cart_content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart_prod_title");
  for(var i=0; cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
      alert("You have already added this to cart");
      return;
    }
  }
  var cartBoxContent = `
<img src="${image}" alt="" class="cartimg">
<div class="detailbox">
    <div class="cart_prod_title">${title} </div>
    <div class="cart_prod_price">${price}</div>
    <input type="number" value="1" class="cartquantity">
</div>
`;


cartShopBox.innerHTML = cartBoxContent;
cartItems.appendChild(cartShopBox);
cartShopBox.getElementsByClassName('')
}


const product = document.getElementsByClassName('shop-item-button');*/














//******************************************* */
/*
const btn1 = document.getElementById("btn1");
const container1 = document.getElementById("product1");
const btn2 = document.getElementById("btn2");
const container2 = document.getElementById("product2");
const btn3 = document.getElementById("btn3");
const container3 = document.getElementById("product3");
const btn4 = document.getElementById("btn4");
const container4 = document.getElementById("product4");

const product = document.getElementById("toasting");

btn1.addEventListener('click', () => {
  //createNotification();
  //const cart_items = document.getElementById("cart-items");
  const product1 = document.getElementById('product1');
  //const title = document.getElementById('product__title');
  //const img = document.getElementById('img');
  //const price = document.getElementById('product__price');
  //const cart_item = document.createElement('itemlist');
  console.log(product1);
  //const childHTML = `<li = <span> ${product1.title} <img class='img' src="${product1.img}"> ${product1.price} </span>>`;
  //cart_item.innerHTML += childHTML;
  
  
  
})
btn2.addEventListener('click', () => {
    createNotification();
})
btn3.addEventListener('click', () => {
    createNotification();
})
btn4.addEventListener('click', () => {
    createNotification();
})  




/*const cart_items = document.getElementById("cart-items")
const parentNode = document.getElementById('productlist');
function addtocart(){
  const id = document.getElementById('id');
  const title = document.getElementById('product__title');
  const img = document.getElementById('img');
  const price = document.getElementById('product__price');
  const cart_item = document.createElement('itemlist');

  
  cart_item.innerHTML = `<span> ${title} <img class='img' src="${img}"> ${price} </span>`;
  cart_items.appendChild(cart_item);

  
    //const childHTML = `<li id=${userdetail.id}> ${userdetail.title} ${userdetail.img}>`;
    //cart_items.innerHTML += childHTML;

}
*/
