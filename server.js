import express from 'express';
import membersRoutes from './routes/members.js';
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
