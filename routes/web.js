const authController = require('../app/http/controller/authController');
const homeController = require('../app/http/controller/homeController');
const cartController=require('../app/http/controller/customers/cartController');

function initRoutes(app) {
   
    app.get('/',  homeController().index);

    app.get('/login', authController().login);

    app.get('/register', authController().register);

    app.get('/cart', cartController().index);

    
    app.post('/update-cart', cartController().update);
    
}


module.exports = initRoutes