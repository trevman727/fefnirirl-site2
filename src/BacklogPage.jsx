import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = "/FefnirIRLlogoFull.png";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].match(/(?:\"[^\"]*\"|[^,])+/g).map(h => h.replace(/^\"|\"$/g, '').trim());

  const titleIdx = headers.indexOf("To-Do List");
  const platformIdx = headers.indexOf("Platform");
  const etaIdx = headers.indexOf("ETA");
  const linkIdx = headers.indexOf("Link");

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

    let title = row[titleIdx];
    let platform = row[platformIdx];
    const eta = row[etaIdx];
    const link = linkIdx !== -1 ? row[linkIdx] : null;

    if (["Steam", "Epic", "GOG"].includes(platform)) platform = "PC";

    return title && platform ? { title, platform, eta: parseFloat(eta) || eta, link } : null;
  }).filter(Boolean);
}

export default function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [platformFilter, setPlatformFilter] = useState('');
  const [etaFilter, setEtaFilter] = useState('');

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQl-uq15d9tWkMBCpAG6JHXQekuaX8Az2yqO2xrr4WvqaKOm-2YD5VI21ov6paz6YezKWxMmlYsQfer/pub?output=csv")
      .then((response) => response.text())
      .then((csvText) => setGames(parseCSV(csvText)));
  }, []);

  const platforms = Array.from(new Set(games.map(game => game.platform))).sort();
  const etaRanges = [
    { label: "0–10 hrs", min: 0, max: 10 },
    { label: "11–20 hrs", min: 11, max: 20 },
    { label: "21–30 hrs", min: 21, max: 30 },
    { label: "31–40 hrs", min: 31, max: 40 },
    { label: "41–50 hrs", min: 41, max: 50 },
    { label: "51–60 hrs", min: 51, max: 60 },
    { label: "61–70 hrs", min: 61, max: 70 }
  ];

  const nowPlayingGames = games.filter(g => g.title.endsWith('*')).map(g => ({ ...g, title: g.title.replace(/\*+$/, '') }));
  const filteredGames = games
    .filter(game => !game.title.endsWith('*'))
    .filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
    .filter(game => (platformFilter ? game.platform === platformFilter : true))
    .filter(game => {
      if (!etaFilter) return true;
      const [min, max] = etaFilter.split('-').map(Number);
      return game.eta >= min && game.eta <= max;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handlePlatformBadgeClick = (platform) => {
    setPlatformFilter(platformFilter === platform ? '' : platform);
    setSortKey('platform');
    setSortAsc(true);
  };

  const resetFilters = () => {
    setSearch('');
    setPlatformFilter('');
    setEtaFilter('');
  };

  const renderGameRow = (game, index, bgClass, glowClass) => (
    <div
      key={index}
      className={`relative flex justify-between px-4 py-2 rounded-xl text-white transition-all duration-100 hover:scale-[103%]
        ${bgClass} shadow-[inset_0_0_8px_4px_rgba(0,0,0,0.3)]
        before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:z-[-1] hover:before:opacity-100 ${glowClass}`}
    >
      <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
        {game.link ? (
          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:font-semibold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          >
            {game.title}
          </a>
        ) : (
          <span>{game.title}</span>
        )}
      </span>
      <span
        onClick={() => handlePlatformBadgeClick(game.platform)}
        className={`w-1/4 text-center inline-block px-2 py-1 rounded-full text-sm font-semibold cursor-pointer transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
          ${
            game.platform === "PS1" ? "bg-blue-300 text-black" :
            game.platform === "PS2" ? "bg-blue-400 text-white" :
            game.platform === "PSP" ? "bg-blue-500 text-white" :
            game.platform === "PS3" ? "bg-blue-600 text-white" :
            game.platform === "PS4" ? "bg-blue-700 text-white" :
            game.platform === "PS5" ? "bg-blue-800 text-white" :
            game.platform === "GB" ? "bg-violet-300 text-black" :
            game.platform === "Nintendo 64" ? "bg-violet-400 text-white border border-white border-opacity-30" :
            game.platform === "GBC" ? "bg-violet-400 text-white" :
            game.platform === "GBA" ? "bg-violet-500 text-white" :
            game.platform === "GameCube" ? "bg-violet-600 text-white" :
            game.platform === "DS" ? "bg-violet-700 text-white" :
            game.platform === "3DS" ? "bg-violet-800 text-white" :
            game.platform === "Wii" ? "bg-violet-900 text-white" :
            game.platform === "Switch" ? "bg-purple-950 text-white" :
            game.platform === "PC" ? "bg-zinc-700 text-white" :
            "bg-gray-500 text-white"
          }`}
      >
        {game.platform}
      </span>
      <span className="w-1/4 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">{game.eta}</span>
    </div>
  );

  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative p-6 max-w-5xl mx-auto text-black dark:text-white">
        <div className="absolute top-0 left-0 w-full h-[280px] z-0 pointer-events-none">
          <div className="absolute left-0 top-0 w-40 h-40 drop-shadow-[0_0_60px_#facc15] z-[-1]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2">The Eternal Backlog</h1>
              <nav className="flex space-x-6 text-white text-lg font-semibold">
  <Link to="/" className="hover:text-indigo-300 transition-all drop-shadow-[0_0_8px_#8b5cf6]">Home</Link>
  <Link to="/completed" className="hover:text-indigo-300 transition-all drop-shadow-[0_0_8px_#8b5cf6]">Theater</Link>
  <Link to="/library" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Library</Link>
  <Link to="/backlog" className="hover:text-indigo-300 transition-all drop-shadow-[0_0_8px_#8b5cf6]">Backlog</Link>
  <Link to="/faq" className="hover:text-indigo-300 transition-all drop-shadow-[0_0_8px_#8b5cf6]">FAQ</Link>
</nav>
            </div>
          </div>

          <div className="flex gap-4 mb-4 w-full">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-2/3 px-2 py-1 border rounded bg-indigo-900 text-white focus:outline-none focus:ring focus:ring-indigo-400"
            />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            >
              <option value="">All Platforms</option>
              {platforms.map((platform, i) => (
                <option key={i} value={platform}>{platform}</option>
              ))}
            </select>
            <select
              value={etaFilter}
              onChange={(e) => setEtaFilter(e.target.value)}
              className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            >
              <option value="">All ETAs</option>
              {etaRanges.map((range, i) => (
                <option key={i} value={`${range.min}-${range.max}`}>{range.label}</option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            >
              Reset Filters
            </button>
          </div>

          <div className="w-full">
            {nowPlayingGames.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2 drop-shadow-[0_0_8px_#8b5cf6]">Now Playing</h2>
                <div className="space-y-2">
                  {nowPlayingGames.map((game, index) => renderGameRow(game, index, 'bg-teal-600', 'hover:before:shadow-[0_0_14px_rgba(147,197,253,0.9)]'))}
                </div>
              </div>
            )}

            <div className="flex justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 text-white font-bold ring-2 ring-white ring-opacity-50">
              <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">Game</span>
              <span className="w-1/4 text-center cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)] transition-all hover:font-semibold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" onClick={() => handleSort("platform")}
              >
                Platform {sortKey === "platform" ? (sortAsc ? "▲" : "▼") : ""}
              </span>
              <span className="w-1/4 text-center cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)] transition-all hover:font-semibold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" onClick={() => handleSort("eta")}
              >
                ETA {sortKey === "eta" ? (sortAsc ? "▲" : "▼") : ""}
              </span>
            </div>

            <div className="space-y-2 mt-2">
              {filteredGames.map((game, index) => renderGameRow(game, index, index % 2 === 0 ? 'bg-indigo-600' : 'bg-indigo-700', 'hover:before:shadow-[0_0_14px_rgba(139,92,246,0.75)]'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
