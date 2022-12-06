import { pool } from "../db/index.js";

export async function getShoppingList() {
  try {
    const data = await pool.query("SELECT * FROM shopping;");
    return data.rows;
  } catch (error) {
    console.log(error);
  }
}

export async function postListItem(listItem) {
  try {
    const { item, completed } = listItem;
    const data = await pool.query(
      `INSERT INTO shopping (
        item,
        completed
      ) VALUES ($1,$2) RETURNING *;`,
      [item, completed]
    );
    return data.rows[0];
  } catch (error) {
    return error;
  }
}

export async function updateListItem(listItem, id) {
  try {
    const { item, completed } = listItem;
    const data = await pool.query(
      `UPDATE shopping
      SET item = COALESCE($1, item),
      completed = COALESCE($2, completed)
      WHERE id = $3 RETURNING *`,
      [item, completed, id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
}
