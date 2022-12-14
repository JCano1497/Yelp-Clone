require("dotenv").config();
const cors= require("cors")
const express = require("express");
const db = require('./db')

const morgan = require("morgan")
const app = express();

app.use(morgan("dev"))
app.use(cors())
app.use(express.json());




app.get("/api/v1/restaurants", async (req,res) =>{
    try{
        const results =await db.query("select * from restaurants");
        console.log(results)
        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
    
        });
    }
    catch(err){
        console.log(err)
    }
});

app.get("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const result = await db.query("select * from restaurants where id=$1",[req.params.id]);
        const reviews = await db.query("select * from reviews where restaurant_id=$1",[req.params.id]);
        res.status(200).json({
            data:{
                restaurant: result.rows[0],
                reviews: reviews.rows
            },
        });
    }
    catch(err){
        console.log(err)
    }
    
});

app.post("/api/v1/restaurants", async (req,res) =>{
    try{
        const result = await db.query("INSERT INTO restaurants (name,location,price_range) values($1,$2,$3) returning *",[req.body.name,
        req.body.location,req.body.price_range])
        res.status(201).json({
            status:"success",
            data:{
                restaurants: result.rows[0],
            },
        });

    }
    catch(err){
        console.log(err)
    }
});
//changes
app.post("/api/v1/restaurants/:id/addReview", async (req,res) =>{
    try{
        const newReview = await db.query("INSERT INTO reviews (restaurant_id,name,body,rating) values($1,$2,$3,$4) returning *",[req.params.id,
        req.body.name,req.body.body,req.body.rating])
        res.status(201).json({
            status:"success",
            data:{
                restaurants: newReview.rows[0],
            },
        });

    }
    catch(err){
        console.log(err)
    }
});

app.put("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const result = await db.query("UPDATE restaurants SET name =$1,location =$2, price_range=$3 where id =$4 returning *",[req.body.name,
            req.body.location,req.body.price_range,req.params.id])
        res.status(200).json({
            status:"success",
            restaurant: result.rows[0]
        })
    }
    catch(err){
        console.log(err)
    }

});

app.delete("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const result = await db.query("DELETE from restaurants where id=$1",[req.params.id])
        res.status(204).json({
            status: "success"
        })
    }
    catch(err){
        console.log(err)
    }
})

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`server is up on port ${port}`)
});