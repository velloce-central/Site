
document.querySelectorAll('.copy').forEach(b=>{b.dataset.l=b.textContent;b.addEventListener('click',()=>{
 const el=document.getElementById(b.dataset.c),txt=el.innerText;
 const done=()=>{b.textContent='copiado ✓';setTimeout(()=>b.textContent=b.dataset.l,1800)};
 const sel=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='selecionado'};
 try{navigator.clipboard.writeText(txt).then(done,sel)}catch(e){sel()}
})});
const boxes=[...document.querySelectorAll('.lista input')],cnt=document.getElementById('cnt'),msg=document.getElementById('msg');
const fr=n=>n===0?'Marque os itens da lista.':n<=1?'Ótimo sinal. Seu atendimento já está acima da média.':n<=3?'Atenção: você já perde pacientes que tinham decidido marcar.':'Boa parte do que você investe em anúncio está ficando no WhatsApp.';
boxes.forEach(x=>x.addEventListener('change',()=>{const n=boxes.filter(b=>b.checked).length;cnt.textContent=n;msg.textContent=fr(n)}));
const f=document.getElementById('f'),ok=document.getElementById('ok');
f.addEventListener('submit',async e=>{
 e.preventDefault();
 if(/netlify\.app$|velloce/i.test(location.hostname)){try{await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})}catch(err){}}
 const d=Object.fromEntries(new FormData(f));
 const txt=`Oi, Juan! Vim pela página da Velloce e quero a Central na minha clínica.\n\nNome: ${d.nome}\nWhatsApp: ${d.whatsapp}\nSou: ${d.perfil}\nCidade: ${d.cidade}\nOnde atendo: ${d.onde_atende}\nContatos novos por mês: ${d.leads}`;
 const url='https://wa.me/5547992571981?text='+encodeURIComponent(txt);
 document.getElementById('wa').href=url;
 f.hidden=true;ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'center'});
 setTimeout(()=>{location.href=url},700);
});
