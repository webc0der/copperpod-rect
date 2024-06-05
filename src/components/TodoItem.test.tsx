// todoitem.test.tsx

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
  expect(editTodo).not.toHaveBeenCalled();
  expect(toggleTodo).not.toHaveBeenCalled();

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(toggleTodo).toHaveBeenCalledWith(1);

  const deleteButton = screen.getByTestId('delete-button');
  fireEvent.click(deleteButton);
  expect(removeTodo).toHaveBeenCalledWith(1);

  const editButton = screen.getByTestId('edit-button');
  fireEvent.click(editButton);
  expect(editTodo).not.toHaveBeenCalled();
});
