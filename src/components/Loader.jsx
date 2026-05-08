import './Loader.css';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite" aria-label={text}>
      <div className="loader-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="loader-text">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line shimmer" style={{ width: '60%' }} />
        <div className="skeleton-line shimmer" style={{ width: '90%' }} />
      </div>
    </div>
  );
}
