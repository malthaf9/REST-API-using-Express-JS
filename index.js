
// in node js require() function is used to load modules 

// in below we import the built-in node module 'fs' whic is file system
const fs = require('fs');

// in below fs.readFileSync() function reads the content of the file named data.json with utf8 encoding
const index = fs.readFileSync('index.html', 'utf8');

// in below JSON.parse() parses a json string into a javascript object. Intially we have data in data.json is in string format, for using this data we make them to javascript object
const data =  JSON.parse(fs.readFileSync('data.json', 'utf8'));

// from data.products, products is object name from data.json file
const products = data.products;


const express = require('express');

const server = express();


// Middleware
// this is middleware function, when we want to create(post), update(put), delete(delete) product from products object we need middleware to handle these functions, the purpose of middleawre is if we want to modifies the object 
server.use(express.json()) 


const auth = (req, res, next) => {
//console.log()

    if (req.query.password == '123') {
        next();
    } else {
        res.sendStatus(401)
    }
}


// API END-POINT and Routes

// create a new product in api  CRUD - C
server.post('/products',  (req, res) => {
    console.log(req.body);
    products.push(req.body)
    res.json(products)
})


//read api  get /products CRUD - R
server.get('/products',  (req, res) => {
    res.send(products)
});

//read get /products/:id  CRUD - R
server.get('/products/:id',  (req, res) => {
    //console.log(req.params.id)
    const id = +req.params.id; // + is used for converting string to number and re.params.id is for extracts the id parameter from request url, in our case urlm is: /products/:id

    // products.find is an array method used to find elements in products array that satisfies the provided testing function, in our case testing function is p=> p.id === id
    // p=> p.id === id is checks the id of each product object (p.id) is equal to requested id, here p.id is product id and id is for which id we want to request
    const product =  products.find(p=> p.id === id)  
    res.json(product);
});


//update put CRUD - U
server.put('/products/:id', (req, res) => {
    //console.log(req.body);
    const id = +req.params.id;
   const productIndex = products.findIndex(p=> p.id === id) // products.findIndex is an array method which is used to find index of first element in an array
   // splice operator is an array method used to change the contents of an array by removing or replacing existing elements and/or adding new elements, it takes 3 arguments, 1.The index at which to start changing the array (productIndex in this case), 2.The number of elements to remove (1 in this case, to replace the existing product), delete the old index 3. The new elements to add to the array ({ ...req.body, id: id } in this case). Here, we spread the properties of req.body (the updated product data) into a new object and assign the correct id to it
   // {...req.body, id: id} here req.body is the updated product data, suppose we want to update the product which has id =1 , after updating the data in id =1 we have to send it to products array, to send it to products array we want index, here we write id: id beacuse to update a product from products array we need id to update particular product and the id is coming from id variable
   products.splice(productIndex, 1, {...req.body, id: id}) 
   res.status(201).json()
})

// Patch CRUD it is same like put 
server.patch('/products/:id', (req, res) => {
    //console.log(req.body);
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id)
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product,...req.body})
    res.status(201).json()
})

// Delete CRUD - D
server.delete('/products/:id', (req, res) => {
    //console.log(req.body);
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id)
    const product = products[productIndex];
    products.splice(productIndex, 1)
    res.status(201).json(product)
})


server.listen(8080, () => {
    console.log('Server is running...');
})
