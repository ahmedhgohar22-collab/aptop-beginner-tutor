import { Link } from 'react-router-dom';
import { COURSE_META, daysUntil, lectures, contentById } from '../content/course';
import { videosByLecture } from '../content/videos';
import type { ProgressState } from '../progress';

interface Props {
  progress: ProgressState;
}

export function LectureMap({ progress }: Props) {
  const midtermDays = daysUntil(COURSE_META.midtermDate);
  const reviewDays = daysUntil(COURSE_META.reviewDate);

  return (
    <div className="lecture-map">
      <header className="hero-panel">
        <p className="eyebrow">Beginner interactive tutor</p>
        <h1>{COURSE_META.book}</h1>
        <p className="sub">
          {COURSE_META.edition} edition · follow your lecture timetable · learn by doing
        </p>
        <div className="countdowns">
          <div>
            <span className="label">Midterm 22/11</span>
            <strong>
              {midtermDays > 0 ? `${midtermDays} days` : midtermDays === 0 ? 'Today' : 'Passed'}
            </strong>
          </div>
          <div>
            <span className="label">Review 3/1</span>
            <strong>
              {reviewDays > 0 ? `${reviewDays} days` : reviewDays === 0 ? 'Today' : 'Passed'}
            </strong>
          </div>
        </div>
        <div className="hero-actions">
          <Link className="primary link-btn" to="/midterm">
            Midterm practice
          </Link>
          <Link className="link-btn ghost" to="/notation">
            Notation tools
          </Link>
          <Link className="link-btn ghost" to="/review">
            Needs review
          </Link>
          <Link className="link-btn ghost" to="/settings">
            Settings
          </Link>
        </div>
      </header>

      <ul className="timetable">
        {lectures.map((lec) => {
          const content = contentById[lec.id];
          const guideTotal = content?.guides?.length ?? 0;
          const cardTotal = content?.cards.length ?? 0;
          const total = guideTotal + cardTotal;
          const done = content
            ? [...(content.guides ?? []), ...content.cards].filter((c) =>
                progress.completedCards.includes(c.id),
              ).length
            : 0;
          const videoCount = videosByLecture[lec.id]?.length ?? 0;
          const finished = progress.lectureDone.includes(lec.id);
          return (
            <li key={lec.id}>
              <Link to={`/lecture/${lec.id}`} className="timetable-row">
                <div className="date">{lec.dateLabel}</div>
                <div className="meta">
                  <div className="title-row">
                    <strong>
                      {lec.number}: {lec.title}
                    </strong>
                    {lec.midterm && <span className="badge midterm">Midterm</span>}
                    {videoCount > 0 && (
                      <span className="badge">{videoCount} videos</span>
                    )}
                    {finished && <span className="badge done">Done</span>}
                  </div>
                  <span className="sections">{lec.sections}</span>
                  {lec.note && <span className="note">{lec.note}</span>}
                  <div className="progress-bar">
                    <div
                      className="fill"
                      style={{ width: total ? `${(done / total) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="progress-label">
                    {done}/{total} guide+cards
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
