import { readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const contentMdxDir = resolve(__dirname, '../../content-mdx');

const projects = readdirSync(contentMdxDir)
  .filter(name => statSync(join(contentMdxDir, name)).isDirectory())
  .filter(name => !name.startsWith('.'));

let selectedIndex = 0;

function render() {
  process.stdout.write('\x1B[2J\x1B[H');
  console.log('Select a project:\n');
  projects.forEach((p, i) => console.log(`${i === selectedIndex ? '> ' : '  '}${p}`));
}

render();
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', (key) => {
  if (key[0] === 3) process.exit();                          // Ctrl+C
  if (key[0] === 27 && key[1] === 91 && key[2] === 65)     // up arrow
    selectedIndex = Math.max(0, selectedIndex - 1);
  if (key[0] === 27 && key[1] === 91 && key[2] === 66)     // down arrow
    selectedIndex = Math.min(projects.length - 1, selectedIndex + 1);

  if (key[0] === 13) {                                       // Enter
    process.stdin.setRawMode(false);
    const selected = projects[selectedIndex];
    console.log(`\nStarting dev server for: ${selected}\n`);
    spawn('turbo', ['run', 'dev', '--ui=stream'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, DOCS_PROJECT: selected },
    });
    return;
  }

  render();
});
