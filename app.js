const bodyParser = require("body-parser")
const express=require("express")
const app=express()
app.use(bodyParser())
const cors = require("cors")
const multer=require("multer")
const fs=require("fs")

const { admin } = require('./firebase.js');
let database = admin.firestore();
const bucket = admin.storage().bucket();
database.settings({ ignoreUndefinedProperties: true });
let form_data = database.collection('form_data');
var upload = multer({ storage: multer.memoryStorage()})
app.use(cors())

function generateUniqueID() {
    var uniqueID =
      new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    return uniqueID;
  }

app.post("/main",async (req,res)=>{
    try{
        let uniqueID=generateUniqueID()
        let createdAt=new Date()
        var pics = []
        var user_id = req.body.testPassword;
        let details={...req.body, user_id,createdAt, pics}
       // let details=req.body
        let docRef = form_data.doc(uniqueID);
        await docRef.set(details);
        console.log("Hello,server here!")
        console.log(req.body)
        return res.status(200).json({ msg: "data saved successfully" })

    } catch(err){
        console.log(err)
        return res.json({
            error : err
        })

    }
})
app.post("/images",upload.single('file'),async (req,res)=>{
    try{
        console.log("savedetails2");
        //const extensionValid_id = req.body.extensionValid_id;
        var user_id = req.body.user_id;
       
        const file1 = req.file;
        // const file1 = files[0];
        // const file2 = files[1];
    
        var path1 = __dirname + `/images/user_img.jpeg`;
        // path = __dirname + '/../../utilityBill.jpg';
        fs.createWriteStream(path1).write(file1.buffer);
    
        let today = new Date().toISOString();
        const fileName1 = `/${user_id}/${user_id}_${today}_user_img.jpeg`;
        const [uploaded_file1] = await bucket.upload(path1, {
          destination: fileName1,
          public: true, // Alias for predefinedAcl = 'publicRead'
        });
        var Data;
        var documentID;
        const [metadata1] = await uploaded_file1.getMetadata();
        // console.log("metadata: ", metadata);
        const public_upload_link1 = metadata1.mediaLink;
        console.log(public_upload_link1)
        await database
        .collection('form_data')
        .where('user_id', '==', user_id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // console.log('vviek', ' => ', doc);
            Data = doc.data();
            documentID = doc.id;
          });

        })
        .catch(function (err) {
          return res.status(400).json({
            error : err
        });
        });
        Data.pics.push(public_upload_link1)

      let docRef = form_data.doc(documentID);
      await docRef.set(Data);
        return res.status(200).json({msg:"image saved successfully"})
    } catch(err){
        console.log(err)
        return res.json({
            error : err
        })

    }
})
app.listen(3000)