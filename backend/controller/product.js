const items = [
  {
    id: 1,
    name: 'Item1',
    category:"runnig shoes",
    image:"",
    variants: [
      { size: 32, price: 10.99, quantity: 50 },
      { size: 33, price: 12.99, quantity: 40 },
      { size: 34, price: 15.99, quantity: 30 }
    ]
  }
];

// Get Product by ID
const getProductById = (req, res) => {
    const { id } = req.params;
    const product = items.find(item => item.id === parseInt(id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  };
  
  // Update Product by ID
  const updateProductById = (req, res) => {
    const { id } = req.params;
    const { name, variants } = req.body;
  
    const productIndex = items.findIndex(item => item.id === parseInt(id));
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    items[productIndex] = { id: parseInt(id), name, variants };
  
    return res.json({ message: 'Product updated successfully' });
  };
  
  // Delete Product by ID
  const deleteProductById = (req, res) => {
    const { id } = req.params;
    const productIndex = items.findIndex(item => item.id === parseInt(id));
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    items.splice(productIndex, 1);
    return res.json({ message: 'Product deleted successfully' });
  };
  
  // Add Product
  const addProduct = (req, res) => {
    const { name, variants } = req.body;
    const id = items.length + 1;
    items.push({ id, name, variants });
    return res.json({ message: 'Product added successfully', id });
  };
  
  const getAllProducts = (req, res) => {
    res.json(items);
  };
  module.exports = { getAllProducts, getProductById, updateProductById, deleteProductById, addProduct };
  