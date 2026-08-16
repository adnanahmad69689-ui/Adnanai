/**
 * YouTube section: two opposite-direction marquee rows of video cards
 * (duplicated content for a seamless loop), plus a subscribe CTA.
 */
import { siteConfig } from "../data/siteConfig";
import { videos, type Video } from "../data/videos";

function VideoCard({ video }: { video: Video }) {
  return (
    <a
      className="youtube-card"
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="yt-thumb-container">
        <img alt={video.title} className="yt-thumb" loading="lazy" src={video.thumb} />
        <span className="yt-duration">{video.duration}</span>
        <div className="yt-play-overlay">
          <div className="yt-play-button">
            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="yt-info">
        <h3 className="yt-card-title">{video.title}</h3>
        <div className="yt-insights">
          <span className="yt-views">👁 {video.views} views</span>
          <span className="yt-likes">📅 {video.date}</span>
        </div>
      </div>
    </a>
  );
}

export function YouTube() {
  const { youtube } = siteConfig;
  const rowA = videos.slice(0, 5);
  const rowB = videos.slice(5);
  return (
    <section id="youtube" className="youtube-section">
      <div className="youtube-bg-glow-orb" />
      <div className="youtube-container">
        <div className="reveal-item yt-header-block">
          <span className="section-label">{youtube.label}</span>
          <h2 className="youtube-heading">
            {youtube.headingLead} <em>{youtube.headingEm}</em> {youtube.headingTail}
          </h2>
          <p className="youtube-subtitle">{youtube.subtitle}</p>
        </div>
        <div className="youtube-showcase-wrapper reveal-item">
          <div className="marquee-track left-to-right">
            <div className="marquee-content">
              {[...rowA, ...rowA].map((v, i) => (
                <VideoCard key={`a-${i}`} video={v} />
              ))}
            </div>
          </div>
          <div className="marquee-track right-to-left">
            <div className="marquee-content">
              {[...rowB, ...rowB].map((v, i) => (
                <VideoCard key={`b-${i}`} video={v} />
              ))}
            </div>
          </div>
        </div>
        <div className="yt-show-more-container reveal-item">
          <a
            className="show-more-button"
            href={youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            ✦ {youtube.showMoreLabel}
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" style={{ marginLeft: 8 }} viewBox="0 0 24 24" width="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

