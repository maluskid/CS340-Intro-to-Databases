import { useState, useEffect } from 'react';  // import the hooks you are going to use
import axios from 'axios';

// Define the HomePage component
function HomePage() {
  // useState hook to initialize the diagnosticData state variable to store the fetched data
  const [diagnosticData, setDiagnosticData] = useState([]);

  // Define a function to fetch diagnostic data from the API
  const fetchDiagnosticData = async () => {
    try {
      // Construct the URL for the API call
      const URL = import.meta.env.VITE_API_URL + 'diagnostic';

      // Use Axios to make the GET request
      const response = await axios.get(URL);
      // Update state with the response data
      setDiagnosticData(response.data);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching diagnostic data:', error);
      alert('Error fetching diagnostic data from the server.');
    }
  };

  // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
  useEffect(() => {
    fetchDiagnosticData();
  }, []);

  // Determine content based on diagnosticData length from the fetch action
  let content;
  if (diagnosticData === null) {
    content = <p>Loading diagnostic data...</p>; // Show while data is null
  } else if (diagnosticData.length === 0) {
    content = <p>No diagnostic data found.</p>; // Show if data is an empty array
  } else {
    content = <pre>{JSON.stringify(diagnosticData, null, 2)}</pre>;
  }

  // display the content and anything else
  return (
    <div className="App-Page">
      {/* <h2>Diagnostic Data</h2>
      {content} */}

      <h2>The Film Fiends company would like to expand to include sports media, particularly the National Basketball Association (NBA). They would like to create a website that is driven by a relational database that stores user created NBA game reviews. Users can go into the database and review games that they’ve watched so others know what the fun matchups and tense finishes are when they go to watch VODs. Users will also be able to choose their favorite team and player. General information about each game, such as the teams that played and the final score, will also be available to users. The database will store information about teams, games, players, users and ratings. The NBA has 30 teams, each team has 12 players, and each team plays 82 regular season games. The postseason can consist of up to 105 games total among 16 teams. The website should be able to support at least 10,000 users.</h2>
    </div>
  );
}
export default HomePage;
