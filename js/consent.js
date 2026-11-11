/* Velloce: consentimento de cookies (LGPD), origem da visita e etiquetas de marketing.
   Preencha os IDs abaixo quando o pixel da Meta e o Google Analytics da Velloce existirem. */
(function(){
  var CONFIG = {
    META_PIXEL_ID: '',   // ex.: '123456789012345'
    GA4_ID: ''           // ex.: 'G-XXXXXXXXXX'
  };
  var COOKIE = 'vl_consent', ORIGEM = 'vl_origem', DAYS = 180;
  function getCookie(n){ var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : null; }
  function setCookie(n, v, days){ var d = new Date(); d.setTime(d.getTime() + days*864e5); document.cookie = n + '=' + encodeURIComponent(v) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); }
  function delCookie(n){ document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax'; }
  function read(){ try { return JSON.parse(getCookie(COOKIE) || 'null'); } catch(e){ return null; } }

  // ---- origem da visita (anúncio, campanha, link) ----
  var KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'];
  var origem = null;
  try {
    var q = new URLSearchParams(location.search), o = {};
    KEYS.forEach(function(k){ var v = q.get(k); if (v) o[k] = v.slice(0, 120); });
    if (Object.keys(o).length) { o.pagina = location.pathname; o.data = new Date().toISOString().slice(0,10); origem = o; try { sessionStorage.setItem(ORIGEM, JSON.stringify(o)); } catch(e){} }
    if (!origem) { try { origem = JSON.parse(sessionStorage.getItem(ORIGEM) || 'null'); } catch(e){} }
  } catch(e){}

  // ---- etiquetas, só depois do consentimento ----
  var loaded = { meta:false, ga:false };
  function loadScript(src){ var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function loadMeta(){
    if (loaded.meta || !CONFIG.META_PIXEL_ID) return; loaded.meta = true;
    var n = window.fbq = function(){ n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!window._fbq) window._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.META_PIXEL_ID); window.fbq('track', 'PageView');
  }
  function loadGA(c){
    if (!CONFIG.GA4_ID) return;
    window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    var st = { ad_storage: c.mk ? 'granted':'denied', ad_user_data: c.mk ? 'granted':'denied', ad_personalization: c.mk ? 'granted':'denied', analytics_storage: c.an ? 'granted':'denied' };
    if (loaded.ga) { window.gtag('consent', 'update', st); return; }
    if (!c.an && !c.mk) return;
    loaded.ga = true;
    window.gtag('consent', 'default', st);
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_ID));
    window.gtag('js', new Date()); window.gtag('config', CONFIG.GA4_ID, { anonymize_ip: true });
  }
  function apply(c){
    if (!c) return;
    if (c.mk) { loadMeta(); if (origem) setCookie(ORIGEM, JSON.stringify(origem), 90); }
    else { delCookie(ORIGEM); }
    loadGA(c);
  }
  if (!origem && read() && read().mk) { try { origem = JSON.parse(getCookie(ORIGEM) || 'null'); } catch(e){} }

  // ---- API para o resto do site ----
  window.vlConsent = read;
  window.vlOrigem = function(){ return origem; };
  window.vlTrack = function(evento, dados){
    var c = read() || {};
    try {
      if (c.mk && window.fbq) window.fbq('track', evento, dados || {});
      if ((c.an || c.mk) && window.gtag) window.gtag('event', evento === 'Lead' ? 'generate_lead' : evento.toLowerCase(), dados || {});
    } catch(e){}
  };

  // ---- aviso de cookies ----
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var bar = document.getElementById('cookies'); if (!bar) return;
    var prefs = document.getElementById('ck-prefs'), an = document.getElementById('ck-an'), mk = document.getElementById('ck-mk');
    function save(c){ c.v = 1; c.t = new Date().toISOString(); setCookie(COOKIE, JSON.stringify(c), DAYS); bar.hidden = true; apply(c); }
    function open(){ var c = read() || { an:false, mk:false }; an.checked = !!c.an; mk.checked = !!c.mk; bar.hidden = false; }
    document.getElementById('ck-all').addEventListener('click', function(){ save({ an:true, mk:true }); });
    document.getElementById('ck-none').addEventListener('click', function(){ save({ an:false, mk:false }); });
    document.getElementById('ck-cfg').addEventListener('click', function(){ prefs.hidden = !prefs.hidden; });
    document.getElementById('ck-save').addEventListener('click', function(){ save({ an:an.checked, mk:mk.checked }); });
    [].slice.call(document.querySelectorAll('[data-cookies]')).forEach(function(b){ b.addEventListener('click', function(e){ e.preventDefault(); open(); prefs.hidden = false; }); });
    var c = read(); if (c) apply(c); else setTimeout(function(){ bar.hidden = false; }, 2400);
  });
})();
