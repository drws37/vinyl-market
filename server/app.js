const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { Task } = require('./db//models');

// const indexRouter = require('./routes/index.routes');
// const getUser = require('./middleware/getUser');
// const { verifyAccessToken } = require('./middleware/verifyJWT');
app.use(cookieParser());
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ tasks });
  } catch ({ message }) {
    res.json({ message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const task = await Task.create({
      description,
    });
    res.json({ task });
  } catch ({ message }) {
    res.json({ message });
  }
});

app.delete('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await Task.destroy({
      where: { id: taskId },
    });
    if (result > 0) {
      res.json({ message: 'success', taskId });
      return;
    }
    res.json({ message: 'Нельзя удалять чужие карточки!!!!!' });
  } catch ({ message }) {
    res.json({ message });
  }
});

app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description } = req.body;

    const currentTask = await Task.findOne({ where: { id: taskId } });
    const result = await currentTask.update(
      { description },
      { where: { id: taskId } }
    );
    res.json({ message: 'success', task: result });
  } catch ({ message }) {
    res.json({ message });
  }
});

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(ssr);
// app.use(verifyAccessToken);
// app.use(getUser);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`А мы пашем как буйволы и ныряем как дельфины на ${PORT} порту.`);
});
