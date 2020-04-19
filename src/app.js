const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast =require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for exprss config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Stevie P'
    })
})

app.get('/about', (req,res)=> {
    res.render('about',{
        title:'About',
        name: 'Stevie P'
    })

})


app.get('/help', (req,res)=> {
    res.render('help',{
        title:'Help',
        msg:'We are here to help you!',
        name: 'Stevie P'
    })

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send(
            {error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })

})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send(
            {error: 'You must provide an address'
        })
    }
//geocode utility
    geocode(req.query.address, (error, {longitude, latitude, location}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            console.log(location)
            console.log(forecastdata)
        
            res.send({
                address:req.query.address,
                location,
                forecast:forecastdata
            })
        
        })

    })

})



app.get('/help/*', (req,res)=> {
    res.render('404',{
        title:'Help',
        error:'Help page not found!',
        name: 'Stevie P'
    })

})

app.get('/*', (req,res)=> {
    res.render('404',{
        title:'404',
        error:'Page not found!',
        name: 'Stevie P'
    })

})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})