//var cors = require('cors');

const my_form1=document.querySelector('#product-form');
const title1=document.querySelector('#title');
const img1=document.querySelector('#imageUrl');
const price1=document.querySelector('#price');
const descr1=document.querySelector('#description');
const msg=document.querySelector('.msg');
const userList=document.querySelector('#users');
my_form1.addEventListener('submit',onsubmit);
function onsubmit(e){
    e.preventDefault();

    if(title1.value==='' || img1.value==='' || price1.value==='' || descr1.value===''){
        msg.classList.add('error');
        msg.innerHTML='please enter all fields';
        setTimeout(()=>msg.remove(),3000);
    }
    else{
        const li=document.createElement('li');
        const obj={
            title1 : title1.value,
            img1 : img1.value,
            descr1 : descr1.value,
            price1 : price.value
        }
        axios.post("https://crudcrud.com/api/94a4057889c8431b82e6b45be31e1786/AddProduct",obj)
            .then((Response) => {
               // shownewUserOnScreen(Response.data);
                console.log(Response);
            })
            .catch((err) => {
                document.body.innerHTML += "<h4> Something Went Wrong </h4>";
                console.log(err);
            })
       // li.appendChild(document.createTextNode(`${title1.value} - ${img1.value} - ${descr1.value} - ${price1.value}`));  

        title1.value='';
        descr1.value='';
        img1.value='';
        price1.value='';
    }
}       
/*document.addEventListener('DOMContentLoaded',() => {
    console.log("dom has loaded");

    axios.get("https://crudcrud.com/api/bffd9bdd8bb9464a921f98acdbc78076/ExpenseTrackerhttps://crudcrud.com/api/94a4057889c8431b82e6b45be31e1786/AddProduct")
        .then((Respose)=> {
            console.log(Respose);
            for(let i=0; i<Respose.data.length; i++)
            {
               shownewUserOnScreen(Respose.data[i]);
            }
    })

})
function shownewUserOnScreen(userdetail)
{
     //for reference - to get that particular _id
    //userdetail = {
       // _id : '',
       // title1 : '',
       // descr : '',
       // price : '',
       // img1 : ''
    }
    const parentNode = document.getElementById('users');
    const childHTML = `<li id=${userdetail._id}> ${userdetail.title1} - ${userdetail.descr1} - ${userdetail.img1} - ${userdetail.price1} 
                        </li>`;
    parentNode.innerHTML = childHTML;
}
*/