const express=require('express')
const cookieParser=require('cookie-parser');
const sessions=require('express-session');
const fs=require('fs');
const { randomBytes } = require('crypto');
const PORT=9999;
const app=express();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const sessionTime=1000*60*60*24;
app.use(sessions({
    secret:"hdsfhsjd889dsfsdfjhjsdhf",
    saveUninitialized:true,
    cookie:{maxAge:sessionTime},
    resave:false
}))
app.get("/",(req,res)=>{
    res.render('login',{err:''})
    if(req.session.csrf===undefined){
        req.session.csrf = randomBytes(100).toString('base64');
        
    }
})
app.post("/",(req,res)=>{
    let Email=req.body.Email;
    let Password=req.body.Password;
    const file=fs.readFileSync('user.json')
    const data=JSON.parse(file)
 
     data.login.forEach(element => { 
        if(element.email==Email && element.password==Password){
            session=req.session;
            session.email=Email;
            
            res.redirect("/dashboard")
        }
        else{
            res.render('login',{err:"Email or Password is invaild"})
        }
    }); 
})
app.get("/dashboard",(req,res)=>{
    session=req.session
    if(session.email){
        let data=session.email  
        console.log(data);  
        res.render('dashboard',{data:data})
    }

})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})