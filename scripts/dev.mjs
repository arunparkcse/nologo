// `npm start`: content watcher + local CMS backend + ng serve, so CMS edits show up live.
// Site:  http://localhost:4200/nologo/
// CMS:   http://localhost:4200/nologo/admin/index.html
import { spawn, spawnSync } from 'node:child_process';

const procs = [
  spawn('node', ['scripts/generate-content.mjs', '--watch'], { stdio: 'inherit', shell: true }),
  // Reads/writes src/content/** on disk for the /admin UI (local_backend in src/admin/config.yml).
  // It has no authentication, so bind to this machine only — by default it listens on every
  // network interface, which would let anyone on the same Wi-Fi edit or delete site files.
  spawn('npx', ['decap-server'], { stdio: 'inherit', shell: true, env: { ...process.env, BIND_HOST: '127.0.0.1' } }),
  spawn('npx', ['ng', 'serve', ...process.argv.slice(2)], { stdio: 'inherit', shell: true })
];

// With shell: true, p.kill() on Windows only stops the wrapper shell and leaves ng serve /
// decap-server holding their ports, so kill the whole process tree instead.
const killTree = p => process.platform === 'win32'
  ? spawnSync('taskkill', ['/pid', String(p.pid), '/T', '/F'], { stdio: 'ignore' })
  : p.kill();
let stopping = false;
const stop = () => {
  if (stopping) return;
  stopping = true;
  procs.forEach(killTree);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach(p => p.on('exit', code => { stop(); process.exit(code ?? 0); }));
