import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = 'http://localhost:3000';
const EMAIL = 'loadtest@example.com';     
const PASSWORD = '123456AZE';
const POST_ID = 'ZvJKWrZIZt6ubwvMmDeKKtjImNre54gk';
const DISCUSSION_ID = 'cmt0drzsv0009w9jbreuseatj'

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m',  target: 50 },
    { duration: '2m',  target: 100 },
    { duration: '2m',  target: 200 },
    { duration: '1m',  target: 0 }, 
  ]
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

  const session = cookie[0].value;
  const headers = { Cookie: `better-auth.session_token=${session}` };

  // ← NEW: get the real userId from the session
  const me = http.get(`${BASE}/api/auth/get-session`, { headers });
  check(me, { 'session ok': (r) => r.status === 200 });

  const userId = me.json('user.id');
  if (!userId) throw new Error('Could not extract user.id from session');

  return { session, userId };
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
  page(`/dashboard/community/${DISCUSSION_ID}`, 'discussion');
  page(`/dashboard/community/${DISCUSSION_ID}/edit`, 'discussion edit');
  page('/dashboard/create-post', 'create-post');
  page(`/dashboard/post/${POST_ID}`, 'post detail');
  page(`/dashboard/post/${POST_ID}/edit`, 'post edit');
  page(`/dashboard/profile/${data.userId}`, 'profile');

  sleep(1);
}