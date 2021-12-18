import axios from 'axios'
import Noty from 'noty'
import  { initAdmin } from './admin'
import moment from 'moment'


let addTocart=document.querySelectorAll('.add-to-cart');
let deleteCart=document.querySelectorAll('.deleteCart');
let cartCounter=document.querySelector('#cartCounter')

function removeCart(item){

   
    axios.post('/remove-cart',item).then(res=>{
        console.log(res.data)
    
        // itemCounter.innerText= res.data.totalQty
        
    }).catch(err=>{
        console.log(err.data.message)
        new Noty({
            type: 'error',
            timeout:1000,
            text: "Something went wrong",
            progressBar: false
          }).show();
        
    })
}


function updateCart(ivs){
    axios.post('/update-cart',ivs).then(res=>{
        
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
        
     
        updateCart(ivs)
        
    })
})
deleteCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        let item=JSON.parse(btn.dataset.item);
        console.log(item)
     
        removeCart(item)
        
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')


function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status)=>{
        let dataProp = status.dataset.status
        if(stepCompleted) {
             status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)

           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
 

    })
    

}

updateStatus(order);

// Socket
let socket = io()



// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})


