require('dotenv').config()
require('express-async-errors'); 

const express = require('express');   
const app = express();
const userRouter = require('./routes/user')
const postsRouter = require('./routes/posts')
const cors = require('cors')
const port = process.env.PORT || 4000;
const connectDB = require('./db/connectDB')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json())

app.get('/', (req, res) => {
  res.send('post manager api')
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware) 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start()
 

