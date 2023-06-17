const express= require('express')
const {uploadlink,uploadfromdevice} = require('../upload')
const {addplaces,getuserplaces,getallplaces, updateplaces} = require('../controllers/places');
const { image } = require('image-downloader');

const router =express.Router()
const uploadmiddleware = async (req, res, next) => {
    try {
      let files = req.files['files[]'];
      files = files.length === undefined ? [files]:files
      
      let images = [];
  
      await Promise.all(
        files.map(async (file,index) => {
          const name = new Date().getTime() + '.jpg';
          await file.mv(`${__dirname}/../uploads/${name}`, function (err) {
            if (err) {
             throw new Error()
            }
          });
          images.push(name)
        })
      )
        req.photos=images
      next();
    } catch (err) {
      res.status(400).json(false)
    }
  };
  
router.post('/upload-link',uploadlink) 
router.post('/upload-device',uploadmiddleware,uploadfromdevice)
router.post('/new',addplaces)
router.post('/getall',getuserplaces)
router.get('/getallplaces',getallplaces)
router.patch('/:id',updateplaces)
module.exports=router
