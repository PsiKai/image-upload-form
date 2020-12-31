const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static("public"))

app.set("view engine", "ejs");

var port = process.env.PORT || 5000;
app.listen(port, console.log("Server started on port " + port))

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        console.log('MongoDB connected');
    });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + file.originalname.replace(/ /g, "-"))
    }
});

var upload = multer({storage: storage});

var imgModel = require('./model');

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {items: items})
        }
    })  
})

app.post('/', upload.single('image'), (req, res, next) => {
    var imgObj = {
        name: req.body.name,
        description: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(imgObj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            item.save();
            res.redirect('/');
            
        }
    })
    fs.unlinkSync(req.file.path);
})

app.post('/delete', (req, res) => {
    var title = req.body.title;
    imgModel.findOneAndDelete({"name": title}, (err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Item Deleted");
        }
    })
    res.redirect('/');
})