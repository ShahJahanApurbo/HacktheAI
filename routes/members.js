
import express from 'express';
import { createMember, getAllMembers, getMemberById, updateMember } from '../controllers/members.js';
const router = express.Router();


// POST /api/members - Create a new member
router.post('/', createMember);

// GET /api/members - Get all members
router.get('/', getAllMembers);

// GET /api/members/:id - Get member by ID
router.get('/:id', getMemberById);

// PUT /api/members/:id - Update member by ID
router.put('/:id', updateMember);

export default router;