const express = require('express')
const app = express()

app.get("/", (req,res) => {
    res.send("ok")

})

app.get("/test", (req,res) => {
    res.json({ status:200 , message:'okk' })

})

app.get("/time", (req,res) => {
    const timenow = new Date()
    const hours = timenow.getHours()
    const mins = timenow.getMinutes()

    res.json({ status:200 , message: `${hours}:${mins}` })

})

app.get("/hello/ID", (req, res) => {
    const ID = req.params.ID;

    res.json({ status:200 , message:`hello,${ID}` })

})

app.get("/search", (req,res) => {

    const search= req.query.search;
    if (search){
    res.json({ status:200 , message:'okk', data: search })}
    
    else{
        res.json({ status: 500, error:true , mesage:"you have to provide a search"})
    }



})
app.get("/movies/create", (req, res) => {
    res.json({ status:200 , message:"create movies" })

})
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
app.get("/movies/read", (req, res) => {
    res.json({ status:200 , message: movies})

})
app.get("/movies/update", (req, res) => {
    res.json({ status:200 , message:"update movies" })

})
app.get("/movies/delete", (req, res) => {
    res.json({ status:200 , message:"delete movies" })

})

app.listen(3000, () => { console.log("server started on port 3000")})