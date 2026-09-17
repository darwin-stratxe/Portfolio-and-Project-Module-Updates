"""Build only the research and prototype website; exclude source PDFs and Git data."""
from pathlib import Path
import shutil
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'
FILES = [
    'index.html', 'framework-brief.html', 'prototype.html', 'styles.css',
    'research-integration.css', 'nav.js', 'ppmis-consolidated.js',
    'ppmis-consolidated.css', 'program-module.js', 'project-module.js',
    'integration-model.js', 'stratxe-integration.js', 'stratxe-integration.css',
    'portfolio-workflow.js',
]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('a', 'script', 'img', 'link'):
            url = attrs.get('src') or attrs.get('href')
            if url:
                self.urls.append(url)

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
for name in FILES:
    shutil.copy2(ROOT / name, OUT / name)
shutil.copytree(ROOT / 'assets', OUT / 'assets')
(OUT / 'research').mkdir()
for name in (
    'stratxe-integration-hypothesis.md', 'stratxe-integration-model.svg',
    'triple-p-rules.md', 'framework-design.md', 'framework-breakdown.md',
    'module-structure.md',
):
    shutil.copy2(ROOT / 'research' / name, OUT / 'research' / name)
for name in ('index.html', 'framework-brief.html', 'prototype.html'):
    parser = Links()
    parser.feed((OUT / name).read_text())
    for url in parser.urls:
        if url.startswith(('https:', 'http:', 'data:', '#', 'mailto:', 'javascript:')):
            continue
        path = OUT / url.split('#')[0].split('?')[0]
        if not path.exists():
            raise SystemExit(f'Missing website asset in {name}: {url}')
print(f'Static website built: {len(list(OUT.rglob("*")))} entries; both pages and their local assets verified.')
