

function cartController() {
    return {
        index(req,res) {
            res.render("customers/cart");
        },

        remove(req,res){
            
            let cart=req.session.cart;

            if(cart.totalQty>0){
                cart.totalQty=cart.totalQty-1;
                cart.price=cart.price -req.body.price;

                if(cart.items[req.body._id].qty ==1){
                    delete cart.items[req.body._id];
                }else{
                    cart.items[req.body._id].qty=cart.items[req.body._id].qty-1;
                }
                if(cart.totalQty===0){
                    delete req.session.cart;
                }
            }
            let totalQty=cart ? cart.totalQty : 0;
            return res.json({totalQty:totalQty, cartItems: cart.items});
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