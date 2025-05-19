// completed page with review links below embedded video (fixed syntax)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = "/FefnirIRLlogoFull.png";

function parseCompletedCSV(text) {
  const lines = text.trim().split("\n");
  const parseCSVLine = (line) => {
    const cells = [];
    let inQuotes = false, cell = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(cell.trim());
        cell = '';
      } else {
        cell += char;
      }
    }
    cells.push(cell.trim());
    return cells.map(cell => cell.replace(/^"|"$/g, ''));
  };

  const headers = parseCSVLine(lines[0]);
  const getIndex = (label) => headers.findIndex(h => h.trim() === label);
  const titleIdx = getIndex("Completed");
  const platformIdx = getIndex("Platform2");
  const dateIdx = getIndex("Date Completed");
  const linkIdx = getIndex("Link2");
  const youtubeIdx = getIndex("YouTube");
  const ratingIdx = getIndex("Rating");
  const reviewIdx = getIndex("Review") !== -1 ? getIndex("Review") : null;

  return lines.slice(1).map((line) => {
    const row = parseCSVLine(line);
    const title = row[titleIdx];
    let platform = row[platformIdx];
    const date = row[dateIdx];
    const link = row[linkIdx];
    const youtube = row[youtubeIdx];
    const rating = row[ratingIdx];
    const review = reviewIdx !== null ? row[reviewIdx] : null;
    if (["Steam", "Epic", "GOG"].includes(platform)) platform = "PC";
    return title && platform ? { title, platform, date, link, youtube, rating, review } : null;
  }).filter(Boolean);
}

