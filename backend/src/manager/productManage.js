import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, 'data/products.json');

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(productsFilePath, JSON.stringify(this.products, null, 2));
    } catch (error) {
      throw new Error('Error al guardar productos');
    }
  }

  async getProducts(limit) {
    await this.loadProducts();
    return limit ? this.products.slice(0, limit) : this.products;
  }

  async getProductById(id) {
    await this.loadProducts();
    return this.products.find(product => product.id === parseInt(id));
  }

  async addProduct(productData) {
    await this.loadProducts();
    const newProduct = {
      id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
      status: true,
      ...productData
    };
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async updateProduct(id, updateData) {
    await this.loadProducts();
    const productIndex = this.products.findIndex(product => product.id === parseInt(id));
    if (productIndex === -1) return null;
    this.products[productIndex] = { ...this.products[productIndex], ...updateData };
    await this.saveProducts();
    return this.products[productIndex];
  }

  async deleteProduct(id) {
    await this.loadProducts();
    const productIndex = this.products.findIndex(product => product.id === parseInt(id));
    if (productIndex === -1) return null;
    const [deletedProduct] = this.products.splice(productIndex, 1);
    await this.saveProducts();
    return deletedProduct;
  }
}

export default new ProductManager();
