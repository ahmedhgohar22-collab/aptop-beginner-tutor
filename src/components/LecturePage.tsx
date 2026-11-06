import { Link, useParams } from 'react-router-dom';
import { contentById, getLecture } from '../content/course';
import { printablesByLecture } from '../content/printables';
import { explainersByLecture, videosByLecture } from '../content/videos';
import type { ProgressState } from '../progress';
import { AnimatedExplainers } from './AnimatedExplainers';
import { CardChain } from './CardChain';
import { ProofStepper } from './ProofStepper';
import { Drill } from './Drill';
import { PrintableDownloads } from './PrintableDownloads';
import { StudyGuide } from './StudyGuide';
import { TopicVideos } from './TopicVideos';

interface Props {
  progress: ProgressState;
  onCardPass: (cardId: string, usedShowMe: boolean) => void;
  onFailTwice: (cardId: string) => void;
  onProofComplete: (proofId: string) => void;
  onDrillComplete: (drillId: string) => void;
  onLectureDone: (lectureId: string) => void;
  onOpenGlossary: (symbol: string) => void;
}

export function LecturePage({
  progress,
  onCardPass,
  onFailTwice,
  onProofComplete,
  onDrillComplete,
  onLectureDone,
  onOpenGlossary,
}: Props) {
  const { id = '' } = useParams();
  const meta = getLecture(id);
  const content = contentById[id];

  if (!meta || !content) {
    return (
      <div className="page">
        <p>Lecture not found.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  const videos = videosByLecture[id] ?? [];
  const explainers = explainersByLecture[id] ?? [];
  const printables = printablesByLecture[id] ?? [];
  const guides = content.guides ?? [];
  const guidesDone =
    guides.length === 0 || guides.every((g) => progress.completedCards.includes(g.id));
  const cardsDone = content.cards.every((c) => progress.completedCards.includes(c.id));
  const proofsDone =
    content.proofs.length === 0 ||
    content.proofs.every((p) => progress.completedProofs.includes(p.id));
  const canFinish = guidesDone && cardsDone && proofsDone;

  let section = 1;

  return (
    <div className="page lecture-page">
      <Link to="/" className="back">
        ← Timetable
      </Link>
      <header className="lecture-header">
        <p className="eyebrow">
          {meta.dateLabel} · {meta.sections}
          {meta.midterm ? ' · Midterm set' : ''}
        </p>
        <h1>
          {meta.number}: {meta.title}
        </h1>
        {meta.note && <p className="note">{meta.note}</p>}
        <p className="note">
          Watch the topic videos first, use the step explainers for hard ideas, then the study guide
          and drills.
        </p>
      </header>

      {printables.length > 0 && (
        <section>
          <h2>{section++}. Printable slides (B&W, paper-saving)</h2>
          <PrintableDownloads files={printables} />
        </section>
      )}

      {videos.length > 0 && (
        <section>
          <h2>{section++}. Explanatory videos</h2>
          <TopicVideos videos={videos} />
        </section>
      )}

      {explainers.length > 0 && (
        <section>
          <h2>{section++}. Step-through explainers</h2>
          <AnimatedExplainers explainers={explainers} />
        </section>
      )}

      {guides.length > 0 && (
        <section>
          <h2>{section++}. Detailed study guide</h2>
          <StudyGuide
            sections={guides}
            completedIds={progress.completedCards}
            onSectionPass={onCardPass}
            onFailTwice={onFailTwice}
            onOpenGlossary={onOpenGlossary}
          />
        </section>
      )}

      {guidesDone && (
        <section>
          <h2>{section++}. Quick practice cards</h2>
          <CardChain
            cards={content.cards}
            completedCards={progress.completedCards}
            onCardPass={onCardPass}
            onFailTwice={onFailTwice}
            onOpenGlossary={onOpenGlossary}
          />
        </section>
      )}

      {guidesDone && cardsDone && (
        <section>
          <h2>{section++}. Proof stepper</h2>
          {content.proofs.map((proof) => (
            <ProofStepper
              key={proof.id}
              proof={proof}
              completed={progress.completedProofs.includes(proof.id)}
              onComplete={() => onProofComplete(proof.id)}
            />
          ))}
        </section>
      )}

      {guidesDone && cardsDone && proofsDone && (
        <section>
          <h2>{section++}. Drills</h2>
          {content.drills.map((drill) => (
            <Drill
              key={drill.id}
              drill={drill}
              completed={progress.completedDrills.includes(drill.id)}
              onComplete={() => onDrillComplete(drill.id)}
            />
          ))}
        </section>
      )}

      {canFinish && !progress.lectureDone.includes(id) && (
        <button type="button" className="primary" onClick={() => onLectureDone(id)}>
          Mark lecture done
        </button>
      )}
      {progress.lectureDone.includes(id) && (
        <p className="feedback ok">Lecture marked done.</p>
      )}

      {guides.length > 0 && !guidesDone && (
        <p className="locked-note">Finish the study guide to unlock quick cards, proofs, and drills.</p>
      )}
      {guidesDone && !cardsDone && (
        <p className="locked-note">Finish the quick cards to unlock proofs and drills.</p>
      )}
      {guidesDone && cardsDone && !proofsDone && content.proofs.length > 0 && (
        <p className="locked-note">Complete the proof steppers to unlock drills.</p>
      )}
    </div>
  );
}
