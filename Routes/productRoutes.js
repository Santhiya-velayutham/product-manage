const Router = require("express");
const multer = require('multer');
const path = require('path');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../Controllers/productController');
const router = Router();

const filePath = path.join(__dirname, "../Data/Images");
const uploadedStorage = multer.diskStorage({
  destination: filePath,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const newFileName = `${base}-${Date.now()}${ext}`;
    cb(null, newFileName);
  }
});

const upload = multer({ storage: uploadedStorage });

router.post('/createProduct', upload.single('image'), createProduct);
router.get('/getProducts', getProducts);
router.put('/updateProduct/:id', upload.single('image'), updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
