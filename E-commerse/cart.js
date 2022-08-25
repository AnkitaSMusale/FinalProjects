// ********************************************** //
window.addEventListener('DOMContentLoaded', () => {
  axios.get("http://localhost:7000/products")
    .then((data) => {
      //console.log(data);
      if (data.request.status === 200) {
        const products = data.data.products;
        console.log(products);
        const parentSecton = document.getElementById('newproducts');
        products.forEach(product => {

          const productHTML = `
            <div id="newdiv" class="newdiv">
              <h4>${product.title}</h4>
              <img src=${product.imageUrl}></img> 
              <h4>Deccription : ${product.description}</h4>
              <h4>Price : $ ${product.price}</h4>
              <button onClick="addToCart(${product.id})">Add to Cart</button>   
            </div>
              `;
          parentSecton.innerHTML += productHTML;
        });
      }
    })
})

function addToCart(productId) {
  axios.post("http://localhost:7000/cart", { productId: productId })
    .then((response) => {
      if (response.status === 200) {
         console.log(response);
         document.location.reload()
        notifyuser(response.data.message);
      }
      console.log(document.querySelectorAll(`#in-cart-${productId}`))
      if ((document.querySelectorAll(`#in-cart-${productId}`))) {
        notifyuser(response.data.message);
      }
      // else {
      //   alert('This item is already added to the cart');
      //   return;

      // }

    })
    .catch((err) => {
      console.log(err);
      notifyuser(err);
    });
}

function notifyuser(message) {
  const container = document.getElementById('toasting');
  const notify = document.createElement('div');
  notify.classList.add('toast');
  notify.innerText = message;

  container.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 2000);
}
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

close.addEventListener('click', () => {
  cart.classList.toggle("active");
})

const gotocart = document.getElementById("gotocart");

gotocart.addEventListener('click', () => {
  cart.classList.toggle("active");
})
/*******************************************/

function updatetotal() {
  var cart_content = document.getElementsByClassName('cart_content')[0];
  var cartBoxes = cart_content.getElementsByClassName("cartbox");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart_prod_price')[0];
    var quantityElement = cartBox.getElementsByClassName('cartquantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;

  }
}
//updatetotal();

//**********************Adding New Product**************************************/
const cart_items = document.getElementById('cart_content');
const parentContainer = document.getElementById('EcommerceContainer');

parentContainer.addEventListener('click', (e) => {

  if (e.target.className == 'shop-item-button') {

    axios.get("http://localhost:7000/product")
      .then((data) => {
        //console.log(data);
        if (data.request.status === 200) {
          const products = data.data.products;
          console.log(products);
          const parentSecton = document.getElementById('newproducts');
          products.forEach(product => {

            const productHTML = `
             <div id="newdiv" class="newdiv">
               <h3 class="product__title">${product.title}</h3>
               <img src=${product.imageUrl}></img> 
               <h4>Deccription : ${product.description}</h4>
               <h4 class="product__price"> Price : $ ${product.price} </h4> 
               <button type="submit" id="btn2" class="shop-item-button">Add to Cart</button>    
             </div>
               `;
            parentSecton.innerHTML += productHTML;
          });
        }
      })

    const id = e.target.parentNode.id;
    const name = document.querySelector(`#${id} h3`).innerText;
    const img_src = document.querySelector(`#${id} img`).src;
    const price = document.querySelector(`#${id} h4`).innerText;
    if ((document.querySelector(`#in-cart-${id}`))) {
      createNotification();
    }
    if (document.querySelector(`#in-cart-${product.id}`)) {
      alert('This item is already added to the cart');
      return
    }
    const cart_item = document.createElement('div');
    cart_item.classList.add('cartbox');
    cart_item.setAttribute('id', `in-cart-${id}`);
    cart_item.innerHTML = `
        <img src="${img_src}" alt="" class="cartimg">
        <div class="detailbox">
        <div class="cart_prod_title">${name} </div>
        <div class="cart_prod_price">${price}</div>
        <input type="number" value="1" class="cartquantity">
        
        </div>
        <div class="removetemp" id="removetemp"> 
            <button onClick="RemoveFromCart({${id})" id="removebtn" class="removebtn"><strong>X</strong></button>
        </div>
        `;
    cart_items.appendChild(cart_item);
    window.reload();
  }
  updatetotal();
  // var quantityInput = document.getElementsByClassName('cartquantity');
  // for (var i = 0; quantityInput.length; i++) {
  //   var input = quantityInput[i];
  //   input.addEventListener('change', quantityChanged); 
  // }
})

