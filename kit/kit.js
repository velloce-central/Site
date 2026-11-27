// copiar mensagens e prompt
document.querySelectorAll('.copy').forEach(b => {
  b.dataset.l = b.textContent;
  b.addEventListener('click', () => {
    const el = document.getElementById(b.dataset.c), txt = el.innerText;
    const done = () => { b.textContent = 'Copiado ✓'; setTimeout(() => b.textContent = b.dataset.l, 1800); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selecionado'; };
    try { navigator.clipboard.writeText(txt).then(done, sel); } catch (e) { sel(); }
  });
});

// calculadora
const $ = id => document.getElementById(id);
const brl = v => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
const num = s => Number(String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '')) || 0;
let ultimo = null;
function calcula() {
  const av = num($('av').value), vp = num($('vp').value), tk = num($('tk').value);
  if (!av || !vp || !tk) { $('res').hidden = true; $('aviso').hidden = false; ultimo = null; return; }
  const n = Math.min(vp, av), mes = n * tk;
  $('rMes').textContent = brl(mes); $('rAno').textContent = brl(mes * 12); $('rRec').textContent = brl(mes / 3);
  $('res').hidden = false; $('aviso').hidden = true;
  ultimo = { av, vp: n, tk, mes };
}
['av', 'vp', 'tk'].forEach(id => $(id).addEventListener('input', calcula));
$('tk').addEventListener('blur', e => { const v = num(e.target.value); if (v) e.target.value = Math.round(v).toLocaleString('pt-BR'); });
$('calc').addEventListener('submit', e => e.preventDefault());

// formulário: abre o WhatsApp do Juan com os números da calculadora
const f = $('f');
f.addEventListener('submit', async e => {
  e.preventDefault();
  if (!f.reportValidity()) return;
  try { await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(f)).toString() }); } catch (err) {}
  const d = Object.fromEntries(new FormData(f));
  let txt = `Oi, Juan! Vim pelo Kit Vou Pensar e quero conversar sobre a minha clínica.\n\nNome: ${d.nome}\nClínica: ${d.clinica}\nCidade: ${d.cidade}`;
  if (ultimo) txt += `\n\nMinha conta na calculadora:\nAvaliações por mês: ${ultimo.av}\nSaem com "vou pensar": ${ultimo.vp}\nTicket médio: ${brl(ultimo.tk)}\nFica na mesa por mês: ${brl(ultimo.mes)}`;
  const url = 'https://wa.me/5547992571981?text=' + encodeURIComponent(txt);
  $('wa').href = url;
  f.hidden = true; $('ok').hidden = false;
  setTimeout(() => { location.href = url; }, 600);
});
