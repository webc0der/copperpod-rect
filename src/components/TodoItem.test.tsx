import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

test('renders TodoItem', () => {
  const todo: Todo = { id: 1, title: 'Test Todo', completed: false };
  const toggleTodo = jest.fn();
  const removeTodo = jest.fn();
  const editTodo = jest.fn();

  render(<TodoItem todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo} />);

  const listItem = screen.getByText('Test Todo');
  expect(listItem).toBeInTheDocument();
  
  fireEvent.click(listItem);
  expect(editTodo).not.toHaveBeenCalled(); // Ensuring edit is not called on title click
  expect(toggleTodo).not.toHaveBeenCalled(); // Ensuring toggle is not called on title click

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(toggleTodo).toHaveBeenCalledWith(1);

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);
  expect(removeTodo).toHaveBeenCalledWith(1);

  const editButton = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);
  expect(editTodo).not.toHaveBeenCalled(); // Ensure edit is handled internally, actual save will call editTodo
});
