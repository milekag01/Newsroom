var express    = require("express");
var bodyParser = require("body-parser");
var request    = require("request");
// var geolocation = require("geolocation");
// var location=require("./location");
var weather=require("./weather");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded:true}));
app.set("view engine","ejs");

app.get("/",(req,res) => {
    res.redirect("/index");
});
app.get("/index",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?sources=the-new-york-times,google-news-in,abc-news,business-insider-uk,espn,hacker-news,the-huffington-post&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            // res.redirect("/index");
        }
    });
});
app.get("/india",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?country=in&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

app.get("/business",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

app.get("/technology",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

app.get("/entertainment",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

app.get("/sports",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?sources=espn,espn-cric-info,fox-sports,talksport&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

app.get("/science",(req,res) => {
    var url='https://newsapi.org/v2/top-headlines?sources=new-scientist,national-geographic,medical-news-today&apiKey=bdac0ea22a684ca9b8b50834aaa0d245';
    request(url,(error,response,body)=>{
        var bod=JSON.parse(body);
        if(error || response.status==="error"){
            console.log("something went wrong");
        }else if(bod.totalResults){
            var data=bod.articles;
            res.render("index",{data:data});
        }else{
            console.log("No news available");
            res.redirect("/index");
        }
    });
});

(function(){
    'use strict';
    
    function onPositionReceived(position){
        console.log(position);
        weather.weatherinfo(position,(error,weatherResult)=>{
        if(error){
        console.log(error);
        }else{
        console.log(JSON.stringify(weatherResult,undefined,2));
    }
});
}
    function locationNotReceived(positionError){
        console.log(positionError);
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onPositionReceived,locationNotReceived);
    }
    var watch=navigator.geolocation.watchPosition(onPositionReceived,locationNotReceived);
    navigator.geolocation.clearWatch(watch);
    
});
    
// geolocation.getCurrentPosition(function (err, position) {
//   if (err){
//       console.log(err);
//   }else{
//   console.log(position);
//   }
// });
    

        

app.listen(process.env.PORT,process.env.IP,() => {
    console.log("server started");
});

//bdac0ea22a684ca9b8b50834aaa0d245
