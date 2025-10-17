import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id, // associate todo with loggedin user
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created succussfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring during  todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); // fetche todo only for loggedin user
    res.status(201).json({ message: "Todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo updated succussfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo updating" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(401).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo Deleted succussfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Erorr occuring during deleteTodo" });
  }
};
