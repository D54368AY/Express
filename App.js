const express=require('express');
const PORT=8899;
const app=express();
/* app.set('view engine','pug') */
app.set('view engine','ejs')
app.get('/',(req,res)=>{
/*  res.render('home',{myname:"Saurabh Dubey"}); 
let courses=["Node","Angular","React"]
 res.render('home',{courses:courses,name:"Saurabh Dubey"});  */
res.render('index');
}) 

app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log(`Work On ${PORT}`);
})