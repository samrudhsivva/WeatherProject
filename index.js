const express= require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");


app.listen(3000,function(req,resp){
    console.log("I am listening on port 3000 ");
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,resp)
{
    
    resp.sendFile(__dirname+"/index.html");
 
}
);


app.post("/",function(req,resp)
{


    var query=req.body.cityName;

    console.log("query is",query);

    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=8dc567b302870bd6c8aae3174efa0f21&units=metric";
    https.get(url,(res)=>{
        console.log(res.statusCode);
        res.on("data",function(data){
           // console.log("Stringy data is",data); 
            const weatherData=JSON.parse(data);
            //console.log("Weather Data after converting into JSON is",weatherData);
            const weatherDescription =(weatherData.weather[0].description);
            const icon=weatherData.weather[0].icon;
            const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //resp.write("<h1>hiiiii</h1>");
           resp.write("<h1>The current temperature in "+query+" is "+weatherData.main.temp+"</h1>");
            resp.write("<h2>Current weather condition in "+query+" is "+weatherDescription+"</h2>");
            resp.write("<img src=" +imageURL+">");
            resp.send();

          
        })
        
    })
    
})

