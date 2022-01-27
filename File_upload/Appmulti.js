const express=require('express');
const multer=require('multer');
const helpers=require('./helpers/helpers');
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
    res.render("uploadmulti");
})
app.post("/fileupload",(req,res)=>{
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).array('myfile',10); //filterFilter is for filtering extention
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.send(req.fileValidationError);
        }
       else if(!req.files){
           res.send("Please select a file");
       }
       else if(err){
           res.send("SOme uploading error");
       }
       else {

        const files=req.files;
        console.log(files);
       const len=files.length; 
       let result='';
        for(index=0;index<len; ++index){
            result+=`<img src="${files[index].filename}" width=300 height=300/>`;
        }
        res.send(result);
          
       }
    })
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})