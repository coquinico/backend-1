import cartManager from '../manager/cartManage.js';

export const createCart = async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
