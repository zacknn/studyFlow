import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = 'http://localhost:3000';
const EMAIL = 'loadtest@example.com';     
const PASSWORD = '123456AZE';
const POST_ID = 'ZvJKWrZIZt6ubwvMmDeKKtjImNre54gk';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m',  target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export function setup() {
  const res = http.post(
    `${BASE}/api/auth/sign-in/email`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(res, { 'login ok': (r) => r.status === 200 });

  const cookie = res.cookies['better-auth.session_token'];
  if (!cookie || cookie.length === 0) {
    throw new Error('Login did not return a better-auth session cookie');
  }

  return { session: cookie[0].value };
}

export default function (data) {
  const headers = {
    Cookie: `better-auth.session_token=${data.session}`,
  };

  const page = (path, name) => {
    const res = http.get(`${BASE}${path}`, { headers });
    check(res, { [`${name} 200`]: (r) => r.status === 200 });
  };

  // Dashboard pages (server-rendered, hit the DB).
  page('/dashboard', 'dashboard');
  page('/dashboard/browse-note', 'browse-note');
  page('/dashboard/community', 'community');
  page(`/dashboard/community/${POST_ID}`, 'discussion');
  page(`/dashboard/community/${POST_ID}/edit`, 'discussion edit');
  page('/dashboard/create-post', 'create-post');
  page(`/dashboard/post/${POST_ID}`, 'post detail');
  page(`/dashboard/post/${POST_ID}/edit`, 'post edit');
  page(`/dashboard/profile/${POST_ID}`, 'profile');

  sleep(1);
}