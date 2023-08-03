import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const exampleShowData = {
    name: 'Example Show',
    image: null,
    summary: 'Example summary',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        }
    ]
}

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleShowData)
    render(<Display/>)
    const fetchButon = screen.getByText(/press to get show data/i)
    const show = screen.queryByTestId('show-container')
    fireEvent.click(fetchButon);
    await waitFor(() => expect(show).toBeTruthy);



});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleShowData);
    render(<Display />)
    const fetchButon = screen.getByText(/press to get show data/i)
    fireEvent.click(fetchButon)
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons).toHaveLength(2);
});
test('optional display function prop displayFunc is called when fetch show is pressed', () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData)
    const mockDisplayFunc = jest.fn(() => {});
    render(<Display displayFunc={mockDisplayFunc} />)
    const button = screen.getByText(/press to get show data/i);
    fireEvent.click(button)
    console.log(mockDisplayFunc.mock);
})
