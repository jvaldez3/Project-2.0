var model = require('../models/api_logic.js')
var express = require('express');
var routers = express.Router();

routers.get('/', (req,res)=>{
    model.all((data)=>{
        let obj ={
            pals: data
        };
        console.log(obj);
    });
});

routers.post('/api/pals',(req, res)=>{
    pals.create(['name','style','score'],
    [req.body.name, req.body.style, req.body.score],
    (res1)=>{
        res.json({id: res1.insterId});
    });
});

routers.put('/api/pals/:id',(req,res)=>{
    let condition = 'id = ' + req.params.id;
    console.log('condition', condition);
    
    pals.update({
        name: req.body.name,
        style: req.body.style,
        score: req.body.score
    }, condition, (result)=>{
        // TODO: WTF is this changedRows where does this come from?
        if(result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

routers.delete('/api/pals/:id',(req, res)=>{
    let condition = 'id = ' + req.parans.id;

    pals.delets(condition, (result)=>{
        // TODO: here is a simpler thing. god damn procrastination.
        if(result.affectedRows==0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});

console.log('=============conntrollers===================');
module.exports=routers;