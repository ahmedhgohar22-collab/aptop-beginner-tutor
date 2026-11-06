import { useRef, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { COURSE_META } from './content/course';
import { Glossary } from './components/Glossary';
import { LectureMap } from './components/LectureMap';
import { LecturePage } from './components/LecturePage';
import { Midterm } from './components/Midterm';
import { NeedsReview } from './components/NeedsReview';
import { NotationPage } from './components/NotationPage';
import { Settings } from './components/Settings';
import { Walkthrough } from './components/Walkthrough';
import {
  loadProgress,
  markCardComplete,
  markDrillComplete,
  markLectureDone,
  markNeedsReview,
  markProofComplete,
  resetAllProgress,
  resetWalkthrough,
  saveMidtermResult,
  saveProgress,
  setMidtermInclude,
  setWalkthroughDone,
  type ProgressState,
} from './progress';

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState('');

  function openGlossary(symbol = '') {
    setGlossaryQuery(symbol);
    setGlossaryOpen(true);
  }

  function apply(recipe: (current: ProgressState) => ProgressState) {
    const next = recipe(progressRef.current);
    progressRef.current = next;
    saveProgress(next);
    setProgress(next);
  }

  return (
    <HashRouter>
      <div className="app-shell">
        <nav className="topbar">
          <Link to="/" className="brand">
            aPToP tutor
          </Link>
          <div className="top-actions">
            <button type="button" onClick={() => openGlossary()}>
              Glossary
            </button>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<LectureMap progress={progress} />} />
            <Route
              path="/lecture/:id"
              element={
                <LecturePage
                  progress={progress}
                  onCardPass={(id, showMe) => apply((p) => markCardComplete(p, id, showMe))}
                  onFailTwice={(id) => apply((p) => markNeedsReview(p, id))}
                  onProofComplete={(id) => apply((p) => markProofComplete(p, id))}
                  onDrillComplete={(id) => apply((p) => markDrillComplete(p, id))}
                  onLectureDone={(id) => apply((p) => markLectureDone(p, id))}
                  onOpenGlossary={openGlossary}
                />
              }
            />
            <Route
              path="/notation"
              element={
                <NotationPage
                  progress={progress}
                  onCardPass={(id, showMe) => apply((p) => markCardComplete(p, id, showMe))}
                  onFailTwice={(id) => apply((p) => markNeedsReview(p, id))}
                  onProofComplete={(id) => apply((p) => markProofComplete(p, id))}
                  onDrillComplete={(id) => apply((p) => markDrillComplete(p, id))}
                  onOpenGlossary={openGlossary}
                />
              }
            />
            <Route
              path="/midterm"
              element={
                <Midterm
                  progress={progress}
                  onFinished={(score, misses) =>
                    apply((p) => saveMidtermResult(p, score, misses))
                  }
                />
              }
            />
            <Route path="/review" element={<NeedsReview progress={progress} />} />
            <Route
              path="/settings"
              element={
                <Settings
                  progress={progress}
                  onToggleFiveSix={(v) => apply((p) => setMidtermInclude(p, v))}
                  onReplayWalkthrough={() => apply((p) => resetWalkthrough(p))}
                  onReset={() => apply(() => resetAllProgress())}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <p>{COURSE_META.credit}</p>
        </footer>

        <Glossary
          open={glossaryOpen}
          onClose={() => setGlossaryOpen(false)}
          initialQuery={glossaryQuery}
        />
        <Walkthrough
          open={!progress.walkthroughDone}
          onDone={() => apply((p) => setWalkthroughDone(p))}
        />
      </div>
    </HashRouter>
  );
}
