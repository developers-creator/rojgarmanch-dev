const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiOptions = {
  /** Seconds before Next.js refetches this endpoint in the background. */
  revalidate?: number;
  tags?: string[];
};

export async function apiFetch<T>(
  endpoint: string,
  { revalidate = 5, tags }: ApiOptions = {},
): Promise<T> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { Accept: "application/json" },
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new Error(`API ${endpoint} failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
