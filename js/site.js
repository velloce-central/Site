(function(){
  var WHATSAPP = '5547992571981'; // número da Velloce com 55 e DDD, só dígitos. Ex.: 5547999999999
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // tela de carregamento: contador de 0 a 100, logo se desenha e a cortina sobe
  var loader = document.getElementById('loader'), lb = document.getElementById('lb'), ln = document.getElementById('ln');
  var skip = root.classList.contains('noloader');
  if (skip) { loader.classList.add('gone'); }
  var MIN = (reduce || skip) ? 0 : 1900, start = performance.now(), fontsOk = skip;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fontsOk = true; }); else fontsOk = true;
  setTimeout(function(){ fontsOk = true; }, 2500);
  (function count(now){
    var t = MIN ? Math.min(1, (now - start) / MIN) : 1;
    var e = 1 - Math.pow(1 - t, 3);
    var shown = fontsOk ? e : Math.min(e, .9);
    lb.style.setProperty('--lp', shown.toFixed(3));
    ln.textContent = Math.round(shown * 100);
    if (shown < 1) return requestAnimationFrame(count);
    setTimeout(function(){
      loader.classList.add('out');
      root.classList.remove('loading');
      setTimeout(function(){ loader.classList.add('gone'); onScroll(); try { var v0 = document.getElementById('mapv'); if (v0 && v0.paused) { var q = v0.play(); if (q && q.catch) q.catch(function(){}); } } catch(_){} }, 1150);
    }, reduce ? 0 : 280);
  })(start);


  // ---- palco: etiquetas que seguem o rosto no vídeo (mesmos pontos da entrada da Central) ----
  // Pontos do rosto no vídeo da entrada, medidos quadro a quadro (fluxo óptico): 25 quadros por segundo, 109 quadros, vídeo de 500 x 666.
  const TRACK = {"precisao":[[272.4,196.8],[272.8,197.6],[273.5,198.7],[274.4,200.0],[275.3,201.2],[276.3,203.0],[277.2,204.9],[278.1,206.7],[278.8,208.4],[279.4,210.0],[280.0,211.4],[280.3,212.2],[280.7,212.9],[281.0,213.2],[281.4,213.6],[281.8,213.7],[282.1,213.5],[282.5,213.3],[282.8,212.8],[283.3,212.3],[283.8,211.7],[284.4,211.1],[285.1,210.6],[286.1,210.2],[287.2,209.8],[288.4,209.4],[289.7,209.0],[291.0,208.6],[292.2,208.3],[293.4,207.9],[294.5,207.5],[295.5,207.0],[296.5,206.4],[297.5,205.8],[298.4,205.3],[299.2,204.8],[299.7,204.5],[300.2,204.3],[300.8,204.3],[301.7,204.4],[302.7,204.9],[303.7,205.7],[304.9,206.8],[306.2,208.2],[307.5,209.8],[308.7,211.6],[309.4,213.6],[309.4,215.7],[308.7,218.4],[307.8,221.8],[306.9,226.0],[305.5,229.5],[303.6,232.0],[301.3,233.4],[299.2,234.3],[297.4,235.2],[295.7,236.0],[294.3,236.9],[292.9,237.8],[291.5,238.8],[290.0,239.9],[289.1,240.6],[288.1,241.4],[287.1,242.1],[285.7,243.3],[284.4,244.6],[283.2,245.9],[282.1,247.1],[281.2,248.2],[280.2,249.4],[279.2,250.7],[278.3,252.0],[277.5,253.3],[276.7,254.7],[275.8,256.3],[274.8,258.0],[274.0,259.4],[273.4,260.7],[272.9,261.7],[272.5,262.7],[272.0,263.5],[271.4,264.2],[270.8,264.9],[270.1,265.5],[269.2,266.2],[268.3,266.9],[267.6,267.4],[266.9,267.9],[266.2,268.3],[265.2,268.9],[264.2,269.6],[263.3,270.4],[262.2,271.2],[261.2,272.0],[260.1,272.7],[259.0,273.3],[257.8,273.8],[256.6,274.4],[255.5,275.0],[254.6,275.6],[253.8,276.3],[252.9,277.0],[252.1,277.7],[251.5,278.5],[251.1,279.3],[250.8,280.0],[250.5,280.7],[250.1,281.5],[249.8,281.9]],"agilidade":[[222.3,262.8],[222.6,263.7],[223.3,265.3],[224.1,267.0],[224.9,268.7],[225.7,270.6],[226.4,272.5],[227.0,274.3],[227.6,276.0],[228.1,277.6],[228.5,278.8],[228.8,279.5],[229.0,280.0],[229.2,280.2],[229.5,280.4],[229.8,280.4],[230.0,280.2],[230.3,279.9],[230.5,279.5],[230.8,278.9],[231.2,278.3],[231.7,277.8],[232.4,277.2],[233.2,276.6],[234.1,276.1],[235.2,275.6],[236.2,275.1],[237.1,274.7],[238.0,274.2],[238.9,273.7],[239.7,273.1],[240.5,272.5],[241.3,271.9],[242.0,271.3],[242.7,270.9],[243.2,270.6],[243.6,270.4],[244.0,270.4],[244.5,270.5],[245.2,270.9],[245.9,271.6],[246.7,272.8],[247.7,274.3],[248.6,276.0],[249.5,278.0],[250.2,280.1],[250.7,282.4],[250.9,284.6],[250.9,286.9],[250.7,289.1],[250.1,291.3],[249.3,293.3],[248.3,295.2],[247.2,296.9],[246.2,298.6],[245.1,300.1],[243.9,301.6],[242.7,303.0],[241.3,304.5],[239.9,305.9],[238.3,307.2],[237.3,308.0],[236.2,308.9],[235.2,309.8],[233.6,311.2],[232.2,312.6],[230.8,313.9],[229.5,315.1],[228.0,316.4],[226.6,317.7],[225.2,319.1],[224.0,320.6],[222.8,322.0],[221.6,323.4],[220.5,323.7],[219.4,323.9],[218.5,322.8],[217.7,321.4],[217.0,319.9],[216.1,319.4],[214.9,320.2],[213.7,320.8],[212.4,321.5],[211.0,322.3],[209.5,323.2],[207.9,324.0],[206.9,324.5],[205.9,324.9],[205.0,325.4],[203.5,326.3],[202.0,327.2],[200.4,328.1],[198.8,328.9],[197.3,329.6],[195.8,330.3],[194.3,330.8],[192.7,331.3],[191.2,331.9],[189.8,332.6],[188.3,333.3],[186.9,334.1],[185.6,335.0],[184.4,336.0],[183.4,337.0],[182.5,337.9],[181.6,338.9],[180.7,339.8],[179.7,340.8],[179.2,341.2]],"cuidado":[[318.4,343.0],[318.8,344.1],[319.5,345.5],[320.3,347.0],[321.0,348.5],[321.9,350.9],[322.8,353.2],[323.6,355.6],[324.4,357.8],[325.0,359.8],[325.6,361.7],[326.0,362.9],[326.4,363.8],[326.8,364.4],[327.4,365.0],[328.0,365.4],[328.6,365.5],[329.2,365.4],[329.9,365.2],[330.5,364.9],[331.2,364.5],[332.0,364.3],[332.9,364.1],[334.0,364.1],[335.3,364.2],[336.6,364.4],[338.0,364.6],[339.4,364.9],[340.8,365.2],[342.1,365.5],[343.3,365.7],[344.5,365.8],[345.7,365.8],[347.0,365.8],[348.2,365.9],[349.3,366.0],[350.0,366.1],[350.8,366.4],[351.5,366.9],[352.6,368.0],[353.7,369.5],[354.7,371.5],[355.7,374.0],[356.6,376.9],[357.5,380.0],[358.2,383.5],[358.6,387.2],[358.8,390.9],[358.8,394.5],[358.4,398.1],[357.7,401.7],[356.9,405.3],[355.8,408.7],[354.6,412.0],[353.5,415.0],[352.5,417.8],[351.5,420.5],[350.3,423.1],[349.0,425.6],[347.7,428.2],[346.3,430.7],[345.4,432.4],[344.5,434.1],[343.5,435.8],[342.0,438.5],[340.6,441.3],[339.3,444.1],[337.9,446.8],[336.5,449.5],[335.1,452.3],[333.8,455.1],[332.5,457.9],[331.3,460.7],[330.1,463.5],[328.8,466.4],[327.4,469.4],[325.9,472.3],[324.4,475.1],[323.1,477.7],[321.8,480.2],[320.4,482.5],[318.9,484.8],[317.4,486.9],[315.9,489.1],[314.3,491.3],[312.6,493.6],[311.4,495.1],[310.3,496.5],[309.2,498.0],[307.8,500.1],[306.3,502.3],[304.6,504.6],[302.8,507.0],[301.0,509.3],[299.1,511.6],[297.3,513.7],[295.4,515.7],[293.6,517.7],[291.9,519.8],[290.3,521.9],[288.8,524.0],[287.4,526.1],[286.2,528.3],[285.1,530.5],[284.2,532.6],[283.4,534.6],[282.5,536.7],[281.5,538.8],[280.9,539.8]]};
  const FPS = 25, FRAMES = 109, VW = 500, VH = 666;
  
  var vid = document.getElementById('mapv'), pinsBox = document.getElementById('pins') || document.createElement('div');
  function pinPos(t, W, H){
    var s = Math.max(W / VW, H / VH), ox = (W - VW * s) * .5, oy = (H - VH * s) * .3;
    var f = (((t || 0) * FPS) % FRAMES + FRAMES) % FRAMES, i = Math.floor(f), j = i + 1 < FRAMES ? i + 1 : i, a = f - i, out = {};
    for (var k in TRACK){ var tr = TRACK[k]; out[k] = { left: ox + (tr[i][0] + (tr[j][0] - tr[i][0]) * a) * s, top: oy + (tr[i][1] + (tr[j][1] - tr[i][1]) * a) * s }; }
    return out;
  }
  if (window.matchMedia('(max-width: 900px)').matches){
    var cel = { precisao:[-36,-46], agilidade:[-20,70], cuidado:[30,60] };
    [].slice.call(pinsBox.querySelectorAll('.pin')).forEach(function(p){ var d = cel[p.dataset.k]; if (!d) return; var len = Math.hypot(d[0], d[1]), ang = Math.atan2(d[1], d[0]) * 180 / Math.PI;
      p.querySelector('.pin-line').style.cssText = 'width:' + len.toFixed(0) + 'px;transform:rotate(' + ang.toFixed(1) + 'deg)';
      p.querySelector('.pin-tag').style.transform = 'translate(' + d[0] + 'px,' + d[1] + 'px) translate(' + (d[0] < 0 ? '-100%' : '0') + ',-50%)'; });
  }
  if (pinsBox.parentElement) (function follow(){
    var box = pinsBox.parentElement, W = box.clientWidth, H = box.clientHeight;
    if (W && H){ var pos = pinPos(vid.currentTime, W, H); [].slice.call(pinsBox.querySelectorAll('.pin')).forEach(function(p){ var q = pos[p.dataset.k]; if (q){ p.style.left = q.left.toFixed(1) + 'px'; p.style.top = q.top.toFixed(1) + 'px'; } }); }
    requestAnimationFrame(follow);
  })();
  if (reduce) { try { vid.removeAttribute('autoplay'); vid.pause(); } catch(_){} }
  else {
    // o vídeo da abertura começa sozinho: mudo, inline e com novas tentativas
    vid.muted = true; vid.defaultMuted = true; vid.playsInline = true;
    vid.setAttribute('muted',''); vid.setAttribute('playsinline',''); vid.setAttribute('webkit-playsinline','');
    var tryPlay = function(){ if (!vid.paused) return; var pv = vid.play && vid.play(); if (pv && pv.catch) pv.catch(function(){}); };
    tryPlay();
    ['loadedmetadata','loadeddata','canplay'].forEach(function(ev){ vid.addEventListener(ev, tryPlay); });
    document.addEventListener('visibilitychange', function(){ if (!document.hidden) tryPlay(); });
    window.addEventListener('pageshow', tryPlay);
    var t2 = setInterval(function(){ tryPlay(); if (!vid.paused) clearInterval(t2); }, 700);
    setTimeout(function(){ clearInterval(t2); }, 15000);
    // celular em modo de economia: o primeiro toque em qualquer lugar já faz o vídeo andar
    ['touchstart','touchend','pointerdown','click','keydown'].forEach(function(ev){ window.addEventListener(ev, tryPlay, {passive:true}); });
  }
  // luz de cena pela hora: dia quente, noite fria
  
  // logo em nuvem de pontos, calculada a partir do próprio desenho
  (function(){
    var g = document.querySelector('#dvhero .dv-pts'); if (!g) return;
    try {
      var c = document.createElement('canvas'); c.width = 304; c.height = 286; var x2 = c.getContext('2d');
      var L = new Path2D('M0 35 L41 35 C41 150 75 200 149 240 L149 286 C60 245 0 160 0 35 Z'), R = new Path2D('M263 0 L304 0 C304 160 245 245 149 286 L149 240 C225 200 263 140 263 0 Z');
      var step = 9, row = 0, n = 0, out = '';
      for (var y = 0; y < 286; y += step * .87, row++) for (var x = row % 2 ? step / 2 : 0; x < 304; x += step){
        var arm = x2.isPointInPath(R, x, y) ? 'r' : x2.isPointInPath(L, x, y) ? 'l' : null; if (!arm) continue;
        var v = .55 + ((n * 37) % 45) / 100, dx = -(60 + ((n * 53) % 140)), dy = ((n * 29) % 40) - 20, dl = (x / 304) * .9 + ((n * 7) % 10) / 40 + .2;
        out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (2.2 + v * 1.2).toFixed(2) + '" fill="' + (arm === 'r' ? '#E3BC6A' : '#B49A78') + '" opacity="' + v.toFixed(2) + '" style="--dx:' + dx + 'px;--dy:' + dy + 'px;--dl:' + dl.toFixed(2) + 's"/>'; n++;
      }
      g.innerHTML = out;
    } catch(_){}
  })();

  // a prévia do site rola sozinha quando aparece na tela
  [].slice.call(document.querySelectorAll('video.gwv')).forEach(function(v){
    if (!('IntersectionObserver' in window)) { try { v.play(); } catch(_){} return; }
    new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting && !reduce){ var p = v.play(); if (p && p.catch) p.catch(function(){}); } else v.pause(); }); }, {threshold:.25}).observe(v);
  });
  // revelar ao entrar
  var rvs = [].slice.call(document.querySelectorAll('.rv'));
  if (!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    rvs.forEach(function(el){ io.observe(el); });
  } else rvs.forEach(function(el){ el.classList.add('in'); });

  // painel de indicadores: barras crescem quando ele entra
  var pind = document.getElementById('pind');
  var noite = document.querySelector('.noite'), clk = document.querySelector('.clock .cl');
  // números que contam ao aparecer
  var fmt = function(n){ return n.toLocaleString('pt-BR'); };
  [].slice.call(document.querySelectorAll('[data-count]')).forEach(function(el){
    var end = +el.getAttribute('data-count'), pre = el.getAttribute('data-pre') || '', suf = el.getAttribute('data-suf') || '';
    if (reduce || !('IntersectionObserver' in window)) return;
    el.textContent = pre + '0' + suf;
    var o = new IntersectionObserver(function(es){ if (!es[0].isIntersecting) return; o.disconnect();
      var t0 = performance.now(), d = 1800;
      (function step(now){ var t = Math.min(1,(now - t0)/d), e = 1 - Math.pow(1 - t, 4); el.textContent = pre + fmt(Math.round(end*e)) + suf; if (t < 1) requestAnimationFrame(step); })(t0);
    }, {threshold:.6});
    o.observe(el);
  });

  // progresso de rolagem
  var els = [].slice.call(document.querySelectorAll('[data-p]'));
  var shifts = [].slice.call(document.querySelectorAll('[data-shift]'));
  var top = document.getElementById('top');
  var raf = 0;
  function clamp(x){ return x<0?0:x>1?1:x; }
  function tick(){
    raf = 0;
    var vh = window.innerHeight || 800;
    for (var k=0;k<els.length;k++){
      var el = els[k], r = el.getBoundingClientRect(), mode = el.getAttribute('data-p'), p;
      if (mode==='sticky'){ var span = r.height - vh; p = span>0 ? -r.top/span : 0; }
      else if (mode==='out'){ p = -r.top / r.height; }
      else { p = (vh - r.top) / (vh + r.height); }
      p = reduce ? (mode==='out'?0:1) : clamp(p);
      el.style.setProperty('--p', p.toFixed(4));
    }
    top.classList.toggle('solid', window.scrollY > 40 || document.documentElement.scrollTop > 40);
    var under = document.elementFromPoint(window.innerWidth/2, top.offsetHeight + 4);
    top.classList.toggle('ondark', !!(under && under.closest && under.closest('.dark')));
    if (noite && clk){ var np = parseFloat(noite.style.getPropertyValue('--p')) || 0; var mins = 47 + Math.round(Math.min(1, np/.8) * 13); clk.textContent = mins >= 60 ? '01:00' : '00:' + mins; }
    if (pind){ var pr = pind.getBoundingClientRect(); if (pr.left < window.innerWidth*.8 && pr.right > 0 && pr.top < vh) pind.classList.add('on'); }
  }
  function measure(){
    shifts.forEach(function(t){ var stage = t.parentElement; var s = Math.max(0, t.scrollWidth - stage.clientWidth + Math.max(24, (stage.clientWidth-1240)/2)); t.style.setProperty('--shift', s+'px'); });
    tick();
  }
  function onScroll(){ if(!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener('scroll', onScroll, {passive:true, capture:true});
  window.addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();

  // luz que segue o dedo ou o mouse no topo
  var hero = document.querySelector('.hero'), topo = hero.querySelector('.topo');
  if ('IntersectionObserver' in window){
    var hio = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ hero.classList.add('go'); hio.disconnect(); } }, {threshold:.3});
    hio.observe(hero);
    var story = document.querySelector('.story');
    var sio = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ story.classList.add('go'); sio.disconnect(); } }, {threshold:0});
    sio.observe(story);
  } else { hero.classList.add('go'); document.querySelector('.story').classList.add('go'); }
  // formulário: abre o WhatsApp da Velloce com a mensagem pronta
  var f = document.getElementById('f'), note = document.getElementById('fnote'), wa = document.getElementById('walink');
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(id){ return (document.getElementById(id).value || '').trim(); };
    if (!v('fn') || !v('fc')){ note.textContent = 'Preencha seu nome e o nome da clínica.'; note.className = 'fnote err'; return; }
    var msg = 'Olá, Velloce! Quero candidatar a minha clínica.\n\nNome: ' + v('fn') + '\nClínica: ' + v('fc') + (v('fd') ? '\nCidade: ' + v('fd') : '') + (v('fi') ? '\nInstagram: ' + v('fi') : '') + (v('ff') ? '\nFaturamento mensal: ' + v('ff') : '') + (v('fa') ? '\nJá investe em anúncios: ' + v('fa') : '') + (v('fx') ? '\nCasos de antes e depois full face: ' + v('fx') : '');
    var og = window.vlOrigem && window.vlOrigem();
    if (og && (og.utm_source || og.utm_campaign)) msg += '\n\nOrigem: ' + [og.utm_source, og.utm_medium, og.utm_campaign, og.utm_content].filter(Boolean).join(' / ');
    if (window.vlTrack) window.vlTrack('Lead', { content_name: 'candidatura_clinica' });
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    wa.href = url; wa.hidden = false;
    note.className = 'fnote'; note.textContent = 'Candidatura pronta no WhatsApp. Resposta em até um dia útil.';
    try { window.open(url, '_blank', 'noopener'); } catch(_){}
  });
  // marketing: visita à candidatura (só dispara se houver consentimento)
  var cand = document.getElementById('candidatura');
  if (cand && 'IntersectionObserver' in window){ var cio = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ if (window.vlTrack) window.vlTrack('ViewContent', { content_name: 'candidatura' }); cio.disconnect(); } }, {threshold:0.3}); cio.observe(cand); }
  // carrossel da Central
  var ct = document.getElementById('ctrack');
  if (ct){
    var dots = [].slice.call(document.querySelectorAll('#cdots i')), panels = [].slice.call(ct.querySelectorAll('.panel'));
    var step = function(){ return panels[1] ? panels[1].offsetLeft - panels[0].offsetLeft : ct.clientWidth; };
    var cur = function(){ return Math.round(ct.scrollLeft / step()); };
    var upd = function(){ var i = Math.min(panels.length-1, cur()); dots.forEach(function(d,k){ d.classList.toggle('on', k===i); }); panels.forEach(function(pn,k){ if (Math.abs(k-i)<=1) pn.classList.add('on'); }); };
    ct.addEventListener('scroll', function(){ requestAnimationFrame(upd); }, {passive:true});
    var go = function(d){ ct.scrollTo({ left: Math.max(0, (cur()+d)) * step(), behavior: reduce ? 'auto' : 'smooth' }); };
    var pv = document.getElementById('cprev'), nx = document.getElementById('cnext');
    if (pv) pv.addEventListener('click', function(){ go(-1); });
    if (nx) nx.addEventListener('click', function(){ go(1); });
    ct.addEventListener('keydown', function(e){ if (e.key==='ArrowRight'){ e.preventDefault(); go(1); } if (e.key==='ArrowLeft'){ e.preventDefault(); go(-1); } });
    upd();
  }
  // celular: mensagens da conversa aparecem uma a uma ao rolar
  var msgs = [].slice.call(document.querySelectorAll('.noite .m'));
  if (msgs.length && 'IntersectionObserver' in window){
    var mio = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('vis'); mio.unobserve(e.target); } }); }, {threshold:0.25, rootMargin:'0px 0px -8% 0px'});
    msgs.forEach(function(m){ mio.observe(m); });
  } else msgs.forEach(function(m){ m.classList.add('vis'); });
  // Vera e E.D.I.T.H: vídeos tocam só quando aparecem
  [].slice.call(document.querySelectorAll('video.autov')).forEach(function(v){
    if (reduce){ v.removeAttribute('autoplay'); v.pause(); return; }
    var play = function(){ var p = v.play(); if (p && p.catch) p.catch(function(){}); };
    new IntersectionObserver(function(es){ if (es[0].isIntersecting){ v.preload = 'auto'; play(); } else v.pause(); }, {threshold:.15}).observe(v);
    ['touchstart','pointerdown'].forEach(function(e){ window.addEventListener(e, function once(){ if (v.paused && v.getBoundingClientRect().top < innerHeight) play(); window.removeEventListener(e, once); }, {passive:true}); });
  });
  // som do vídeo da Dra. Ana
  (function(){
    var v = document.getElementById('anav'), b = document.getElementById('anasnd'); if (!v || !b) return;
    b.addEventListener('click', function(){ v.muted = !v.muted; if (!v.muted){ v.currentTime = 0; var p = v.play(); if (p && p.catch) p.catch(function(){}); } b.textContent = v.muted ? 'Ativar som' : 'Desativar som'; b.setAttribute('aria-label', b.textContent); b.classList.toggle('on', !v.muted); });
  })();
})();
