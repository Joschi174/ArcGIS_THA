import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherTable from '../WeatherTable';
import MOCK_DATA from './mockmeatherdata.json';
import EMPTY_MOCK_DATA from './emptymockmeatherdata.json';

describe('<WeatherTable />', () => {


    test('should ckeck if table works with empty dataset', () => {
        render(<WeatherTable data={EMPTY_MOCK_DATA.list}/>);
                
    })

    test('should ckeck if mockdata is displayed', () => {
        render(<WeatherTable data={MOCK_DATA.list}/>);
        screen.getByText('2023-10-19 15:00:00');  
    })
})
