import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = "/FefnirIRLlogoFull.png";
const UPLOADS_PLAYLIST_ID = "UUxfih7ZnBDEFf70y6jPk7ng"; // derived from your channel ID
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // ensure this is set in your .env file

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=50&key=${YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        console.log("YouTube API response:", data);
        const validVideos = (data.items || []).filter(item => {
  const isValid = item.snippet && item.snippet.resourceId?.videoId;
  const isShort = item.snippet.title.toLowerCase().includes("#gaming");
  return isValid && !isShort;
});
        setVideos(validVideos.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="bg-[linear-gradient(to_right,_#111827,_#1f2937_30%,_#1f2937_70%,_#111827)] min-h-screen">
      <div className="relative p-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center mb-3">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-40 h-40 mr-6 drop-shadow-[0_0_30px_#facc15]" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_14px_#8b5cf6] mb-2 drop-shadow-[0_0_8px_#8b5cf6]">The Man, the Myth, the Gamer</h1>
            <nav className="flex space-x-6 text-white text-lg font-semibold">
              <Link to="/" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Home</Link>
              <Link to="/completed" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Theater</Link>
              <Link to="/library" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Library</Link>
              <Link to="/backlog" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">Backlog</Link>
              <Link to="/faq" className="text-white transition-all drop-shadow-[0_0_8px_#8b5cf6] hover:text-indigo-300">FAQ</Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold drop-shadow-[0_0_10px_rgba(139,92,246,0.75)] mb-8">What's New?</h2>
          <div className="grid grid-cols-1 gap-8 items-center justify-items-center">
            {videos.map((video, index) => {
              const vid = video.snippet.resourceId.videoId;
              const title = video.snippet.title;
              const description = video.snippet.description.split(/\n\s*\n/)[0];

              const date = new Date(video.snippet.publishedAt).toLocaleDateString();
              const channel = video.snippet.channelTitle;
              const backgroundColor = index % 2 === 0 ? 'bg-indigo-900' : 'bg-indigo-800';

              return (
                <div key={vid} className={`rounded-xl shadow-lg p-4 transition-all w-[85%] relative hover:drop-shadow-[0_0_14px_rgba(139,92,246,0.75)] hover:scale-[1.03] ${backgroundColor}`}>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-full md:w-1/2 max-w-md">
                      <div className="aspect-video w-full">
                        <iframe
                          className="rounded-md w-full h-full"
                          src={`https://www.youtube.com/embed/${vid}`}
                          title={title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                    <div className="text-left w-full md:w-1/2">
                      <h3 className="text-lg font-bold text-indigo-100 mb-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
  <a href={`https://www.youtube.com/watch?v=${vid}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
    {title}
  </a>
</h3>
                      <div className="absolute bottom-4 right-6 text-sm font-bold text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
                        {date}
                      </div>

                      <p className="text-sm text-indigo-200 whitespace-pre-line">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
