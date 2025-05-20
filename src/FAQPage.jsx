import React from 'react';
import { Link } from 'react-router-dom';

const Logo = "/FefnirIRLlogoFull.png";

export default function FAQPage() {
  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative p-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center mb-6">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2 drop-shadow-[0_0_8px_#8b5cf6]">
              Director's Commentary
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

        {/* FAQ Content */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">Frequently Asked Questions</h2>
          <p className="mt-4 text-indigo-300 text-xl font-bold drop-shadow-[2px_2px_3px_#000]">In case you were wondering...</p>

          <div className="mt-8 space-y-6 text-left max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🎮 What is the purpose of this site?</h3>
              <p className="mt-1 text-white">After years of gaming, I wanted something to show for it, and decided to compile a cinematic and historical archive of every game I play to completion, publishing it for the world to see.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">📽️ Why are there no voiceovers or commentary?</h3>
              <p className="mt-1 text-white">Because I'm not the star — the games are. I'm simply the director, providing you with a stream-lined cinematic experience, free from distractions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🎬 Can I use your footage for things like reviews or video essays?</h3>
              <p className="mt-1 text-white">Absolutely! I'm more than happy to provide that for people. All I ask is that it's not a re-upload in its entirety and that you give me a small credit in the video description.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🕹️ What counts as a "completed" game?</h3>
              <p className="mt-1 text-white">Generally, reaching the credits. If there are multiple endings, I will typically try and pick what feels like canon.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🎯 How do you choose what to play next?</h3>
              <p className="mt-1 text-white">It depends! A lot of the time, I'll pick something up that has been calling my name for a while, but in the rare event that there aren't any, I'll take a deep dive through the backlog and hunt one down.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">📝 Can I suggest a game?</h3>
              <p className="mt-1 text-white">
                Absolutely! I'm always open to recommendations. <a href="https://forms.gle/GnoB7mcpQ5c61XbH8" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline hover:text-indigo-400">You can do so here</a>!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🔁 Do you replay games you've finished off-screen?</h3>
              <p className="mt-1 text-white">These days, the first play of anything is going on the channel. A lot of the games featured are ones I played before starting this endeavor. It's very rare I replay a game already on the channel, but if I did, it would be unrecorded.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">💾 Do you use emulators?</h3>
              <p className="mt-1 text-white">I will use any and all tools at my disposal to capture a game I'd like to play. Sometimes, that's easier said than done, but at the end of the day, I want to play what I want to play.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">📅 How often do you upload?</h3>
              <p className="mt-1 text-white">A new cinematic playthrough is published every Friday at noon CST! I'm constantly editing and making new videos of games I play; I just queue them up to come out once a week, and luckily I tend to play at a faster pace than that.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">📡 Will you ever stream or provide commentary?</h3>
              <p className="mt-1 text-white">If there was an audience for it, I'd love to stream. My main pursuit is the cinematic recordings though, so I'd need a second PC for streaming to leave my primary machine open for recording the raw gameplay without any cameras or voiceovers.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 drop-shadow-[0_0_2px_#8b5cf6]">🎭 You're so cool! Where can I follow you?</h3>
              <p className="mt-1 text-white">
                You can find me on <a href="https://www.youtube.com/@FefnirIRL" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline hover:text-indigo-400">YouTube</a> and <a href="https://store.steampowered.com/curator/41643049/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline hover:text-indigo-400">Steam</a>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
