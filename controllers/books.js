// Books array
const books = [
   {
      book_id: 201,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "978-0547928227",
      is_available: false
   },
   {
      book_id: 202,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      is_available: false
   }
];

// Members array
const members = [
   { member_id: 1, member_name: "Alice" },
   { member_id: 2, member_name: "Bob" },
   { member_id: 3, member_name: "Charlie" },
   { member_id: 4, member_name: "Diana" }
];

// Transactions (links books to members)
const transactions = [
   {
      transaction_id: 701,
      book_id: 201,
      member_id: 3,
      borrowed_at: "2025-08-20T11:00:00Z",
      due_date: "2025-09-03T11:00:00Z"
   },
   {
      transaction_id: 702,
      book_id: 202,
      member_id: 4,
      borrowed_at: "2025-08-25T15:30:00Z",
      due_date: "2025-09-08T15:30:00Z"
   }
];

// Function to calculate days overdue
function calculateDaysOverdue(dueDate) {
   const today = new Date();
   const due = new Date(dueDate);
   const diffMs = today - due;
   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
   return diffDays > 0 ? diffDays : 0;
}

// Get overdue books with member info
export const getOverdueBooks = (req, res) => {
   const overdue_books = transactions
      .filter(tx => calculateDaysOverdue(tx.due_date) > 0)
      .map(tx => {
         const book = books.find(b => b.book_id === tx.book_id);
         const member = members.find(m => m.member_id === tx.member_id);

         return {
            transaction_id: tx.transaction_id,
            member_id: member.member_id,
            member_name: member.member_name,
            book_id: book.book_id,
            book_title: book.title,
            borrowed_at: tx.borrowed_at,
            due_date: tx.due_date,
            days_overdue: calculateDaysOverdue(tx.due_date)
         };
      });

   res.json({ overdue_books });
}

export const addBook = (req, res) => {
   const newBook = req.body;

   if (!newBook.book_id || !newBook.title || !newBook.author || !newBook.isbn) {
      console.log("Missing required book fields");
      return res.status(400).json({ error: "book_id, title, author, and isbn are required" });
   }

   const existingBook = books.find(b => b.book_id === newBook.book_id);
   if (existingBook) {
      console.log("Book with this ID already exists");
      return res.status(409).json({ message: `book with id: ${newBook.book_id} already exists` });
   }

   const newBookEntry = {
      book_id: newBook.book_id,
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      is_available: newBook.is_available !== undefined ? newBook.is_available : true
   };
   books.push(newBookEntry);

   console.log("Book added successfully");
   res.status(200).json(newBookEntry);
}

export const getBookById = (req, res) => {
   const bookId = parseInt(req.params.id);
   const book = books.find(b => b.book_id === bookId);

   if (!book) { 
      return res.status(404).json({ message: `book with id: ${bookId} was not found` }); 
   }

   res.status(200).json(book);
}

export const deleteBook = (req, res) => {
   const bookId = parseInt(req.params.id);
   const bookIndex = books.findIndex(b => b.book_id === bookId);

   if (bookIndex === -1) {
      return res.status(404).json({ message: `book with id: ${bookId} was not found` });
   }
   
   if (!books[bookIndex].is_available) {
      return res.status(400).json({ message: `cannot delete book with id: ${bookId}, book is currently borrowed` });
   }
   
   books.splice(bookIndex, 1);
   res.json({ message: `book with id: ${bookId} has been deleted` });
}

// Export all functions for use in routes
const booksController = {
   getOverdueBooks,
   addBook,
   getBookById,
   deleteBook
};

export default booksController;