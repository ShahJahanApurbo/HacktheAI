// Shared storage for transactions
export const transactions = new Map();

// Add dummy transactions for testing
transactions.set(501, {
  transaction_id: 501,
  member_id: 1,
  book_id: 101,
  borrowed_at: "2025-09-11T10:30:00Z",
  returned_at: "2025-09-15T14:20:00Z",
  status: "returned"
});

transactions.set(502, {
  transaction_id: 502,
  member_id: 1,
  book_id: 102,
  borrowed_at: "2025-09-08T09:15:00Z",
  returned_at: "2025-09-12T16:45:00Z",
  status: "returned"
});

transactions.set(503, {
  transaction_id: 503,
  member_id: 1,
  book_id: 103,
  borrowed_at: "2025-09-16T09:45:00Z",
  returned_at: null,
  status: "active"
});

transactions.set(504, {
  transaction_id: 504,
  member_id: 3,
  book_id: 104,
  borrowed_at: "2025-09-10T14:30:00Z",
  returned_at: "2025-09-13T11:20:00Z",
  status: "returned"
});

transactions.set(505, {
  transaction_id: 505,
  member_id: 3,
  book_id: 105,
  borrowed_at: "2025-09-14T08:00:00Z",
  returned_at: null,
  status: "active"
});