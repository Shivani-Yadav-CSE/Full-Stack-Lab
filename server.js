const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// ===== In-memory "database" =====
let students = [
  { id: 1, name: 'Alex Carter', age: 20, course: 'Computer Science' },
  { id: 2, name: 'Priya Sharma', age: 22, course: 'Mechanical Engineering' },
  { id: 3, name: 'Liam Chen', age: 21, course: 'Data Science' }
];

// Helper to generate the next unique ID
let nextId = 4;

// ===== ROUTES =====

// GET /students -> Retrieve all student records
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id -> Retrieve a single student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: `Student with id ${id} not found` });
  }

  res.status(200).json(student);
});

// POST /students -> Add a new student
app.post('/students', (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ error: 'Please provide name, age, and course' });
  }

  const newStudent = {
    id: nextId++,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id -> Update an existing student
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: `Student with id ${id} not found` });
  }

  const { name, age, course } = req.body;

  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  if (course !== undefined) student.course = course;

  res.status(200).json(student);
});

// DELETE /students/:id -> Remove a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Student with id ${id} not found` });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.status(200).json({ message: 'Student deleted', student: deletedStudent });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
