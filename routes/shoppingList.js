import express from "express";
import {
  getShoppingList,
  postListItem,
  updateListItem,
} from "../models/shoppingList.js";

const router = express.Router();

/* GET shopping list. */
router.get("/", async (req, res) => {
  try {
    const data = await getShoppingList();
    res.json({ success: true, payload: data });
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { listItem } = req.body;
    const result = await postListItem(listItem);
    res.status(201).json({ success: true, payload: result });
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { listItem } = req.body;
    const result = await updateListItem(listItem, id);
    res.json({ success: true, payload: result });
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

export default router;
