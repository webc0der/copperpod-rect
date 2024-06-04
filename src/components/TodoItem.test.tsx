import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

test('renders TodoItem', () => {
  const todo: Todo = { id: 1, title: 'Test Todo', completed: false };
  const toggleTodo = jest.fn();

  render(<TodoItem todo={todo} toggleTodo={toggleTodo} />);

  const listItem = screen.getByText('Test Todo');
  expect(listItem).toBeInTheDocument();
  
  fireEvent.click(listItem);
  expect(toggleTodo).toHaveBeenCalledWith(1);
});
