const request = require('request')

const forecast = (longitude, latitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=cd6163f1a599449f4e70a3464879c703&query=' + longitude + ',' + latitude + '&units=f'


    request({url, json: true},(error, {body})=>{
        if (error) {
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else {
            callback (undefined, 'It is '+body.current.weather_descriptions[0] + '. It is currently ' +body.current.temperature  +' degrees out. It feels like '+ body.current.feelslike + ' degrees out. And the wind direction is '+body.current.wind_dir)
            
            }


})



}

module.exports = forecast