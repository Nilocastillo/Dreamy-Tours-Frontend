interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  locale?: string; // 👈 NUEVO
}

/**
 * Fetches data from the Strapi API
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  locale,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const baseUrl = import.meta.env.VITE_STRAPI_URL;

  if (!baseUrl) {
    throw new Error("VITE_STRAPI_URL no está definida");
  }

  const url = new URL(`/api/${endpoint}`, baseUrl);

  // 🔹 Query params normales
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // 🔹 Locale (CLAVE)
  if (locale) {
    url.searchParams.set("locale", locale);
  }

  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) data = data[wrappedByKey];
  if (wrappedByList) data = data[0];

  return data as T;
}