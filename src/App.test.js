import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./App";

jest.mock('axios')

describe('App', () => {
  it('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' }
    ];

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: { hits: stories } })
    })

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  }); 

  it('fetches stories from an API and fail', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.reject(new Error())
    });

    render(<App />)

    await userEvent.click(screen.getByRole('button'));

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  })
  
})
