// `npm start`: content watcher + ng serve together, so CMS edits show up live.
import { spawn } from 'node:child_process';

const procs = [
  spawn('node', ['scripts/generate-content.mjs', '--watch'], { stdio: 'inherit', shell: true }),
  spawn('npx', ['ng', 'serve', ...process.argv.slice(2)], { stdio: 'inherit', shell: true })
];

const stop = () => procs.forEach(p => p.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach(p => p.on('exit', code => { stop(); process.exit(code ?? 0); }));
