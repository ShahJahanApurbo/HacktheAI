import express from "express";
import { members } from "../controllers/members.js";
import { transactions } from "../controllers/transactions.js";

const router = express.Router();

// POST /api/return - Return a book
router.post("/", (req, res) => {
  const { member_id, book_id } = req.body;

  // Validate input
  if (!member_id || !book_id) {
    return res
      .status(400)
      .json({ message: "member_id and book_id are required" });
  }

  // Check if member exists
  const member = members.get(member_id);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  // Find the active transaction for this member and book
  let activeTransaction = null;
  for (const transaction of transactions.values()) {
    if (
      transaction.member_id === member_id &&
      transaction.book_id === book_id &&
      transaction.status === "active"
    ) {
      activeTransaction = transaction;
      break;
    }
  }

  // If no active transaction found, return error
  if (!activeTransaction) {
    return res.status(400).json({
      message: `member with id: ${member_id} has not borrowed book with id: ${book_id}`,
    });
  }

  // Process the return
  const returned_at = new Date().toISOString();
  const returnTransaction = {
    transaction_id: activeTransaction.transaction_id,
    member_id,
    book_id,
    returned_at,
    status: "returned",
  };

  // Update the transaction status
  transactions.set(activeTransaction.transaction_id, returnTransaction);
  
  // Update member's borrowing status
  member.has_borrowed = false;

  res.status(200).json(returnTransaction);
});

export default router;