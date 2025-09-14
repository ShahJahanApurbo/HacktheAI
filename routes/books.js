import express from 'express';
import { getOverdueBooks, addBook, getBookById, deleteBook } from '../controllers/books.js';

const router = express.Router();

// POST /api/books - Add a new book
router.post('/', addBook);

// GET /api/books/:id - Get book by ID
router.get('/:id', getBookById);

// DELETE /api/books/:id - Delete a book
router.delete('/:id', deleteBook);

// GET /api/books/overdue - Get overdue books with member info
router.get('/overdue', getOverdueBooks);

export default router;