var express = require('express');
var config = require('./config');
var users = require('./users');
var bodyparser = require('body-parser');
var formidable = require('formidable');
var  fileupload = require('express-fileupload');
var fs = require('fs');
var parse = require('csv-parser');
var app = express();

var api = '/api/v1/';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.use(fileupload());

app.get(api+'users',function(req,res){
    return res.status(200).send({
        success:true,
        status_code:200,
        message:"Users list",
        length:users.length,
        data:users
    });
});

app.post(api+'users',function(req,res){
   console.log(req.body);
    return res.status(200).send({
        success:true,
        status_code:200,
        data:req.body
    });
})

app.post(api+'fileupload',function(req,res){
    console.log(req.files[''].name);
    var csvData=[];
    var file = req.files[''];
    file.mv('upload/'+req.files[''].name,function(err){
          if(err)
          {
            console.log(err);
          }
          else{
            fs.createReadStream('upload/'+req.files[''].name)
            .pipe(parse({delimiter: ':'}))
            .on('data', function(csvrow) {
            
                //do something with csvrow
                csvData.push(csvrow);     
                console.log("pushing");   
            })
            .on('end',function() {
                //do something wiht csvData
                console.log('pushing done');
                res.json({
                    success:true,
                    data:csvData
                })
            });
          }
    })
        
})

app.post(api+"upload2",function(req,res){
    console.log(req.files);
})
 require('./routes')(app);
app.listen(config.port,()=>{
    console.log('server running at port '+config.port);
})