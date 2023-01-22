const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 8080;

app.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/', 'uploads'),
    filename: function (req, file, cb) {   
        cb(null, 'image.png')  
    }
})

app.post('/imageupload', async (req, res) => {	
    try {

        let upload = multer({ storage: storage}).single('file');

        upload(req, res, function(err){});

    }catch (err) {console.log(err)}
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))