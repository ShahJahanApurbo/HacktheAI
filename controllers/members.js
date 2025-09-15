// In-memory storage
export const members = new Map();



const getAllMembers = (req, res) => {
  const allMembers = Array.from(members.values());
  res.status(200).json({ members: allMembers });
}
const getMemberById = (req, res) => {
  const member_id = parseInt(req.params.id);
  const member = members.get(member_id);

  if (!member) {
    return res.status(404).json({ message: `Member with id: ${member_id} not found` });
  }
  res.status(200).json(member);
}

const createMember = (req, res) => {
  const { member_id, name, age } = req.body;
  if (!member_id || !name || !age) {
    return res.status(400).json({ message: 'member_id, name, and age are required' });
  }
  // Check for duplicate ID
  if (members.has(member_id)) {
    return res.status(400).json({
      message: `member with id: ${member_id} already exists`
    });
  }
  const newMember = { member_id, name, age, has_borrowed: false };
  members.set(member_id, newMember);
  res.status(200).json(newMember);
}

const updateMember = (req, res) => {
  const member_id = parseInt(req.params.id);
  const { name, age } = req.body;

  const member = members.get(member_id);
  if (!member) {
    return res.status(404).json({ message: `Member with id: ${member_id} not found` });
  }
  if (!name && !age) {
    return res.status(400).json({ message: 'At least one of name or age must be provided for update' });
  }
  if (age < 12) {
    return res.status(400).json({ message: `invalid age: ${age}, must be 12 or older` });
  }

  // Update member details
  if (name) member.name = name;
  if (age) member.age = age;


  res.status(200).json(member);
}

const deleteMember = (req, res) => {
  const member_id = parseInt(req.params.id);
  const member = members.get(member_id);

  if (!member) {
    return res.status(404).json({ message: `Member with id: ${member_id} not found` });
  }

  // Check if member has active borrows
  if (member.has_borrowed) {
    return res.status(400).json({
      message: `cannot delete member with id: ${member_id}, member has an active book borrowing`
    });
  }

  // Delete the member
  members.delete(member_id);
  res.status(200).json({
    message: `member with id: ${member_id} has been deleted successfully`
  });
}

const membersController = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};

export { createMember, getAllMembers, getMemberById, updateMember, deleteMember };
export default membersController;