function quantityChanged(event) {
  var qinput = event.target;
  if (isNaN(qinput.value) || qinput <= 0) {
    qinput.value = 1;
  }
  updatetotal();
}

function createNotification() {
  const container = document.getElementById('toasting');
  const notify = document.createElement('div');
  notify.classList.add('toast');
  notify.innerText = "Product successfully added to the cart";

  container.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 3000);
}

// *************************Show Cart   ******************************** //
window.addEventListener('DOMContentLoaded', () => {
  axios.get("http://localhost:7000/cart")
    .then((data) => {
      if (data.request.status === 200) {
        const products = data.data.products;
        console.log(products);
        //console.log(data);
        const parentSecton = document.getElementById('cart_content');
        products.forEach(product => {
          const productHTML = `
                <div id="${product.id}" class="cartbox">
                    <img src="${product.imageUrl}" alt="" class="cartimg">
                    <div class="detailbox">
                    <div class="cart_prod_title">${product.title} </div>
                    <div class="cart_prod_price">$${product.price}</div>
                    <input type="number" value="1" class="cartquantity">
                    </div>
                    <div class="remove" id="remove"> 
                    <button onClick="RemoveFromCart(event, ${product.id})" id="removebtn" class="removebtn"><strong>X</strong></button>
                    </div>    
                </div>
                  `;
          parentSecton.innerHTML += productHTML;

        });
        updatetotal();
        var quantityInput = document.getElementsByClassName('cartquantity');
        for (var i = 0; quantityInput.length; i++) {
          var input = quantityInput[i];
          input.addEventListener('change', quantityChanged);
        }
      }
    })
    .catch(err => console.log(err));
})

function RemoveFromCart(e,prodId){
  e.preventDefault();
  const data = confirm('Do you want to delete this item ?')
        if(data == true){
            const liId=e.target.parentNode.parentNode.parentNode.id;
            console.log(liId);
            const li=e.target.parentNode.parentNode.parentNode;
            console.log(li)
            li.remove()
            //document.location.reload();
            axios.post(`http://localhost:7000/cart-delete-item`,{productId:prodId})
           .then(()=> {
             li.remove()
            })
            .catch(err=>{console.log(err)})
        }  
        else{
             return false; 
        } 
}

// function RemoveFromCartFrontend(prodId){
//   //const prod = document.getElementById(prodId)
//   // window.reload();
//   // console.log(cart_items)
//   // cart_items.removeChild(prodId);
  
// }

// cartlist=document.getElementById('cart_content')
// cartlist.addEventListener('click',(e)=>{
//     if(e.target.id=='removebtn'){
//         const data = confirm('Do you want to delete this item ?')
//         if(data == true){
//             const liId=e.target.parentNode.id;
//             console.log(liId);
//             const li=e.target.parentNode;
//             console.log(li)
//             li.remove()
//             axios.post(`http://localhost:3000/cart-delete-item/${liId}`)
//             .then((res)=>{
//                 console.log(res);
//             })
//             .catch(err=>{console.log(err)})
//         }  
//         else{
//              return false; 
//         } 
//     }        
// })


//Order place
const order = document.getElementById('purchase-btn2');
order.addEventListener('click', () => {
  axios.post('http://localhost:7000/order-place')
  .then((response) => {
    if (response.status === 200) {
      console.log(response);
      notifyuser(response.data.message);
    }
  })
  .catch((err) => {
    console.log(err);
    //notifyuser(err);
  })
})

