import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsFilePath = path.join(__dirname, 'data/carts.json');

class CartManager {
  constructor() {
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      throw new Error('Error al guardar carritos');
    }
  }

  async createCart() {
    await this.loadCarts();
    const newCart = {
      id: this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: []
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartById(id) {
    await this.loadCarts();
    return this.carts.find(cart => cart.id === parseInt(id));
  }

  async addProductToCart(cid, pid) {
    await this.loadCarts();
    const cartIndex = this.carts.findIndex(cart => cart.id === parseInt(cid));
    if (cartIndex === -1) return null;

    const cart = this.carts[cartIndex];
    const productIndex = cart.products.findIndex(product => product.id === parseInt(pid));

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ id: parseInt(pid), quantity: 1 });
    }

    await this.saveCarts();
    return cart;
  }
}

export default new CartManager();
  