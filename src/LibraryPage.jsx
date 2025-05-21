// View-only LibraryPage with Supabase review display (aligned with Completed Page)
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const Logo = "/FefnirIRLlogoFull.png";
const supabaseUrl = 'https://omydmvrgarquxxapibby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teWRtdnJnYXJxdXh4YXBpYmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTEyMzQsImV4cCI6MjA2MzI2NzIzNH0.jxJOzvcR2Lwjh9FlTEmChNbQq0LaIXUU6R_oxmZ_ipA';
const supabase = createClient(supabaseUrl, supabaseKey);

function ReviewList({ reviews, setPlatformFilter, setRatingFilter }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
      <span
        onClick={(e) => { e.stopPropagation(); setPlatformFilter(platform); }}
        className={`ml-14 ${base} ${color}`}
      >
        {platform}
      </span>
    );
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 text-white font-bold ring-2 ring-white ring-opacity-50 mt-2 mb-2">
        <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">Game</span>
        <span className="w-36 text-center -ml-12 font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">Rating</span>
        <span className="min-w-[96px] text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">Platform</span>
      </div>

      <div className="space-y-2">
        {(reviews || []).filter(r => r?.title && r?.platform && r?.rating && r?.review).map((r, i) => (
          <div key={i}>
            <div
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className={`relative flex justify-between items-center px-4 py-2 rounded-xl transition-all duration-100 cursor-pointer ${i % 2 === 0 ? 'bg-indigo-600' : 'bg-indigo-700'} ring-1 ring-black ring-opacity-30 hover:scale-[103%] shadow-[inset_0_0_8px_4px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_0_14px_rgba(139,92,246,0.75)]`}
            >
              <span className="w-1/2 text-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">{r.title}</span>
              <span
                onClick={(e) => { e.stopPropagation(); setRatingFilter(r.rating); }}
                className={`text-center w-16 py-0 px-1 rounded-full font-bold text-sm cursor-pointer hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] ${
        r.rating === "1" ? "bg-red-500" :
        r.rating === "2" ? "bg-orange-400" :
        r.rating === "3" ? "bg-yellow-300" :
        r.rating === "4" ? "bg-lime-400" :
        "bg-green-500"
      }`}
              >
                <span className="text-black px-2 py-0.5 rounded-full inline-block">{r.rating}</span>
              </span>
              {renderPlatformBadge(r.platform)}
            </div>
            {expandedIndex === i && (
              <div className="-mt-4 px-4 pt-10 pb-4 bg-indigo-950 text-sm rounded-b-xl w-full">
                <div className="prose prose-invert max-w-none text-white space-y-4 leading-relaxed pt-0"><ReactMarkdown>{r.review}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default function LibraryPage() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('title, platform, review, rating, created_at')
      .order('created_at', { ascending: false });

    if (!error) {
      const sorted = [...data]
        .filter(r => r?.title && r?.platform)
        .sort((a, b) => a.title.localeCompare(b.title));
      setReviews(sorted);
    } else {
      console.error('Failed to fetch:', error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filtered = reviews.filter(r =>
    r.title?.toLowerCase().includes(search.toLowerCase()) &&
    (!platformFilter || r.platform === platformFilter) &&
    (!ratingFilter || r.rating === ratingFilter)
  );

  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative pt-6 px-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center mb-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2 drop-shadow-[0_0_8px_#8b5cf6]">The Review Repository</h1>
            <nav className="flex space-x-6 text-white text-lg font-semibold">
              <Link to="/" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Home</Link>
              <Link to="/completed" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Theater</Link>
              <Link to="/library" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Library</Link>
              <Link to="/backlog" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Backlog</Link>
              <Link to="/faq" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">FAQ</Link>
            </nav>
          </div>
        </div>

        <div className="flex gap-4 mb-4 mt-2 w-full">
          <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-2/3 px-2 py-1 border rounded bg-indigo-900 text-white focus:outline-none focus:ring focus:ring-indigo-400" />
          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400">
            <option value="">All Platforms</option>
            {[...new Set(reviews.map(r => r.platform).filter(Boolean))].sort().map((p, i) => <option key={i}>{p}</option>)}
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white">
            <option value="">All Ratings</option>
            {["1","2","3","4","5"].map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={() => { setSearch(''); setPlatformFilter(''); setRatingFilter(''); }} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white">Reset Filters</button>
        </div>

        <ReviewList reviews={filtered} setPlatformFilter={setPlatformFilter} setRatingFilter={setRatingFilter} />
      </div>
    </div>
  );
}
