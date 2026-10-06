export default function SearchLoading() {
  return (
    <main id="main" className="search-loading" aria-busy="true">
      <span className="search-spinner" role="status" aria-label="खोज्दै…" />
    </main>
  );
}
