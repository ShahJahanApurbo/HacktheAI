import express from "express";
import { members } from "../controllers/members.js";
import { transactions } from "../controllers/transactions.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// POST /api/borrow - Borrow a book
router.post("/", (req, res) => {
  const { member_id, book_id } = req.body;
  const member = members.get(member_id);
  if (!member_id || !book_id) {
    return res
      .status(400)
      .send({ message: "member_id and book_id are required" });
  }

  if (!member) {
    return res.status(404).send({ message: "Member not found" });
  }

  if (member.has_borrowed) {
    return res.status(400).send({
      message: `member with id: ${member_id} has already borrowed a book`,
    });
  }

  const borrowed_at = new Date().toISOString(); 

  const transaction = {
    transaction_id: uuidv4(),
    member_id,
    book_id,
    borrowed_at,
    status: "active",
  };

  transactions.set(transaction.transaction_id, transaction);
  member.has_borrowed = true;

  res.status(200).send(transaction);
});

export default router;