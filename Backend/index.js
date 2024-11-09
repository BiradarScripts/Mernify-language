const db = require('./db');
db.connectToMongodb();

const cors = require('cors');
const express = require('express');
const server = express();

// Import route modules
const userRouter = require('./routes/Language');
const lessonRouter = require('./routes/Lesson');
const progressRouter = require('./routes/Progress');
const quizRouter = require('./routes/Quiz');
const authRouter = require('./routes/User');

// Middleware
server.use(cors());
server.use(express.json({ limit: '500mb' }));
server.use(express.urlencoded({ limit: '500mb', extended: true }));

// Route setup
server.use('/apis/auth', authRouter.routes);
server.use('/apis/user', userRouter.routes);
server.use('/apis/lesson', lessonRouter.routes);
server.use('/apis/progress', progressRouter.routes);
server.use('/apis/quiz', quizRouter.routes);

// Server start
server.listen(8080, () => {
  console.log('Server connected on port 8080');
});
