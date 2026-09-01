#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, exts = ['.html', '.js', '.css']) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const d of list) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) {
      results = results.concat(walk(p, exts));
    } else if (exts.includes(path.extname(d.name))) {
      results.push(p);
    }
  }
  return results;
}

function findRefsInFile(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const refs = new Set();

  // src="..." or src='...'
  const srcRegex = /src\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = srcRegex.exec(txt))) refs.add(m[1]);

  // url(...) in css
  const urlRegex = /url\(([^)]+)\)/g;
  while ((m = urlRegex.exec(txt))) {
    let s = m[1].trim().replace(/^['"]|['"]$/g, '');
    refs.add(s);
  }

  // simple JS string references to images/...
  const imgRegex = /["'](images\/[\w\-\.\/]+)["']/g;
  while ((m = imgRegex.exec(txt))) refs.add(m[1]);

  return Array.from(refs).map((r) => ({ ref: r, file }));
}

function existsCaseSensitive(fullPath) {
  try {
    if (fs.existsSync(fullPath)) {
      // Now verify exact name match by walking upward comparing dir entries
      const dir = path.dirname(fullPath);
      const name = path.basename(fullPath);
      const entries = fs.readdirSync(dir);
      return entries.includes(name);
    }
    return false;
  } catch (e) {
    return false;
  }
}

function checkRefs(root) {
  const files = walk(root);
  const refs = files.flatMap(findRefsInFile);
  const report = [];

  for (const { ref, file } of refs) {
    // ignore data: and absolute urls
    if (/^(data:|https?:|\/\/)/i.test(ref)) continue;

    // strip query/hash
    const clean = ref.split(/[?#]/)[0];

    const baseDir = path.dirname(file);
    const target = path.resolve(baseDir, clean);

    const existsExact = existsCaseSensitive(target);
    const existsInsensitive = fs.existsSync(target);

    const problem = !existsExact && existsInsensitive;
    const missing = !existsInsensitive;

    // detect leading slash which can break on project pages
    const leadingSlash = clean.startsWith('/');

    report.push({
      from: path.relative(root, file),
      ref: clean,
      target: path.relative(root, target),
      existsExact,
      existsInsensitive,
      problem,
      missing,
      leadingSlash
    });
  }

  return report;
}

function printReport(r) {
  const problems = r.filter((x) => x.missing || x.problem || x.leadingSlash);
  if (problems.length === 0) {
    console.log('No obvious local problems found: all referenced images exist with matching case.');
    return;
  }

  console.log('Potential issues found:');
  for (const p of problems) {
    console.log('- from:', p.from);
    console.log('  ref:', p.ref);
    console.log('  resolved target:', p.target);
    if (p.missing) console.log('  -> MISSING: file not found at that path');
    if (p.problem) console.log('  -> CASE MISMATCH: file exists but name casing differs (this breaks on Linux/GitHub Pages)');
    if (p.leadingSlash) console.log('  -> LEADING SLASH: reference starts with "/" which points to site root; on GitHub project pages this may break (use relative paths or include repository base)');
    console.log('');
  }
}

const root = process.cwd();
const report = checkRefs(root);
printReport(report);

// exit with non-zero if problems
if (report.some((x) => x.missing || x.problem || x.leadingSlash)) process.exitCode = 2;
