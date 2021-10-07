import axios from 'axios'
import Noty from 'noty'


let addTocart=document.querySelectorAll('.add-to-cart');
let caryCounter=document.querySelector('#cartCounter')


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