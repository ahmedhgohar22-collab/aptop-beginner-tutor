import type { TopicVideo } from '../content/videos';

interface Props {
  videos: TopicVideo[];
}

export function TopicVideos({ videos }: Props) {
  if (videos.length === 0) return null;

  return (
    <div className="topic-videos">
      <p className="video-intro">
        Detailed explanatory videos from Eric Hehner’s free course{' '}
        <em>Formal Methods of Software Design</em> (same book/theory). Watch in order, then use
        transcript/visuals PDFs while you study.
      </p>
      {videos.map((v) => (
        <article key={v.id} className="video-card">
          <header>
            <h3>{v.title}</h3>
            <p className="video-meta">
              {v.duration} · {v.topic}
            </p>
          </header>
          <p>{v.whyWatch}</p>
          <div className="video-frame">
            <video controls preload="metadata" src={v.videoUrl}>
              <a href={v.videoUrl}>Download / open video</a>
            </video>
          </div>
          <div className="video-links">
            <a href={v.videoUrl} target="_blank" rel="noreferrer">
              Open MP4
            </a>
            <a href={v.transcriptUrl} target="_blank" rel="noreferrer">
              Transcript PDF
            </a>
            <a href={v.visualsUrl} target="_blank" rel="noreferrer">
              Visuals PDF
            </a>
          </div>
        </article>
      ))}
      <p className="note">
        Source:{' '}
        <a href="https://www.cs.toronto.edu/~hehner/FMSD/" target="_blank" rel="noreferrer">
          cs.toronto.edu/~hehner/FMSD
        </a>
        . Videos stream from the university site (needs internet).
      </p>
    </div>
  );
}
