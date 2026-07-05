"use client";

import { useState } from "react";
import { getYouTubeId } from "./youtube";

export default function TestimonialCard({
  num,
  name,
  role,
  quote,
  theme,
  video,
}: {
  num: string;
  name: string;
  role: string;
  quote: string;
  theme: string;
  video: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(video);

  if (playing && videoId) {
    return (
      <article className={`work-card testimonial-card work-card-playing ${theme}`}>
        <iframe
          className="work-video"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${name} testimonial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <button
          className="work-close"
          onClick={() => setPlaying(false)}
          aria-label={`Close ${name} testimonial video`}
        >
          ✕
        </button>
      </article>
    );
  }

  return (
    <article
      className={`work-card testimonial-card ${theme} ${
        videoId ? "work-card-has-video" : ""
      }`}
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
      <span className="work-tag">Client {num}</span>
      <div className="work-meta">
        <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      {videoId && (
        <span className="work-play" aria-hidden="true">
          ▶
        </span>
      )}
    </article>
  );
}
