// Central place for frontend config.
// Vite exposes build-time env vars via `import.meta.env`.
const API_BASE_URL = 'https://deploy-django-on-render-saph.onrender.com/'

if (!API_BASE_URL) {
  // Helps diagnose missing `VITE_API_BASE_URL` on Vercel.
  console.warn('VITE_API_BASE_URL is not set. API requests will fail.');
}

export { API_BASE_URL };

