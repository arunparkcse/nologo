// Live preview: the preview pane shows the real site page for the entry being edited, and sends it
// the unsaved draft on every change (the site applies it in development builds only; see
// src/app/data/preview.ts). Loaded by admin/index.html after Decap.
(function () {
  const SITE_BASE = location.pathname.replace(/admin\/.*$/, ''); // e.g. "/nologo/"
  const PAGE_ROUTES = { home: '', about: 'about', contact: 'contact', careers: 'careers' };

  // Site path for an entry, or null when there isn't enough filled in yet to know it.
  function routeFor(collection, file, d) {
    switch (collection) {
      case 'pages': return PAGE_ROUTES[file] ?? '';
      case 'settings': return '';
      case 'categories':
      case 'customPages': return d.slug ? d.slug : null;
      case 'projects': return d.type && d.slug ? `${d.type}/${d.slug}` : null;
      case 'perspectives': return d.slug ? `perspectives/${d.slug}` : null;
      case 'team': return 'about';
      case 'testimonials': return '';
      default: return '';
    }
  }

  // An image uploaded but not yet published exists only inside the CMS; use its temporary URL.
  function withDraftAssets(value, getAsset) {
    if (typeof value === 'string' && value.startsWith('assets/uploads/')) {
      const url = String(getAsset(value) || '');
      return url.startsWith('blob:') ? url : value;
    }
    if (Array.isArray(value)) return value.map(v => withDraftAssets(v, getAsset));
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withDraftAssets(v, getAsset)]));
    }
    return value;
  }

  const LivePreview = createClass({
    componentDidMount() {
      // The site says when it's ready to receive (its listener starts after the app boots).
      this.onReady = e => {
        if (this.frame && e.source === this.frame.contentWindow && e.data?.type === 'cms-preview-ready') this.send();
      };
      (this.props.window || window).addEventListener('message', this.onReady);
    },
    componentWillUnmount() {
      (this.props.window || window).removeEventListener('message', this.onReady);
    },
    componentDidUpdate() { this.send(); },

    send() {
      const win = this.frame && this.frame.contentWindow;
      if (!win) return;
      const { entry, collection, getAsset } = this.props;
      win.postMessage({
        type: 'cms-preview',
        collection: collection.get('name'),
        file: entry.get('slug') || '',
        data: withDraftAssets(entry.get('data').toJS(), getAsset),
      }, location.origin);
    },

    render() {
      const { entry, collection } = this.props;
      const route = routeFor(collection.get('name'), entry.get('slug'), entry.get('data').toJS());
      if (route === null) {
        return h('p', { className: 'preview-hint' }, 'Fill in the URL slug to see the page preview.');
      }
      return h('iframe', {
        src: `${SITE_BASE}${route}?cmsPreview=1`,
        title: 'Page preview',
        ref: el => { this.frame = el; },
      });
    },
  });

  // Folder collections are looked up by collection name; single-file collections by file name.
  ['categories', 'customPages', 'projects', 'perspectives', 'testimonials', 'team',
   'home', 'about', 'contact', 'careers', 'site'].forEach(name => CMS.registerPreviewTemplate(name, LivePreview));

  CMS.registerPreviewStyle(`
    html, body { margin: 0; height: 100%; }
    iframe { display: block; border: 0; width: 100%; height: 100vh; }
    .preview-hint { font: 14px/1.5 system-ui, sans-serif; color: #666; padding: 2rem; }
  `, { raw: true });
})();
