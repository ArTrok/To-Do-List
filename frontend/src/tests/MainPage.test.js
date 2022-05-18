import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import axios from 'axios';

const axiosGetMock = [{
  id: 1,
  title: "My first activity",
  date: "06/06/2022",
  time: "12:00",
  details: "A very important activity that will change my life",
  status: "in progress",
  creationAt: "06/06/2022",
},
{
  id: 2,
  title: "My second activity",
  date: "07/06/2022",
  time: "13:00",
  details: "An important activity that will change my life too",
  status: "pending",
  creationAt: "06/06/2022",
}];

jest.mock('axios');

describe('Testing Main Page', () => {
  describe('Task Menu', () => {
    test('Should have Menu', () => {
      renderWithRouter(<App />);
      const menu = screen.getByTestId('taskMenu');
      expect(menu).toBeInTheDocument();
    });
    test('Should have menu option to add a new task', () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      expect(addTaskButton).toBeInTheDocument();
    });

    test('Should have fileds "Date, Time, Title, Details and Progress" to add a new task', () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
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

      const createTaskButton = screen.getByRole('button', { name: /create task/i });
      expect(createTaskButton).toBeInTheDocument();

      userEvent.click(createTaskButton);
      
      const taskCreatedText = await screen.findByText(/task created/i);
      expect(taskCreatedText).toBeInTheDocument();
    });
  });
  describe("Task Panel", () => {
    beforeAll(() => {
      axios.get.mockResolvedValue(axiosGetMock);
      axios.put.mockResolvedValue(axiosGetMock[1]);
      axios.delete.mockResolvedValue({});
    });

    test("Should have Titles, Dates, Timestamps, Creation date, Details and Status", () => {
      renderWithRouter(<App />);

      const tasksTitles = screen.getAllByTestId('tasksTitles');
      const tasksDates = screen.getAllByTestId('tasksDates');
      const tasksTimestamps = screen.getAllByTestId('tasksTimestamps');
      const tasksCreationDates = screen.getAllByTestId('tasksCreationDates');
      const tasksDetails = screen.getAllByTestId('tasksDetails');
      const tasksStatus = screen.getAllByTestId('tasksStatus');
      
      expect(tasksTitles).toBeInTheDocument();
      expect(tasksDates).toBeInTheDocument();
      expect(tasksTimestamps).toBeInTheDocument();
      expect(tasksCreationDates).toBeInTheDocument();
      expect(tasksDetails).toBeInTheDocument();
      expect(tasksStatus).toBeInTheDocument();
      
    });

    test("Should have edit task option", async () => {
      renderWithRouter(<App />);

      const editTaskButton = await screen.findByRole('button', {name: /editTask1/});
      expect(editTaskButton).toBeInTheDocument();
      
      userEvent.click(editTaskButton);
      
      const taskTitle = await screen.findByRole('input', {name: /taskTitle1/});
      const taskDate = await screen.findByRole('input', {name: /taskDate1/});
      const taskTimestamp = await screen.findByRole('input', {name: /taskTimestamp1/});
      const taskCreationDate = await screen.findByRole('input', {name: /taskCreationDate1/});
      const taskDetail = await screen.findByRole('input', {name: /taskDetail1/});
      const taskStatus = await screen.findByRole('input', {name: /taskStatus1/});
      
      expect(taskTitle).toBeInTheDocument();
      expect(taskDate).toBeInTheDocument();
      expect(taskTimestamp).toBeInTheDocument();
      expect(taskCreationDate).toBeInTheDocument();
      expect(taskDetail).toBeInTheDocument();
      expect(taskStatus).toBeInTheDocument();

      const updateTaskButton = await screen.findByRole('button', {name: /updateTask1/});
      expect(updateTaskButton).toBeInTheDocument();
      userEvent.click(updateTaskButton);
      expect(axios.put).toHaveBeenCalledTimes(1);

    });

    test("Should have delete task option", async () => {
      renderWithRouter(<App />);

      const deleteTaskButton = await screen.findByRole('button', {name: /deleteTask1/});
      expect(deleteTaskButton).toBeInTheDocument();

      userEvent.click(deleteTaskButton);

      const taskTitle = await screen.findByTestId("taskTitle1");
      const taskDate = await screen.findByTestId("taskDate1");
      const taskTimestamp = await screen.findByTestId("taskTimestamp1");
      const taskCreationDate = await screen.findByTestId("taskCreationDate1");
      const taskDetail = await screen.findByTestId("taskDetail1");
      const taskStatus = await screen.findByTestId("taskStatus1");
      
      expect(taskTitle).not.toBeInTheDocument();
      expect(taskDate).not.toBeInTheDocument();
      expect(taskTimestamp).not.toBeInTheDocument();
      expect(taskCreationDate).not.toBeInTheDocument();
      expect(taskDetail).not.toBeInTheDocument();
      expect(taskStatus).not.toBeInTheDocument();
      expect(axios.delete).toHaveBeenCalledTimes(1);

    });
  });
})