// __tests__/api.test.ts

import axios from 'axios';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api';

jest.mock('axios');

describe('API functions', () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches todos successfully', async () => {
    const response = { data: mockTodos };
    (axios.get as jest.Mock).mockResolvedValue(response);

    const todos = await getTodos();

    expect(todos).toEqual(mockTodos);
  });

  it('adds a todo successfully', async () => {
    const newTodo = { title: 'New Todo', completed: false };
    const response = { data: { ...newTodo, id: 3 } };
    (axios.post as jest.Mock).mockResolvedValue(response);

    const addedTodo = await addTodo(newTodo.title);

    expect(addedTodo).toEqual({ ...newTodo, id: 3 });
  });

  it('updates a todo successfully', async () => {
    const updatedTodo = { title: 'Updated Todo', completed: true };
    const response = { data: { ...updatedTodo, id: 1 } };
    (axios.put as jest.Mock).mockResolvedValue(response);

    const todoId = 1;
    const updated = await updateTodo(todoId, updatedTodo);

    expect(updated).toEqual({ ...updatedTodo, id: 1 });
  });

  it('deletes a todo successfully', async () => {
    const response = { data: {} };
    (axios.delete as jest.Mock).mockResolvedValue(response);

    const todoId = 1;
    await deleteTodo(todoId);

    expect(axios.delete).toHaveBeenCalledWith(`https://6656fb4b9f970b3b36c773b9.mockapi.io/todos/v1/task/${todoId}`);
  });
});
