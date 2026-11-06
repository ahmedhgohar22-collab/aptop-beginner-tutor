import type { PrintablePdf } from '../content/printables';

interface Props {
  files: PrintablePdf[];
}

export function PrintableDownloads({ files }: Props) {
  if (files.length === 0) return null;

  return (
    <div className="printable-downloads">
      <p className="video-intro">
        Compact study handouts from the original lecture text (wording preserved). About half the
        pages or less, with logic symbols fixed (∧ ∨ ¬ ⇒ ≡ ⊥), cleaned wraps, and a readable study
        layout in black ink on white.
      </p>
      <ul className="printable-list">
        {files.map((f) => (
          <li key={f.id}>
            <a
              className="primary link-btn"
              href={f.href}
              download={`${f.id}-study.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              Download {f.title}
            </a>
            <span className="note">{f.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
