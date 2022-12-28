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
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 },
    { id:0,title: 'Jaws', year: 1975, rating: 8 },
    { id:1,title: 'Avatar', year: 2009, rating: 7.8 },
    { id:2,title: 'Brazil', year: 1985, rating: 8 },
    { id:3,title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    
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

app.get("/movies/read/by-date", (req, res) => {
    res.json({ status: 200, data: movies.sort((a,b)=>a.year-b.year) })
  })

app.get("/movies/read/by-rating", (req, res) => {
    res.json({ status: 200, data: movies.sort((a,b)=>b.rating-a.rating) })
  })

app.get("/movies/read/by-title", (req, res) => {
    res.json({ status: 200, data: movies.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0)) })
  })

  app.get("/movies/read/id/:id", (req, res) => {
    const id = parseInt(req.params.id,10)
    const movie = movies.find(movie => movie.id === id)
    if (movie) {
        res.json({status: 200, data: movie})
    }
    else{
        res.json({status: 404, error: true, message: `the movie ${id} does not exist`})
    }
})
app.get("/movies/add", (req, res) => {
    const title = req.query.title
    const year = req.query.year
    const rating = req.query.rating


    if (!title || !year) {
        res.json({status: 403, error: true, message: "you cannot create a movie without providing a title and a year "})

    }
    else{
        if(year.length !==4 || isNaN(year)){
            res.json({status: 403, error:true, message: "you cannot create a movie without providing a title and a year"})
        }
        else{
            const newmovie = {title, year,rating: rating || 4}
            movies.push(newmovie)
            res.json({status: 200, data: movies})
        }
    }
})
app.get("/movies/delete/:id", (req,res) => {
    const id = req.params.id
    const index = movies.findIndex((movie) => movie.id == id)
    if (index === -1){
        res.json({status: 404, error: true, message: `the movie ${id} does not exist`})
    }
    else{
        movies.splice(index, 1)
        res.json({movies})
    }


})
app.get("/movies/update/:id", (req, res) => {
    const id = req.params.id
    const mindex = movies.findIndex((movie) => movie.id == id)
    if (mindex === -1) {
      res.json({ status: 404, error: true, message: `the movie ${id} does not exist` });
    } 
    else {
      const { title, rating } = req.query
      if (title) {
        movies[mindex].title = title
      }
      if (rating) {
        movies[mindex].rating = rating
      }
      res.json({ movies })
    }
  })
  