const imagedownload=require('image-downloader')
const uploadlink=async(req,res)=>{
    const {link}=req.body
    const name = Date.now() +'.jpg'
    await  imagedownload.image({
        url:link,
        dest:__dirname+'/uploads/'+ name
    })
    res.json(name)
}

const uploadfromdevice=async(req,res)=>{
        res.status(200).json(req.photos)
        // res.json(images)
    
    
}
module.exports={uploadlink,uploadfromdevice}