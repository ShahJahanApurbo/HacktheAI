
import express from 'express';
import { createMember, getAllMembers, getMemberById, updateMember, deleteMember } from '../controllers/members.js';
import { members } from '../controllers/members.js';
import { transactions } from '../controllers/transactions.js';

const router = express.Router();


// POST /api/members - Create a new member
router.post('/', createMember);

// GET /api/members - Get all members
router.get('/', getAllMembers);

// GET /api/members/:id - Get member by ID
router.get('/:id', getMemberById);

// GET /api/members/:id/history - Get borrowing history for a specific member
router.get('/:id/history', (req, res) => {
  const member_id = parseInt(req.params.id);
  const member = members.get(member_id);

  if (!member) {
    return res.status(404).json({ 
      message: `member with id: ${member_id} was not found` 
    });
  }

  // Mock book data - in a real application, this would come from a books database
  const bookTitles = {
    101: "The Great Gatsby",
    102: "To Kill a Mockingbird", 
    103: "1984",
    104: "Pride and Prejudice",
    105: "The Catcher in the Rye"
  };

  const borrowingHistory = [];

  // Find all transactions for this member
  for (const transaction of transactions.values()) {
    if (transaction.member_id === member_id) {
      const historyEntry = {
        transaction_id: transaction.transaction_id,
        book_id: transaction.book_id,
        book_title: bookTitles[transaction.book_id] || `Book ${transaction.book_id}`,
        borrowed_at: transaction.borrowed_at,
        returned_at: transaction.returned_at || null,
        status: transaction.status
      };
      
      borrowingHistory.push(historyEntry);
    }
  }

  // Sort by borrowed_at date (most recent first)
  borrowingHistory.sort((a, b) => new Date(b.borrowed_at) - new Date(a.borrowed_at));

  res.status(200).json({
    member_id: member_id,
    member_name: member.name,
    borrowing_history: borrowingHistory
  });
});

// PUT /api/members/:id - Update member by ID
router.put('/:id', updateMember);

// DELETE /api/members/:id - Delete member by ID
router.delete('/:id', deleteMember);

export default router;