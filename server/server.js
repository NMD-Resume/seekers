const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const userController = require('./UserController');

const PORT = 3000;

mongoose.connect('mongodb://nmd:resume@ds113580.mlab.com:13580/nmd_resume');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allows any site to displayed in an iframe
app.use((req, res) => res.set('X-Frame-Options', ''));

// testing iframes in index.html
express.static('./..');

const userRouter = express.Router();

// userRouter.post('/', userController.createUser);

// userRouter.get('/:username', userController.getUser);

// userRouter.patch('/:username', userController.updateUser);

// userRouter.delete('/:username', userController.deleteUser);



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
