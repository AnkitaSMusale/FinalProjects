const my_form=document.querySelector('#signup-form');
const name=document.querySelector('#name');
const email=document.querySelector('#email');
const phone=document.querySelector('#phone');
const password=document.querySelector('#password');
const msg=document.querySelector('.msg');
my_form.addEventListener('submit',onsubmit);
function onsubmit(e){
    e.preventDefault();

    if(name.value==='' || email.value==='' || phone.value==='none' || password.value==='none'){
        msg.classList.add('error');
        msg.innerHTML='please enter all fields !!';
        setTimeout(()=>msg.remove(),2000);
    }
}    