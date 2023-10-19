export const COLUMNS = [
    {
        Header: 'Date',
        accessor:  'dt_txt'
    },
    {
        Header: 'Temp in °C',
        accessor: 'main.temp',
    },
    {
        Header: 'Wind Speed',
        accessor: 'wind.speed',
    },
    {
        Header: 'Clouds ',
        accessor: 'weather[0].description',
    }
]