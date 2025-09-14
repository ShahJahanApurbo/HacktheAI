import express from 'express';
import membersRoutes from './routes/members.js';
import borrowRoutes from './routes/borrow.js';
import returnRoutes from './routes/return.js';
import borrowedRoutes from './routes/borrowed.js';
const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Library Members API');
});

// API routes
app.use('/api/members', membersRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/return', returnRoutes);
app.use('/api/borrowed', borrowedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
