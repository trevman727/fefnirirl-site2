import { useEffect, useState } from 'react';

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].match(/(?:\"[^\"]*\"|[^,])+/g).map(h => h.replace(/^\"|\"$/g, '').trim());
  const titleIdx = headers.indexOf("To-Do List");
  const platformIdx = headers.indexOf("Platform");
  const etaIdx = headers.indexOf("ETA");

  return lines.slice(1).map((line) => {
    const cells = [];
    let inQuotes = false, cell = '', row = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(cell.trim());
        cell = '';
      } else {
        cell += char;
      }
    }
    row.push(cell.trim());

    const title = row[titleIdx];
    const platform = row[platformIdx];
    const eta = row[etaIdx];
    return title && platform ? { title, platform, eta } : null;
  }).filter(Boolean);
}

export default function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-PLACEHOLDER/pub?output=csv")
      .then((response) => response.text())
      .then((csvText) => setGames(parseCSV(csvText)));
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-red-500 text-center">TAILWIND IS ALIVE</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center w-1/2">Game Title</th>
            <th className="border p-2 text-center w-1/4">Platform</th>
            <th className="border p-2 text-center w-1/4">ETA</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{game.title}</td>
              <td className="border p-2 text-center">{game.platform}</td>
              <td className="border p-2 text-center">{game.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}