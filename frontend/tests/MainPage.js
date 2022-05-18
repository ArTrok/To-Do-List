import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Main Page', () => {
  describe('Task Menu', () => {
    test('Should have menu', () => {

    });
    test('Should have menu option to add a new task', () => {
      renderWithRouter(<App />);
      const menu = screen.getAllByTestId('taskMenu');
      expect(menu).toBeInTheDocument();
    });

    test('Should have fileds "Date, Time, Title, Details and Progress" to add a new task', () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      expect(addTaskButton).toBeInTheDocument();
      userEvent.click(addTaskButton);
      const dateField = screen.getByRole('input', { name: /date/i });
      const timeField = screen.getByRole('input', { name: /time/i });
      const titleField = screen.getByRole('input', { name: /title/i });
      const detailsField = screen.getByRole('input', { name: /details/i });
      const progressField = screen.getByRole('input', { name: /progress/i });
      expect(dateField).toBeInTheDocument();
      expect(timeField).toBeInTheDocument();
      expect(titleField).toBeInTheDocument();
      expect(detailsField).toBeInTheDocument();
      expect(progressField).toBeInTheDocument();
    });

    test('Should fill all fileds and hit create to add a new task', async () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      const createTaskButton = screen.getByRole('button', { name: /create task/i });
      expect(addTaskButton).toBeInTheDocument();
      userEvent.click(addTaskButton);
      const dateField = screen.getByRole('input', { name: /date/i });
      const timeField = screen.getByRole('input', { name: /time/i });
      const titleField = screen.getByRole('input', { name: /title/i });
      const detailsField = screen.getByRole('input', { name: /details/i });
      const progressField = screen.getByRole('input', { name: /progress/i });
      userEvent.type(dateField, "06/06/2022");
      userEvent.type(timeField, "12:00");
      userEvent.type(titleField, "My first activity");
      userEvent.type(detailsField, "A very important activity that will change my life");
      userEvent.type(progressField, "pending");
      userEvent.click(createTaskButton);
      const taskCreatedText = await screen.findByText(/task created/i);
      expect(taskCreatedText).toBeInTheDocument();
    });
  })
})