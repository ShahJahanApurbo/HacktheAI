import express from "express";
import { members } from "../controllers/members.js";
import { transactions } from "../controllers/transactions.js";

const router = express.Router();

// GET /api/borrowed - Get all currently borrowed books
router.get("/", (req, res) => {
  const borrowedBooks = [];

  // Iterate through all transactions to find active ones
  for (const transaction of transactions.values()) {
    if (transaction.status === "active") {
      // Get member details
      const member = members.get(transaction.member_id);
      
      if (member) {
        // Calculate due date (14 days from borrowed_at)
        const borrowedDate = new Date(transaction.borrowed_at);
        const dueDate = new Date(borrowedDate);
        dueDate.setDate(borrowedDate.getDate() + 14);

        // Mock book data - in a real application, this would come from a books database
        const bookTitles = {
          101: "The Great Gatsby",
          102: "To Kill a Mockingbird",
          103: "1984",
          104: "Pride and Prejudice",
          105: "The Catcher in the Rye"
        };

        const borrowedBook = {
          transaction_id: transaction.transaction_id,
          member_id: transaction.member_id,
          member_name: member.name,
          book_id: transaction.book_id,
          book_title: bookTitles[transaction.book_id] || `Book ${transaction.book_id}`,
          borrowed_at: transaction.borrowed_at,
          due_date: dueDate.toISOString()
        };

        borrowedBooks.push(borrowedBook);
      }
    }
  }

  res.status(200).json({ borrowed_books: borrowedBooks });
});

export default router;