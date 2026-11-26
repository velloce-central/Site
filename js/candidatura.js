/* Candidatura Velloce: uma pergunta por tela e, no fim, o WhatsApp da Velloce abre com a candidatura escrita. */
(function(){
  var WHATSAPP = '5547992571981'; // o mesmo número da candidatura do site
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var form = document.getElementById('cf');
  var steps = [].slice.call(form.querySelectorAll('.step'));
  var order = ['intro', '1', '2', '3', '4', '5', '6', 'fim', 'ok'];
  var cur = 0, data = {};
  var prog = document.getElementById('prog'), bars = [].slice.call(prog.children);
  var count = document.getElementById('count');
  var trilha = [].slice.call(document.querySelectorAll('#trilha li'));
  var $ = function(id){ return document.getElementById(id); };
  var val = function(id){ return ($(id).value || '').trim(); };

  // linhas de contorno ao fundo (curvas suaves, como no palco do site)
  (function topo(){
    var g = $('topo-g'); if (!g) return;
    var NS = 'http://www.w3.org/2000/svg', out = '';
    for (var i = 0; i < 9; i++){
      var y = 120 + i * 85, a = 40 + i * 6;
      var d = 'M-40 ' + y + ' C 260 ' + (y - a) + ', 520 ' + (y + a * 1.3) + ', 760 ' + (y - a * .4) + ' S 1120 ' + (y + a) + ', 1260 ' + (y - a * .6);
      var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); g.appendChild(p);
      var len = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1600;
      p.style.setProperty('--len', len); p.style.animationDelay = (i * .14) + 's';
    }
  })();

  function stepEl(i){ return steps.filter(function(s){ return s.dataset.step === order[i]; })[0]; }
  function paintChrome(){
    var n = parseInt(order[cur], 10);
    prog.classList.toggle('show', !!n || order[cur] === 'fim');
    bars.forEach(function(b, k){ b.classList.toggle('f', order[cur] === 'fim' || order[cur] === 'ok' || (n && k < n)); });
    count.innerHTML = n ? '<b>0' + n + '</b> / 06' : order[cur] === 'fim' ? '<b>Revisão</b>' : order[cur] === 'ok' ? '<b>Enviada</b>' : '<span>Candidatura</span>';
    var t = order[cur] === 'ok' ? 2 : order[cur] === 'fim' ? 1 : 0;
    trilha.forEach(function(li, k){ li.classList.toggle('on', k === t); li.classList.toggle('done', k < t); });
  }
  function go(to, backward){
    if (to < 0 || to >= order.length || to === cur) return;
    var a = stepEl(cur), b = stepEl(to);
    a.classList.remove('on', 'backward');
    if (!reduce){ a.classList.add('out'); setTimeout(function(){ a.classList.remove('out'); }, 340); }
    cur = to;
    b.classList.toggle('backward', !!backward);
    setTimeout(function(){
      b.classList.add('on');
      paintChrome();
      if (order[cur] === 'fim') fillResumo();
      var inp = b.querySelector('.in');
      if (inp && window.matchMedia('(pointer:fine)').matches) inp.focus({ preventScroll:true });
      else { var first = b.querySelector('.opt.sel') || b.querySelector('.opt'); if (first && window.matchMedia('(pointer:fine)').matches) first.focus({ preventScroll:true }); }
    }, reduce ? 0 : 200);
    if (window.scrollY > 40) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
  function err(el, msg){ var e = el.querySelector('.err'); if (e) e.textContent = msg || ''; }
  function canLeave(el){
    var req = el.dataset.req;
    if (req === 'nome' && val('nome').length < 2){ err(el, 'Escreva o seu nome para continuar.'); $('nome').focus(); return false; }
    if (req === 'clinica' && val('clinica').length < 2){ err(el, 'Escreva o nome da clínica para continuar.'); $('clinica').focus(); return false; }
    if (req === 'cidade' && val('cidade').length < 2){ err(el, 'Escreva a cidade onde você atende.'); $('cidade').focus(); return false; }
    err(el, ''); return true;
  }
  function next(){ var el = stepEl(cur); if (el.dataset.req && !canLeave(el)) return; go(cur + 1); }

  form.addEventListener('click', function(e){
    var t = e.target.closest('button'); if (!t) return;
    if (t.hasAttribute('data-next')){ e.preventDefault(); next(); }
    else if (t.hasAttribute('data-back')){ e.preventDefault(); go(cur - 1, true); }
    else if (t.classList.contains('opt')){
      e.preventDefault();
      var el = t.closest('.step'), key = el.dataset.pick;
      [].forEach.call(el.querySelectorAll('.opt'), function(o){ o.classList.toggle('sel', o === t); o.setAttribute('aria-checked', o === t ? 'true' : 'false'); });
      data[key] = t.dataset.v;
      setTimeout(function(){ if (stepEl(cur) === el) go(cur + 1); }, reduce ? 0 : 420);
    }
    else if (t.dataset.edit){ e.preventDefault(); go(order.indexOf(t.dataset.edit), true); }
  });
  form.addEventListener('keydown', function(e){
    if (e.key !== 'Enter' || e.isComposing) return;
    var el = stepEl(cur);
    if (el.dataset.step === 'fim' || el.dataset.step === 'ok') return;
    if (e.target.classList.contains('opt')) return;
    e.preventDefault(); next();
  });
  [].forEach.call(form.querySelectorAll('.opt'), function(o){ o.setAttribute('role', 'radio'); o.setAttribute('aria-checked', 'false'); });
  [].forEach.call(form.querySelectorAll('.in'), function(i){ i.addEventListener('input', function(){ err(i.closest('.step'), ''); }); });

  function fillResumo(){
    var nome = val('nome').split(/\s+/)[0];
    $('ola').textContent = nome ? 'Tudo certo, ' + nome + '. Falta só enviar.' : 'Falta só enviar.';
    var rows = [
      ['Nome', val('nome'), '1'], ['Clínica', val('clinica'), '2'], ['Cidade', val('cidade'), '3'], ['Instagram', val('instagram') ? (val('instagram').charAt(0) === '@' ? '' : '@') + val('instagram') : 'Não informado', '3'],
      ['Faturamento', data.faturamento || 'Não informado', '4'], ['Anúncios', data.anuncios || 'Não informado', '5'], ['Antes e depois', data.casos || 'Não informado', '6']
    ];
    var dl = $('resumo'); dl.innerHTML = '';
    rows.forEach(function(r, k){
      var d = document.createElement('div'); d.style.animationDelay = (k * 0.05) + 's';
      var dt = document.createElement('dt'); dt.textContent = r[0];
      var dd = document.createElement('dd'); dd.textContent = r[1];
      var b = document.createElement('button'); b.type = 'button'; b.dataset.edit = r[2]; b.textContent = 'Mudar'; b.setAttribute('aria-label', 'Mudar ' + r[0]);
      d.appendChild(dt); d.appendChild(dd); d.appendChild(b); dl.appendChild(d);
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var ig = val('instagram'); if (ig && ig.charAt(0) !== '@') ig = '@' + ig;
    var msg = 'Olá, Velloce! Quero candidatar a minha clínica.\n\nNome: ' + val('nome') + '\nClínica: ' + val('clinica') + '\nCidade: ' + val('cidade') +
      (ig ? '\nInstagram: ' + ig : '') + (data.faturamento ? '\nFaturamento mensal: ' + data.faturamento : '') +
      (data.anuncios ? '\nJá investe em anúncios: ' + data.anuncios : '') + (data.casos ? '\nCasos de antes e depois full face: ' + data.casos : '');
    var og = window.vlOrigem && window.vlOrigem();
    if (og && (og.utm_source || og.utm_campaign)) msg += '\n\nOrigem: ' + [og.utm_source, og.utm_medium, og.utm_campaign, og.utm_content].filter(Boolean).join(' / ');
    if (window.vlTrack) window.vlTrack('Lead', { content_name: 'candidatura_clinica', origem: 'pagina_candidatura' });
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    $('walink').href = url;
    go(order.indexOf('ok'));
    // no celular (e dentro do navegador do Instagram) a nova aba costuma ser bloqueada: abre o WhatsApp na mesma aba
    var touch = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
    if (touch) setTimeout(function(){ location.href = url; }, reduce ? 0 : 350);
    else { try { window.open(url, '_blank', 'noopener'); } catch(_){} }
  });

  if (window.vlTrack) window.vlTrack('ViewContent', { content_name: 'candidatura_pagina' });
  paintChrome();
})();
