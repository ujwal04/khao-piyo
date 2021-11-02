import axios from 'axios'
import Noty from 'noty'
import  { initAdmin } from './admin'


let addTocart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter')


function updateCart(ivs){
    axios.post('/update-cart',ivs).then(res=>{
        console.log(res);
        cartCounter.innerText= res.data.totalQty
        new Noty({
            type: 'success',
            timeout:1000,
            text: "Item added to cart",
            progressBar: false
          }).show();
    }).catch(err=>{
        new Noty({
            type: 'error',
            timeout:1000,
            text: "Something went wrong",
            progressBar: false
          }).show();
        
    })
}
addTocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        let ivs=JSON.parse(btn.dataset.ivs);
        console.log(ivs)
        
        updateCart(ivs)
        
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

new initAdmin()
