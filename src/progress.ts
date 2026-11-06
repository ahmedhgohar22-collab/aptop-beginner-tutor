const KEY = 'aptop-beginner-progress-v1';

export interface ProgressState {
  walkthroughDone: boolean;
  includeFiveSixInMidterm: boolean;
  completedCards: string[];
  needsReview: string[];
  completedProofs: string[];
  completedDrills: string[];
  lectureDone: string[];
  midtermScore: number | null;
  midtermMisses: string[];
}

const defaultState = (): ProgressState => ({
  walkthroughDone: false,
  includeFiveSixInMidterm: false,
  completedCards: [],
  needsReview: [],
  completedProofs: [],
  completedDrills: [],
  lectureDone: [],
  midtermScore: null,
  midtermMisses: [],
});

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/** Pure updater — caller persists with saveProgress. */
export function markCardComplete(
  state: ProgressState,
  cardId: string,
  usedShowMe: boolean,
): ProgressState {
  const completedCards = state.completedCards.includes(cardId)
    ? state.completedCards
    : [...state.completedCards, cardId];
  let needsReview = state.needsReview.filter((id) => id !== cardId);
  if (usedShowMe && !needsReview.includes(cardId)) {
    needsReview = [...needsReview, cardId];
  }
  return { ...state, completedCards, needsReview };
}

export function markNeedsReview(state: ProgressState, cardId: string): ProgressState {
  if (state.needsReview.includes(cardId)) return state;
  return { ...state, needsReview: [...state.needsReview, cardId] };
}

export function markProofComplete(state: ProgressState, proofId: string): ProgressState {
  if (state.completedProofs.includes(proofId)) return state;
  return { ...state, completedProofs: [...state.completedProofs, proofId] };
}

export function markDrillComplete(state: ProgressState, drillId: string): ProgressState {
  if (state.completedDrills.includes(drillId)) return state;
  return { ...state, completedDrills: [...state.completedDrills, drillId] };
}

export function markLectureDone(state: ProgressState, lectureId: string): ProgressState {
  if (state.lectureDone.includes(lectureId)) return state;
  return { ...state, lectureDone: [...state.lectureDone, lectureId] };
}

export function setWalkthroughDone(state: ProgressState): ProgressState {
  return { ...state, walkthroughDone: true };
}

export function resetWalkthrough(state: ProgressState): ProgressState {
  return { ...state, walkthroughDone: false };
}

export function setMidtermInclude(
  state: ProgressState,
  includeFiveSixInMidterm: boolean,
): ProgressState {
  return { ...state, includeFiveSixInMidterm };
}

export function saveMidtermResult(
  state: ProgressState,
  score: number,
  misses: string[],
): ProgressState {
  return { ...state, midtermScore: score, midtermMisses: misses };
}

export function resetAllProgress(): ProgressState {
  return defaultState();
}
