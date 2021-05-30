const express = require ("express")
const dotenv = require ("dotenv")
const db = require("./config/db")

const app = express()
dotenv.config()

app.use(express.json())

app.post("/api/v1/restaurants/create", async(req, res) => {
    
        const results = await db.query("INSERT INTO hotels (id, name, price, on_sale) VALUES ($1, $2, $3, $4) returning *", [2, req.body.name, req.body.price, req.body.on_sale])
        if(results) {
            res.status(200).json(results.rows)
        } else {
            res.status(404).json({message:"Nothing found!!!"})
        }
    
})

app.get("/api/v1/restaurants/:id", async(req, res) => {
    
        const results = await db.query("SELECT * FROM hotels where id = $1", [req.params.id])
        if(results) {
            res.status(200).json(results.rows)
        } else {
            res.status(404).json({message:"Nothing found!!!"})
        }
    
})

app.get("/api/v1/restaurants", async(req, res) => {
    
        const results = await db.query("SELECT * FROM hotels")
        if(results) {
            res.status(200).json(results.rows)
        } else {
            res.status(404).json({message:"Nothing found!!!"})
        }
    
})

app.put("/api/v1/restaurants/:id/update", async(req, res) => {
    
        const results = await db.query("UPDATE hotels SET name = $1, price = $2, on_sale = $3 WHERE id = $4 returning *", [req.body.name, req.body.price, req.body.on_sale, req.params.id])
        if(results) {
            res.status(200).json(results.rows)
        } else {
            res.status(404).json({message:"Nothing found!!!"})
        }
    
})

app.delete("/api/v1/restaurants/:id/delete", async(req, res) => {
    
        const results = await db.query("DELETE FROM hotels WHERE id=$1 returning *", [req.params.id])
        if(results) {
            res.status(200).json(results.rows)
        } else {
            res.status(404).json({message:"Nothing found!!!"})
        }
    
})


const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => console.log(`Server running on port ${PORT}`))