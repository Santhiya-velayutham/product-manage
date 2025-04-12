const Product = require('../Models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category, description, mfgDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      price,
      stock,
      category,
      description,
      mfgDate,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Get Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, category, description, mfgDate } = req.body;

    const updateFields = {
      name,
      price,
      stock,
      category,
      description,
      mfgDate
    };

    if (req.file) {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    res.json(updatedProduct);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
