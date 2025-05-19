import React from 'react';
import { Link } from 'react-router-dom';

const Logo = "/FefnirIRLlogoFull.png";

export default function LibraryPage() {
  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative p-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center mb-6">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2 drop-shadow-[0_0_8px_#8b5cf6]">
              The Incredible Gaming Cinema
            </h1>
            <nav className="flex space-x-6 text-white text-lg font-semibold">
              <Link to="/" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Home</Link>
              <Link to="/completed" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Theater</Link>
              <Link to="/library" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Library</Link>
              <Link to="/backlog" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Backlog</Link>
              <Link to="/faq" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">FAQ</Link>
            </nav>
          </div>
        </div>

        {/* Library Page Placeholder */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">FAQ</h2>
          <p className="mt-4 text-indigo-300">This is a placeholder for the FAQ page. Future development will include search, filtering, and deep dives into every game in the archive.</p>
        </div>
      </div>
    </div>
  );
}
