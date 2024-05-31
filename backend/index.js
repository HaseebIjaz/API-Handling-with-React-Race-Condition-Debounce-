import express from "express";

const app = express();

const port = process.env.PORT || 3000;


app.get('/api/products',(req,res) => {

    const products = [
        {
            id: 1,
            name: 'table wooden',
            price: 200,
            image: "https://www.mbcommunication.com.pk/5258/wooden-bamboo-laptop-table-small.jpg"   
        },
        {
            id: 2,
            name: 'table wooden 1',
            price: 300,
            image: "https://www.mbcommunication.com.pk/5258/wooden-bamboo-laptop-table-small.jpg"   
        },
        {
            id: 3,
            name: 'metal',
            price: 400,
            image: "https://www.mbcommunication.com.pk/5258/wooden-bamboo-laptop-table-small.jpg"   
        },

    ];

    // http://localhost:3000/api/products?search=metal
    if(req.query.search){
        const filterdProducts = products.filter((product) => {
            return product.name.includes(req.query.search);
        });
        res.send(filterdProducts);
        return;
    }
    setTimeout(() => {
        res.send(products)
    },3000)

})

app.listen(port, () => {
    console.log("Api running on port: " + port)
})