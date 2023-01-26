const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const schemas = require('./schema');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs')
const app = express();
const port = 9000;
const jsonpar = bodyParser.json();
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(cookieParser());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/react_web_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// auth middleware
const verifyToken = (req, res, next) => {
    const token = req.body.token;
    console.log(req.body);
    if (!token) {
        res.status(401).send({ error: "no token provided" })
    }
    jwt.verify(token, "mykeysecret", (err, decoded) => {
        if (err) {
            res.send({ error: "Authentication failed" })
        } else {
            next();
        }
    })
}

// Add user
app.post("/signup", jsonpar, (req, res) => {
    const { name, phone, password, email } = req.body
    console.log(req.body);
    const User = new schemas.User({
        name,
        password,
        email,
        phone,
    });
    User.save().then(() => {
        res.send({ success: true })
    }).catch(() => {
        res.send({ success: false })
    })
});

// user details
app.post("/user", (req, res) => {
    const { id } = req.body;
    console.log(id + " 11");
    schemas.User.findById({ _id: id }).then((doc) => {
        console.log(doc);
        res.send({ success: true, details: doc });
    })
})

// login
app.post("/login", jsonpar, (req, res) => {
    const { email, password } = req.body;
    schemas.User.findOne({ email, password }).then((doc) => {
        console.log(req.body);
        if (doc) {
            
            const reps = {
                id: doc._id,
                email: doc.email,
                name: doc.name,
            }
            const token = jwt.sign(reps, "mykeysecret", { expiresIn: 86400 });
            res.send({ auth: true, token: token, id: reps.id, accountType: doc.accountType });
        } else {
            res.send({ auth: false });
        }
    }).catch((e) => {
        // console.log(e);
        res.status(505).send(e);
    })
})

app.post("/addprofile/:id", async (req, res) => {
    const { id } = req.params;
    const image = req.files.image;
    const fileName = id;
    await image.mv('./public/image/' + fileName, (err, done) => {
        if (!err) {
            schemas.User.findByIdAndUpdate({ _id: id }, { image: fileName }).then(() => {
                res.send({ success: true });
            }).catch((e) => {
                console.log(e);
                res.send({ success: false, e });
            })
        } else {
            res.send({ success: false });
        }
    });
});


// Admin
app.post("/allusers", verifyToken, (req, res) => {
    console.log(req.body);
    schemas.User.find({ accountType: { $ne: "admin" } }).then((docs) => {
        res.send({ success: true, users: docs })
    }).catch((e) => {
        res.send(e)
    })
})

app.post("/admin/adduser", verifyToken, (req, res) => {
    const { name, phone, password, email } = req.body
    console.log(req.body);
    const User = new schemas.User({
        name,
        password,
        email,
        phone,
    });
    User.save().then(() => {
        res.send({ success: true })
    }).catch((e) => {
        console.log(e);
        res.send({ success: false })
    });
});

app.post("/admin/edituser", verifyToken, (req, res) => {
    const { id, name, phone, email } = req.body;
    schemas.User.findByIdAndUpdate({ _id: id }, { name, phone, email }).then(() => {
        res.send({ success: true });
    }).catch((e) => {
        console.log(e);
        res.send({ success: false })
    })
})

app.post("/delete/user", verifyToken, (req, res) => {
    const { id } = req.body;
    schemas.User.findByIdAndDelete({ _id: id }).then(() => {
        res.send({ success: true });
    }).catch((e) => {
        console.log(e);
        res.send({ success: false })
    })
})
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`app listening on port ${port}!`));