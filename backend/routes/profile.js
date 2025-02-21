const express = require('express');
const multer = require('multer');
const path  = require('path')
const verifyJWT = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userProfileController');
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
      cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
      cb(null, file.fieldname + '_'+Date.now()+path.extname(file.originalname))
    }
  })
  const upload = multer({
    storage:storage
  })
router.use(verifyJWT)

router.get('/profile', getUserProfile)
router.patch('/profile', upload.single('imageFile'), editUserProfile)

module.exports = router
