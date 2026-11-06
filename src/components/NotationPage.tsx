import { Link } from 'react-router-dom';
import { contentById } from '../content/course';
import { videosByLecture } from '../content/videos';
import type { ProgressState } from '../progress';
import { CardChain } from './CardChain';
import { ProofStepper } from './ProofStepper';
import { Drill } from './Drill';
import { TopicVideos } from './TopicVideos';

interface Props {
  progress: ProgressState;
  onCardPass: (cardId: string, usedShowMe: boolean) => void;
  onFailTwice: (cardId: string) => void;
  onProofComplete: (proofId: string) => void;
  onDrillComplete: (drillId: string) => void;
  onOpenGlossary: (symbol: string) => void;
}

export function NotationPage({
  progress,
  onCardPass,
  onFailTwice,
  onProofComplete,
  onDrillComplete,
  onOpenGlossary,
}: Props) {
  const content = contentById.notation;
  const videos = videosByLecture.notation ?? [];
  const cardsDone = content.cards.every((c) => progress.completedCards.includes(c.id));
  const proofsDone = content.proofs.every((p) => progress.completedProofs.includes(p.id));

  return (
    <div className="page">
      <Link to="/" className="back">
        ← Timetable
      </Link>
      <header className="lecture-header">
        <p className="eyebrow">Not a separate exam lecture · supports Three–Four</p>
        <h1>Notation tools</h1>
        <p>
          Substitution and quantifiers from chapter 3, taught as beginner cards so specs with x′
          and ∀ make sense.
        </p>
      </header>

      <section>
        <h2>1. Explanatory videos</h2>
        <TopicVideos videos={videos} />
      </section>

      <section>
        <h2>2. Practice cards</h2>
        <CardChain
          cards={content.cards}
          completedCards={progress.completedCards}
          onCardPass={onCardPass}
          onFailTwice={onFailTwice}
          onOpenGlossary={onOpenGlossary}
        />
      </section>

      {cardsDone &&
        content.proofs.map((proof) => (
          <ProofStepper
            key={proof.id}
            proof={proof}
            completed={progress.completedProofs.includes(proof.id)}
            onComplete={() => onProofComplete(proof.id)}
          />
        ))}
      {cardsDone &&
        proofsDone &&
        content.drills.map((drill) => (
          <Drill
            key={drill.id}
            drill={drill}
            completed={progress.completedDrills.includes(drill.id)}
            onComplete={() => onDrillComplete(drill.id)}
          />
        ))}
    </div>
  );
}
