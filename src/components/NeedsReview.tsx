import { Link } from 'react-router-dom';
import { contentById, lectures } from '../content/course';
import type { ProgressState } from '../progress';

interface Props {
  progress: ProgressState;
}

export function NeedsReview({ progress }: Props) {
  const catalog = [
    ...lectures.map((l) => ({ id: l.id, label: `${l.number}: ${l.title}`, path: `/lecture/${l.id}` })),
    { id: 'notation', label: 'Tools: Notation tools', path: '/notation' },
  ];

  const items = progress.needsReview.map((cardId) => {
    for (const lec of catalog) {
      const content = contentById[lec.id];
      const card = content?.cards.find((c) => c.id === cardId);
      if (card) {
        return { cardId, title: card.title, path: lec.path, lectureLabel: lec.label };
      }
    }
    return { cardId, title: cardId, path: '/', lectureLabel: 'Unknown' };
  });

  return (
    <div className="page">
      <Link to="/" className="back">
        ← Timetable
      </Link>
      <h1>Needs review</h1>
      <p>Cards where you used Show me or failed twice.</p>
      {items.length === 0 ? (
        <p className="feedback ok">Nothing queued — keep going.</p>
      ) : (
        <ul className="miss-list">
          {items.map((item) => (
            <li key={item.cardId}>
              <Link to={item.path}>
                {item.lectureLabel} — {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
