// Fully rebuilt LibraryPage with all features and stable filtering
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const Logo = "/FefnirIRLlogoFull.png";
const supabaseUrl = 'https://omydmvrgarquxxapibby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teWRtdnJnYXJxdXh4YXBpYmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTEyMzQsImV4cCI6MjA2MzI2NzIzNH0.jxJOzvcR2Lwjh9FlTEmChNbQq0LaIXUU6R_oxmZ_ipA';
const supabase = createClient(supabaseUrl, supabaseKey);
const insertSecret = 'aslkyfb32189f2fhisald2j!dskfjg#%jksgdf';

function ReviewForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const insertMarkdown = (prefix, suffix) => {
    const textarea = document.getElementById('reviewTextarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = review.substring(start, end);
    const newText = review.slice(0, start) + prefix + selected + suffix + review.slice(end);
    setReview(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !platform || !review || !rating) return;

    const { error } = await supabase
      .from('reviews')
      .insert([{ title, platform, review, rating, secret: insertSecret }]);

    if (error) {
      alert("Submission failed: " + error.message);
    } else {
      alert("Review submitted!");
      onSubmit();
      setTitle('');
      setPlatform('');
      setReview('');
      setRating('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-indigo-800 p-4 rounded-xl shadow-md text-white mb-6 space-y-4">
      <h2 className="text-xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Submit a Review</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Game Title" className="w-full px-3 py-2 rounded bg-indigo-900 text-white" />
      <input type="text" value={platform} onChange={e => setPlatform(e.target.value)} placeholder="Platform" className="w-full px-3 py-2 rounded bg-indigo-900 text-white" />
      <select value={rating} onChange={e => setRating(e.target.value)} className="w-full px-3 py-2 rounded bg-indigo-900 text-white">
        <option value="">Select Rating</option>
        {["1","2","3","4","5"].map(r => <option key={r}>{r}</option>)}
      </select>
      <div>
        <div className="flex gap-2 mb-2">
          <button type="button" onClick={() => insertMarkdown('**', '**')} className="bg-indigo-600 w-10 text-center py-1 rounded text-white font-bold hover:bg-indigo-500">B</button>
          <button type="button" onClick={() => insertMarkdown('*', '*')} className="bg-indigo-600 w-10 text-center py-1 rounded text-white font-bold italic hover:bg-indigo-500">I</button>
          <button type="button" onClick={() => insertMarkdown('[', '](url)')} className="bg-indigo-600 w-10 text-center py-1 rounded text-white font-bold hover:bg-indigo-500">🔗</button>
        </div>
        <textarea id="reviewTextarea" value={review} onChange={e => setReview(e.target.value)} rows={12} className="w-full px-3 py-2 rounded bg-indigo-900 text-white" />
      </div>
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white font-bold">Submit Review</button>
    </form>
  );
}

function ReviewList({ reviews }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  return (
    <div className="space-y-4">
      {(reviews || []).filter(r => r?.title && r?.platform && r?.rating && r?.review).map((r, i) => (
        <div key={i}>
          <div
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            className={`rounded-xl px-4 py-2 transition-all cursor-pointer relative z-10 ring-1 ring-black ring-opacity-30 shadow-[inset_0_0_8px_4px_rgba(0,0,0,0.3)] hover:scale-[103%] ${i % 2 === 0 ? 'bg-indigo-600' : 'bg-indigo-700'}`}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-bold text-white flex-1 text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">
  {r.title}
</h3>
<button
  onClick={(e) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete '${r.title}'?`)) {
      supabase.from('reviews').delete().match({ title: r.title, platform: r.platform, rating: r.rating }).then(() => window.location.reload());
    }
  }}
  className="-translate-x-80 text-sm text-red-300 hover:text-red-500 font-normal"
>
  🗑️
</button>
              <div className="flex justify-center flex-grow -translate-x-20">
                <span
  onClick={(e) => { e.stopPropagation(); setPlatformFilter(r.platform); }}
  className="min-w-[200px] text-center inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-zinc-700 text-white cursor-pointer hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
>
  {r.platform}
</span>
              </div>
              <span
  onClick={(e) => { e.stopPropagation(); setRatingFilter(r.rating); }}
  className={`ml-auto text-center w-16 py-1.5 px-4 rounded-full font-bold text-sm cursor-pointer hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] ${
    r.rating === "1"
      ? "bg-red-500"
      : r.rating === "2"
      ? "bg-orange-400"
      : r.rating === "3"
      ? "bg-yellow-300 text-black"
      : r.rating === "4"
      ? "bg-lime-400 text-black"
      : "bg-green-500 text-black"
  }`}
>
  {r.rating}
</span>
            </div>
          </div>
          {expandedIndex === i && (
            <div className="-mt-6 px-4 pt-10 pb-4 bg-indigo-950 rounded-b-xl relative z-0 -translate-y-6">
              <div className="prose prose-invert max-w-none text-white space-y-4 leading-relaxed pt-6">
                <ReactMarkdown>{r.review}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
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
      .eq('secret', insertSecret)
      .order('created_at', { ascending: false });

    if (!error) {
      console.log("Fetched reviews:", data);
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
      <div className="relative p-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center mb-6">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2">The Incredible Gaming Cinema</h1>
            <nav className="flex space-x-6 text-white text-lg font-semibold">
              <Link to="/" className="hover:text-indigo-300">Home</Link>
              <Link to="/completed" className="hover:text-indigo-300">Theater</Link>
              <Link to="/library" className="hover:text-indigo-300">Library</Link>
              <Link to="/backlog" className="hover:text-indigo-300">Backlog</Link>
              <Link to="/faq" className="hover:text-indigo-300">FAQ</Link>
            </nav>
          </div>
        </div>

        <div className="flex gap-4 mb-6 w-full">
          <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-2/3 px-2 py-1 border rounded bg-indigo-900 text-white" />
          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white">
            <option value="">All Platforms</option>
            {[...new Set(reviews.map(r => r.platform).filter(Boolean))].sort().map((p, i) => <option key={i}>{p}</option>)}
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white">
            <option value="">All Ratings</option>
            {["1","2","3","4","5"].map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={() => { setSearch(''); setPlatformFilter(''); setRatingFilter(''); }} className="w-1/6 px-2 py-1 border rounded bg-indigo-800 text-white">Reset Filters</button>
        </div>

        <ReviewForm onSubmit={fetchReviews} />
        <ReviewList reviews={filtered} />
      </div>
    </div>
  );
}
