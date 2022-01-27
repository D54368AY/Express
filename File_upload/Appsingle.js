const express=require('express');
const multer=require('multer');
const path=require('path');
const PORT=8888;
const app=express();
app.use(express.static("uploads"));
app.set("view engine","ejs");
//for uploading 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
//end 
app.get("/",(req,res)=>{
    res.render("upload");
})
app.post("/fileupload",(req,res)=>{
    let upload=multer({storage:storage}).single('myfile');
    upload(req,res,(err)=>{
       if(!req.file){
           res.send("Please select a file");
       }
       else if(err){
           res.send("Some uploading error");
       }
       else {
           res.send(`You uploaded the file : <hr/> <img src="${req.file.filename}" width="300" height="300"/>`);
       }
    })
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})