// `npm start`: content watcher + local CMS backend + ng serve, so CMS edits show up live.
// Site:  http://localhost:4200/nologo/
// CMS:   http://localhost:4200/nologo/admin/index.html
import fs from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';

const GENERATOR = 'scripts/generate-content.mjs';

// With shell: true, p.kill() on Windows only stops the wrapper shell and leaves ng serve /
// decap-server holding their ports, so kill the whole process tree instead.
const killTree = p => process.platform === 'win32'
  ? spawnSync('taskkill', ['/pid', String(p.pid), '/T', '/F'], { stdio: 'ignore' })
  : p.kill();

let stopping = false;
const procs = new Set();
const stop = () => {
  if (stopping) return;
  stopping = true;
  procs.forEach(killTree);
};

// If any process exits on its own, shut the rest down too.
function start(cmd, args, options = {}) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: true, ...options });
  procs.add(p);
  p.on('exit', code => {
    procs.delete(p);
    if (p.restarting) return;
    stop();
    process.exit(code ?? 0);
  });
  return p;
}

const startWatcher = () => start('node', [GENERATOR, '--watch']);
let watcher = startWatcher();

// The watcher keeps running whatever generator code it started with. If the generator itself
// changes (e.g. after pulling an update), restart it so content isn't built by stale code.
let restartTimer;
fs.watch(GENERATOR, () => {
  clearTimeout(restartTimer);
  restartTimer = setTimeout(() => {
    if (stopping) return;
    console.log('[dev] generator changed — restarting content watcher');
    watcher.restarting = true;
    killTree(watcher);
    watcher = startWatcher();
  }, 300);
});

// Reads/writes src/content/** on disk for the /admin UI (local_backend in src/admin/config.yml).
// It has no authentication, so bind to this machine only — by default it listens on every
// network interface, which would let anyone on the same Wi-Fi edit or delete site files.
start('npx', ['decap-server'], { env: { ...process.env, BIND_HOST: '127.0.0.1' } });
start('npx', ['ng', 'serve', ...process.argv.slice(2)]);

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
