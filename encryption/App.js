const express=require('express')
const cookieParser=require('cookie-parser');
const sessions=require('express-session');
const fs=require('fs');
const PORT=9999;
const app=express();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const sessionTime=1000*60*60*24;
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(sessions({
    secret:"hdsfhsjd889dsfsdfjhjsdhf",
    saveUninitialized:true,
    cookie:{maxAge:sessionTime},
    resave:false
}))
app.get("/",(req,res)=>{
    res.render('login',{err:'Please Login'})
})
app.post("/",(req,res)=>{
    let Email=req.body.Email;
    let Password=req.body.Password;
    let Data=Email+ ":" +Password;
    const file=fs.readFileSync('user.json')
    const data=JSON.parse(file)
    let check=false
    data.users.forEach(element => {
        if(bcrypt.compareSync(Data,element.usercred)){
            console.log(element.usercred);
            session=req.session
            session.email=Email;
            check=true
        }
    });
    if(check==true){
        res.redirect("/dashboard")
    }
    else{
        res.render('login',{err:"Email or Password is invaild"})
    }
})
app.get("/dashborad",(req,res)=>{
    session=req.session
    if(session.email){
        let data=session.email  
        console.log(data);  
        res.render('dashborad')
    }

})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post("/register",(req,res)=>{
    let id=Math.random()
    let Email=req.body.Email;
    let Password=req.body.Password;
    let Data=Email+ ":" +Password;
    const hash=bcrypt.hashSync(Data,saltRounds);
    let newdata={id:id,usercred:hash}
    const file=fs.readFileSync('user.json')
    const data=JSON.parse(file)
    data.users.push(newdata)
    const FinalData=JSON.stringify(data)
    fs.writeFile('user.json',`${FinalData}`,(error)=>{
        if(error) throw error;
        res.redirect('/')})

})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
app.get("/dashboard",(req,res)=>{
    res.render('dashboard')
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})