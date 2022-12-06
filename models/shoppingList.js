import { pool } from "../db/index.js";

export async function getShoppingList() {
  const data = await pool.query("SELECT * FROM shopping;");
  console.log("The shopping list is", data.rows);
  return data.rows;
}

export async function postListItem(listItem) {
  const { item, completed } = listItem;
  const data = await pool.query(
    `INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
    [item, completed]
  );
  return data.rows[0];
}

export async function updateListItem(listItem, id) {
  const { item, completed } = listItem;
  console.log(item, completed, id);
  const data = await pool.query(
    `UPDATE shopping
    SET item = COALESCE($1, item),
    completed = COALESCE($2, completed)
    WHERE id = $3 RETURNING *`,
    [item, completed, id]
  );
  return data.rows[0];
}
