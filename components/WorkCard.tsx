"use client";

import { useState } from "react";

// Accepts any common YouTube URL format and extracts the video ID:
// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function WorkCard({
  tag,
  title,
  client,
  theme,
  video,
}: {
  tag: string;
  title: string;
  client: string;
  theme: string;
  video: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(video);

  if (playing && videoId) {
    return (
      <article className={`work-card work-card-playing ${theme}`}>
        <iframe
          className="work-video"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <button
          className="work-close"
          onClick={() => setPlaying(false)}
          aria-label={`Close ${title} video`}
        >
          ✕
        </button>
      </article>
    );
  }

  return (
    <article
      className={`work-card ${theme} ${videoId ? "work-card-has-video" : ""}`}
      onClick={() => videoId && setPlaying(true)}
      role={videoId ? "button" : undefined}
      tabIndex={videoId ? 0 : undefined}
      onKeyDown={(e) => {
        if (videoId && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setPlaying(true);
        }
      }}
    >
      <div className="work-card-glow" />
      <span className="work-tag">{tag}</span>
      <div className="work-meta">
        <h3>{title}</h3>
        <p>{client}</p>
      </div>
      {videoId && (
        <span className="work-play" aria-hidden="true">
          ▶
        </span>
      )}
    </article>
  );
}
