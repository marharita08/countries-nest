# Country Data API

The application returns data about countries that it reads from external APIs.

## Technologies

- **Backend**: Nest
- **APIs used**:
  - [Date Nager API](https://date.nager.at/).
  - [Countries Now API](https://countriesnow.space/).

## Setup

1. Install the necessary dependencies:

   `npm install`

2. Create a `.env` file with the following variables:

| Environment Variable           | Default Value                                      | Description                                                |
|-------------------------------|--------------------------------------------|------------------------------------------------------------|
| `PORT`                        | `3001`                                     | The port on which the application will run.                |
| `DATE_NAGER_BASE_URL`        | `https://date.nager.at/api/v3/`          | The base URL for accessing the Date Nager API, which provides country-related data. |
| `COUNTRIES_NOW_BASE_URL`     | `https://countriesnow.space/api/v0.1/`   | The base URL for accessing the Countries Now API, which provides flag and population data. |
| `CLIENT_URL`     | `http://localhost:3000`   | The base URL of client, uses for cors enabling. |

1. Start the backend server:

   `npm start`

## Endpoints

1. GET `/countries/available` returns list of countries with following structure

```
{
  countryCode: string;
  name: string;
}
```
2. GET `/contries/:code` returns country info by country code

```
{
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: null
  }[];
  flagUrl: string;
  population: {
    year: number;
    value: number;
  }[]
}
```


   