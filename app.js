const express  = require("express");
const https =   require("https");
const bodyparser = require("body-parser");
const { maxHeaderSize } = require("http");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


 app.get("/" , function(req , res) {
  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=2";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);

          var msg = [];
          var succ = [];
          var n = d.length-1;
          if(d[n].field2 > 75){
              msg.push("Humidity level is beyond its boundary level, You must turn on the AC!!");
          }
          if(d[n].field1 > 50){
            msg.push("Temperature level is beyond its boundary level, You must turn on the Ac!!");
          } 
          if(d[n].field3 > 400){  //pm 2.5
              msg.push("PM 2.5 level is beyond its boundary level, You must consider Air purifier in your area!!")
          }
          if(d[n].field4   > 300){
              msg.push("Carbon MOnoxide Gas level is beyond its boundary level, You must consider Air purifier in your area!!")
          }
          if(d[n].field5 > 250){
            msg.push("LPG Gas level is beyond its boundary level, You must check it!!")
          }
          if(msg.length == 0){
            succ.push("You are safe to go!!");
          }

          console.log(msg);
          console.log(succ);
          // console.log(d);
          res.render("index" , {data : d, msg : msg,  s : succ});
          //  res.render("tables" , {data : d});
          // res.render("each" , {data : d});

      })
  })

    


 })

 var d;

 app.post("/" , function(req , res){


        var change  = req.body.values;

        const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=" + change;
        https.get(url , function(response){

              response.on("data" , function(data){

                const i = JSON.parse(data);
                //console.log(i);
                d  = i.feeds;
                //console.log(d.length);
                //console.log(d);
                 res.render("tables" , {data : d});
                // res.render("each" , {data : d});

            })
        })

 })

 app.post("/getlast" , function(req , res){


  var change  = req.body.values;

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=1" ;
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("tables" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})
app.post("/getlastthree" , function(req , res){


  var change  = req.body.values;

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=3";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("tables" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})

 app.post("/covalue" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=20";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("carbonMonoxide" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})

app.post("/lpggas" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=20";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("lpggaslevel" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})

app.post("/graph" , function(req , res){


  

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=5";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("graph" , {data1 : d});
          // res.render("each" , {data : d});

      })
  })

})

app.post("/graphs" , function(req , res){


  var change  = req.body.values;

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results="+change;
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("graph" , {data1 : d});
          // res.render("each" , {data : d});

      })
  })

})


app.post("/getlastfive" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=5";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("tables" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})
app.post("/pmvalue" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=20";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("pmvalue" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})

app.post("/temperature" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=20";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("temperature" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})

app.post("/humidity" , function(req , res){

  const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=20";
  https.get(url , function(response){

        response.on("data" , function(data){

          const i = JSON.parse(data);
          //console.log(i);
          d  = i.feeds;
          //console.log(d.length);
          //console.log(d);
           res.render("humidity" , {data : d});
          // res.render("each" , {data : d});

      })
  })

})



app.post("/table/:topic" , function(req , res){

    const table_called  = req.params.topic;
    res.render("each" , { index : table_called  , data  : d} );
    console.log("in table");
    console.log(d);
})


app.listen(3000 , function(){

  console.log("Server has been started!!");
}
)
