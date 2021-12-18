

function cartController() {
    return {
        index(req,res) {
            res.render("customers/cart");
        },

        remove(req,res){
            
            let cart=req.session.cart;
            let itemToBeDeleted=Object.keys(req.body)[0];
            let itemm=cart.items[itemToBeDeleted];
            let price=cart.items[itemToBeDeleted].item.price;
            // let totalQty=cart.totalQty;
            // let totalPrice=cart.totalPrice;
            itemm.qty--
            cart.totalQty--
            cart.totalPrice-=price
            // console.log('qty',cart.item[itemToBeDeleted].qty);
            if(itemm.qty===0){
                delete cart.items[itemToBeDeleted];
            }
            // console.log(cart)
            // console.log(itemToBeDeleted)
            // console.log(totalQty);
            // console.log(totalPrice);
            // console.log(price);
            
            return res.json(cart)



          
        },

        update(req,res){
            console.log("update")
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
                
            }
            let cart=req.session.cart
            

            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item: req.body,
                    qty:1,

                }
                cart.totalQty= cart.totalQty+1;
                cart.totalPrice=cart.totalPrice + req.body.price

            }else{
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
                cart.totalQty = cart.totalQty+1
                cart.totalPrice = cart.totalPrice+ req.body.price
            }

            return res.json({totalQty: req.session.cart.totalQty})
        }
    }
}




module.exports = cartController;