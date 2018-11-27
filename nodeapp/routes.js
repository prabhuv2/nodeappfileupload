module.exports = function(app)
{
    app.get('/test',function(req,res){
        res.json('sss');
    })
}