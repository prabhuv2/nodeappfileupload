module.exports = function(app)
{
    app.get('/test',function(req,res){
        res.json('sss');
    });

    app.post('/api/v1/:from-:to',function(req,res){
        res.json(req.params);
    })
}