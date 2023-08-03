import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

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

test('renders without errors', () => { 
    render(<Show show={exampleShowData} selectedSeason={'none'} />)
    
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />)
    const loadingComponent = screen.getByText(/fetching data/i)
    expect(loadingComponent).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={exampleShowData} selectedSeason={'none'}/>)
    const seasonOptions = screen.queryAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(2)
});

test('handleSelect is called when a season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={exampleShowData} selectedSeason={'none'} handleSelect={handleSelect} />);
    const selectBox = screen.getByLabelText(/Select a Season/i);
    userEvent.selectOptions(selectBox, ['1']);
    console.log(handleSelect.mock);
    expect(handleSelect).toBeCalled();

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={exampleShowData} selectedSeason={'none'} />)
    let episode = screen.queryByTestId('episodes-container');
    expect(episode).not.toBeInTheDocument()
    rerender(<Show show={exampleShowData} selectedSeason={1} />);
    episode = screen.getByTestId('episodes-container');
    expect(episode).toBeInTheDocument();
});

