// Add the following line before the app.listen() line

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);