import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LocationData from '../LocationData';

describe('<LocationData />', () => {

    const lat = 51;
    const lon = 7;

    test('should display location data for given lon & lat', () => {
        render(<LocationData lon={lon} lat={lat}/>);
        const locationElement = screen.getByTestId('location-test-1');
        screen.getByText('Location');
        screen.getByText(new RegExp(lon, "i"));
        screen.getByText(new RegExp(lat, "i"));
    })
})
