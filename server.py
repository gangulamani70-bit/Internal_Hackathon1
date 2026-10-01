import os
import sys
import time
import threading
import webbrowser
import mimetypes
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIRECTORY = os.path.join(BASE_DIR, "dist")

# Ensure critical web MIME types are recognized correctly on Windows
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("application/json", ".json")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("font/woff", ".woff")

def ensure_build():
    index_file = os.path.join(DIRECTORY, "index.html")
    if not os.path.exists(index_file):
        print("[Setup] 'dist/index.html' not found. Building project via 'npm run build'...")
        try:
            subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, check=True, shell=True)
            print("[Setup] Build completed successfully.\n")
        except Exception as err:
            print(f"[Warning] Auto-build failed: {err}")
            print("Please run 'npm run build' manually if pages fail to render.\n")

class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Resolve requested file path
        path = self.translate_path(self.path)
        
        # Check if requested item exists on disk as a file or directory with index.html
        is_file = os.path.isfile(path)
        is_dir_with_index = os.path.isdir(path) and os.path.isfile(os.path.join(path, "index.html"))
        
        # If not an existing static file or folder with index, fallback to SPA root index.html
        if not is_file and not is_dir_with_index:
            clean_path = self.path.split('?')[0].split('#')[0]
            # Don't rewrite genuine asset requests to index.html (let them 404 properly)
            if not any(clean_path.startswith(prefix) for prefix in ('/assets/', '/favicon', '/locales/')):
                self.path = '/index.html'
        
        return super().do_GET()

    def end_headers(self):
        # Prevent browser caching during local evaluation and demonstration
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress noisy HTTP asset logging; print clean requests only
        if len(args) >= 1 and any(ext in str(args[0]) for ext in ('.js', '.css', '.svg', '.png', '.woff2')):
            return
        super().log_message(format, *args)

def launch_browser(port):
    time.sleep(0.6)
    url = f"http://localhost:{port}"
    print(f"  -> Opening browser at {url} ...")
    webbrowser.open(url)

def run_server():
    ensure_build()
    
    # Fallback to base directory if dist somehow still doesn't exist
    target_dir = DIRECTORY if os.path.exists(DIRECTORY) else BASE_DIR
    os.chdir(target_dir)

    # Bind port gracefully (trying 8000 through 8010 if occupied)
    server = None
    active_port = 8000
    for port in range(8000, 8011):
        try:
            server = HTTPServer(('0.0.0.0', port), SPARequestHandler)
            active_port = port
            break
        except OSError:
            continue

    if server is None:
        print("[ERROR] Ports 8000 through 8010 are currently occupied.")
        sys.exit(1)

    print("=" * 68)
    print("  AgriPrice Connect -- SIH 2026 Problem ID: SIH26132")
    print("  Strengthening Market Linkages and Price Discovery")
    print("  Government of Maharashtra -- MSIS / Innovation")
    print("=" * 68)
    print(f"\n  Serving files from: {target_dir}")
    print(f"  Local Demo URL   : http://localhost:{active_port}")
    print(f"  Network Demo URL : http://127.0.0.1:{active_port}")
    print("\n  Press Ctrl+C to stop the server.\n")

    # Launch browser only once the socket is bound and listening
    threading.Thread(target=launch_browser, args=(active_port,), daemon=True).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nDemo server stopped.")
        sys.exit(0)

if __name__ == "__main__":
    run_server()

