const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

//session setup
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

//authentication middleware for customer routes
app.use("/customer/auth/*", function auth(req, res, next){
    //check if token exists in session
    if (req.session.token) {
        try {
            const decoded = jwt.verify(req.session.token, 'access_secret_key');
            req.user = decoded; //store decoded token info in req
            next(); //proceed to the next middleware
        } catch (err) {
            return res.status(401).json({ message: "invalid token" });
        }
    } else {
        return res.status(403).json({ message: "unauthorized access" });
    }
});


 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));