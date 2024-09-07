# Country Searcher

Country Searcher is a React Native application that allows users to search for and view details about different countries.

## Features

- Search for countries by name
- View a list of countries with basic information
- See detailed information about a selected country

## Technologies Used

- React Native
- Expo
- TypeScript
- SWR for data fetching
- Expo Image for optimized image loading
- @gorhom/bottom-sheet for bottom sheet

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/adithyavis/country-searcher.git
   ```

2. Navigate to the project directory:
   ```
   cd country-searcher
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the Expo development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Use the Expo Go app on your mobile device to scan the QR code and run the app, or use an emulator.

## Project Structure

- `src/components`: React components used in the app
- `src/hooks`: Custom React hooks
- `src/types`: TypeScript type definitions

## Decisions

1. Why did I chose to fetch all the country information at one go?
- The /all endpoint takes approximately 500ms to fetch, which is not a bad response time for initial fetch. If the response times turned out to be higher, other strategies like pagination would have become necessary. 
- When user starts searching, the search results are filtered on the client side. This is possible because information of all countries is already available on the client side (results aren't paginated). Information of countries changes rarely, so there is a very little need to worry about staleness of data that can arise due to client side filtering.

2. Why did I implement sticky search bar?
- Just for better UX :D

## Possible improvements to the app

- Filter functionality (filter by continents, timezone etc)
- Skeletons
- Server handling of search (debounced API calls)
- Dark mode