export default function CompletedPage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [platformFilter, setPlatformFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQl-uq15d9tWkMBCpAG6JHXQekuaX8Az2yqO2xrr4WvqaKOm-2YD5VI21ov6paz6YezKWxMmlYsQfer/pub?output=csv")
      .then((res) => res.text())
      .then((csv) => setGames(parseCompletedCSV(csv)));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
    setExpandedIndex(null);
  };

  const handleRowClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePlatformBadgeClick = (platform) => {
    setPlatformFilter(platformFilter === platform ? '' : platform);
    setSortKey('platform');
    setSortAsc(true);
    setExpandedIndex(null);
  };

  const renderRatingBadge = (rating) => {
    const base = "text-center w-36 py-1 px-2 rounded-full font-bold text-sm cursor-pointer";
    const color =
      rating === "1" ? "bg-red-500" :
      rating === "2" ? "bg-orange-400" :
      rating === "3" ? "bg-yellow-300" :
      rating === "4" ? "bg-lime-400" :
      rating === "5" ? "bg-green-500" :
      "bg-gray-500";
    return (
      <span className={`${base} ${color}`}>
        <span className="text-black px-2 py-0.5 rounded-full inline-block">{rating}</span>
      </span>
    );
  };

  const renderPlatformBadge = (platform) => {
    const base = "min-w-[96px] text-center inline-block px-2 py-1 rounded-full text-sm font-semibold cursor-pointer transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]";
    const color =
      platform === "PS1" ? "bg-blue-300 text-black" :
      platform === "PS2" ? "bg-blue-400 text-white" :
      platform === "PSP" ? "bg-blue-500 text-white" :
      platform === "PS3" ? "bg-blue-600 text-white" :
      platform === "PS4" ? "bg-blue-700 text-white" :
      platform === "PS5" ? "bg-blue-800 text-white" :
      platform === "GB" ? "bg-violet-300 text-black" :
      platform === "Nintendo 64" ? "bg-violet-400 text-white border border-white border-opacity-30" :
      platform === "GBC" ? "bg-violet-400 text-white" :
      platform === "GBA" ? "bg-violet-500 text-white" :
      platform === "GameCube" ? "bg-violet-600 text-white" :
      platform === "DS" ? "bg-violet-700 text-white" :
      platform === "3DS" ? "bg-violet-800 text-white" :
      platform === "Wii" ? "bg-violet-900 text-white" :
      platform === "Switch" ? "bg-purple-950 text-white" :
      platform === "PC" ? "bg-zinc-700 text-white" :
      "bg-gray-500 text-white";
    return (
      <span onClick={(e) => { e.stopPropagation(); handlePlatformBadgeClick(platform); }} className={`ml-14 ${base} ${color}`}>
        {platform}
      </span>
    );
  };

  const filteredGames = games
    .filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
    .filter(game => (!platformFilter || game.platform === platformFilter))
    .filter(game => (!ratingFilter || game.rating === ratingFilter));

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] ?? '';
    const bVal = b[sortKey] ?? '';
    return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const extractYouTubeId = (url) => {
    const match = url?.match(/[?&]v=([^&#]*)/) || url?.match(/youtu\.be\/([^?&#]*)/);
    return match ? match[1] : null;
  };

  // ... (no changes to badges or filters)

  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative p-6 max-w-5xl mx-auto text-white">
  <div className="flex items-center mb-6">
    <Link to="/">
      <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
    </Link>
    <div>
      <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2 drop-shadow-[0_0_8px_#8b5cf6]">The Incredible Gaming Cinema</h1>
      <nav className="flex space-x-6 text-white text-lg font-semibold">
  <Link to="/" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Home</Link>
  <Link to="/completed" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Theater</Link>
  <Link to="/library" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Library</Link>
  <Link to="/backlog" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Backlog</Link>
  <Link to="/faq" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">FAQ</Link>
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
    {[...new Set(games.map(game => game.platform))].sort().map((platform, i) => (
      <option key={i} value={platform}>{platform}</option>
    ))}
  </select>
  <select
    value={ratingFilter}
    onChange={(e) => setRatingFilter(e.target.value)}
    className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
  >
    <option value="">All Ratings</option>
    {["1", "2", "3", "4", "5"].map(r => <option key={r} value={r}>{r}</option>)}
  </select>
  <button
    onClick={() => {
      setPlatformFilter('');
      setRatingFilter('');
      setSearch('');
      setSortKey(null);
      setExpandedIndex(null);
    }}
    className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
  >
    Reset Filters
  </button>
</div>
        {/* ...header and filters unchanged... */}

        <div className="space-y-2 mt-2">
  <div className="flex justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 text-white font-bold ring-2 ring-white ring-opacity-50">
    <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">Game</span>
    <span
      onClick={() => handleSort('rating')}
      className="w-36 text-center -ml-12 cursor-pointer font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)] transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
    >
      Rating {sortKey === 'rating' ? (sortAsc ? '▲' : '▼') : ''}
    </span>
    <span
      onClick={() => handleSort('platform')}
      className="min-w-[96px] text-center cursor-pointer font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)] transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
    >
      Platform {sortKey === 'platform' ? (sortAsc ? '▲' : '▼') : ''}
    </span>
    <span
      onClick={() => handleSort('date')}
      className="w-1/4 text-center cursor-pointer font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)] transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
    >
      Date Completed {sortKey === 'date' ? (sortAsc ? '▲' : '▼') : ''}
    </span>
  </div>
          {/* ...header row unchanged... */}

          {sortedGames.map((game, index) => {
            const youTubeId = extractYouTubeId(game.youtube);
            return (
              <div key={index}>
                <div onClick={() => handleRowClick(index)} className={`relative flex justify-between items-center px-4 py-2 rounded-xl transition-all duration-100 cursor-pointer ${index % 2 === 0 ? 'bg-indigo-600' : 'bg-indigo-700'} ring-1 ring-black ring-opacity-30 hover:scale-[103%] shadow-[inset_0_0_8px_4px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_0_14px_rgba(139,92,246,0.75)]`}>
                  <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">{game.link ? <a href={game.link}$1 className="hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-bold drop-shadow-[0_0_8px_#8b5cf6]">{game.title}</a> : game.title}
                  </span>
                  <span className="w-12 text-center ml-2 transition-all hover:font-bold hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] cursor-pointer">
                    {renderRatingBadge(game.rating)}
                  </span>
                  {renderPlatformBadge(game.platform)}
                  <span className="w-1/4 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">{game.date}</span>
                </div>
                {expandedIndex === index && (
                  <div className="-mt-4 px-4 pt-10 pb-4 bg-indigo-950 text-sm rounded-b-xl w-full">
                    {youTubeId ? (
                      <>
                        <div className="aspect-video w-full max-w-2xl mx-auto">
                          <iframe
                            className="rounded-xl w-full h-full"
                            src={`https://www.youtube.com/embed/${youTubeId}`}
                            title={game.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        {game.review && (game.review !== "--" ? (
  <p className="text-center mt-4">
    <a
      href={game.review}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-300 underline font-bold hover:text-indigo-100 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] transition"
    >
      Read the full review here
    </a>
  </p>
) : (
  <p className="text-center mt-4 italic text-indigo-300">
    No review currently available. Please come back later!
  </p>
))}
                      </>
                    ) : game.youtube ? (
                      <>
                        <div className="w-full max-w-2xl mx-auto text-center">
                          <a href={game.youtube} target="_blank" rel="noopener noreferrer">
                            <img src={`https://img.youtube.com/vi/${youTubeId}/0.jpg`} alt="YouTube Thumbnail" className="rounded-xl w-full" />
                            <p className="text-indigo-300 mt-2 underline">Watch on YouTube</p>
                          </a>
                        </div>
                        {game.review && (
                          <p className="text-center mt-4">
                            <a href={game.review} target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline hover:text-indigo-100 transition">
                              Read the full review here
                            </a>
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-indigo-300 italic">No video available for this game.</p>
                        {game.review && (
                          <p className="text-center mt-4">
                            <a href={game.review} target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline hover:text-indigo-100 transition">
                              Read the full review here
                            </a>
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
