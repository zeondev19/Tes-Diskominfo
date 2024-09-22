const db = require("../config/database");

class Order {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT o.id, o.created_at, o.updated_at, 
             p.id as product_id, p.name, p.price, op.quantity, 
             p.stock, p.sold
      FROM orders o
      JOIN order_products op ON o.id = op.order_id
      JOIN products p ON op.product_id = p.id
    `);
    return this.groupOrderProducts(rows);
  }

  static async getById(id) {
    const [rows] = await db.query(
      `
      SELECT o.id, o.created_at, o.updated_at, 
             p.id as product_id, p.name, p.price, op.quantity, 
             p.stock, p.sold
      FROM orders o
      JOIN order_products op ON o.id = op.order_id
      JOIN products p ON op.product_id = p.id
      WHERE o.id = ?
    `,
      [id]
    );
    return this.groupOrderProducts(rows)[0];
  }

  static async create(products) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [orderResult] = await conn.query("INSERT INTO orders () VALUES ()");
      const orderId = orderResult.insertId;

      for (const product of products) {
        await conn.query(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)",
          [orderId, product.id, product.quantity]
        );
        await conn.query(
          "UPDATE products SET stock = stock - ?, sold = sold + ? WHERE id = ?",
          [product.quantity, product.quantity, product.id]
        );
      }

      await conn.commit();
      return this.getById(orderId);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async delete(id) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [orderProducts] = await conn.query(
        "SELECT product_id, quantity FROM order_products WHERE order_id = ?",
        [id]
      );

      for (const op of orderProducts) {
        await conn.query(
          "UPDATE products SET stock = stock + ?, sold = sold - ? WHERE id = ?",
          [op.quantity, op.quantity, op.product_id]
        );
      }

      await conn.query("DELETE FROM order_products WHERE order_id = ?", [id]);
      await conn.query("DELETE FROM orders WHERE id = ?", [id]);

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static groupOrderProducts(rows) {
    const orders = {};
    for (const row of rows) {
      if (!orders[row.id]) {
        orders[row.id] = {
          id: row.id,
          products: [],
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
      }
      orders[row.id].products.push({
        id: row.product_id,
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        stock: row.stock,
        sold: row.sold,
      });
    }
    return Object.values(orders);
  }
}

module.exports = Order;