// ************************Get orders from backend*************************************
window.addEventListener('DOMContentLoaded', () => {
  axios.get("http://localhost:7000/orders")
    .then((data) => {
      if (data.request.status === 200) {
        const products = data.data;
        console.log(products);
        //console.log(data);
    //     const parentSecton = document.getElementById('cart_content');
    //     products.forEach(product => {
    //       const productHTML = `
    //             <div id="${product.id}" class="cartbox">
    //                 <img src="${product.imageUrl}" alt="" class="cartimg">
    //                 <div class="detailbox">
    //                 <div class="cart_prod_title">${product.title} </div>
    //                 <div class="cart_prod_price">$${product.price}</div>
    //                 <input type="number" value="1" class="cartquantity">
    //                 </div>
    //                 <div class="remove" id="remove"> 
    //                 <button onClick="RemoveFromCart(event, ${product.id})" id="removebtn" class="removebtn"><strong>X</strong></button>
    //                 </div>    
    //             </div>
    //               `;
    //       parentSecton.innerHTML += productHTML;

    //     });
    //     updatetotal();
    //     var quantityInput = document.getElementsByClassName('cartquantity');
    //     for (var i = 0; quantityInput.length; i++) {
    //       var input = quantityInput[i];
    //       input.addEventListener('change', quantityChanged);
    //     }
       }
    })
    .catch(err => console.log(err));
})
// ************************************************************
  
  // if (parseInt(document.querySelector('cartbox').innerText) === 0){
  //     alert('You have Nothing in Cart , Add some products to purchase !');
  // }
  // else{
  //     axios.post('http://localhost:7000/order-place')
  //     .then((response)=>{
  //         notifyuser(response.data.message);
  //         const cart_items = document.querySelector('#cart .cart-items');
  //         cart_items.innerHTML = "";
  //         document.querySelector('cartbox').innerText = '0'
  //         document.querySelector('#total-price').innerText = '0';
  //     })
  // }

//****************** */
/*
window.addEventListener('DOMContentLoaded', () => {
  axios.get("http://localhost:7000/product?page=1")
  .then((data) => {
          if (data.request.status === 200) {
            const products = data.data.products;
            console.log(products);
            //console.log(data);
            const parentSecton = document.getElementById('cart_content');
            products.forEach(product => {
              const productHTML = `
                <div id="cartbox" class="cartbox">
                    <img src="${product.imageUrl}" alt="" class="cartimg">
                    <div class="detailbox">
                    <div class="cart_prod_title">${product.title} </div>
                    <div class="cart_prod_price">$${product.price}</div>
                    <input type="number" value="1" class="cartquantity">
                    </div>
                </div>
                  `;
              parentSecton.innerHTML += productHTML;

            });
            updatetotal();
            var quantityInput = document.getElementsByClassName('cartquantity');
            for (var i = 0; quantityInput.length; i++) {
              var input = quantityInput[i];
              input.addEventListener('change', quantityChanged);
            }
          }
        })
        .catch(err => console.log(err));
}) */
// const cartbutton = document.getElementById('hamburgerbtn');
// cartbutton.addEventListener('click', (e) => {
//   axios.get("http://localhost:7000/cart")
//     .then((data) => {
//       if (data.request.status === 200) {
//         const products = data.data.products;
//         console.log(products);
//         //console.log(data);
//         const parentSecton = document.getElementById('cart_content');
//         products.forEach(product => {
//           const productHTML = `
//             <div id="cartbox" class="cartbox">
//                 <img src="${product.imageUrl}" alt="" class="cartimg">
//                 <div class="detailbox">
//                 <div class="cart_prod_title">${product.title} </div>
//                 <div class="cart_prod_price">$${product.price}</div>
//                 <input type="number" value="1" class="cartquantity">
//                 </div>
//             </div>
//               `;
//           parentSecton.innerHTML += productHTML;

//         });
//         updatetotal();
//         var quantityInput = document.getElementsByClassName('cartquantity');
//         for (var i = 0; quantityInput.length; i++) {
//           var input = quantityInput[i];
//           input.addEventListener('change', quantityChanged);
//         }
//       }
//     })
//     .catch(err => console.log(err));
// })



