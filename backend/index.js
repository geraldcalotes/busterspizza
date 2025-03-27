const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Branches route
app.get('/branches', (req, res) => {
  const branches = [
    {id: 0, name: 'North'},
    {id: 1, name: 'South'},
    {id: 2, name: 'East'},
    {id: 3, name: 'West'}
  ];
  res.json(branches);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
