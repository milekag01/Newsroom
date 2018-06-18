var request=require("request");

var weatherinfo=((location,callback)=>{
    var lat=location.coords.latitude;
    var lng=location.coords.longitude;
    request({
        url:`https://api.darksky.net/forecast/c84fb5f0518a43b8125733b7fb3116bb/${lat},${lng}`,
        json:true
    },(error,response,body)=>{
        if(!error && response.statusCode===200){
            callback(undefined,{
                temperature:body.currently.temperature,
                summary:body.currently.summary
            });
        }else{
            callback("Unable to fetch weather");
        }
    })  ;
});

module.exports=weatherinfo;
