// Dev only: Bitdefender-style extensions stamp `bis_skin_checked`/`bis_size`/`bis_id` on
// every element before hydration, which triggers a false mismatch. Runs before hydration.
if (process.env.NODE_ENV === "development") {
  const attrs = ["bis_skin_checked", "bis_size", "bis_id"];
  const strip = (el: Element) => attrs.forEach((a) => el.removeAttribute(a));

  new MutationObserver((records) => {
    records.forEach((r) => strip(r.target as Element));
  }).observe(document, { attributes: true, attributeFilter: attrs, subtree: true });

  document.querySelectorAll("[bis_skin_checked],[bis_size],[bis_id]").forEach(strip);
}
