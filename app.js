var IC={leads:'M3 4h18l-7 8v6l-4 2v-8z',sites:'M3 5h18v14H3z M3 9h18 M7 13l-2 2 2 2 M17 13l2 2-2 2 M13 12l-2 6',rotinas:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3.5 2',inicio:'M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',conversa:'M4 5h16v11H9l-5 4z',estudio:'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z',agenda:'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5',mais:'M5 12h.01 M12 12h.01 M19 12h.01',
emails:'M3 6h18v12H3z M3 7l9 6 9-6',manchetes:'M4 5h13v14H6a2 2 0 0 1-2-2z M17 9h3v8a2 2 0 0 1-2 2 M7 9h7 M7 12.5h7',clima:'M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11.5 3.3 3.3 0 0 0 7 18z',dashboard:'M4 4h7v7H4z M13 4h7v4h-7z M13 10h7v10h-7z M4 13h7v7H4z',financas:'M3 17l5-5 4 4 8-8 M15 8h5v5',memoria:'M4 6c0-2.7 16-2.7 16 0v12c0 2.7-16 2.7-16 0z M4 6c0 2.7 16 2.7 16 0',avisos:'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z M10 21h4',controle:'M7 4h10v16H7z M12 8v4 M10 16h4',mic:'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3',mercado:'M3 20h18 M6 16v-4 M10 16V8 M14 16v-6 M18 16V5',tarefas:'M9 6h11 M9 12h11 M9 18h11 M4 6l1 1 2-2 M4 12l1 1 2-2 M4 18l1 1 2-2',
volmais:'M4 9v6h4l5 4V5L8 9z M17 9v6 M14 12h6',volmenos:'M4 9v6h4l5 4V5L8 9z M15 12h5',mudo:'M4 9v6h4l5 4V5L8 9z M16 9l5 6 M21 9l-5 6',play:'M7 5l12 7-12 7z',prox:'M5 5l9 7-9 7z M17 5v14',ant:'M19 5l-9 7 9 7z M7 5v14',cheia:'M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5',fechar:'M6 6l12 12 M18 6L6 18',olho:'M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',ensinar:'M2 9l10-5 10 5-10 5z M6 11v5c3 2 9 2 12 0v-5 M22 9v6',holograma:'M12 2l9 16H3z M12 2v20 M3 18l9 4 9-4',opinioes:'M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3z M9 22h6',seguranca:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4'};
function ic(n){return '<svg viewBox="0 0 24 24"><path d="'+(IC[n]||IC.inicio)+'"/></svg>'}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function brl(v){return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
var VER=0;
function api(p,b){var v=VER;return fetch(p,b?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}:{}).then(function(r){document.getElementById('con').className='ponto';if(r.status===204)return null;if(r.status===423){checarDono();throw new Error('travado')}return r.json()}).then(function(d){if(v!==VER)return new Promise(function(){});return d}).catch(function(e){document.getElementById('con').className='ponto off';if(v!==VER)return new Promise(function(){});throw e})}
function aviso(t){var a=document.getElementById('aviso');a.textContent=t;a.style.display='block';clearTimeout(aviso.t);aviso.t=setTimeout(function(){a.style.display='none'},3500)}
var IOS=/iPhone|iPad|iPod/.test(navigator.userAgent);var STAND=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;var PROMPT=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();PROMPT=e;if(VISTA==='mais')ir('mais')});window.addEventListener('appinstalled',function(){PROMPT=null;aviso('App instalado. Procure o Nexus na tela inicial.')});if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1'))navigator.serviceWorker.register('sw.js').catch(function(){});

var M=document.getElementById('m'),INFO=null,VISTA='inicio',MSGS=[],FALAR=localStorage.getItem('nx-falar')!=='0',FORMATO='horizontal',ESTILO='automatico',timer=null;
function relogio(){document.getElementById('hora').textContent=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}relogio();setInterval(relogio,1000);
var NAV=[['inicio','Início'],['conversa','Conversa'],['leads','Leads'],['dashboard','Dashboard'],['mais','Mais']];
var N=document.getElementById('nav');NAV.forEach(function(n){var b=el('button');b.dataset.v=n[0];b.innerHTML=ic(n[0]);b.appendChild(el('span','',n[1]));b.onclick=function(){ir(n[0])};N.appendChild(b)});
function cab(t,voltar){var h=el('h2','',t);if(voltar){var b=el('button','voltar','‹ Voltar');b.onclick=function(){ir('mais')};h.appendChild(b)}M.appendChild(h)}
function vidro(t,cod){var v=el('div','vidro');var ti=el('div','tit',t);if(cod)ti.appendChild(el('em','',cod));v.appendChild(ti);return v}
function ir(v){VER++;VISTA=v;clearInterval(timer);M.textContent='';window.scrollTo(0,0);var bs=N.querySelectorAll('button');for(var i=0;i<bs.length;i++)bs[i].className=(bs[i].dataset.v===v||(['saude','holo','jogos','videos','ligacao','pesquisa','notif','sites','rotinas','tarefas','olhar','voz','chaves','backup','sobre','ensinar','seguranca','memoria','emails','manchetes','clima','empresaedit','memoria','avisos','controle','mercado','tarefas','agenda','holograma','opinioes','seguranca'].indexOf(v)>=0&&bs[i].dataset.v==='mais'))?'on':'';
var f={saude:saude,holo:holo,jogos:jogos,videos:videos,ligacao:ligacao,pesquisa:pesquisa,notif:notif,leads:leads,tarefas:tarefas,clima:clima,olhar:olhar,voz:voz,chaves:chaves,backup:backup,sobre:sobre,boasvindas:boasvindas,rotinas:rotinas,sites:sites,rotinas:rotinas,ensinar:ensinar,holograma:holograma,opinioes:opinioes,seguranca:seguranca,mercado:mercado,tarefas:tarefas,inicio:inicio,conversa:conversa,estudio:estudio,agenda:agenda,mais:mais,emails:emails,manchetes:manchetes,clima:clima,dashboard:dashboard,empresaedit:empresaedit,memoria:memoria,avisos:avisos,controle:controle}[v];if(f)f()}
// ---------- início ----------
function inicio(){var h=new Date().getHours();var sd=el('p','saudacao',(h<5?'Boa madrugada':h<12?'Bom dia':h<18?'Boa tarde':'Boa noite')+(DONO&&DONO.apelido?', '+DONO.apelido+'.':'.'));M.appendChild(sd);var o=el('div','orbe');o.id='orbe';o.innerHTML='<i></i><i></i><i></i><div class="esfera"></div>';M.appendChild(o);M.appendChild(el('div','estado','ONLINE'));M.appendChild(chatRapido());var box=el('div');M.appendChild(box);
function desenha(){api('/api/info').then(function(d){INFO=d;box.textContent='';
var g=el('div','grade');var c1=vidro('CLIMA');var tm=/(-?\d+(?:[.,]\d+)?)\s*°C/.exec(d.clima||'');c1.appendChild(el('div','grande',tm?Math.round(parseFloat(tm[1].replace(',','.')))+'°':'—'));c1.appendChild(el('p','',String(d.clima||'').split(':')[0]));c1.onclick=function(){ir('clima')};g.appendChild(c1);
var c2=vidro('PC');c2.appendChild(el('div','l2')).innerHTML='<span>CPU</span><b>'+d.cpu+'%</b>';c2.appendChild(el('div','l2')).innerHTML='<span>RAM</span><b>'+d.ram+'%</b>';g.appendChild(c2);box.appendChild(g);
var c3=vidro('CONTA GOOGLE','G');if(d.google&&d.google.conectado){c3.appendChild(el('div','l2')).innerHTML='<span>Compromissos hoje</span><b>'+(d.google.hoje==null?'–':d.google.hoje)+'</b>';c3.appendChild(el('div','l2')).innerHTML='<span>E-mails não lidos</span><b>'+(d.google.naoLidos==null?'–':d.google.naoLidos)+'</b>';if(d.google.proximo)c3.appendChild(el('p','','Próximo: '+d.google.proximo.titulo))}else c3.appendChild(el('p','vazio','Conecte a conta Google no computador (Configurações).'));c3.onclick=function(){ir('agenda')};box.appendChild(c3);
var p=d.prod||{};var c6=vidro('HOJE','T');c6.appendChild(el('div','grande',String(p.pendentes||0))).appendChild(el('small','','TAREFAS PENDENTES'));(p.proximas||[]).forEach(function(t){c6.appendChild(el('div','l2')).appendChild(el('span','','· '+t))});if(p.totalHabitos)c6.appendChild(el('div','l2')).innerHTML='<span>Hábitos de hoje</span><b>'+p.habitosHoje+'/'+p.totalHabitos+'</b>';c6.onclick=function(){ir('tarefas')};box.appendChild(c6);
if(d.dolar){var c7=vidro('DÓLAR','USD');c7.appendChild(el('div','grande','R$ '+d.dolar.valor.toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3})));c7.appendChild(el('p',d.dolar.variacao>=0?'pos':'neg',(d.dolar.variacao>=0?'▲ ':'▼ ')+Math.abs(d.dolar.variacao).toFixed(2)+'% hoje'));c7.onclick=function(){ir('mercado')};box.appendChild(c7)}
var c4=vidro('DASHBOARD · MÊS','D');var gr4=el('div','grande dk','—');c4.appendChild(gr4);var sb4=el('p','dsub','toque para abrir');c4.appendChild(sb4);var sp4=el('div','dspark');c4.appendChild(sp4);c4.onclick=function(){ir('dashboard')};box.appendChild(c4);api('/api/empresa?p=mes').then(function(e){var k=e.resumo.kpis;gr4.textContent=brl(k.receita);sb4.textContent=k.vendas+' vendas · gastos '+brl(k.gasto)+' · lucro '+brl(k.lucro);sp4.innerHTML=graf(e.resumo.serie,300,44,1)}).catch(function(){});
if(d.controle){var c5=vidro('CONTROLE RÁPIDO DO PC');c5.appendChild(painelCtl(['volmenos','play','volmais']));box.appendChild(c5)}
}).catch(function(){box.textContent='';box.appendChild(el('p','vazio','Sem conexão com o computador. Confira se ele está ligado, com o Nexus aberto e no mesmo Wi-Fi.'))})}
desenha();timer=setInterval(desenha,15000)}
// ---------- conversa ----------
function conversa(){cab('CONVERSA');var t=el('label','toggle');var cb=el('input');cb.type='checkbox';cb.checked=FALAR;cb.onchange=function(){FALAR=cb.checked;localStorage.setItem('nx-falar',FALAR?'1':'0')};t.appendChild(cb);t.appendChild(document.createTextNode(' Falar as respostas em voz alta'));M.appendChild(t);var t2=el('label','toggle');var c2=el('input');c2.type='checkbox';c2.id='cbEscuta';c2.checked=ESCUTA;c2.onchange=function(){if(!alternarEscuta(c2.checked))c2.checked=false};t2.appendChild(c2);t2.appendChild(document.createTextNode(' Chamar pelo nome: diga “Nexus” (com a tela ligada)'));M.appendChild(t2);
var ms=el('div');ms.id='msgs';M.appendChild(ms);if(!MSGS.length)MSGS.push(['nx','Olá'+(DONO&&DONO.apelido?', '+DONO.apelido:'')+'. Toque no microfone para falar, ou escreva.'+(INFO&&!INFO.controle?' (O controle do computador pelo celular está desligado; ligue na aba CELULAR do Nexus no PC.)':'')]);MSGS.forEach(function(x){ms.appendChild(el('div','bal '+x[0],x[1]))});
var f=el('form');f.id='entrada';var mic=el('button','botao mic');mic.type='button';mic.setAttribute('aria-label','Falar');mic.innerHTML=ic('mic');var i=el('input');i.type='text';i.placeholder='Fale com o Nexus…';i.autocomplete='off';var b=el('button','botao','Enviar');f.appendChild(mic);f.appendChild(i);f.appendChild(b);M.appendChild(f);mic.onclick=function(){gravar(mic,ms)};
f.onsubmit=function(e){e.preventDefault();var tx=i.value.trim();if(!tx)return;i.value='';MSGS.push(['eu',tx]);ms.appendChild(el('div','bal eu',tx));var w=el('div','bal nx','…');ms.appendChild(w);window.scrollTo(0,document.body.scrollHeight);
api('/api/chat',{texto:tx}).then(function(r){w.textContent=r.resposta;acoesNoBalao(w,r.acoes);MSGS.push(['nx',r.resposta]);window.scrollTo(0,document.body.scrollHeight);if(FALAR)falar(r.resposta);checarDono()}).catch(function(){w.textContent='Falha de conexão com o computador.'})};setTimeout(function(){window.scrollTo(0,document.body.scrollHeight)},50)}
var REC=null;
function gravar(btn,ms){
if(REC){REC.stop();return}
if(!window.isSecureContext||!navigator.mediaDevices||!window.MediaRecorder){aviso('Para usar o microfone, abra o Nexus pelo link de FORA DE CASA (https). Ligue em: PC → tela cheia → aba CELULAR → “Acesso fora de casa”.');return}
navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){
var tipos=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'],tp='';for(var k=0;k<tipos.length;k++)if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(tipos[k])){tp=tipos[k];break}
var r=new MediaRecorder(st,tp?{mimeType:tp}:undefined),partes=[];REC=r;btn.classList.add('gravando');var orbe=document.getElementById('orbe');
var ini=Date.now(),lim=setTimeout(function(){if(r.state==='recording')r.stop()},30000);
r.ondataavailable=function(e){if(e.data&&e.data.size)partes.push(e.data)};
r.onstop=function(){clearTimeout(lim);REC=null;btn.classList.remove('gravando');document.getElementById('aviso').style.display='none';st.getTracks().forEach(function(t){t.stop()});
if(Date.now()-ini<500||!partes.length){aviso('Segure um pouco mais: toque, fale e toque de novo.');return}
var blob=new Blob(partes,{type:(r.mimeType||tp||'audio/webm').split(';')[0]});var w=el('div','bal nx','Ouvindo…');ms.appendChild(w);window.scrollTo(0,document.body.scrollHeight);
var v=VER;fetch('/api/ouvir',{method:'POST',headers:{'Content-Type':blob.type},body:blob}).then(function(x){return x.json()}).then(function(d){if(v!==VER)return;
if(d.erro){w.textContent=d.erro;return}if(!d.texto){w.textContent='Não entendi, senhor. Tente falar mais perto do celular.';return}
var eu=el('div','bal eu',d.texto);ms.insertBefore(eu,w);MSGS.push(['eu',d.texto]);w.textContent=d.resposta||'…';acoesNoBalao(w,d.acoes);MSGS.push(['nx',d.resposta]);window.scrollTo(0,document.body.scrollHeight);if(FALAR&&d.resposta)falar(d.resposta);checarDono()}).catch(function(){w.textContent='Falha de conexão com o computador.'})};
r.start();aviso('Gravando… toque no microfone de novo para enviar.')
}).catch(function(){aviso('O celular não liberou o microfone. Permita o microfone para este site nas configurações do navegador.')})}
var AU=new Audio();AU.setAttribute('playsinline','');var LIB=false,FALANDO=false,AVISOU_VOZ=false;
function liberarAudio(){if(LIB)return;LIB=true;AU.src='data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';var p=AU.play();if(p&&p.catch)p.catch(function(){})}
['touchstart','click','keydown'].forEach(function(e){document.addEventListener(e,liberarAudio,{once:true,passive:true})});
function falar(t){FALANDO=true;pausarEscuta();fetch('/api/voz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({texto:t})}).then(function(r){if(r.status!==200){var er=r.headers.get('X-Nexus-Erro');if(er&&!AVISOU_VOZ){AVISOU_VOZ=true;aviso('Voz do PC indisponível: '+decodeURIComponent(er)+' Usando a voz do celular.')}throw 0}return r.blob()}).then(function(b){AU.onended=fimFala;AU.onerror=function(){vozCel(t)};AU.src=URL.createObjectURL(b);var p=AU.play();if(p&&p.catch)p.catch(function(){vozCel(t)})}).catch(function(){vozCel(t)})}
function fimFala(){FALANDO=false;retomarEscuta()}
function vozCel(t){if(!window.speechSynthesis){fimFala();return}var u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';var v=speechSynthesis.getVoices().filter(function(x){return x.lang.indexOf('pt')===0});if(v.length)u.voice=v[0];u.onend=fimFala;u.onerror=fimFala;speechSynthesis.cancel();speechSynthesis.speak(u)}
// ---------- escuta contínua: diga "Nexus" ----------
var SRC=window.SpeechRecognition||window.webkitSpeechRecognition,ESC=null,ESCUTA=false,ESPERA=0,FALHAS=0,TRAVA=null;
function norm(t){return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function bip(){try{var C=window.AudioContext||window.webkitAudioContext,c=new C(),o=c.createOscillator(),g=c.createGain();o.frequency.value=880;g.gain.value=.08;o.connect(g);g.connect(c.destination);o.start();setTimeout(function(){o.stop();c.close()},120)}catch(e){}if(navigator.vibrate)navigator.vibrate(60)}
function pill(){var p=document.getElementById('escutaPill');if(ESCUTA){if(!p){p=el('button','escutaPill','● Ouvindo “Nexus”');p.id='escutaPill';p.onclick=function(){alternarEscuta(false)};document.body.appendChild(p)}}else if(p)p.remove()}
function pausarEscuta(){if(ESC){try{ESC.stop()}catch(e){}}}
function retomarEscuta(){if(ESCUTA&&!FALANDO&&!document.hidden)setTimeout(iniciarEscuta,350)}
function iniciarEscuta(){if(!ESCUTA||!SRC||FALANDO||ESC)return;var r=new SRC();r.lang='pt-BR';r.continuous=true;r.interimResults=false;r.maxAlternatives=1;ESC=r;
r.onresult=function(e){FALHAS=0;for(var i=e.resultIndex;i<e.results.length;i++){if(!e.results[i].isFinal)continue;var tx=e.results[i][0].transcript.trim();if(!tx||FALANDO)continue;tratarFala(tx)}};
r.onerror=function(e){if(e.error==='not-allowed'||e.error==='service-not-allowed'){alternarEscuta(false);aviso('O celular não liberou o microfone. Permita o microfone para este site.')}else FALHAS++};
r.onend=function(){ESC=null;if(ESCUTA&&!FALANDO&&!document.hidden)setTimeout(iniciarEscuta,Math.min(4000,300+FALHAS*600))};
try{r.start()}catch(e){ESC=null}}
function tratarFala(tx){var n=norm(tx),m=/\bn[eé]x(us|os|as|is)\b|\bnex us\b/.exec(n);
if(Date.now()<ESPERA){ESPERA=0;return enviarVoz(tx)}
if(!m)return;var cmd=tx.slice(m.index+m[0].length).replace(/^[\s,.:!?-]+/,'').trim();
if(cmd.length<2){ESPERA=Date.now()+8000;bip();aviso('Pois não, senhor? Pode falar.');return}
enviarVoz(cmd)}
function enviarVoz(tx){bip();var ms=document.getElementById('msgs'),w=null;MSGS.push(['eu',tx]);if(ms){ms.appendChild(el('div','bal eu',tx));w=el('div','bal nx','…');ms.appendChild(w);window.scrollTo(0,document.body.scrollHeight)}else aviso('Ouvi: '+tx);
fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({texto:tx})}).then(function(r){if(r.status===423){checarDono();throw 0}return r.json()}).then(function(r){var rs=(r&&r.resposta)||'';var ms2=document.getElementById('msgs');if(w&&ms2&&ms2.contains(w))w.textContent=rs;MSGS.push(['nx',rs]);if(rs)falar(rs);else retomarEscuta();checarDono()}).catch(function(){if(w)w.textContent='Falha de conexão com o computador.';retomarEscuta()})}
function alternarEscuta(on){if(on&&!SRC){aviso('Este navegador não permite escutar o tempo todo. Use o Chrome no Android, ou toque no microfone.');return false}
if(on&&!window.isSecureContext){aviso('Para escutar “Nexus”, abra o app pelo link seguro (https) de FORA DE CASA.');return false}
ESCUTA=!!on;localStorage.setItem('nx-escuta',on?'1':'0');pill();if(on){liberarAudio();iniciarEscuta();try{if(navigator.wakeLock)navigator.wakeLock.request('screen').then(function(l){TRAVA=l}).catch(function(){})}catch(e){}}else{pausarEscuta();if(TRAVA){try{TRAVA.release()}catch(e){}TRAVA=null}}
var cb=document.getElementById('cbEscuta');if(cb)cb.checked=ESCUTA;return true}
document.addEventListener('visibilitychange',function(){if(document.hidden)pausarEscuta();else if(ESCUTA){try{if(navigator.wakeLock)navigator.wakeLock.request('screen').then(function(l){TRAVA=l}).catch(function(){})}catch(e){}retomarEscuta()}});
if(localStorage.getItem('nx-escuta')==='1'&&SRC){ESCUTA=true;pill();document.addEventListener('click',function(){iniciarEscuta()},{once:true})}
// ---------- estúdio ----------
function estudio(){cab('ESTÚDIO');var v=vidro('CRIAR');var ta=el('textarea');ta.rows=3;ta.placeholder='Descreva o que criar… ex.: vídeo sobre energia solar no Brasil';v.appendChild(ta);
var fm=el('div','chips');[['horizontal','16:9'],['vertical','9:16 TIKTOK'],['quadrado','1:1']].forEach(function(x){var b=el('button',FORMATO===x[0]?'on':'',x[1]);b.onclick=function(){FORMATO=x[0];[].forEach.call(fm.children,function(c){c.className=''});b.className='on'};fm.appendChild(b)});v.appendChild(fm);
var es=el('div','chips');[['automatico','AUTO'],['cinematografico','CINEMA'],['fotorrealista','FOTO'],['anime','ANIME'],['render3d','3D'],['cyberpunk','CYBERPUNK'],['minimalista','MINIMAL']].forEach(function(x){var b=el('button',ESTILO===x[0]?'on':'',x[1]);b.onclick=function(){ESTILO=x[0];[].forEach.call(es.children,function(c){c.className=''});b.className='on'};es.appendChild(b)});v.appendChild(es);
var g=el('div','grade');g.style.gridTemplateColumns='1fr 1fr 1fr';[['imagem','IMAGEM'],['site','SITE'],['video','VÍDEO']].forEach(function(x){var b=el('button','botao',x[1]);b.onclick=function(){if(!ta.value.trim())return aviso('Descreva o que criar.');api('/api/criar',{tipo:x[0],texto:ta.value,formato:FORMATO,estilo:ESTILO}).then(function(r){aviso(r.msg);ta.value='';carrega()})};g.appendChild(b)});v.appendChild(g);M.appendChild(v);
var lista=el('div');M.appendChild(lista);
function carrega(){api('/api/estudio').then(function(d){lista.textContent='';(d.tarefas||[]).forEach(function(t){var it=el('div','item');it.appendChild(el('b','',t.tipo.toUpperCase()+' · '+t.titulo));it.appendChild(el('small','',t.erro?'falhou: '+t.erro.slice(0,80):t.etapa));lista.appendChild(it)});
var gl=el('div','gal');(d.itens||[]).forEach(function(i){var a=el('a');a.href=i.url;a.target='_blank';if(i.miniatura)a.style.backgroundImage='url('+i.miniatura+')';a.appendChild(el('span','',i.tipo.toUpperCase()+' · '+new Date(i.data).toLocaleDateString('pt-BR')));gl.appendChild(a)});if((d.itens||[]).length){var vv=vidro('CRIAÇÕES · TOQUE PARA ABRIR');vv.appendChild(gl);lista.appendChild(vv)}}).catch(function(){})}
carrega();timer=setInterval(carrega,5000)}
// ---------- agenda / e-mails / outros ----------
function semGoogle(){M.appendChild(vidro('CONTA GOOGLE NÃO CONECTADA')).appendChild(el('p','','Conecte no computador: ícone da bandeja → Configurações → Conta Google.'))}
function agenda(){cab('AGENDA');api('/api/aba?n=reunioes').then(function(d){if(d.semGoogle)return semGoogle();if(d.erro)return M.appendChild(el('p','vazio',d.erro));var dia='';(d.itens||[]).forEach(function(e){var di=(e.inicio||'').slice(0,10);if(di!==dia){dia=di;M.appendChild(el('div','tit',new Date(di+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'}).toUpperCase()))}
var it=el(e.link?'a':'div','item');if(e.link){it.href=e.link;it.target='_blank'}it.appendChild(el('b','',e.titulo));it.appendChild(el('small','',(e.diaInteiro?'DIA TODO':new Date(e.inicio).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'–'+new Date(e.fim).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}))+(e.local?' · '+e.local:'')));M.appendChild(it)});if(!(d.itens||[]).length)M.appendChild(el('p','vazio','Nenhum compromisso nos próximos 7 dias.'))}).catch(function(){M.appendChild(el('p','vazio','Falha de conexão.'))})}
function emails(){cab('E-MAILS',1);api('/api/aba?n=emails').then(function(d){if(d.semGoogle)return semGoogle();if(d.erro)return M.appendChild(el('p','vazio',d.erro));M.appendChild(el('div','tit',d.total+' NÃO LIDOS'));(d.itens||[]).forEach(function(m){var a=el('a','item');a.href='https://mail.google.com/mail/u/0/#inbox/'+m.id;a.target='_blank';a.appendChild(el('b','',m.de));a.appendChild(el('div','',m.assunto));a.appendChild(el('small','',m.resumo.slice(0,110)));M.appendChild(a)})}).catch(function(){})}
function manchetes(){cab('MANCHETES',1);api('/api/aba?n=manchetes').then(function(d){(d.itens||[]).forEach(function(x){var a=el('a','item');if(/^https:/.test(x.link)){a.href=x.link;a.target='_blank'}a.appendChild(el('span','',x.titulo));a.appendChild(el('small','',x.fonte));M.appendChild(a)})}).catch(function(){})}
function clima(){cab('CLIMA',1);api('/api/aba?n=clima').then(function(d){if(d.erro)return M.appendChild(el('p','vazio',d.erro));var v=vidro(String(d.cidade).toUpperCase());v.appendChild(el('div','grande',Math.round(d.atual.temperature_2m)+'°'));[['Sensação',d.atual.apparent_temperature+'°'],['Umidade',d.atual.relative_humidity_2m+'%'],['Vento',d.atual.wind_speed_10m+' km/h'],['Chuva agora',d.atual.precipitation+' mm']].forEach(function(x){v.appendChild(el('div','l2')).innerHTML='<span>'+x[0]+'</span><b>'+x[1]+'</b>'});M.appendChild(v);
d.dias.forEach(function(x){var it=el('div','item');it.appendChild(el('b','',new Date(x.dia+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit'})+' · '+Math.round(x.max)+'° / '+Math.round(x.min)+'°'));it.appendChild(el('small','','chuva '+x.chuva+'%'));M.appendChild(it)})}).catch(function(){})}
var DPER='mes';
function compacto(v){return v>=1e6?(v/1e6).toFixed(1).replace('.',',')+' mi':v>=1e3?(v/1e3).toFixed(1).replace('.',',')+' mil':String(Math.round(v))}
function rotulo(d){return d.length===7?d.slice(5,7)+'/'+d.slice(2,4):d.slice(8,10)+'/'+d.slice(5,7)}
function num(s){s=String(s||'').replace(/[^0-9,.-]/g,'');if(s.indexOf(',')>=0)s=s.replace(/\./g,'').replace(',','.');return parseFloat(s)||0}
function dl(v,inv){if(v==null)return '';var bom=inv?v<=0:v>=0;return '<span class="'+(bom?'pos':'neg')+'">'+(v>=0?'▲ ':'▼ ')+Math.abs(v).toFixed(1).replace('.',',')+'%</span>'}
function graf(s,W,H,mini){var pl=mini?2:40,pb=mini?2:18,pt=4,pr=2,max=1,i;for(i=0;i<s.length;i++)max=Math.max(max,s[i].receita,s[i].gasto);var n=Math.max(1,s.length),bw=(W-pl-pr)/n;function y(v){return pt+(H-pt-pb)*(1-v/max)}
var o='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block">';
if(!mini)[0,.5,1].forEach(function(f){o+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y(max*f)+'" y2="'+y(max*f)+'" stroke="rgba(255,255,255,.1)"/><text x="'+(pl-4)+'" y="'+(y(max*f)+3)+'" text-anchor="end" fill="rgba(255,255,255,.55)" font-size="9">'+compacto(max*f)+'</text>'});
for(i=0;i<s.length;i++){var h=Math.max(0,H-pb-y(s[i].receita));o+='<rect x="'+(pl+bw*i+bw*.15)+'" y="'+y(s[i].receita)+'" width="'+Math.max(1,bw*.7)+'" height="'+h+'" rx="1.5" fill="#8b7bff" opacity=".9"/>'}
if(s.length>1){var pts='';for(i=0;i<s.length;i++)pts+=(pl+bw*i+bw/2)+','+y(s[i].gasto)+' ';o+='<polyline points="'+pts+'" fill="none" stroke="#ff8a8a" stroke-width="'+(mini?1.5:2)+'"/>'}
if(!mini){var pas=Math.max(1,Math.ceil(n/6));for(i=0;i<s.length;i+=pas)o+='<text x="'+(pl+bw*i+bw/2)+'" y="'+(H-4)+'" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="9">'+rotulo(s[i].d)+'</text>'}
return o+'</svg>'}
function kcard(t,val,sub,cls){var c=vidro(t);c.appendChild(el('div','grande dk '+(cls||''),val));var p=el('p','dsub');p.innerHTML=sub||'&nbsp;';c.appendChild(p);return c}
function barra(nome,v,max,txt){var d=el('div','dbar');d.appendChild(el('span','',nome));var i=el('i');var u=el('u');u.style.width=Math.max(3,(v/Math.max(1,max))*100)+'%';i.appendChild(u);d.appendChild(i);d.appendChild(el('b','',txt));return d}
function formLanc(tipo,fm){fm.textContent='';var cs=tipo==='venda'?[['valor','Valor (R$)'],['qtd','Quantidade'],['produto','Produto'],['canal','Canal (Instagram, site…)']]:tipo==='anuncio'?[['valor','Gasto (R$)'],['canal','Canal (Meta, TikTok, Google…)'],['cliques','Cliques'],['leads','Leads']]:[['valor','Valor (R$)'],['categoria','Categoria'],['nota','Observação']];var inp={};
cs.forEach(function(c){var i=el('input');i.className='dinp';i.placeholder=c[1];i.setAttribute('aria-label',c[1]);if(c[0]==='valor'||c[0]==='qtd'||c[0]==='cliques'||c[0]==='leads')i.inputMode='decimal';inp[c[0]]=i;fm.appendChild(i)});
var b=el('button','botao','Lançar');b.onclick=function(){var o={tipo:tipo};for(var k in inp)o[k]=inp[k].value.trim();o.valor=num(o.valor);if(o.qtd!==undefined)o.qtd=num(o.qtd)||1;if(o.cliques!==undefined)o.cliques=num(o.cliques);if(o.leads!==undefined)o.leads=num(o.leads);
api('/api/empresa',{acao:'add',lanc:o}).then(function(r){aviso((r&&r.msg)||'Erro');if(r&&r.ok)ir('dashboard')})};fm.appendChild(b)}
function dashboard(){cab('DASHBOARD',1);var pr=el('div','dchips');[['hoje','Hoje'],['7d','7 dias'],['mes','Mês'],['30d','30 dias'],['ano','Ano']].forEach(function(x){var b=el('button',DPER===x[0]?'on':'',x[1]);b.onclick=function(){DPER=x[0];ir('dashboard')};pr.appendChild(b)});M.appendChild(pr);
var box=el('div');M.appendChild(box);box.appendChild(el('p','vazio','Carregando…'));
api('/api/empresa?p='+DPER).then(function(d){box.textContent='';var r=d.resumo,k=r.kpis,dt=r.delta,pf=d.perfil;
if(r.alertas&&r.alertas.length){var al=vidro('ATENÇÃO','!');r.alertas.slice(0,3).forEach(function(a){al.appendChild(el('p','dal','◆ '+a))});box.appendChild(al)}
var g=el('div','grade');
g.appendChild(kcard('RECEITA',brl(k.receita),dl(dt.receita),'pos'));g.appendChild(kcard('VENDAS',String(k.vendas),dl(dt.vendas)+(k.itens!==k.vendas?' '+k.itens+' itens':'')));
g.appendChild(kcard('GASTOS',brl(k.gasto),dl(dt.gasto,1)+' anúncios '+brl(k.gastoAds),'neg'));g.appendChild(kcard('LUCRO',brl(k.lucro),dl(dt.lucro)+(k.margem!=null?' margem '+String(k.margem).replace('.',',')+'%':''),k.lucro>=0?'pos':'neg'));
g.appendChild(kcard('TICKET MÉDIO',k.ticket==null?'—':brl(k.ticket),dl(dt.ticket)));g.appendChild(kcard('ROAS',k.roas==null?'—':String(k.roas).replace('.',',')+'x','retorno dos anúncios'));
g.appendChild(kcard('CUSTO / VENDA',k.cac==null?'—':brl(k.cac),'anúncios ÷ vendas'));g.appendChild(kcard('CONVERSÃO',k.conversao==null?'—':String(k.conversao).replace('.',',')+'%',r.funil.origem==='visitas'?'vendas ÷ visitas':'vendas ÷ cliques'));box.appendChild(g);
var gc=vidro('RECEITA × GASTOS','$');gc.style.marginTop='10px';var gd=el('div');gd.innerHTML=graf(r.serie,320,150,0);gc.appendChild(gd);gc.appendChild(el('p','dsub','▮ receita   ━ gastos'));box.appendChild(gc);
var m=r.meta;if(m.receitaMes||m.vendasMes){var mc=vidro('METAS DO MÊS','M');if(m.receitaMes){mc.appendChild(barra('Receita',m.recMes,m.receitaMes,(m.pctRec||0)+'%'));mc.appendChild(el('p','dsub',brl(m.recMes)+' de '+brl(m.receitaMes)+' · projeção '+brl(m.projecaoRec)))}if(m.vendasMes){mc.appendChild(barra('Vendas',m.vendMes,m.vendasMes,(m.pctVend||0)+'%'));mc.appendChild(el('p','dsub',m.vendMes+' de '+m.vendasMes+' · projeção '+m.projecaoVend))}box.appendChild(mc)}
if(r.canais.length){var cc=vidro('CANAIS','C');var mx=0;r.canais.forEach(function(c){mx=Math.max(mx,c.receita,c.gasto)});r.canais.slice(0,5).forEach(function(c){cc.appendChild(barra(c.canal,c.receita,mx,brl(c.receita)));cc.appendChild(el('p','dsub','gasto '+brl(c.gasto)+(c.roas!=null?' · ROAS '+String(c.roas).replace('.',',')+'x':'')+' · '+c.vendas+' vendas'))});box.appendChild(cc)}
if(r.produtos.length){var pc=vidro('PRODUTOS','P');var mp=r.produtos[0].receita;r.produtos.slice(0,5).forEach(function(x){pc.appendChild(barra(x.nome,x.receita,mp,brl(x.receita)))});box.appendChild(pc)}
var lc=vidro('LANÇAR AGORA','+');var bt=el('div','dbtns'),fm=el('div');[['venda','+ Venda'],['anuncio','+ Anúncio'],['despesa','+ Despesa']].forEach(function(x){var b=el('button','botao',x[1]);b.onclick=function(){formLanc(x[0],fm)};bt.appendChild(b)});lc.appendChild(bt);lc.appendChild(fm);lc.appendChild(el('p','dsub','Dica: na Conversa, diga “registra uma venda de 150 reais”.'));box.appendChild(lc);
var ce=vidro((pf.nome||'MINHA EMPRESA').toUpperCase(),'E');if(pf.ramo)ce.appendChild(el('p','',pf.ramo));if(pf.descricao)ce.appendChild(el('p','dsub',pf.descricao));
var lk=el('div','dlinks');[['site','Site'],['app','App'],['instagram','Instagram'],['tiktok','TikTok'],['youtube','YouTube'],['whatsapp','WhatsApp'],['email','E-mail']].forEach(function(x){var u=pf[x[0]];if(!u)return;if(x[0]==='whatsapp')u='https://wa.me/'+String(u).replace(/\D/g,'');else if(x[0]==='email')u='mailto:'+u;var a=el('a','dlink',x[1]);a.href=u;a.target='_blank';a.rel='noopener';lk.appendChild(a)});if(lk.children.length)ce.appendChild(lk);
var eb=el('button','botao','Editar dados da empresa');eb.onclick=function(){ir('empresaedit')};ce.appendChild(eb);box.appendChild(ce);
var ia=vidro('ANÁLISE COM IA','AI');var ib=el('button','botao','Analisar com IA'),io=el('pre','dia');ib.onclick=function(){ib.disabled=true;ib.textContent='Analisando…';api('/api/empresa',{acao:'analisar',periodo:DPER}).then(function(x){ib.disabled=false;ib.textContent='Analisar de novo';io.textContent=(x&&x.texto)||'Sem resposta.'})};ia.appendChild(ib);ia.appendChild(io);box.appendChild(ia);
var lv=vidro('ÚLTIMOS LANÇAMENTOS','L');(d.lista||[]).forEach(function(x){var it=el('div','l2');var nm={venda:'Venda',receita:'Receita',anuncio:'Anúncio',despesa:'Despesa',metrica:'Métricas'}[x.tipo];var sp=el('span','',x.data.slice(8,10)+'/'+x.data.slice(5,7)+' · '+nm+(x.produto||x.canal||x.categoria?' · '+(x.produto||x.canal||x.categoria):''));var vl=el('b',x.tipo==='anuncio'||x.tipo==='despesa'?'neg':'pos',x.tipo==='metrica'?'':brl(x.valor));var xb=el('button','dx','×');xb.setAttribute('aria-label','Apagar');xb.onclick=function(){if(xb.dataset.c!=='1'){xb.dataset.c='1';xb.textContent='apagar?';setTimeout(function(){xb.dataset.c='';xb.textContent='×'},3000);return}api('/api/empresa',{acao:'apagar',id:x.id}).then(function(){ir('dashboard')})};it.appendChild(sp);it.appendChild(vl);it.appendChild(xb);lv.appendChild(it)});if(!(d.lista||[]).length)lv.appendChild(el('p','vazio','Nenhum lançamento ainda.'));box.appendChild(lv);
api('/api/empresa/social').then(function(sc){var oks=(sc||[]).filter(function(x){return x.ok});if(!oks.length)return;var rc=vidro('REDES SOCIAIS','R');oks.forEach(function(x){for(var n in (x.numeros||{})){var l=el('div','l2');l.innerHTML='<span>'+x.rede+' · '+n+'</span><b>'+x.numeros[n]+'</b>';rc.appendChild(l)}});box.insertBefore(rc,lc)}).catch(function(){})})}
function empresaedit(){cab('DADOS DA EMPRESA');var vb=el('button','voltar','‹ Dashboard');vb.onclick=function(){ir('dashboard')};M.lastChild.appendChild(vb);
api('/api/empresa?p=mes').then(function(d){var pf=d.perfil,mt=d.metas,v=vidro('EMPRESA','E');var cs=[['nome','Nome da empresa'],['ramo','Ramo / segmento'],['descricao','Informações sobre a empresa'],['site','Site (https://…)'],['app','App (link)'],['instagram','Instagram (@usuario)'],['tiktok','TikTok (@usuario)'],['youtube','YouTube'],['whatsapp','WhatsApp com DDD'],['email','E-mail'],['anuncios','Contas de anúncios (só os nomes)']],inp={};
cs.forEach(function(c){var lb=el('label','dlab',c[1]);var i=c[0]==='descricao'?el('textarea'):el('input');i.className='dinp';i.value=pf[c[0]]||'';inp[c[0]]=i;lb.appendChild(i);v.appendChild(lb)});
var l1=el('label','dlab','Meta de receita do mês (R$)'),m1=el('input');m1.className='dinp';m1.inputMode='decimal';m1.value=mt.receitaMes||'';l1.appendChild(m1);v.appendChild(l1);var l2=el('label','dlab','Meta de vendas do mês'),m2=el('input');m2.className='dinp';m2.inputMode='numeric';m2.value=mt.vendasMes||'';l2.appendChild(m2);v.appendChild(l2);
v.appendChild(el('p','dsub','Nunca coloque senhas aqui.'));var sv=el('button','botao','Salvar');sv.onclick=function(){var o={outros:pf.outros||[]};for(var k in inp)o[k]=inp[k].value.trim();api('/api/empresa',{acao:'perfil',perfil:o,metas:{receitaMes:num(m1.value),vendasMes:num(m2.value)}}).then(function(r){aviso(r&&r.ok?'Dados da empresa salvos.':'Não consegui salvar.');if(r&&r.ok)ir('dashboard')})};v.appendChild(sv);M.appendChild(v)})}
function chatRapido(){var v=vidro('FALAR COM O NEXUS','W');var ms=el('div','wmsgs');ms.id='msgs';MSGS.slice(-2).forEach(function(x){ms.appendChild(el('div','bal '+x[0],x[1]))});v.appendChild(ms);
var f=el('form','wform');var mic=el('button','botao mic');mic.type='button';mic.setAttribute('aria-label','Falar');mic.innerHTML=ic('mic');var i=el('input');i.type='text';i.placeholder='Fale com o Nexus…';i.autocomplete='off';var b=el('button','botao','Enviar');f.appendChild(mic);f.appendChild(i);f.appendChild(b);v.appendChild(f);
mic.onclick=function(){gravar(mic,ms)};
f.onsubmit=function(e){e.preventDefault();var tx=i.value.trim();if(!tx)return;i.value='';MSGS.push(['eu',tx]);ms.appendChild(el('div','bal eu',tx));var w=el('div','bal nx','…');ms.appendChild(w);while(ms.children.length>4)ms.removeChild(ms.firstChild);
api('/api/chat',{texto:tx}).then(function(r){w.textContent=r.resposta;acoesNoBalao(w,r.acoes);MSGS.push(['nx',r.resposta]);if(FALAR)falar(r.resposta);checarDono()}).catch(function(){w.textContent='Falha de conexão com o computador.'})};
return v}
function memoria(){cab('Memória',1);var filtro='todos';var bar=el('div','chips');var box=el('div');M.appendChild(bar);M.appendChild(box);
[['todos','Tudo'],['fato','Fatos'],['preferencia','Preferências'],['regra','Regras']].forEach(function(x){var b=el('button',x[0]==='todos'?'on':'',x[1]);b.onclick=function(){filtro=x[0];[].forEach.call(bar.children,function(c){c.className=''});b.className='on';desenha()};bar.appendChild(b)});
var D=null;function desenha(){box.textContent='';if(!D)return;var l=D.itens.filter(function(i){return filtro==='todos'||i.tipo===filtro}).sort(function(a,b){return b.data.localeCompare(a.data)});
l.forEach(function(i){var it=el('div','item');var t=el('small','tipo-'+i.tipo,({fato:'Fato',preferencia:'Preferência',regra:'Regra'})[i.tipo]+' · '+i.tema+' · '+new Date(i.data).toLocaleDateString('pt-BR'));it.appendChild(t);it.appendChild(el('div','',i.conteudo));box.appendChild(it)});
if(!l.length)box.appendChild(el('p','vazio','Nada aqui ainda. Use a aba Ensinar ou diga “Nexus, aprende isso: …”.'));
api('/api/aba?n=memoria').then(function(d){if((d.itens||[]).length&&filtro==='todos'){box.appendChild(el('div','tit','Memórias da versão anterior'));d.itens.forEach(function(x){box.appendChild(el('div','item',x.texto))})}}).catch(function(){})}
api('/api/conhecimento').then(function(d){D=d;desenha()}).catch(function(){box.appendChild(el('p','vazio','Falha de conexão.'))});M.appendChild(el('p','vazio','Para editar ou apagar, use a aba Memória no computador (apagar pede o PIN).'))}
function avisos(){cab('AVISOS',1);api('/api/aba?n=notificacoes').then(function(d){(d.itens||[]).forEach(function(x){var it=el('div','item');it.appendChild(el('span','',x.texto));it.appendChild(el('small','',x.hora));M.appendChild(it)})}).catch(function(){})}
// ---------- mercado ----------
function grafico(h){var W=300,H=70;if(!h||h.length<2)return el('p','vazio','Sem histórico.');var vs=h.map(function(p){return p.valor}),mn=Math.min.apply(null,vs),mx=Math.max.apply(null,vs),r=(mx-mn)||1;var pts=h.map(function(p,i){return (6+i*(W-12)/(h.length-1)).toFixed(1)+','+(6+(H-12)*(1-(p.valor-mn)/r)).toFixed(1)}).join(' ');var s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 '+W+' '+H);s.setAttribute('preserveAspectRatio','none');s.style.cssText='width:100%;height:80px;display:block;margin:8px 0';s.innerHTML='<polyline points="'+pts+'" fill="none" stroke="#9fd8ff" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';return s}
function mercado(){cab('MERCADO',1);api('/api/aba?n=mercado').then(function(d){if(d.erro)return M.appendChild(el('p','vazio',d.erro));(d.itens||[]).forEach(function(i){var cs=i.valor>1000?0:3,f=function(v){return 'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:cs,maximumFractionDigits:cs})};var v=vidro(i.nome,i.par);v.appendChild(el('div','grande',f(i.valor)));v.appendChild(el('p',i.variacao>=0?'pos':'neg',(i.variacao>=0?'▲ ':'▼ ')+Math.abs(i.variacao).toFixed(2)+'% hoje'));v.appendChild(grafico(i.hist));v.appendChild(el('div','l2')).innerHTML='<span>Máx. / mín. do dia</span><b>'+f(i.max)+' / '+f(i.min)+'</b>';M.appendChild(v)});M.appendChild(el('p','vazio','Informativo. Não é recomendação de investimento.'))}).catch(function(){M.appendChild(el('p','vazio','Falha de conexão.'))})}
// ---------- tarefas e hábitos ----------
function tarefas(){cab('TAREFAS',1);var box=el('div');M.appendChild(box);
function desenha(d){box.textContent='';var v=vidro('TAREFAS · '+d.pendentes+' PENDENTES');var f=el('form');f.style.cssText='display:flex;gap:6px;margin-bottom:10px';var i=el('input');i.type='text';i.placeholder='Nova tarefa…';f.appendChild(i);f.appendChild(el('button','botao','+'));f.onsubmit=function(e){e.preventDefault();if(i.value.trim())op({acao:'add',texto:i.value})};v.appendChild(f);
d.tarefas.forEach(function(t){var l=el('div','l2');l.style.alignItems='center';var b=el('button','botao'+(t.feita?'':' sec'),t.feita?'✓':' ');b.style.cssText='padding:6px 10px;margin-right:10px';b.onclick=function(){op({acao:'toggle',id:t.id})};var s=el('span','',t.texto+(t.data?' · '+t.data.split('-').reverse().join('/'):''));s.style.flex='1';if(t.feita)s.style.cssText='flex:1;text-decoration:line-through;opacity:.5';var x=el('button','voltar','✕');x.onclick=function(){op({acao:'del',id:t.id})};l.appendChild(b);l.appendChild(s);l.appendChild(x);v.appendChild(l)});if(!d.tarefas.length)v.appendChild(el('p','vazio','Nenhuma tarefa.'));box.appendChild(v);
var h=vidro('HÁBITOS · '+d.habitosHoje+'/'+d.totalHabitos+' HOJE');var f2=el('form');f2.style.cssText='display:flex;gap:6px;margin-bottom:10px';var i2=el('input');i2.type='text';i2.placeholder='Novo hábito…';f2.appendChild(i2);f2.appendChild(el('button','botao','+'));f2.onsubmit=function(e){e.preventDefault();if(i2.value.trim())op({acao:'habito',texto:i2.value})};h.appendChild(f2);
d.habitos.forEach(function(x){var l=el('div','l2');l.style.alignItems='center';var s=el('span','',x.nome);s.style.flex='1';var q=el('small','',x.seq+'D ');q.style.cssText='color:#ffb300;font:10px var(--mono);margin-right:8px';var b=el('button','botao'+(x.feitoHoje?'':' sec'),x.feitoHoje?'✓ HOJE':'MARCAR');b.style.padding='6px 10px';b.onclick=function(){op({acao:'marcar',id:x.id})};l.appendChild(s);l.appendChild(q);l.appendChild(b);h.appendChild(l)});if(!d.habitos.length)h.appendChild(el('p','vazio','Crie um hábito e marque todo dia.'));box.appendChild(h)}
function op(o){api('/api/tarefas',o).then(desenha).catch(function(){aviso('Falha de conexão.')})}
api('/api/aba?n=tarefas').then(desenha).catch(function(){box.appendChild(el('p','vazio','Falha de conexão.'))})}
// ---------- controle do PC ----------
var CTL={volmenos:['VOLUME −','vol-'],volmais:['VOLUME +','vol+'],mudo:['MUDO','mudo'],ant:['ANTERIOR','ant'],play:['TOCAR/PAUSAR','play'],prox:['PRÓXIMA','prox'],cheia:['TELA CHEIA','cheia'],fechar:['FECHAR TELA','fechar'],olho:['OLHO DE DEUS','olho']};
function painelCtl(lista){var g=el('div','ctl');lista.forEach(function(k){var b=el('button');b.innerHTML=ic(k);b.appendChild(el('span','',CTL[k][0]));b.onclick=function(){api('/api/comando',{acao:CTL[k][1]}).then(function(r){aviso(r.msg)}).catch(function(){aviso('Falha de conexão.')})};g.appendChild(b)});return g}
function controle(){cab('CONTROLE DO PC',1);api('/api/info').then(function(d){if(!d.controle){M.appendChild(vidro('DESLIGADO')).appendChild(el('p','','Por segurança, o controle do computador pelo celular vem desligado. Ligue no PC: tela cheia → aba CELULAR → “Permitir controlar o computador”.'));return}
var v=vidro('SOM E MÚSICA');v.appendChild(painelCtl(['volmenos','mudo','volmais','ant','play','prox']));M.appendChild(v);var w=vidro('TELA');w.appendChild(painelCtl(['cheia','fechar','olho']));M.appendChild(w);
var a=vidro('ABRIR PROGRAMA');var f=el('form');f.style.display='flex';f.style.gap='6px';var i=el('input');i.type='text';i.placeholder='ex.: Spotify, Calculadora';var b=el('button','botao','ABRIR');f.appendChild(i);f.appendChild(b);f.onsubmit=function(e){e.preventDefault();if(!i.value.trim())return;api('/api/comando',{acao:'abrir:'+i.value.trim()}).then(function(r){aviso(r.msg);i.value=''})};a.appendChild(f);M.appendChild(a)}).catch(function(){})}
// ---------- ensinar ----------
function ensinar(){cab('Ensinar');var tipo='';var v=vidro('Ensinar algo novo');var tp=el('div','chips');[['','Automático'],['fato','Fato'],['preferencia','Preferência minha'],['regra','Regra']].forEach(function(x){var b=el('button',x[0]===tipo?'on':'',x[1]);b.onclick=function(){tipo=x[0];[].forEach.call(tp.children,function(c){c.className=''});b.className='on'};tp.appendChild(b)});v.appendChild(tp);
var ta=el('textarea');ta.rows=4;ta.placeholder='O que eu devo aprender? Ex.: “A reunião da empresa é às terças, 10h.”';v.appendChild(ta);var te=el('input');te.type='text';te.placeholder='Tema (opcional)';te.style.marginTop='8px';v.appendChild(te);
var b=el('button','botao','Ensinar');b.style.cssText='width:100%;margin-top:12px';b.onclick=function(){if(!ta.value.trim())return aviso('Escreva o que devo aprender.');api('/api/ensinar',{conteudo:ta.value,tipo:tipo,tema:te.value}).then(function(r){if(r.erro)return aviso(r.erro);aviso('Aprendido: '+({fato:'fato',preferencia:'preferência sua',regra:'regra'})[r.tipo]+' sobre “'+r.tema+'”.');ta.value='';te.value='';lista()})};v.appendChild(b);M.appendChild(v);
M.appendChild(el('p','vazio','Também por voz: “Nexus, aprende isso: …”, “lembra que …”, “corrige: … na verdade …”, “esquece …”.'));var box=el('div');M.appendChild(box);
function lista(){api('/api/conhecimento').then(function(d){box.textContent='';box.appendChild(el('div','tit','Aprendido recentemente'));d.itens.slice(-8).reverse().forEach(function(i){var it=el('div','item');it.appendChild(el('small','tipo-'+i.tipo,({fato:'Fato',preferencia:'Preferência',regra:'Regra'})[i.tipo]+' · '+i.tema));it.appendChild(el('div','',i.conteudo));box.appendChild(it)});if(!d.itens.length)box.appendChild(el('p','vazio','Ainda não aprendi nada com você.'))}).catch(function(){})}lista()}
// ---------- opiniões e personalidade ----------
function opinioes(){cab('Opiniões',1);api('/api/conhecimento').then(function(d){var p=d.personalidade;var v=vidro('Personalidade');[['Opiniões',({discreto:'Discreto',equilibrado:'Equilibrado',opinativo:'Opinativo'})[p.intensidade]],['Humor',p.humor+'/10'],['Formalidade',p.formalidade+'/10'],['Respostas',({curto:'Curtas',medio:'Médias',longo:'Longas'})[p.tamanho]],['Interesses',p.interesses.join(', ')||'—']].forEach(function(x){v.appendChild(el('div','l2')).innerHTML='<span>'+x[0]+'</span><b></b>';v.lastChild.lastChild.textContent=x[1]});M.appendChild(v);
M.appendChild(el('div','tit','Opiniões que eu formei'));d.opinioes.slice().reverse().forEach(function(o){var it=el('div','item');it.appendChild(el('small','',o.tema+' · certeza '+o.certeza+' · '+new Date(o.data).toLocaleDateString('pt-BR')));it.appendChild(el('div','',o.opiniao));M.appendChild(it)});if(!d.opinioes.length)M.appendChild(el('p','vazio','Pergunte “o que você acha de…?” na Conversa.'));M.appendChild(el('p','vazio','Para ajustar a personalidade ou apagar opiniões, use a aba Personalidade no computador.'))}).catch(function(){})}
// ---------- holograma ----------
var HOLONOME={nucleo:'NEXUS',sol:'Sol',mercurio:'Mercúrio',venus:'Vênus',terra:'Terra',marte:'Marte',jupiter:'Júpiter',saturno:'Saturno',urano:'Urano',netuno:'Netuno',galaxia:'Via Láctea',buraco:'Buraco negro',dados:'Painel de dados'};
function holograma(){cab('Holograma',1);var box=el('div');M.appendChild(box);
function desenha(h){box.textContent='';var v=vidro('Estado');v.appendChild(el('div','grande',h.aberto?'Projetando':'Desligado'));v.appendChild(el('p','',(HOLONOME[h.conteudo]||h.conteudo)+' · '+({piramide:'pirâmide',simples:'janela / projetor',circular:'ventilador de LED'})[h.modo]));var g=el('div','grade');g.style.marginTop='12px';var a=el('button','botao',h.aberto?'Desligar':'Ligar no PC');a.onclick=function(){op({acao:h.aberto?'fechar':'abrir'})};g.appendChild(a);var c=el('button','botao sec','Este celular');c.onclick=usarCelular;g.appendChild(c);v.appendChild(g);box.appendChild(v);
var w=vidro('O que projetar');var ch=el('div','chips');Object.keys(h.conteudos||HOLONOME).forEach(function(k){var b=el('button',h.conteudo===k?'on':'',HOLONOME[k]||k);b.onclick=function(){op({acao:'conteudo',valor:k})};ch.appendChild(b)});w.appendChild(ch);box.appendChild(w);
var m=vidro('Saída');var cm=el('div','chips');[['piramide','Pirâmide'],['simples','Janela / projetor'],['circular','Ventilador de LED']].forEach(function(x){var b=el('button',h.modo===x[0]?'on':'',x[1]);b.onclick=function(){op({acao:'modo',valor:x[0]})};cm.appendChild(b)});m.appendChild(cm);box.appendChild(m);
box.appendChild(el('p','vazio','“Este celular” transforma o celular na tela da pirâmide: coloque a pirâmide de acrílico no centro da tela. Pede o PIN.'))}
function op(o){api('/api/holo',o).then(desenha).catch(function(){aviso('Falha de conexão.')})}
function usarCelular(){api('/api/holo',{acao:'parear'}).then(function(r){if(r.pin){pedirPin('usar este celular como holograma',usarCelular);return}if(r.token)location.href='/holo?h='+r.token}).catch(function(){aviso('Falha de conexão.')})}
api('/api/holo').then(desenha).catch(function(){box.appendChild(el('p','vazio','Falha de conexão.'))})}
// ---------- segurança ----------
function seguranca(){cab('Segurança',1);var v=vidro('Dono');if(!DONO||!DONO.cadastrado){v.appendChild(el('p','','Nenhum dono vinculado. Abra o Nexus no computador para vincular.'));M.appendChild(v);return}
v.appendChild(el('div','grande',DONO.nome));v.appendChild(el('p',DONO.sessao?'pos':'neg',DONO.bloqueio?'Modo bloqueio ativo':DONO.sessao?'Sessão ativa':'Sem sessão'));M.appendChild(v);
var b=vidro('Modo bloqueio');b.appendChild(el('p','','Trava o Nexus na hora, no PC e aqui. Só volta com o PIN.'));var bt=el('button','botao','Bloquear agora');bt.style.cssText='width:100%;margin-top:10px';bt.onclick=bloquear;b.appendChild(bt);M.appendChild(b);
M.appendChild(el('p','vazio','Ações sensíveis (apagar memória, mandar mensagem, lançar finanças) sempre pedem o PIN. O PIN nunca fica guardado no celular.'))}
function bloquear(){if(!confirm('Bloquear o Nexus agora? Ele só volta a funcionar com o PIN.'))return;api('/api/bloquear',{}).catch(function(){}).then(function(){checarDono()})}
document.getElementById('cadeado').onclick=bloquear;
// ---------- dono: trava e PIN ----------
var DONO=null,PIN_ACAO=null;
var VISTO=Number(localStorage.getItem('nx-av')||0);function checarAviso(){fetch('/api/rotinas/aviso').then(function(r){return r.ok?r.json():null}).then(function(a){if(a&&a.ts>VISTO&&Date.now()-a.ts<10*60000){VISTO=a.ts;localStorage.setItem('nx-av',String(a.ts));aviso('⏰ '+a.texto);if(navigator.vibrate)navigator.vibrate([200,100,200])}else if(a&&a.ts>VISTO){VISTO=a.ts}}).catch(function(){})}setInterval(checarAviso,20000);
function checarDono(){fetch('/api/dono').then(function(r){return r.json()}).then(function(d){DONO=d;if(!d.cadastrado){fecharPin();return}document.getElementById('cadeado').style.display=d.bloqueio?'none':'';
if(d.bloqueio)pedirPin('',null,'Modo bloqueio','O Nexus está travado. Digite o PIN para liberar.');else if(!d.sessao&&!d.convidado)pedirPin('',null,'Olá'+(d.apelido?', '+d.apelido:''),'Digite o PIN para eu voltar a receber suas ordens.');else if(d.pendente)pedirPin(d.pendente,null);else if(!PIN_ACAO)fecharPin()}).catch(function(){})}
function fecharPin(){var t=document.getElementById('trava');t.className='';t.textContent=''}
function pedirPin(acao,depois,titulo,sub){var t=document.getElementById('trava');if(t.className==='on'&&t.dataset.a===(acao||titulo))return;t.dataset.a=acao||titulo;PIN_ACAO=depois||null;t.textContent='';var c=el('div','pin');
c.innerHTML='<svg viewBox="0 0 24 24" width="44" height="44" style="fill:none;stroke:#C9B6FF;stroke-width:1.4"><path d="M6 11h12v10H6z M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11"/></svg>';c.appendChild(el('h3','',titulo||'Confirmar com PIN'));c.appendChild(el('p','',sub||('Ação sensível: '+acao+'.')));
var pts=el('div','pontos');for(var i=0;i<6;i++)pts.appendChild(el('i'));c.appendChild(pts);var er=el('div','erro');c.appendChild(er);var pin='';
function mostra(){[].forEach.call(pts.children,function(x,i){x.className=i<pin.length?'on':''})}
function envia(){api('/api/pin',{pin:pin}).then(function(r){pin='';mostra();if(!r.ok){er.textContent=r.msg;return}fecharPin();aviso(r.acao?'Confirmado: '+String(r.resultado||'').slice(0,120):'Verificado. Bem-vindo'+(DONO&&DONO.apelido?', '+DONO.apelido:'')+'.');var f=PIN_ACAO;PIN_ACAO=null;checarDono();if(f)f();else ir(VISTA)}).catch(function(){er.textContent='Falha de conexão.'})}
var tk=el('div','teclas');['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(function(k){if(!k){tk.appendChild(el('span'));return}var b=el('button','',k);b.onclick=function(){if(k==='⌫')pin=pin.slice(0,-1);else if(pin.length<6)pin+=k;mostra();if(pin.length===6)envia()};tk.appendChild(b)});c.appendChild(tk);
if(acao){var x=el('button','botao sec','Cancelar');x.style.marginTop='18px';x.onclick=function(){PIN_ACAO=null;fetch('/api/cancelar',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}).catch(function(){});fecharPin()};c.appendChild(x)}
t.appendChild(c);t.className='on'}
setInterval(checarDono,20000);
// ---------- rotinas ----------
function rotinas(){cab('Rotinas',true);var DIAS=['D','S','T','Q','Q','S','S'],TN={rotina:'ROTINA',dieta:'DIETA',treino:'TREINO',estudo:'ESTUDO'};var tipo='rotina';
var v=vidro('Montar com o Nexus');v.appendChild(el('p','','Diga o que quer: rotina do dia, dieta, treino de futebol, estudos.'));var tp=el('div','chips');[['rotina','Rotina'],['dieta','Dieta'],['treino','Treino'],['estudo','Estudo']].forEach(function(x){var b=el('button',x[0]===tipo?'on':'',x[1]);b.onclick=function(){tipo=x[0];[].forEach.call(tp.children,function(c){c.className=''});b.className='on'};tp.appendChild(b)});v.appendChild(tp);
var ta=el('textarea');ta.rows=3;ta.placeholder='Ex.: monta minha rotina de futebol, treino 4 vezes por semana, à tarde';v.appendChild(ta);
var bt=el('button','botao','MONTAR');bt.style.marginTop='8px';bt.onclick=function(){if(ta.value.trim().length<5){aviso('Conte o que quer montar.');return}bt.disabled=true;bt.textContent='MONTANDO…';api('/api/rotinas',{acao:'montar',pedido:ta.value,tipo:tipo}).then(function(r){aviso((r&&r.msg)||'Não consegui.');ta.value='';desenha()}).catch(function(){}).then(function(){bt.disabled=false;bt.textContent='MONTAR'})};v.appendChild(bt);
v.appendChild(el('p','mini','Dietas e treinos são planos gerais; não substituem nutricionista, médico ou preparador físico.'));M.appendChild(v);
var box=el('div');M.appendChild(box);
function desenha(){api('/api/rotinas').then(function(d){box.textContent='';if(!d)return;if(d.proximo){var pv=vidro('PRÓXIMO PASSO');pv.appendChild(el('div','grande',d.proximo.hora));pv.appendChild(el('p','',d.proximo.titulo+' · '+d.proximo.rotina));box.appendChild(pv)}
(d.rotinas||[]).forEach(function(r){var c=vidro(r.nome,TN[r.tipo]||'');if(!r.ativa)c.style.opacity='.55';var dd=el('div','rdias');DIAS.forEach(function(n,i){var x=el('i',r.dias.indexOf(i)>=0?'on':'',n);dd.appendChild(x)});c.appendChild(dd);
r.passos.forEach(function(p){var l=el('div','rpasso'+(p.feito?' feito':'')+(r.hoje&&p.hoje===false?' fora':''));var ck=el('button','rck',p.feito?'✓':'');ck.disabled=!r.hoje||p.hoje===false;ck.onclick=function(){api('/api/rotinas',{acao:'marcar',rid:r.id,pid:p.id}).then(desenha)};l.appendChild(ck);l.appendChild(el('b','',p.hora));var t=el('div');t.appendChild(el('span','',p.titulo+(p.min?' · '+p.min+' min':'')));if(p.nota)t.appendChild(el('em','',p.nota));l.appendChild(t);c.appendChild(l)});
var ac=el('div','racoes');var b1=el('button','botao sec',r.ativa?'PAUSAR':'ATIVAR');b1.onclick=function(){api('/api/rotinas',{acao:'ativar',id:r.id,ativa:!r.ativa}).then(desenha)};var b2=el('button','botao sec','APAGAR');var conf=false;b2.onclick=function(){if(!conf){conf=true;b2.textContent='CONFIRMAR';setTimeout(function(){conf=false;b2.textContent='APAGAR'},3500);return}api('/api/rotinas',{acao:'apagar',id:r.id}).then(desenha)};ac.appendChild(b1);ac.appendChild(b2);c.appendChild(ac);box.appendChild(c)});
if(!(d.rotinas||[]).length)box.appendChild(el('p','vazio','Nenhuma rotina ainda. Peça acima.'))}).catch(function(){})}
desenha();timer=setInterval(desenha,30000)}
// ---------- mais ----------
function instalar(){if(STAND)return null;var v=vidro('INSTALAR COMO APP');var t;if(PROMPT){v.appendChild(el('p','','Coloque o Nexus na tela inicial: abre em tela cheia, como um app de verdade.'));var b=el('button','botao','INSTALAR O APP');b.onclick=function(){PROMPT.prompt();PROMPT.userChoice.then(function(){PROMPT=null})};v.appendChild(b)}else if(IOS){v.appendChild(el('p','','No iPhone: toque em Compartilhar (quadrado com seta) e depois em Adicionar à Tela de Início.'))}else if(location.protocol!=='https:'){v.appendChild(el('p','','Para instalar como app de verdade, abra o Nexus pelo link seguro (https) do QR Code Fora de casa, no PC, aba Celular. Pelo Wi-Fi de casa (http) o Android só cria um atalho.'))}else{v.appendChild(el('p','','No Chrome: toque nos três pontinhos e em Instalar app (ou Adicionar à tela inicial).'))}return v}
function destino(){var h=(location.hash||'').replace('#','');if(h==='escuta')setTimeout(function(){var c=document.getElementById('cbEscuta');if(c&&!c.checked){c.checked=true;c.onchange()}},500);return {conversa:'conversa',escuta:'conversa',dashboard:'dashboard',leads:'leads',sites:'sites'}[h]||'inicio'}
// ---------- leads (clientes para sites) ----------
var LSUB='buscar',LRES=null,LFILTRO='novo',LETAPAS=[['novo','Novos'],['contatado','Contatados'],['respondeu','Responderam'],['proposta','Proposta'],['fechado','Fechados'],['perdido','Perdidos']];
function telB(t){var d=String(t||'').replace(/^55/,'');return d.length===11?'('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7):d.length===10?'('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6):(t||'')}
function waL(t,m){var d=String(t||'').replace(/\D/g,'');return d?'https://wa.me/'+d+'?text='+encodeURIComponent(m):''}
function lMsg(l,depois){var ov=el('div','lov');var bx=el('div','vidro lbox');bx.appendChild(el('div','tit','MENSAGEM PARA '+String(l.nome).toUpperCase()));var ta=el('textarea');ta.rows=7;ta.value='Escrevendo com IA…';bx.appendChild(ta);var g=el('div','lacoes');
var b1=el('button','botao',l.telefone?'Abrir WhatsApp':'Copiar');var b2=el('button','botao sec','Copiar');var b3=el('button','botao sec','Fechar');g.appendChild(b1);g.appendChild(b2);g.appendChild(b3);bx.appendChild(g);ov.appendChild(bx);document.body.appendChild(ov);
function fechar(){ov.remove()}b3.onclick=fechar;ov.onclick=function(e){if(e.target===ov)fechar()};
b2.onclick=function(){try{navigator.clipboard.writeText(ta.value);aviso('Copiada.')}catch(e){}};
b1.onclick=function(){var u=waL(l.telefone,ta.value);if(u){window.open(u,'_blank');api('/api/leads',{acao:'atualizar',id:l.id,p:{contato:true}}).then(function(){if(depois)depois()}).catch(function(){})}else{try{navigator.clipboard.writeText(ta.value);aviso('Sem telefone: mensagem copiada.')}catch(e){}}fechar()};
api('/api/leads',{acao:'salvar',leads:[l]}).then(function(){return api('/api/leads',{acao:'mensagem',id:l.id})}).then(function(r){ta.value=(r&&r.texto)||''}).catch(function(){ta.value='Olá! Vi o '+l.nome+' e notei que ainda não tem site. Eu crio sites profissionais com botão direto pro WhatsApp. Posso te mostrar um modelo?'})}
function lCard(l,funil,recarregar){var c=el('div','lcard'+(l.salvo?' salvo':''));var h=el('div','ltopo');h.appendChild(el('b','',l.nome));if(l.pontos>=4)h.appendChild(el('em','lquente','QUENTE'));c.appendChild(h);
var tg=el('div','ltags');[l.ramo,String(l.cidade||'').split(',')[0],l.nota?'★ '+l.nota+' ('+l.avaliacoes+')':''].forEach(function(x){if(x)tg.appendChild(el('span','',x))});c.appendChild(tg);
c.appendChild(el('div','ltel'+(l.telefone?'':' off'),l.telefone?(l.whatsapp?'WhatsApp ':'Tel. ')+telB(l.telefone):'sem telefone'));if(l.endereco)c.appendChild(el('div','lend',l.endereco));if(l.social)c.appendChild(el('div','lend','Só rede social: '+String(l.social).replace(/^https?:\/\/(www\.)?/,'').slice(0,40)));
if(funil){var ln=el('div','llinha');var s=el('select');LETAPAS.forEach(function(x){var o=el('option','',x[1]);o.value=x[0];if(l.status===x[0])o.selected=true;s.appendChild(o)});s.onchange=function(){api('/api/leads',{acao:'atualizar',id:l.id,p:{status:s.value}}).then(function(r){if(r&&r.msg&&r.msg!=='Atualizado.')aviso(r.msg);recarregar()})};ln.appendChild(s);
var v=el('input');v.type='number';v.placeholder='R$ valor';v.value=l.valor||'';v.onchange=function(){api('/api/leads',{acao:'atualizar',id:l.id,p:{valor:Number(v.value)||0}}).then(function(r){if(r&&r.msg&&r.msg!=='Atualizado.')aviso(r.msg)})};ln.appendChild(v);c.appendChild(ln)}
var a=el('div','lacoes');var bw=el('button','botao','WhatsApp');bw.onclick=function(){lMsg(l,recarregar)};a.appendChild(bw);
var bs=el('button','botao sec','Site demo');bs.onclick=function(){api('/api/leads',{acao:'salvar',leads:[l]}).then(function(){return api('/api/leads',{acao:'site',id:l.id})}).then(function(r){if(r&&r.site){SITEATUAL=r.site;ir('sites')}else aviso((r&&r.msg)||'Criando o site…')})};a.appendChild(bs);
if(l.mapa){var bm=el('a','botao sec','Mapa');bm.href=l.mapa;bm.target='_blank';a.appendChild(bm)}
if(!funil&&!l.salvo){var bf=el('button','botao sec','+ Funil');bf.onclick=function(){api('/api/leads',{acao:'salvar',leads:[l]}).then(function(){l.salvo=true;c.className='lcard salvo';bf.remove();aviso('No funil.')})};a.appendChild(bf)}
if(funil){var bx=el('button','botao sec','✕');bx.setAttribute('aria-label','Apagar');bx.onclick=function(){if(confirm('Apagar '+l.nome+' do funil?'))api('/api/leads',{acao:'apagar',id:l.id}).then(recarregar)};a.appendChild(bx)}
c.appendChild(a);return c}
function leads(){cab('LEADS');var top=el('div');M.appendChild(top);
var sb=el('div','chips');[['buscar','Buscar sem site'],['funil','Funil'],['ajustes','Ajustes']].forEach(function(x){var b=el('button',LSUB===x[0]?'on':'',x[1]);b.onclick=function(){LSUB=x[0];ir('leads')};sb.appendChild(b)});
var box=el('div');
function kpis(d){top.textContent='';var r=d.resumo||{},p=r.por||{};var g=el('div','grade');g.appendChild(kcard('NO FUNIL',String(r.total||0),(p.novo||0)+' novos'));g.appendChild(kcard('PROPOSTAS',String(p.proposta||0),brl(r.pipeline)+' em jogo'));g.appendChild(kcard('SITES VENDIDOS',String(r.fechados||0),brl(r.receita),'pos'));g.appendChild(kcard('CONVERSÃO',Math.round(r.conversao||0)+'%','este mês '+brl(r.receitaMes)));top.appendChild(g);
if(r.total){var fb=el('div','lfunil');LETAPAS.forEach(function(x){if(p[x[0]]){var s=el('div','f-'+x[0],String(p[x[0]]));s.style.flex=p[x[0]];s.title=x[1];fb.appendChild(s)}});top.appendChild(fb)}top.appendChild(sb)}
M.appendChild(box);
function recarregar(){api('/api/leads').then(function(d){kpis(d);if(LSUB==='funil')funil(d);if(LSUB==='ajustes')ajustes(d)}).catch(function(){box.textContent='';box.appendChild(el('p','vazio','Não consegui carregar os leads.'))})}
function busca(){box.textContent='';var v=vidro('ACHAR NEGÓCIOS SEM SITE','◎');var u={};try{u=JSON.parse(localStorage.getItem('nx-lbusca')||'{}')}catch(e){}
var r=el('input');r.type='text';r.placeholder='Tipo: barbearia, restaurante… (vazio = todos)';r.value=u.ramo||'';var ci=el('input');ci.type='text';ci.placeholder='Cidade, ex.: Rio Branco, AC';ci.value=u.cidade||'';ci.style.marginTop='8px';v.appendChild(r);v.appendChild(ci);
var ch=el('div','chips');['Barbearia','Salão','Restaurante','Lanchonete','Academia','Clínica','Dentista','Pet shop','Oficina','Loja de roupas'].forEach(function(x){var b=el('button','',x);b.onclick=function(){r.value=x};ch.appendChild(b)});v.appendChild(ch);
var lt=el('label','lchk');var cb=el('input');cb.type='checkbox';cb.checked=u.soTel!==false;lt.appendChild(cb);lt.appendChild(document.createTextNode(' só com telefone'));v.appendChild(lt);
var bt=el('button','botao','Buscar leads');bt.style.width='100%';bt.style.marginTop='10px';v.appendChild(bt);box.appendChild(v);var res=el('div');box.appendChild(res);
function mostra(d){res.textContent='';if(d.erro){res.appendChild(el('p','vazio',d.erro));return}var h=el('div','lres');h.appendChild(el('span','',d.leads.length+' sem site · '+d.ramo+' · '+String(d.cidade).split(',')[0]+' · '+d.fonte));res.appendChild(h);
if(d.leads.some(function(l){return !l.salvo})){var bt2=el('button','botao','Salvar todos no funil');bt2.style.width='100%';bt2.style.marginBottom='10px';bt2.onclick=function(){api('/api/leads',{acao:'salvar',leads:d.leads}).then(function(x){aviso((x.novos||0)+' lead(s) no funil.');d.leads.forEach(function(l){l.salvo=true});mostra(d);recarregar()})};res.appendChild(bt2)}
if(!d.leads.length)res.appendChild(el('p','vazio','Nada encontrado. Tente outro tipo de negócio, tire "só com telefone" ou use uma cidade vizinha. Com a chave do Google (Ajustes) a busca fica bem mais completa.'));d.leads.forEach(function(l){res.appendChild(lCard(l,false,recarregar))})}
if(LRES)mostra(LRES);
bt.onclick=function(){if(!ci.value.trim())return aviso('Coloque a cidade.');try{localStorage.setItem('nx-lbusca',JSON.stringify({ramo:r.value,cidade:ci.value,soTel:cb.checked}))}catch(e){}bt.disabled=true;bt.textContent='Buscando… (até 40 s)';res.textContent='';
api('/api/leads',{acao:'buscar',ramo:r.value,cidade:ci.value,limite:50,soComTelefone:cb.checked}).then(function(d){bt.disabled=false;bt.textContent='Buscar leads';LRES=d;mostra(d);try{res.scrollIntoView({behavior:'smooth'})}catch(e){}}).catch(function(){bt.disabled=false;bt.textContent='Buscar leads';aviso('Falha na busca. Veja a internet.')})}}
function funil(d){box.textContent='';var fc=el('div','chips');LETAPAS.forEach(function(x){var n=(d.leads||[]).filter(function(l){return l.status===x[0]}).length;var b=el('button',LFILTRO===x[0]?'on':'',x[1]+' '+n);b.onclick=function(){LFILTRO=x[0];funil(d)};fc.appendChild(b)});box.appendChild(fc);
var ls=(d.leads||[]).filter(function(l){return l.status===LFILTRO});if(!ls.length)box.appendChild(el('p','vazio',(d.leads||[]).length?'Nenhum lead nesta etapa.':'Funil vazio. Busque leads e toque em + Funil.'));ls.forEach(function(l){box.appendChild(lCard(l,true,recarregar))})}
function ajustes(d){box.textContent='';var c=d.cfg||{};var v=vidro('AJUSTES DE VENDAS');function campo(t,val,ph,tipo){v.appendChild(el('p','dsub',t));var i=el('input');i.type=tipo||'text';i.value=val||'';i.placeholder=ph;v.appendChild(i);return i}
var a=campo('Seu nome ou da sua empresa (assina a mensagem)',c.assinatura,'ex.: Pedro, da PS Sites');var p=campo('Preço padrão do site (R$)',c.preco,'ex.: 600','number');var k=campo('Chave do Google Places (opcional)',c.places,'AIza…');var px=campo('Chave do Pexels: fotos profissionais nos sites (opcional, grátis em pexels.com/api)',c.pexels,'cole a chave');
var b=el('button','botao','Salvar');b.style.marginTop='12px';b.style.width='100%';b.onclick=function(){api('/api/leads',{acao:'cfg',cfg:{assinatura:a.value,preco:Number(p.value)||0,places:k.value.trim(),pexels:px.value.trim()}}).then(function(){aviso('Salvo.')})};v.appendChild(b);
v.appendChild(el('p','dsub','Sem chave do Google, a busca junta o OpenStreetMap com uma pesquisa na internet feita pelo Gemini. Quando um lead vira FECHADO com valor, a venda entra no Dashboard.'));box.appendChild(v)}
if(LSUB==='buscar')busca();else box.appendChild(el('p','vazio','Carregando…'));recarregar()}
// ---------- criador de sites ----------
var SITEATUAL=null,SITEF='auto';
function sites(){cab('SITES');var v=vidro('CRIAR SITE PROFISSIONAL','◇');var ta=el('textarea');ta.rows=3;ta.placeholder='Ex.: barbearia Navalha de Ouro em Rio Branco, cortes clássicos e barba, estilo escuro e dourado';v.appendChild(ta);
v.appendChild(el('p','dsub','Topo do site: foto profissional, ou um objeto 3D animado'));var fm=el('div','chips');[['auto','Foto (padrão)'],['cristal','Cristal'],['esfera','Esfera'],['anel','Nó 3D'],['particulas','Partículas'],['ondas','Ondas'],['cubo','Cubo']].forEach(function(x){var b=el('button',SITEF===x[0]?'on':'',x[1]);b.onclick=function(){SITEF=x[0];[].forEach.call(fm.children,function(c){c.className=''});b.className='on'};fm.appendChild(b)});v.appendChild(fm);
var vu=el('input');vu.type='text';vu.placeholder='Vídeo de fundo: link .mp4 (ex.: do Google Flow) — opcional';v.appendChild(vu);
var mu=el('input');mu.type='text';mu.placeholder='Modelo 3D: link .glb — opcional';mu.style.marginTop='8px';v.appendChild(mu);
var wz=el('input');wz.type='text';wz.placeholder='WhatsApp do site (opcional)';wz.style.marginTop='8px';v.appendChild(wz);
var arq=(typeof siteArquivos==='function')?siteArquivos(v):null;
var bt=el('button','botao','Criar site');bt.style.width='100%';bt.style.marginTop='12px';v.appendChild(bt);var out=el('div');M.appendChild(out);M.appendChild(v);
function mostra(s){out.textContent='';if(!s)return;if(window.sitePronto)return sitePronto(out,s);var c=vidro('SITE');c.appendChild(el('p','',s.msg||'Criando…'));out.appendChild(c)}
if(SITEATUAL)mostra(SITEATUAL);if(window.sitesHistorico)sitesHistorico(M,mostra);
bt.onclick=function(){if(!ta.value.trim())return aviso('Descreva o site.');bt.disabled=true;bt.textContent='Criando… (até 1 min)';var o={texto:ta.value,forma3d:SITEF==='auto'?'':SITEF,video:vu.value.trim(),modelo:mu.value.trim(),whatsapp:wz.value.trim()};if(arq){var ax=arq();if(ax.video)o.video=ax.video;if(ax.modelo)o.modelo=ax.modelo}
api('/api/site',o).then(function(r){bt.disabled=false;bt.textContent='Criar site';SITEATUAL=r;mostra(r);window.scrollTo(0,0)}).catch(function(){bt.disabled=false;bt.textContent='Criar site';aviso('Falhou. Tente de novo.')})}}
function mais(){cab('MAIS');var ins=instalar();if(ins)M.appendChild(ins);var g=el('div','mais');[['leads','Leads'],['sites','Criar site'],['dashboard','Dashboard'],['ensinar','Ensinar'],['rotinas','Rotinas'],['agenda','Agenda'],['tarefas','Tarefas'],['memoria','Memória'],['opinioes','Opiniões'],['holograma','Holograma'],['controle','Controle do PC'],['mercado','Mercado'],['emails','E-mails'],['manchetes','Manchetes'],['clima','Clima'],['avisos','Avisos'],['seguranca','Segurança']].forEach(function(x){var b=el('button');b.innerHTML=ic(x[0]);b.appendChild(el('span','',x[1]));b.onclick=function(){ir(x[0])};g.appendChild(b)});M.appendChild(g)}



// ===== NEXUS LIVRE: telas próprias (as demais vêm da versão do celular ligada ao PC) =====
var G=NXL.G,S=NXL.S;
IC.chaves='M14.5 9.5a4 4 0 1 0-5 5L4 20v-3h3v-3h3l1.5-1.5 M16 8h.01';IC.backup='M12 3v12 M7 10l5 5 5-5 M4 20h16';IC.sobre='M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0';
function pcOff(t){cab(t,1);var v=vidro('PRECISA DO COMPUTADOR');v.appendChild(el('p','','Esta parte usa o Nexus do computador (e-mails, controle do PC, estúdio de vídeo, holograma). Este app funciona sem o PC e faz: conversa com IA e voz, pesquisa na web, clima, tarefas e lembretes, câmera com IA, dashboard da empresa, rotinas, memória e atalhos de WhatsApp/ligação/mapa.'));M.appendChild(v)}
function estudio(){ir('sites')}
['emails','manchetes','mercado','avisos','controle','holograma','opinioes'].forEach(function(n){var t={emails:'E-MAILS',manchetes:'MANCHETES',mercado:'MERCADO',avisos:'AVISOS',controle:'CONTROLE DO PC',holograma:'HOLOGRAMA',opinioes:'OPINIÕES',estudio:'ESTÚDIO'}[n];window[n]=function(){pcOff(t)}});
function cfgL(){return NXL.cfg()}
function boasvindas(){var v=vidro('BEM-VINDO AO NEXUS','1');v.appendChild(el('p','','Seu assistente pessoal, que funciona direto no celular, sem precisar do computador ligado. Tudo fica guardado só neste aparelho.'));
var n=el('input');n.className='dinp';n.placeholder='Seu nome';var a=el('input');a.className='dinp';a.placeholder='Como quer ser chamado? (ex.: chefe)';var k=el('input');k.className='dinp';k.type='password';k.placeholder='Chave gratuita do Groq (opcional agora)';k.autocomplete='off';
v.appendChild(n);v.appendChild(a);v.appendChild(k);var l=el('a','dlink','Criar chave grátis no Groq');l.href='https://console.groq.com/keys';l.target='_blank';l.rel='noopener';v.appendChild(l);
var b=el('button','botao','Começar');b.style.cssText='width:100%;margin-top:14px';b.onclick=function(){var nome=n.value.trim();if(!nome)return aviso('Diga seu nome.');var c=cfgL();c.nome=nome;c.apelido=a.value.trim()||nome;NXL.salvarCfg(c);if(k.value.trim()){var ch=NX.brain.chaves();ch.groq=k.value.trim();S('chaves.json',ch)}checarDono();ir('inicio')};v.appendChild(b);M.appendChild(v)}
function inicio(){if(!cfgL().nome)return boasvindas();var h=new Date().getHours();M.appendChild(el('p','saudacao',(h<5?'Boa madrugada':h<12?'Bom dia':h<18?'Boa tarde':'Boa noite')+', '+(cfgL().apelido||cfgL().nome)+'.'));
var o=el('div','orbe');o.id='orbe';o.innerHTML='<i></i><i></i><i></i><div class="esfera"></div>';M.appendChild(o);M.appendChild(el('div','estado','NO SEU CELULAR'));M.appendChild(chatRapido());var at=el('div','dchips');[['Resumo do dia','Faça o resumo do meu dia'],['Clima','Como está o clima hoje?'],['Notícias','Quais as principais notícias de hoje no Brasil?']].forEach(function(x){var b=el('button','',x[0]);b.onclick=function(){var i=document.querySelector('.wform input');i.value=x[1];document.querySelector('.wform').requestSubmit()};at.appendChild(b)});[['Tarefas','tarefas'],['Olhar','olhar']].forEach(function(x){var b=el('button','',x[0]);b.onclick=function(){ir(x[1])};at.appendChild(b)});M.appendChild(at);var box=el('div');M.appendChild(box);
var ch=NX.brain.chaves();if(!ch.groq&&!ch.gemini){var cc=vidro('CONFIGURE A IA','!');cc.appendChild(el('p','','Para conversar, cole a chave gratuita do Groq.'));var bb=el('button','botao','Abrir Chaves de IA');bb.onclick=function(){ir('chaves')};cc.appendChild(bb);box.appendChild(cc)}
var c4=vidro('DASHBOARD · MÊS','D');var gr4=el('div','grande dk','—');c4.appendChild(gr4);var sb4=el('p','dsub','toque para abrir');c4.appendChild(sb4);var sp4=el('div','dspark');c4.appendChild(sp4);c4.onclick=function(){ir('dashboard')};box.appendChild(c4);
api('/api/empresa?p=mes').then(function(e){var k=e.resumo.kpis;gr4.textContent=brl(k.receita);sb4.textContent=k.vendas+' vendas · gastos '+brl(k.gasto)+' · lucro '+brl(k.lucro);sp4.innerHTML=graf(e.resumo.serie,300,44,1)}).catch(function(){});
api('/api/rotinas').then(function(d){var c=vidro('PRÓXIMO PASSO','R');if(d.proximo){c.appendChild(el('div','grande',d.proximo.hora));c.appendChild(el('p','',d.proximo.titulo));c.appendChild(el('p','dsub',d.proximo.rotina))}else{c.appendChild(el('p','vazio','Nenhum passo pendente hoje. Peça: “Nexus, monta minha rotina da manhã”.'))}c.onclick=function(){ir('rotinas')};box.appendChild(c)}).catch(function(){})}
function mais(){cab('MAIS');var ins=instalar();if(ins)M.appendChild(ins);var g=el('div','mais');[['sites','Criar site'],['rotinas','Rotinas'],['tarefas','Tarefas'],['clima','Clima'],['olhar','Olhar (câmera)'],['ensinar','Ensinar'],['memoria','Memória'],['voz','Voz'],['sobre','Sobre mim'],['chaves','Chaves de IA'],['seguranca','Segurança'],['backup','Backup']].forEach(function(x){var b=el('button');b.innerHTML=ic(x[0]);b.appendChild(el('span','',x[1]));b.onclick=function(){ir(x[0])};g.appendChild(b)});M.appendChild(g);
if(window.Notification&&Notification.permission==='default'){var n=vidro('AVISOS DAS ROTINAS');n.appendChild(el('p','','Receba o aviso na hora de cada passo da rotina. No iPhone o aviso só chega com o app aberto ou em segundo plano recente.'));var nb=el('button','botao','Ativar avisos');nb.onclick=function(){Notification.requestPermission().then(function(){ir('mais')})};n.appendChild(nb);M.appendChild(n)}
M.appendChild(el('p','vazio','Nexus Livre · funciona sem o computador. Dados e chaves ficam só neste celular.'))}
function chaves(){cab('CHAVES DE IA',1);var ch=NX.brain.chaves(),el0=G('eleven.json',{});var v=vidro('IA GRATUITA','1');v.appendChild(el('p','','O Nexus pensa usando o Groq (grátis, rápido). Crie a chave, copie e cole aqui. Ela fica só neste celular.'));
var l=el('a','dlink','Criar chave no Groq');l.href='https://console.groq.com/keys';l.target='_blank';l.rel='noopener';v.appendChild(l);var lb=el('label','dlab','Chave do Groq (começa com gsk_)');var ig=el('input');ig.className='dinp';ig.type='password';ig.autocomplete='off';ig.value=ch.groq||'';lb.appendChild(ig);v.appendChild(lb);
var l2=el('a','dlink','Criar chave no Google AI Studio');l2.href='https://aistudio.google.com/apikey';l2.target='_blank';l2.rel='noopener';l2.style.marginTop='10px';v.appendChild(l2);var lb2=el('label','dlab','Chave do Gemini (opcional, reserva)');var ig2=el('input');ig2.className='dinp';ig2.type='password';ig2.autocomplete='off';ig2.value=ch.gemini||'';lb2.appendChild(ig2);v.appendChild(lb2);
var sv=el('button','botao','Salvar e testar');sv.style.cssText='width:100%;margin-top:12px';sv.onclick=function(){var n={};if(ig.value.trim())n.groq=ig.value.trim();if(ig2.value.trim())n.gemini=ig2.value.trim();S('chaves.json',n);var id=n.groq?'groq':n.gemini?'gemini':'';if(!id)return aviso('Chaves removidas.');sv.disabled=true;sv.textContent='Testando…';NX.brain.pedir(id,[{role:'user',content:'Responda só: ok'}]).then(function(){aviso('Funcionando! Pode conversar.')}).catch(function(e){aviso('Não funcionou: '+String(e.message||e).slice(0,110))}).then(function(){sv.disabled=false;sv.textContent='Salvar e testar'})};v.appendChild(sv);M.appendChild(v);
var w=vidro('VOZ REALISTA (OPCIONAL)','2');w.appendChild(el('p','','Sem isto, o Nexus fala com a voz do próprio celular. Com uma chave do ElevenLabs ele usa uma voz mais natural.'));var lk=el('label','dlab','Chave do ElevenLabs');var ik=el('input');ik.className='dinp';ik.type='password';ik.autocomplete='off';ik.value=el0.key||'';lk.appendChild(ik);w.appendChild(lk);
var ls=el('label','dlab','Voz');var se=el('select');se.className='dinp';[['','Voz do celular (padrão)'],['EXAVITQu4vr4xnSDxMaL','Feminina (Sarah)'],['pNInz6obpgDQGcFmaJgB','Masculina (Adam)'],['outro','Outro ID de voz…']].forEach(function(x){var o=el('option','',x[1]);o.value=x[0];se.appendChild(o)});var conhecida=['','EXAVITQu4vr4xnSDxMaL','pNInz6obpgDQGcFmaJgB'];se.value=conhecida.indexOf(el0.voz||'')>=0?(el0.voz||''):'outro';ls.appendChild(se);w.appendChild(ls);var io=el('input');io.className='dinp';io.placeholder='ID da voz (copie da aba Voz do Nexus no PC)';io.value=conhecida.indexOf(el0.voz||'')>=0?'':(el0.voz||'');io.style.display=se.value==='outro'?'':'none';se.onchange=function(){io.style.display=se.value==='outro'?'':'none'};w.appendChild(io);
var sv2=el('button','botao','Salvar voz');sv2.style.cssText='width:100%;margin-top:12px';sv2.onclick=function(){var voz=se.value==='outro'?io.value.trim():se.value;S('eleven.json',{key:ik.value.trim(),voz:voz});aviso(ik.value.trim()&&voz?'Voz salva. Ela será usada nas respostas faladas.':'Voz do celular ativada.')};w.appendChild(sv2);M.appendChild(w);
M.appendChild(cartaoVoz());M.appendChild(el('p','vazio','As chaves não saem deste aparelho: o app fala direto com o Groq/Google/ElevenLabs. Não compartilhe prints desta tela.'))}
function sobre(){cab('SOBRE MIM',1);var c=cfgL(),v=vidro('VOCÊ','1');var n=el('input');n.className='dinp';n.placeholder='Seu nome';n.value=c.nome||'';var a=el('input');a.className='dinp';a.placeholder='Como quer ser chamado';a.value=c.apelido||'';var ci=el('input');ci.className='dinp';ci.placeholder='Sua cidade (para o clima)';ci.value=c.cidade||'';var t=el('textarea');t.className='dinp';t.rows=7;t.placeholder='Conte sobre você, sua empresa, seus objetivos, rotina e gostos. O Nexus usa isso para ajudar melhor (nunca coloque senhas).';t.value=G('sobre.json',{}).texto||'';
v.appendChild(n);v.appendChild(a);v.appendChild(ci);v.appendChild(t);var b=el('button','botao','Salvar');b.style.cssText='width:100%;margin-top:12px';b.onclick=function(){var cc=cfgL();cc.cidade=ci.value.trim();cc.nome=n.value.trim();cc.apelido=a.value.trim()||cc.nome;NXL.salvarCfg(cc);S('sobre.json',{texto:t.value.slice(0,3000)});aviso('Salvo.');checarDono()};v.appendChild(b);M.appendChild(v)}
function seguranca(){cab('Segurança',1);var c=cfgL(),v=vidro('PIN DO APP','1');v.appendChild(el('p','',c.pin?'O app pede o PIN ao abrir e depois de 30 minutos parado.':'Crie um PIN de 6 números para ninguém abrir o Nexus no seu celular.'));
var o;if(c.pin){o=el('input');o.className='dinp';o.type='password';o.inputMode='numeric';o.maxLength=6;o.placeholder='PIN atual';v.appendChild(o)}var n=el('input');n.className='dinp';n.type='password';n.inputMode='numeric';n.maxLength=6;n.placeholder=c.pin?'Novo PIN (6 números)':'PIN (6 números)';v.appendChild(n);
var b=el('button','botao',c.pin?'Trocar PIN':'Criar PIN');b.style.cssText='width:100%;margin-top:12px';b.onclick=async function(){if(!/^\d{6}$/.test(n.value))return aviso('O PIN tem 6 números.');if(c.pin&&(await NXL.hash(o.value,c.pin.salt))!==c.pin.hash)return aviso('PIN atual incorreto.');var salt=Math.random().toString(36).slice(2);c.pin={salt:salt,hash:await NXL.hash(n.value,salt)};NXL.salvarCfg(c);sessionStorage.setItem('nx-ok',String(Date.now()));aviso('PIN salvo.');ir('seguranca')};v.appendChild(b);
if(c.pin){var r=el('button','botao sec','Remover PIN');r.style.cssText='width:100%;margin-top:8px';r.onclick=async function(){if((await NXL.hash(o.value,c.pin.salt))!==c.pin.hash)return aviso('Digite o PIN atual para remover.');delete c.pin;NXL.salvarCfg(c);aviso('PIN removido.');checarDono();ir('seguranca')};v.appendChild(r);var bl=el('button','botao sec','Bloquear agora');bl.style.cssText='width:100%;margin-top:8px';bl.onclick=bloquear;v.appendChild(bl)}M.appendChild(v);
M.appendChild(el('p','vazio','O PIN protege a tela do app. Os dados e as chaves ficam guardados no celular; use também a senha/biometria do aparelho.'))}
function bloquear(){if(!cfgL().pin)return aviso('Crie um PIN em Mais › Segurança para poder bloquear.');sessionStorage.setItem('nx-bloq','1');checarDono()}
document.getElementById('cadeado').onclick=bloquear;
function backup(){cab('BACKUP',1);var v=vidro('SALVAR UMA CÓPIA','1');v.appendChild(el('p','','Gera um arquivo com seus lançamentos, rotinas, memórias e dados da empresa. Guarde no iCloud/Drive. Serve também para levar tudo para outro celular.'));var lb=el('label','toggle');var cb=el('input');cb.type='checkbox';lb.appendChild(cb);lb.appendChild(document.createTextNode(' Incluir as chaves (guarde o arquivo em lugar seguro)'));v.appendChild(lb);
var b=el('button','botao','Exportar backup');b.style.cssText='width:100%;margin-top:10px';b.onclick=function(){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k.indexOf('nx:')!==0)continue;if(!cb.checked&&(k==='nx:chaves.json'||k==='nx:eleven.json'))continue;if(k==='nx:cfg.json'){try{var cc=JSON.parse(localStorage.getItem(k));delete cc.pin;o[k]=JSON.stringify(cc)}catch(e){}continue}o[k]=localStorage.getItem(k)}
var txt=JSON.stringify({nexus:'livre',versao:1,data:new Date().toISOString(),dados:o}),nome='nexus-backup-'+new Date().toISOString().slice(0,10)+'.json',f=new File([txt],nome,{type:'application/json'});
if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'Backup do Nexus'}).catch(function(){})}else{var a=document.createElement('a');a.href=URL.createObjectURL(f);a.download=nome;a.click();setTimeout(function(){URL.revokeObjectURL(a.href)},4000)}};v.appendChild(b);M.appendChild(v);
var w=vidro('RESTAURAR','2');w.appendChild(el('p','','Escolha um arquivo de backup. Os dados atuais serão substituídos.'));var fi=el('input');fi.type='file';fi.accept='.json,application/json';fi.className='dinp';fi.onchange=function(){var a=fi.files[0];if(!a)return;var rd=new FileReader();rd.onload=function(){try{var j=JSON.parse(rd.result);if(j.nexus!=='livre'||!j.dados)throw 0;if(!confirm('Substituir os dados deste celular pelo backup?'))return;Object.keys(j.dados).forEach(function(k){if(k.indexOf('nx:')===0&&k!=='nx:cfg.json')localStorage.setItem(k,j.dados[k]);else if(k==='nx:cfg.json'){var at=cfgL(),nv=JSON.parse(j.dados[k]);nv.pin=at.pin;NXL.salvarCfg(nv)}});aviso('Backup restaurado.');setTimeout(function(){location.reload()},900)}catch(e){aviso('Arquivo de backup inválido.')}};rd.readAsText(a)};w.appendChild(fi);M.appendChild(w);
var d=vidro('APAGAR TUDO','!');d.appendChild(el('p','','Remove todos os dados e chaves deste celular. Não dá para desfazer.'));var db=el('button','botao sec','Apagar tudo');db.onclick=function(){if(!confirm('Apagar TODOS os dados do Nexus neste celular?'))return;var ks=[];for(var i=0;i<localStorage.length;i++)if(localStorage.key(i).indexOf('nx:')===0)ks.push(localStorage.key(i));ks.forEach(function(k){localStorage.removeItem(k)});sessionStorage.clear();location.reload()};d.appendChild(db);M.appendChild(d)}

// ---------- VOZ v2: 3 caminhos (ElevenLabs > Gemini > voz do celular) ----------
IC.olhar=IC.olhar||'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z';IC.voz='M11 5L6 9H3v6h3l5 4z M15 9a4 4 0 0 1 0 6 M18 6a8 8 0 0 1 0 12';IC.tarefas=IC.tarefas||'M9 6h11 M9 12h11 M9 18h11 M4 6l1 1 2-2 M4 12l1 1 2-2 M4 18l1 1 2-2';IC.clima=IC.clima||'M7 18a4 4 0 1 1 1-7.9A5 5 0 0 1 18 11a3.5 3.5 0 0 1 0 7z';
var ULTVOZ='',PEND=null,AVISO_EL=false;
function prepararVoz(){try{if(window.speechSynthesis&&!window.__vp){window.__vp=true;var u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}}catch(e){}}
['touchstart','click','keydown'].forEach(function(ev){document.addEventListener(ev,function(){liberarAudio();prepararVoz();if(PEND){var b=PEND;PEND=null;tocarBlob(b,'')}},{passive:true})});
function wavBlob(b64){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Blob([u],{type:'audio/wav'})}
function ttsGemini(t){var k=NX.brain.chaves().gemini;if(!k)return Promise.resolve(null);var voz=G('vozgem.json',{}).voz||'Kore';
return fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':k},body:JSON.stringify({model:'gemini-3.8-flash-tts',input:[{type:'user_input',content:[{type:'text',text:t}]}],response_format:{type:'audio'},generation_config:{speech_config:[{voice:voz}]}})}).then(function(r){if(!r.ok)throw new Error('Gemini '+r.status);return r.json()}).then(function(j){var a=null;(j.steps||[]).forEach(function(s){if(s.type==='model_output')(s.content||[]).forEach(function(c){if(c.type==='audio')a=c.data})});if(!a)throw new Error('sem áudio');return wavBlob(a)})}
function tocarBlob(b,t){AU.onended=fimFala;AU.onerror=function(){if(t)vozCel(t);else fimFala()};AU.src=URL.createObjectURL(b);var p=AU.play();if(p&&p.catch)p.catch(function(){PEND=b;FALANDO=false;aviso('Toque na tela para ouvir a resposta.')})}
function vozCel(t){if(!window.speechSynthesis){fimFala();return}try{speechSynthesis.cancel()}catch(e){}var u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';var vs=speechSynthesis.getVoices(),v=vs.filter(function(x){return x.lang.replace('_','-').toLowerCase().indexOf('pt-br')===0});if(!v.length)v=vs.filter(function(x){return x.lang.toLowerCase().indexOf('pt')===0});if(v.length)u.voice=v[0];u.onend=fimFala;u.onerror=function(){fimFala();aviso('O celular não conseguiu falar. Veja o volume e o modo silencioso.')};setTimeout(function(){speechSynthesis.speak(u);if(speechSynthesis.paused)speechSynthesis.resume()},60)}
function falar(t){t=String(t||'').replace(/[*_#`>]/g,'').slice(0,900);if(!t.trim())return;FALANDO=true;pausarEscuta();var modo=G('vozmodo.json',{}).modo||'auto';
var p=modo==='celular'?Promise.resolve(null):fetch('/api/voz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({texto:t})}).then(function(r){if(r.status===200){ULTVOZ='ElevenLabs';return r.blob()}var er=r.headers.get('X-Nexus-Erro');if(er&&!AVISO_EL){AVISO_EL=true;aviso('ElevenLabs: '+decodeURIComponent(er))}return null});
p.then(function(b){if(b||modo==='celular')return b;return ttsGemini(t).then(function(x){if(x)ULTVOZ='Gemini';return x}).catch(function(e){aviso('Voz do Gemini falhou ('+String(e.message||e).slice(0,40)+'). Usando a do celular.');return null})}).then(function(b){if(b)tocarBlob(b,t);else{ULTVOZ='voz do celular';vozCel(t)}}).catch(function(){vozCel(t)})}
function cartaoVoz(){var w=vidro('VOZ DO NEXUS','V');w.appendChild(el('p','','Escolha como ele fala. Automático usa a voz mais natural disponível (ElevenLabs, depois Gemini, depois a do celular).'));
var m=el('select');m.className='dinp';[['auto','Automático (recomendado)'],['celular','Só a voz do celular']].forEach(function(x){var o=el('option','',x[1]);o.value=x[0];m.appendChild(o)});m.value=G('vozmodo.json',{}).modo||'auto';m.onchange=function(){S('vozmodo.json',{modo:m.value})};w.appendChild(m);
var g=el('select');g.className='dinp';['Kore','Puck','Zephyr','Charon','Aoede'].forEach(function(x){var o=el('option','','Voz Gemini: '+x);o.value=x;g.appendChild(o)});g.value=G('vozgem.json',{}).voz||'Kore';g.onchange=function(){S('vozgem.json',{voz:g.value})};w.appendChild(g);
var b=el('button','botao','Testar voz agora');b.style.cssText='width:100%;margin-top:10px';b.onclick=function(){ULTVOZ='';liberarAudio();prepararVoz();falar('Olá, aqui é o Nexus. Se você está me ouvindo, a voz está funcionando.');setTimeout(function(){aviso('Tentei falar com: '+(ULTVOZ||'…'))},2500)};w.appendChild(b);
w.appendChild(el('p','dsub','Se não ouvir nada: aumente o volume, desligue o modo silencioso (botão lateral do iPhone) e toque em Testar de novo. A voz do Gemini usa a chave do Gemini (grátis) em Chaves de IA.'));return w}
function voz(){cab('VOZ',1);M.appendChild(cartaoVoz())}
// ---------- ações na conversa (botões, imagens) ----------
function acoesNoBalao(w,ac){if(!ac||!ac.length)return;ac.forEach(function(a){if(a.tela){var bt=el('button','dlink botao',a.rot);bt.onclick=function(){ir(a.tela)};w.appendChild(el('br'));w.appendChild(bt);return}if(a.imagem){var im=new Image();im.src=a.imagem;im.alt=a.rot;im.style.cssText='display:block;max-width:100%;border-radius:14px;margin-top:8px';im.onerror=function(){im.replaceWith(el('p','dsub','Não consegui gerar a imagem agora. Tente de novo em um minuto.'))};w.appendChild(im)}else{var l=el('a','dlink',a.rot);l.href=a.url;l.target='_blank';l.rel='noopener';w.appendChild(el('br'));w.appendChild(l)}})}
// ---------- tarefas e lembretes ----------
function hora2(ts){return new Date(ts).toLocaleString('pt-BR',{weekday:'short',hour:'2-digit',minute:'2-digit'})}
function tarefas(){cab('TAREFAS');var v=vidro('TAREFAS','T'),i=el('input');i.className='dinp';i.placeholder='Nova tarefa…';var b=el('button','botao','Adicionar');b.onclick=function(){if(NXL.tarefa(i.value))ir('tarefas')};i.onkeydown=function(e){if(e.key==='Enter')b.onclick()};v.appendChild(i);v.appendChild(b);
var l=NXL.tarefas();var pend=l.filter(function(t){return!t.feito});pend.forEach(function(t){var d=el('div','l2'),ck=el('button','rck','');ck.onclick=function(){t.feito=true;S('tarefas.json',l);ir('tarefas')};d.appendChild(ck);d.appendChild(el('span','',t.texto));var x=el('button','dx','×');x.onclick=function(){S('tarefas.json',l.filter(function(y){return y!==t&&y.id!==t.id}));ir('tarefas')};d.appendChild(x);v.appendChild(d)});if(!pend.length)v.appendChild(el('p','vazio','Nada pendente. Peça: “Nexus, anota comprar café”.'));
var fe=l.filter(function(t){return t.feito}).slice(-5);if(fe.length){v.appendChild(el('p','dsub','Feitas recentemente: '+fe.map(function(t){return t.texto}).join(' · ')))}M.appendChild(v);
var w=vidro('LEMBRETES','L');w.appendChild(el('p','dsub','O aviso toca (com voz) enquanto o app estiver aberto.'));var t2=el('input');t2.className='dinp';t2.placeholder='Lembrar de…';var q=el('select');q.className='dinp';[['5','em 5 minutos'],['15','em 15 minutos'],['30','em 30 minutos'],['60','em 1 hora'],['120','em 2 horas'],['h','numa hora exata…']].forEach(function(x){var o=el('option','',x[1]);o.value=x[0];q.appendChild(o)});var hh=el('input');hh.type='time';hh.className='dinp';hh.style.display='none';q.onchange=function(){hh.style.display=q.value==='h'?'':'none'};
var b2=el('button','botao','Criar lembrete');b2.onclick=function(){var r=q.value==='h'?NXL.lembrete(t2.value,0,hh.value):NXL.lembrete(t2.value,Number(q.value),'');aviso(r);ir('tarefas')};w.appendChild(t2);w.appendChild(q);w.appendChild(hh);w.appendChild(b2);
NXL.lembretes().filter(function(x){return!x.feito}).sort(function(a,b){return a.quando-b.quando}).forEach(function(x){var d=el('div','l2');d.appendChild(el('span','',x.texto));d.appendChild(el('b','',hora2(x.quando)));var xb=el('button','dx','×');xb.onclick=function(){S('lembretes.json',NXL.lembretes().filter(function(y){return y.id!==x.id}));ir('tarefas')};d.appendChild(xb);w.appendChild(d)});M.appendChild(w)}
agenda=function(){tarefas()};
// ---------- clima ----------
function clima(){cab('CLIMA');var v=vidro('CLIMA','C'),i=el('input');i.className='dinp';i.placeholder='Cidade';i.value=cfgL().cidade||'';var b=el('button','botao','Ver clima');v.appendChild(i);v.appendChild(b);var box=el('div');v.appendChild(box);M.appendChild(v);
function ver(){box.textContent='';box.appendChild(el('p','dsub','Buscando…'));var c=cfgL();if(i.value.trim()&&i.value.trim()!==c.cidade){c.cidade=i.value.trim();NXL.salvarCfg(c)}
NXL.climaDados(i.value).then(function(d){box.textContent='';var a=d.agora;box.appendChild(el('div','grande',Math.round(a.temperature_2m)+'°'));box.appendChild(el('p','',d.local+' · '+d.desc(a.weather_code)));box.appendChild(el('p','dsub','Sensação '+Math.round(a.apparent_temperature)+'° · umidade '+a.relative_humidity_2m+'% · vento '+Math.round(a.wind_speed_10m)+' km/h'));
var nm=['Hoje','Amanhã'];d.dias.time.forEach(function(t,k){var r=el('div','l2'),dt=new Date(t+'T12:00:00');r.appendChild(el('span','',(nm[k]||dt.toLocaleDateString('pt-BR',{weekday:'long'}))+' · '+d.desc(d.dias.weather_code[k])));r.appendChild(el('b','',Math.round(d.dias.temperature_2m_min[k])+'° / '+Math.round(d.dias.temperature_2m_max[k])+'° · '+(d.dias.precipitation_probability_max[k]||0)+'%'));box.appendChild(r)})}).catch(function(e){box.textContent='';box.appendChild(el('p','vazio',String(e.message||e)))})}
b.onclick=ver;if(i.value.trim())ver()}
// ---------- olhar (câmera + IA) ----------
function reduzir(file,max){return new Promise(function(res,rej){var im=new Image(),u=URL.createObjectURL(file);im.onload=function(){var k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c.toDataURL('image/jpeg',0.8))};im.onerror=function(){rej(new Error('Não consegui abrir a foto.'))};im.src=u})}
function olhar(){cab('OLHAR');var v=vidro('CÂMERA COM IA','O');v.appendChild(el('p','','Tire uma foto (ou escolha da galeria) e pergunte: ler um texto, identificar algo, calorias de uma refeição, traduzir uma placa, explicar um gráfico…'));
var fi=el('input');fi.type='file';fi.accept='image/*';fi.setAttribute('capture','environment');fi.className='dinp';v.appendChild(fi);var pv=el('img');pv.style.cssText='display:none;max-width:100%;border-radius:14px;margin:8px 0';v.appendChild(pv);
var q=el('input');q.className='dinp';q.value='O que é isso? Descreva e diga o que for útil.';v.appendChild(q);var ch=el('div','dchips');[['Ler o texto','Leia e transcreva todo o texto da imagem.'],['Traduzir','Traduza o texto da imagem para português.'],['Calorias','Estime as calorias e macros desta refeição, de forma aproximada.'],['Explicar','Explique o que aparece aqui de forma simples.']].forEach(function(x){var b=el('button','',x[0]);b.onclick=function(){q.value=x[1]};ch.appendChild(b)});v.appendChild(ch);
var dado=null;fi.onchange=function(){if(!fi.files[0])return;reduzir(fi.files[0],1280).then(function(d){dado=d;pv.src=d;pv.style.display='block'}).catch(function(e){aviso(e.message)})};
var b=el('button','botao','Analisar');var out=el('p','');out.style.whiteSpace='pre-wrap';b.onclick=function(){if(!dado)return aviso('Escolha ou tire uma foto primeiro.');b.disabled=true;b.textContent='Analisando…';out.textContent='';NXL.olhar(dado,q.value).then(function(t){out.textContent=t;if(FALAR)falar(t)}).catch(function(e){out.textContent='Não consegui: '+String(e.message||e).slice(0,160)}).then(function(){b.disabled=false;b.textContent='Analisar'})};v.appendChild(b);v.appendChild(out);v.appendChild(el('p','dsub','A foto é enviada para a IA (Gemini/Groq) só para esta análise; nada fica guardado no app.'));M.appendChild(v)}
// ---------- SITES no celular: prévia, baixar (.zip com vídeo/3D), compartilhar ----------
IC.leads=IC.leads||'M3 4h18l-7 8v6l-4 2v-8z';IC.sites=IC.sites||'M3 5h18v14H3z M3 9h18 M7 13l-2 2 2 2 M17 13l2 2-2 2 M13 12l-2 6';
var SITEFILES={};
function siteArquivos(v){var w=el('div','sarq');function campo(rot,tipo,aceita){var l=el('label','botao sec',rot);l.style.cssText='display:block;text-align:center;margin-top:8px';var i=el('input');i.type='file';i.accept=aceita;i.style.display='none';i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;if(f.size>80*1024*1024){aviso('Arquivo grande demais (máx. 80 MB).');return}SITEFILES[tipo]=f;l.textContent='✓ '+(tipo==='video'?'Vídeo: ':'3D: ')+f.name.slice(0,28)};l.appendChild(i);w.appendChild(l)}
campo('Escolher vídeo do celular (ex.: Google Flow)','video','video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov');campo('Escolher modelo 3D (.glb)','modelo','.glb,.gltf,model/gltf-binary');v.appendChild(w);
return function(){var o={};['video','modelo'].forEach(function(t){var f=SITEFILES[t];if(f){if(!f._u)f._u=URL.createObjectURL(f);o[t]=f._u}});return o}}
// ZIP simples (sem compressão) feito aqui mesmo: index.html + pasta midia
var CRCT=null;function crc32(u){if(!CRCT){CRCT=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;CRCT[n]=c>>>0}}var x=0xFFFFFFFF;for(var i=0;i<u.length;i++)x=CRCT[(x^u[i])&255]^(x>>>8);return (x^0xFFFFFFFF)>>>0}
function zipar(arqs){var partes=[],central=[],pos=0;arqs.forEach(function(a){var nome=new TextEncoder().encode(a.nome),d=a.dados,crc=crc32(d);var h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint32(14,crc,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nome.length,true);partes.push(h.buffer,nome,d);
var c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,nome.length,true);c.setUint32(42,pos,true);central.push(c.buffer,nome);pos+=30+nome.length+d.length});
var tam=central.reduce(function(s,b){return s+(b.byteLength||b.length)},0);var e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,arqs.length,true);e.setUint16(10,arqs.length,true);e.setUint32(12,tam,true);e.setUint32(16,pos,true);return new Blob(partes.concat(central,[e.buffer]),{type:'application/zip'})}
function nomeArq(s){return String(s||'site').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'site'}
function baixar(blob,nome){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=nome;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},5000)}
function pacoteSite(s){var spec=JSON.parse(JSON.stringify(s.spec)),arqs=[],ps=[];['video','modelo'].forEach(function(t){var u=spec.hero[t];if(u&&u.indexOf('blob:')===0){var f=SITEFILES[t];var ext=f&&f.name.indexOf('.')>0?f.name.slice(f.name.lastIndexOf('.')).toLowerCase():(t==='video'?'.mp4':'.glb');var caminho='midia/'+t+ext;spec.hero[t]=caminho;ps.push(fetch(u).then(function(r){return r.arrayBuffer()}).then(function(b){arqs.push({nome:caminho,dados:new Uint8Array(b)})}))}});
return Promise.all(ps).then(function(){var html=NX.sitegen.montarSite(spec);return {html:html,arqs:arqs}})}
function sitePronto(out,s){out.textContent='';if(!s||!s.html){var c0=vidro('SITE');c0.appendChild(el('p','',(s&&s.msg)||'Não consegui criar.'));out.appendChild(c0);return}
var c=vidro('PRONTO · '+String(s.nome||'SITE').toUpperCase(),'✓');var fr=el('iframe','sprev');fr.title='Prévia do site';fr.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups');fr.srcdoc=s.html;c.appendChild(fr);
var fm=el('div','chips');[['foto','Foto'],['cristal','Cristal'],['esfera','Esfera'],['anel','Nó'],['particulas','Partículas'],['ondas','Ondas'],['cubo','Cubo']].forEach(function(x){var b=el('button',(x[0]==='foto'?s.spec.hero.tipo!=='3d':s.spec.hero.tipo==='3d'&&s.spec.hero.forma3d===x[0])?'on':'',x[1]);b.onclick=function(){if(x[0]==='foto'){s.spec.hero.tipo='foto'}else{s.spec.hero.forma3d=x[0];s.spec.hero.tipo='3d'}s.html=NX.sitegen.montarSite(s.spec);SITEATUAL=s;sitePronto(out,s)};fm.appendChild(b)});c.appendChild(el('p','dsub','Topo do site (sem vídeo/modelo):'));c.appendChild(fm);
var g=el('div','lacoes');var b1=el('button','botao','Baixar site');b1.onclick=function(){pacoteSite(s).then(function(p){var n=nomeArq(s.nome);if(!p.arqs.length)return baixar(new Blob([p.html],{type:'text/html'}),n+'.html');baixar(zipar([{nome:'index.html',dados:new TextEncoder().encode(p.html)}].concat(p.arqs)),n+'.zip')})};g.appendChild(b1);
var b2=el('button','botao sec','Tela cheia');b2.onclick=function(){var u=URL.createObjectURL(new Blob([s.html],{type:'text/html'}));window.open(u,'_blank')};g.appendChild(b2);
if(navigator.share){var b3=el('button','botao sec','Compartilhar');b3.onclick=function(){pacoteSite(s).then(function(p){var f=new File([p.html],nomeArq(s.nome)+'.html',{type:'text/html'});var d={files:[f],title:s.nome};if(navigator.canShare&&!navigator.canShare(d))return aviso('Este celular não compartilha arquivos. Use Baixar.');navigator.share(d).catch(function(){})})};g.appendChild(b3)}
c.appendChild(g);c.appendChild(el('p','dsub','Para colocar no ar grátis: abra app.netlify.com/drop no computador e arraste o arquivo baixado (ou suba no GitHub Pages, como o Nexus). Com vídeo ou 3D, o site vem em .zip: descompacte antes.'));out.appendChild(c)}
function sitesHistorico(M,mostra){var l=NXL.sites();if(!l.length)return;var v=vidro('SITES CRIADOS');l.forEach(function(it){var b=el('button','item',it.nome+' · '+new Date(it.data).toLocaleDateString('pt-BR'));b.style.cssText='width:100%;text-align:left;border:0';b.onclick=function(){var sp=JSON.parse(JSON.stringify(it.spec));['video','modelo'].forEach(function(t){if(String(sp.hero[t]||'').indexOf('blob:')===0)sp.hero[t]=''});var s={id:it.id,nome:it.nome,spec:sp,html:NX.sitegen.montarSite(sp)};SITEATUAL=s;mostra(s);window.scrollTo(0,0)};v.appendChild(b)});M.appendChild(v)}

// ================= NEXUS LAB: base (ícones, menu Mais, rotas, notificações com o app fechado) =================
Object.assign(IC, {
  saude: 'M12 21s-8-5-8-11a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 11-8 11z M7 11h3l1.5-3 2 6 1.5-3H17',
  holo: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 12l8-4.5 M12 12v9 M12 12L4 7.5',
  jogos: 'M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4z M8 11v3 M6.5 12.5h3 M15.5 12h.01 M17.5 13.5h.01',
  videos: 'M4 5h12v14H4z M16 10l5-3v10l-5-3',
  ligacao: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pesquisa: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-5-5 M8 11h6 M11 8v6',
  notif: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10 21a2 2 0 0 0 4 0'
})
function lerL(k, d) { return NXL.G(k, d) } function gravarL(k, v) { NXL.S(k, v) }
var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js', TRES = null
function carregarThree() { if (!TRES) TRES = import(THREE_URL).catch(function (e) { TRES = null; throw e }); return TRES }
function botao(t, cls, fn) { var b = el('button', 'botao' + (cls ? ' ' + cls : ''), t); if (fn) b.onclick = fn; return b }
function campoL(v, rot, tipo, valor, ph) { var l = el('label', 'lcampo'); l.appendChild(el('span', '', rot)); var i = el(tipo === 'area' ? 'textarea' : 'input'); if (tipo !== 'area') i.type = tipo || 'text'; if (valor !== undefined && valor !== null) i.value = valor; if (ph) i.placeholder = ph; l.appendChild(i); v.appendChild(l); return i }
function seletor(v, rot, opcoes, valor) { var l = el('label', 'lcampo'); l.appendChild(el('span', '', rot)); var s = el('select'); opcoes.forEach(function (o) { var op = el('option', '', o[1]); op.value = o[0]; if (String(o[0]) === String(valor)) op.selected = true; s.appendChild(op) }); l.appendChild(s); v.appendChild(l); return s }
function baixarArq(blob, nome) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove() }, 5000) }
function iaJSON(sistema, pedido) { return NX.brain.gerarTexto(sistema, pedido, ['gemini', 'groq']).then(function (t) { return NX.sitegen.jsonSeguro(t) }) }

// ---------- menu Mais, organizado ----------
function mais() {
  cab('MAIS'); var ins = instalar(); if (ins) M.appendChild(ins)
  var grupos = [
    ['CRIAR', [['sites', 'Criar site'], ['jogos', 'Criar jogo'], ['videos', 'Vídeo viral'], ['holo', 'Holograma 3D / VR']]],
    ['SAÚDE', [['saude', 'Treinos e dieta'], ['rotinas', 'Rotinas'], ['notif', 'Notificações']]],
    ['ASSISTENTE', [['ligacao', 'Ligação com o Nexus'], ['pesquisa', 'Pesquisa profunda'], ['olhar', 'Olhar (câmera)'], ['tarefas', 'Tarefas'], ['clima', 'Clima']]],
    ['AJUSTES', [['voz', 'Voz'], ['chaves', 'Chaves de IA'], ['memoria', 'Memória'], ['ensinar', 'Ensinar'], ['sobre', 'Sobre mim'], ['seguranca', 'Segurança'], ['backup', 'Backup']]]
  ]
  grupos.forEach(function (gr) {
    M.appendChild(el('div', 'maisTit', gr[0])); var g = el('div', 'mais')
    gr[1].forEach(function (x) { var b = el('button'); b.innerHTML = ic(x[0]); b.appendChild(el('span', '', x[1])); b.onclick = function () { ir(x[0]) }; g.appendChild(b) })
    M.appendChild(g)
  })
}
var TELAS_LAB = ['conversa', 'dashboard', 'leads', 'sites', 'saude', 'holo', 'jogos', 'videos', 'ligacao', 'pesquisa', 'rotinas', 'tarefas', 'clima', 'olhar', 'notif', 'mais']
function destino() {
  var h = (location.hash || '').replace('#', '').split('?')[0]
  if (h === 'escuta') { setTimeout(function () { var c = document.getElementById('cbEscuta'); if (c && !c.checked) { c.checked = true; c.onchange() } }, 400); return 'conversa' }
  return TELAS_LAB.indexOf(h) >= 0 ? h : 'inicio'
}
// quando o Nexus do computador abre estas telas dentro dele, ele manda as chaves de IA (só se este aparelho ainda não tiver)
window.addEventListener('message', function (e) {
  if (e.source !== window.parent || window.parent === window || !e.data || !e.data.nxChaves) return
  var atual = NX.brain.chaves(), nov = e.data.nxChaves
  if (!atual.groq && !atual.gemini && (nov.groq || nov.gemini)) { NXL.S('chaves.json', { groq: nov.groq || '', gemini: nov.gemini || '' }); try { ir(destino()) } catch (x) {} }
  if (e.data.nxNome && !NXL.cfg().nome) { var c = NXL.cfg(); c.nome = e.data.nxNome; c.apelido = c.apelido || 'senhor'; NXL.salvarCfg(c) }
})

// ---------- NOTIFICAÇÕES COM O APP FECHADO (ntfy) ----------
// O iPhone não deixa um site avisar em segundo plano sozinho. Solução: o app gratuito "ntfy" recebe os avisos.
// O Nexus agenda no ntfy (até 3 dias à frente) cada passo das rotinas, água, refeições e treinos.
function ntfyCfg() { return lerL('ntfy.json', {}) }
function ntfyNovoTopico() { var a = new Uint8Array(12); crypto.getRandomValues(a); return 'nexus-' + Array.from(a, function (b) { return b.toString(36).padStart(2, '0') }).join('').slice(0, 20) }
function ntfyEnviar(topico, titulo, msg, quando, tags) {
  var h = { Title: encodeURIComponent(titulo).length === titulo.length ? titulo : '=?UTF-8?B?' + btoa(unescape(encodeURIComponent(titulo))) + '?=', Tags: tags || 'bell' }
  if (quando) h.At = String(Math.floor(quando / 1000))
  return fetch('https://ntfy.sh/' + topico, { method: 'POST', headers: h, body: msg }).then(function (r) { if (!r.ok) throw new Error('ntfy ' + r.status); return r.json() })
}
function proximosAvisos(horas) {
  var fim = Date.now() + horas * 3600000, out = [], e = NX.rotinas.estadoRotinas()
  for (var d = 0; d < 4; d++) {
    var dia = new Date(); dia.setHours(0, 0, 0, 0); dia.setDate(dia.getDate() + d); var dow = dia.getDay(), chaveDia = dia.toISOString().slice(0, 10)
    e.rotinas.forEach(function (r) {
      if (!r.ativa || r.dias.indexOf(dow) < 0) return
      r.passos.forEach(function (p) {
        if (p.dias && p.dias.indexOf(dow) < 0) return
        var hm = p.hora.split(':'), t = new Date(dia); t.setHours(+hm[0], +hm[1], 0, 0)
        if (t.getTime() > Date.now() + 60000 && t.getTime() < fim) out.push({ chave: chaveDia + '|' + r.id + '|' + p.id + '|' + p.hora, quando: t.getTime(), titulo: 'Nexus · ' + r.nome, msg: p.titulo + (p.min ? ' (' + p.min + ' min)' : '') + (p.nota ? ' — ' + p.nota : ''), tags: r.tipo === 'treino' ? 'muscle' : r.tipo === 'dieta' ? 'fork_and_knife' : 'bell' })
      })
    })
  }
  return out.sort(function (a, b) { return a.quando - b.quando })
}
var NTFY_RODANDO = false
function ntfyAgendar(forcar) {
  var c = ntfyCfg(); if (!c.topico || !c.ativo || NTFY_RODANDO) return Promise.resolve(0)
  NTFY_RODANDO = true
  var feitos = lerL('ntfy-agendados.json', {}), agora = Date.now(), n = 0
  Object.keys(feitos).forEach(function (k) { if (feitos[k] < agora) delete feitos[k] })
  if (forcar) feitos = {}
  var lista = proximosAvisos(70).filter(function (a) { return !feitos[a.chave] }).slice(0, 60)
  return lista.reduce(function (p, a) { return p.then(function () { return ntfyEnviar(c.topico, a.titulo, a.msg, a.quando, a.tags).then(function () { feitos[a.chave] = a.quando; n++ }).catch(function () {}) }) }, Promise.resolve())
    .then(function () { gravarL('ntfy-agendados.json', feitos); c.ultimo = Date.now(); gravarL('ntfy.json', c); NTFY_RODANDO = false; return n })
}
setTimeout(function () { ntfyAgendar() }, 6000)
document.addEventListener('visibilitychange', function () { if (!document.hidden) ntfyAgendar() })
function notif() {
  cab('NOTIFICAÇÕES', 1); var c = ntfyCfg()
  var v = vidro('AVISOS COM O APP FECHADO', '◉')
  v.appendChild(el('p', '', 'O iPhone não deixa um site avisar sozinho em segundo plano. Por isso o Nexus usa o app gratuito ntfy para te avisar das rotinas, treinos, refeições e água, mesmo com o Nexus fechado.'))
  if (!c.topico) { c.topico = ntfyNovoTopico(); gravarL('ntfy.json', c) }
  var passos = el('ol', 'lpassos')
  ;['Instale o app "ntfy" na App Store (é grátis).', 'Toque em "Copiar canal" aqui embaixo.', 'No ntfy, toque em + (Subscribe to topic), cole o canal e confirme. Deixe o servidor padrão (ntfy.sh).', 'Volte aqui, ligue a chave e toque em "Testar aviso".'].forEach(function (t) { passos.appendChild(el('li', '', t)) })
  v.appendChild(passos)
  var canal = el('div', 'lcanal', c.topico); v.appendChild(canal)
  var g = el('div', 'lacoes')
  g.appendChild(botao('Copiar canal', 'sec', function () { try { navigator.clipboard.writeText(c.topico); aviso('Canal copiado.') } catch (e) { aviso(c.topico) } }))
  var lk = el('a', 'botao sec', 'Abrir no ntfy'); lk.href = 'ntfy://ntfy.sh/' + c.topico; g.appendChild(lk)
  v.appendChild(g)
  var lt = el('label', 'lchk'); var cb = el('input'); cb.type = 'checkbox'; cb.checked = !!c.ativo; lt.appendChild(cb); lt.appendChild(document.createTextNode(' Avisar pelo ntfy (rotinas, treinos, dieta, água)')); v.appendChild(lt)
  cb.onchange = function () { c.ativo = cb.checked; gravarL('ntfy.json', c); if (c.ativo) ntfyAgendar(true).then(function (n) { aviso(n + ' aviso(s) agendados para os próximos 3 dias.') }) }
  var g2 = el('div', 'lacoes')
  g2.appendChild(botao('Testar aviso', '', function () { ntfyEnviar(c.topico, 'Nexus', 'Teste: se você está vendo isto, os avisos funcionam! ✅', 0, 'white_check_mark').then(function () { aviso('Enviado. Olhe o ntfy.') }).catch(function () { aviso('Não consegui enviar. Veja a internet.') }) }))
  g2.appendChild(botao('Reagendar tudo', 'sec', function () { ntfyAgendar(true).then(function (n) { aviso(n + ' aviso(s) agendados.') }) }))
  v.appendChild(g2)
  v.appendChild(el('p', 'dsub', 'Os avisos são agendados para os próximos 3 dias. Abra o Nexus pelo menos a cada 2 dias para ele agendar os seguintes. Quem souber o nome do canal consegue ver os avisos: não compartilhe.'))
  if (c.ultimo) v.appendChild(el('p', 'dsub', 'Última atualização: ' + new Date(c.ultimo).toLocaleString('pt-BR')))
  M.appendChild(v)
  var p = proximosAvisos(48).slice(0, 8)
  if (p.length) { var v2 = vidro('PRÓXIMOS AVISOS'); p.forEach(function (a) { v2.appendChild(el('div', 'item', new Date(a.quando).toLocaleString('pt-BR', { weekday: 'short', hour: '2-digit', minute: '2-digit' }) + ' · ' + a.msg)) }); M.appendChild(v2) }
  else M.appendChild(el('p', 'vazio', 'Sem passos de rotina nos próximos 2 dias. Monte em Treinos e dieta ou em Rotinas.'))
}

// ================= TREINOS E DIETA =================
// Cálculos: Mifflin-St Jeor (gasto basal), fator de atividade, proteína por kg, água 35 ml/kg + treino.
// É orientação geral: para dieta de verdade (doença, gestação, atleta), procure nutricionista/médico.
var SAUDE_SUB = 'perfil'
function perfilSaude() { return lerL('saude.json', { sexo: 'm', idade: 25, peso: 75, altura: 175, atividade: 1.55, objetivo: 'manter', esporte: 'academia', posicao: 'meio', dias: 4, nivel: 'intermediario', local: 'academia', restricao: 'nenhuma', refeicoes: 5, horaTreino: '18:00', acorda: '06:30' }) }
function calcSaude(p) {
  var tmb = 10 * p.peso + 6.25 * p.altura - 5 * p.idade + (p.sexo === 'f' ? -161 : 5)
  var gasto = tmb * Number(p.atividade)
  var alvo = p.objetivo === 'perder' ? gasto * 0.8 : p.objetivo === 'ganhar' ? gasto * 1.12 : gasto
  var protKg = p.objetivo === 'manter' ? 1.8 : 2.1, gordKg = p.objetivo === 'perder' ? 0.8 : 0.95
  var prot = protKg * p.peso, gord = gordKg * p.peso, carb = Math.max(80, (alvo - prot * 4 - gord * 9) / 4)
  var agua = (p.peso * 35 + (Number(p.dias) >= 1 ? 600 : 0)) / 1000
  var imc = p.peso / Math.pow(p.altura / 100, 2)
  return { tmb: Math.round(tmb), gasto: Math.round(gasto), kcal: Math.round(alvo), prot: Math.round(prot), carb: Math.round(carb), gord: Math.round(gord), fibra: Math.round(alvo / 1000 * 14), agua: Math.round(agua * 10) / 10, copos: Math.ceil(agua * 1000 / 250), imc: Math.round(imc * 10) / 10 }
}
// alimentos: por 100 g (ou unidade) — proteína, carbo, gordura, kcal; tags: veg (sem carne), lac (tem lactose), glu (tem glúten)
var ALIM = {
  frango: { n: 'Peito de frango grelhado', p: 31, c: 0, g: 3.6, k: 165, t: '' }, patinho: { n: 'Patinho moído', p: 26, c: 0, g: 9, k: 190, t: '' }, tilapia: { n: 'Tilápia grelhada', p: 26, c: 0, g: 2.7, k: 128, t: '' },
  ovo: { n: 'Ovos', p: 13, c: 1, g: 10, k: 146, t: 'veg', un: 50, und: 'ovo(s)' }, atum: { n: 'Atum em água', p: 26, c: 0, g: 1, k: 116, t: '' }, carne: { n: 'Carne bovina magra', p: 27, c: 0, g: 8, k: 185, t: '' },
  tofu: { n: 'Tofu', p: 15, c: 3, g: 8, k: 145, t: 'veg' }, grao: { n: 'Grão-de-bico cozido', p: 9, c: 27, g: 2.6, k: 164, t: 'veg' }, lentilha: { n: 'Lentilha cozida', p: 9, c: 20, g: 0.4, k: 116, t: 'veg' },
  iogurte: { n: 'Iogurte natural', p: 4, c: 5, g: 3, k: 61, t: 'veg lac' }, queijo: { n: 'Queijo branco', p: 17, c: 3, g: 13, k: 200, t: 'veg lac' }, whey: { n: 'Whey protein', p: 78, c: 8, g: 6, k: 390, t: 'veg lac', und: 'g (≈1 scoop = 30 g)' },
  arroz: { n: 'Arroz cozido', p: 2.5, c: 28, g: 0.2, k: 128, t: 'veg' }, feijao: { n: 'Feijão cozido', p: 4.8, c: 14, g: 0.5, k: 76, t: 'veg' }, batatadoce: { n: 'Batata-doce cozida', p: 1.6, c: 18, g: 0.1, k: 77, t: 'veg' },
  macaxeira: { n: 'Macaxeira cozida', p: 0.6, c: 30, g: 0.3, k: 125, t: 'veg' }, macarrao: { n: 'Macarrão cozido', p: 5, c: 30, g: 0.9, k: 150, t: 'veg glu' }, aveia: { n: 'Aveia em flocos', p: 14, c: 58, g: 7, k: 390, t: 'veg' },
  pao: { n: 'Pão integral', p: 9, c: 45, g: 3.5, k: 250, t: 'veg glu', un: 25, und: 'fatia(s)' }, tapioca: { n: 'Tapioca (goma)', p: 0, c: 54, g: 0, k: 240, t: 'veg' }, cuscuz: { n: 'Cuscuz de milho', p: 2.2, c: 25, g: 0.7, k: 112, t: 'veg' },
  banana: { n: 'Banana', p: 1.3, c: 23, g: 0.3, k: 98, t: 'veg', un: 100, und: 'unidade(s) média(s)' }, maca: { n: 'Maçã', p: 0.3, c: 15, g: 0.2, k: 56, t: 'veg', un: 150, und: 'unidade(s)' }, mamao: { n: 'Mamão', p: 0.5, c: 11, g: 0.1, k: 45, t: 'veg' },
  azeite: { n: 'Azeite de oliva', p: 0, c: 0, g: 100, k: 884, t: 'veg', und: 'g (1 colher de sopa ≈ 8 g)' }, castanha: { n: 'Castanha-do-pará', p: 14, c: 12, g: 63, k: 650, t: 'veg', un: 4, und: 'unidade(s)' }, pasta: { n: 'Pasta de amendoim', p: 25, c: 20, g: 50, k: 590, t: 'veg' },
  leite: { n: 'Leite desnatado', p: 3.4, c: 5, g: 0.2, k: 35, t: 'veg lac', und: 'ml' }, salada: { n: 'Salada e legumes à vontade', p: 1.5, c: 5, g: 0.2, k: 25, t: 'veg', livre: true }
}
// cada refeição: [fonte de proteína], [fonte de carbo], [gordura], extras fixos
var MODELOS_REF = {
  cafe: { n: 'Café da manhã', pct: 0.22, prot: ['ovo', 'iogurte', 'queijo', 'tofu', 'whey'], carb: ['pao', 'tapioca', 'cuscuz', 'aveia'], fat: ['castanha', 'pasta'], fruta: ['banana', 'mamao', 'maca'] },
  lanche: { n: 'Lanche da manhã', pct: 0.1, prot: ['iogurte', 'whey', 'ovo', 'queijo'], carb: ['banana', 'maca', 'aveia'], fat: ['castanha', 'pasta'] },
  almoco: { n: 'Almoço', pct: 0.3, prot: ['frango', 'patinho', 'tilapia', 'carne', 'grao', 'lentilha', 'tofu'], carb: ['arroz', 'macaxeira', 'batatadoce', 'macarrao'], fat: ['azeite'], fixo: ['feijao', 'salada'] },
  tarde: { n: 'Lanche da tarde (pré-treino)', pct: 0.14, prot: ['ovo', 'whey', 'iogurte', 'atum', 'tofu'], carb: ['tapioca', 'pao', 'batatadoce', 'banana', 'cuscuz'], fat: ['pasta', 'castanha'] },
  jantar: { n: 'Jantar', pct: 0.24, prot: ['frango', 'tilapia', 'ovo', 'carne', 'atum', 'lentilha', 'tofu'], carb: ['arroz', 'batatadoce', 'macaxeira', 'cuscuz'], fat: ['azeite'], fixo: ['salada'] }
}
function podeComer(a, r) { var t = ALIM[a].t; if (r === 'vegetariano') return /veg/.test(t); if (r === 'sem lactose') return !/lac/.test(t); if (r === 'sem gluten') return !/glu/.test(t); return true }
function gramas(a, g) { var x = ALIM[a]; if (x.livre) return 'à vontade'; if (x.un) { var u = Math.max(1, Math.round(g / x.un)); return u + ' ' + x.und + ' (' + u * x.un + ' g)' } if (x.und === 'ml') return Math.round(g / 10) * 10 + ' ml'; return Math.round(g / 5) * 5 + (x.und && x.und.indexOf('g (') === 0 ? ' ' + x.und : ' g') }
function montarDieta(p, semente) {
  var c = calcSaude(p), rnd = (function (s) { return function () { s = (s * 9301 + 49297) % 233280; return s / 233280 } })(semente || 1)
  var pega = function (l) { var ok = l.filter(function (a) { return podeComer(a, p.restricao) }); return ok.length ? ok[Math.floor(rnd() * ok.length)] : null }
  var ordem = p.refeicoes >= 5 ? ['cafe', 'lanche', 'almoco', 'tarde', 'jantar'] : p.refeicoes === 4 ? ['cafe', 'almoco', 'tarde', 'jantar'] : ['cafe', 'almoco', 'jantar']
  var soma = ordem.reduce(function (s, k) { return s + MODELOS_REF[k].pct }, 0)
  var tot = { p: 0, c: 0, g: 0, k: 0 }
  var refs = ordem.map(function (k) {
    var m = MODELOS_REF[k], f = m.pct / soma, alvoP = c.prot * f, alvoC = c.carb * f, alvoG = c.gord * f, itens = [], sp = 0, sc = 0, sg = 0
    function add(a, g) { if (!a || g <= 0) return; var x = ALIM[a]; if (x.livre) { itens.push({ a: a, txt: x.n + ': à vontade' }); return } g = Math.min(g, a === 'whey' ? 40 : a === 'azeite' ? 15 : a === 'castanha' ? 20 : a === 'pasta' ? 30 : 600); sp += x.p * g / 100; sc += x.c * g / 100; sg += x.g * g / 100; itens.push({ a: a, g: g, txt: x.n + ': ' + gramas(a, g) }) }
    ;(m.fixo || []).forEach(function (a) { if (podeComer(a, p.restricao)) add(a, a === 'feijao' ? 120 : 100) })
    if (m.fruta) add(pega(m.fruta), 100)
    var pr = pega(m.prot); if (pr) add(pr, Math.max(0, alvoP - sp) / ALIM[pr].p * 100)
    var cb = pega(m.carb); if (cb && ALIM[cb].c) add(cb, Math.max(0, alvoC - sc) / ALIM[cb].c * 100)
    var gd = pega(m.fat); if (gd && alvoG - sg > 3) add(gd, (alvoG - sg) / ALIM[gd].g * 100)
    tot.p += sp; tot.c += sc; tot.g += sg
    return { nome: m.n, chave: k, itens: itens, kcal: Math.round(sp * 4 + sc * 4 + sg * 9) }
  })
  tot.k = Math.round(tot.p * 4 + tot.c * 4 + tot.g * 9)
  return { calc: c, refs: refs, total: { p: Math.round(tot.p), c: Math.round(tot.c), g: Math.round(tot.g), k: tot.k } }
}

// ---------- treinos ----------
var EX = {
  // academia (séries definidas pelo objetivo)
  supino: 'Supino reto', supinoinc: 'Supino inclinado com halteres', crucifixo: 'Crucifixo na máquina', desenvolvimento: 'Desenvolvimento com halteres', elevlat: 'Elevação lateral', triceps: 'Tríceps na polia', tricepsfr: 'Tríceps francês',
  puxada: 'Puxada frontal', remada: 'Remada curvada', remadabaixa: 'Remada baixa', pulldown: 'Pull-down com corda', rosca: 'Rosca direta', roscamart: 'Rosca martelo', facepull: 'Face pull',
  agacha: 'Agachamento livre', leg: 'Leg press 45°', extensora: 'Cadeira extensora', flexora: 'Mesa flexora', stiff: 'Stiff com barra', panturrilha: 'Panturrilha em pé', avanco: 'Avanço (passada)', elevpelvica: 'Elevação pélvica',
  prancha: 'Prancha (segundos)', abdomen: 'Abdominal infra', terra: 'Levantamento terra',
  // casa / calistenia
  flexao: 'Flexão de braço', flexaodiam: 'Flexão diamante', barra: 'Barra fixa (ou remada na mesa)', mergulho: 'Mergulho no banco', agachar: 'Agachamento livre (peso do corpo)', afundo: 'Afundo búlgaro', pontepelv: 'Ponte de glúteo', burpee: 'Burpee', polichinelo: 'Polichinelo', escalador: 'Escalador'
}
function series(p, tipo) {
  if (tipo === 'core') return '3 × 30–45 s'
  if (p.objetivo === 'ganhar') return p.nivel === 'iniciante' ? '3 × 10–12' : '4 × 8–12'
  if (p.objetivo === 'perder') return '3 × 12–15 (descanso 45 s)'
  return p.nivel === 'avancado' ? '4 × 6–10' : '3 × 8–12'
}
var SPLITS = {
  2: [['Corpo todo A', ['agacha', 'supino', 'remada', 'desenvolvimento', 'stiff', 'prancha']], ['Corpo todo B', ['leg', 'puxada', 'supinoinc', 'elevpelvica', 'rosca', 'triceps']]],
  3: [['A · Peito, ombro e tríceps', ['supino', 'supinoinc', 'crucifixo', 'desenvolvimento', 'elevlat', 'triceps']], ['B · Costas e bíceps', ['puxada', 'remada', 'remadabaixa', 'facepull', 'rosca', 'roscamart']], ['C · Pernas e abdômen', ['agacha', 'leg', 'extensora', 'flexora', 'panturrilha', 'abdomen']]],
  4: [['Superiores A', ['supino', 'remada', 'desenvolvimento', 'puxada', 'triceps', 'rosca']], ['Inferiores A', ['agacha', 'stiff', 'leg', 'flexora', 'panturrilha', 'prancha']], ['Superiores B', ['supinoinc', 'remadabaixa', 'elevlat', 'pulldown', 'tricepsfr', 'roscamart']], ['Inferiores B', ['terra', 'avanco', 'extensora', 'elevpelvica', 'panturrilha', 'abdomen']]],
  5: [['A · Peito', ['supino', 'supinoinc', 'crucifixo', 'triceps', 'prancha']], ['B · Costas', ['puxada', 'remada', 'remadabaixa', 'facepull', 'rosca']], ['C · Pernas', ['agacha', 'leg', 'extensora', 'flexora', 'panturrilha']], ['D · Ombros e braços', ['desenvolvimento', 'elevlat', 'facepull', 'roscamart', 'tricepsfr']], ['E · Posterior e glúteo', ['terra', 'stiff', 'elevpelvica', 'avanco', 'abdomen']]]
}
var CASA = [['Empurrar', ['flexao', 'flexaodiam', 'mergulho', 'burpee', 'prancha']], ['Puxar e core', ['barra', 'escalador', 'abdomen', 'prancha', 'polichinelo']], ['Pernas', ['agachar', 'afundo', 'pontepelv', 'polichinelo', 'escalador']]]
// esportes: sessões por tipo, com exercícios práticos
var ESPORTES = {
  futebol: {
    nome: 'Futebol',
    tecnica: { goleiro: ['Defesas baixas alternando lados — 3 × 10', 'Saída do gol em bola alta — 3 × 8', 'Reposição com as mãos e com os pés (precisão em cones a 30 m) — 20 repetições', 'Reação: parceiro chuta de 8 m de costas, vire e defenda — 3 × 6'], zagueiro: ['Cabeceio defensivo (bola lançada) — 3 × 10', 'Passe longo diagonal em alvo — 20 passes', 'Desarme 1×1 em corredor de 5 m — 6 rodadas', 'Domínio orientado e saída de bola sob pressão — 10 min'], lateral: ['Cruzamento após condução em velocidade — 3 × 8 cada lado', 'Tabela com o meia e infiltração — 10 repetições', 'Recomposição em sprint de 30 m — 6 repetições', '1×1 defensivo no corredor — 6 rodadas'], meio: ['Rondo 5×2 (dois toques) — 4 × 3 min', 'Passe de primeira em triângulo — 3 × 2 min', 'Giro com domínio orientado e passe vertical — 20 repetições', 'Chute de média distância — 20 chutes'], atacante: ['Finalização de primeira (cruzamento rasteiro) — 3 × 10', 'Desmarque e ataque à profundidade — 10 repetições', 'Finalização 1×1 contra o goleiro — 10 repetições', 'Proteção de bola de costas para o gol — 4 × 45 s'] },
    fisico: ['Aquecimento dinâmico + mobilidade — 10 min', 'Sprints de 20 m — 8 repetições (descanso 40 s)', 'Mudança de direção em T (agilidade) — 6 repetições', 'Tiros intervalados 15 s forte / 15 s leve — 2 blocos de 6 min', 'Pliometria: saltos em caixa ou no lugar — 3 × 8', 'Agachamento búlgaro — 3 × 10 cada perna', 'Nórdico (posterior) — 3 × 5', 'Prancha lateral — 3 × 30 s cada lado'],
    tatico: ['Jogo reduzido 4×4 com 2 coringas — 4 × 4 min', 'Posse de bola 6×3 em campo reduzido — 3 × 5 min', 'Transição: perdeu a bola, pressiona em 5 s — 10 min', 'Bola parada: escanteios e faltas ensaiadas — 15 min'],
    recuperacao: ['Trote leve — 15 min', 'Alongamento global — 10 min', 'Rolo de liberação (panturrilha, coxa, glúteo) — 10 min', 'Hidratação reforçada e sono de 8 h']
  },
  corrida: { nome: 'Corrida', sessoes: [['Intervalado', ['Aquecimento 10 min trote', '6 × 400 m forte (descanso 1 min 30 s andando)', 'Desaquecimento 10 min']], ['Regenerativo', ['30 min em ritmo bem leve (dá para conversar)', 'Alongamento 10 min']], ['Ritmo', ['Aquecimento 10 min', '20 min no ritmo de prova', 'Desaquecimento 5 min']], ['Longão', ['50–70 min leve e constante', 'Hidrate a cada 20 min']], ['Força para corredor', ['Agachamento 3 × 12', 'Avanço 3 × 10 cada perna', 'Panturrilha 3 × 15', 'Prancha 3 × 40 s']]] },
  basquete: { nome: 'Basquete', sessoes: [['Arremesso', ['100 arremessos de 5 pontos marcados (anote os acertos)', 'Lance livre — 3 × 10', 'Arremesso após drible — 30']], ['Drible e agilidade', ['Drible com as duas mãos parado — 3 × 1 min', 'Crossover em zigue-zague nos cones — 6 idas', 'Defesa: deslocamento lateral — 6 × 20 s']], ['Físico', ['Saltos verticais — 4 × 6', 'Sprints de quadra — 8', 'Core: prancha 3 × 40 s']]] },
  volei: { nome: 'Vôlei', sessoes: [['Fundamentos', ['Toque contra a parede — 3 × 50', 'Manchete em dupla — 10 min', 'Saque em alvo — 30 saques']], ['Ataque e bloqueio', ['Passada de ataque — 3 × 10', 'Saltos de bloqueio — 4 × 8', 'Pliometria — 3 × 8']], ['Físico', ['Agachamento com salto — 4 × 8', 'Deslocamento lateral — 6 × 20 s', 'Ombro: rotação externa com elástico — 3 × 15']]] },
  luta: { nome: 'Luta / boxe', sessoes: [['Técnica', ['Sombra — 3 rounds de 3 min', 'Saco: combinações jab-direto-gancho — 4 rounds de 3 min', 'Esquivas e defesa — 10 min']], ['Condicionamento', ['Corda — 5 × 2 min', 'Burpee — 5 × 10', 'Sprints — 8 × 20 s']], ['Força', ['Flexão — 4 × 12', 'Barra — 4 × máx.', 'Abdominal com giro — 3 × 20']]] },
  natacao: { nome: 'Natação', sessoes: [['Técnica', ['Aquecimento 200 m livre leve', '8 × 50 m educativo de braçada', '4 × 50 m pernada com prancha', 'Solto 100 m']], ['Resistência', ['Aquecimento 200 m', '10 × 100 m (descanso 20 s)', 'Solto 200 m']], ['Velocidade', ['Aquecimento 300 m', '12 × 25 m forte (descanso 30 s)', 'Solto 200 m']]] },
  ciclismo: { nome: 'Ciclismo', sessoes: [['Intervalado', ['Aquecimento 15 min', '5 × 4 min forte / 3 min leve', 'Desaquecimento 10 min']], ['Longo', ['1 h 30 a 2 h em ritmo moderado', 'Coma algo a cada 45 min']], ['Subida / força', ['6 × 3 min em subida ou carga alta', 'Cadência baixa (60–70 rpm)']]] }
}
var NOMES_DIA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
function diasTreino(n) { return ({ 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6] })[Math.min(6, Math.max(2, n))] }
function montarTreinos(p) {
  var dias = diasTreino(Number(p.dias)), sem = []
  if (p.esporte === 'academia' || p.esporte === 'casa') {
    var split = p.esporte === 'casa' ? CASA : SPLITS[Math.min(5, Math.max(2, dias.length))]
    dias.forEach(function (d, i) { var s = split[i % split.length]; sem.push({ dia: d, nome: s[0], itens: s[1].map(function (e) { return EX[e] + ' — ' + series(p, /prancha/.test(e) ? 'core' : '') }).concat(p.objetivo === 'perder' ? ['Cardio: 20 min de bike ou esteira (moderado)'] : []) }) })
  } else if (p.esporte === 'futebol') {
    var F = ESPORTES.futebol, pos = F.tecnica[p.posicao] || F.tecnica.meio
    var ciclo = [['Técnica da posição', pos], ['Físico (velocidade e força)', F.fisico], ['Tático e jogo', F.tatico], ['Técnica + finalização', pos.slice(0, 2).concat(['Condução em velocidade com troca de direção — 8 repetições', 'Passe de longa distância — 20 passes'])], ['Físico (resistência)', ['Corrida contínua 25 min em ritmo moderado', 'Tiros 6 × 100 m (descanso 1 min)', 'Core: prancha 3 × 45 s', 'Mobilidade de quadril — 8 min']], ['Recuperação ativa', F.recuperacao]]
    dias.forEach(function (d, i) { var s = ciclo[i % ciclo.length]; sem.push({ dia: d, nome: s[0], itens: s[1] }) })
  } else {
    var E = ESPORTES[p.esporte] || ESPORTES.corrida
    dias.forEach(function (d, i) { var s = E.sessoes[i % E.sessoes.length]; sem.push({ dia: d, nome: s[0], itens: s[1] }) })
  }
  return sem
}
function nomeEsporte(p) { return p.esporte === 'academia' ? 'Academia' : p.esporte === 'casa' ? 'Treino em casa' : (ESPORTES[p.esporte] || {}).nome || p.esporte }

// ---------- tela ----------
function saude() {
  cab('TREINOS E DIETA', 1)
  var p = perfilSaude(), c = calcSaude(p)
  var top = el('div', 'grade')
  top.appendChild(kcard('CALORIAS/DIA', c.kcal + ' kcal', p.objetivo === 'perder' ? 'para emagrecer' : p.objetivo === 'ganhar' ? 'para ganhar massa' : 'para manter'))
  top.appendChild(kcard('ÁGUA/DIA', c.agua + ' L', c.copos + ' copos de 250 ml', 'pos'))
  top.appendChild(kcard('PROTEÍNA', c.prot + ' g', 'carbo ' + c.carb + ' g · gordura ' + c.gord + ' g'))
  top.appendChild(kcard('IMC', String(c.imc).replace('.', ','), c.imc < 18.5 ? 'abaixo do peso' : c.imc < 25 ? 'peso adequado' : c.imc < 30 ? 'sobrepeso' : 'obesidade'))
  M.appendChild(top)
  var sb = el('div', 'chips'); [['perfil', 'Meus dados'], ['treino', 'Treinos'], ['dieta', 'Dieta'], ['hoje', 'Hoje']].forEach(function (x) { var b = el('button', SAUDE_SUB === x[0] ? 'on' : '', x[1]); b.onclick = function () { SAUDE_SUB = x[0]; ir('saude') }; sb.appendChild(b) }); M.appendChild(sb)
  if (SAUDE_SUB === 'perfil') return saudePerfil(p)
  if (SAUDE_SUB === 'treino') return saudeTreino(p)
  if (SAUDE_SUB === 'dieta') return saudeDieta(p)
  return saudeHoje(p)
}
function saudePerfil(p) {
  var v = vidro('MEUS DADOS', '◎')
  var sx = seletor(v, 'Sexo', [['m', 'Masculino'], ['f', 'Feminino']], p.sexo)
  var id = campoL(v, 'Idade', 'number', p.idade), ps = campoL(v, 'Peso (kg)', 'number', p.peso), al = campoL(v, 'Altura (cm)', 'number', p.altura)
  var ob = seletor(v, 'Objetivo', [['perder', 'Emagrecer'], ['manter', 'Manter o peso / condicionamento'], ['ganhar', 'Ganhar massa muscular']], p.objetivo)
  var at = seletor(v, 'Nível de atividade no dia a dia', [['1.2', 'Parado (escritório, sem treino)'], ['1.375', 'Leve (treino 1–3×/semana)'], ['1.55', 'Moderado (treino 3–5×/semana)'], ['1.725', 'Alto (treino 6–7×/semana)'], ['1.9', 'Atleta (2 treinos por dia)']], p.atividade)
  var es = seletor(v, 'Esporte principal', [['academia', 'Academia (musculação)'], ['casa', 'Treino em casa (sem aparelhos)'], ['futebol', 'Futebol'], ['corrida', 'Corrida'], ['basquete', 'Basquete'], ['volei', 'Vôlei'], ['luta', 'Luta / boxe'], ['natacao', 'Natação'], ['ciclismo', 'Ciclismo']], p.esporte)
  var po = seletor(v, 'Posição no futebol', [['goleiro', 'Goleiro'], ['zagueiro', 'Zagueiro'], ['lateral', 'Lateral'], ['meio', 'Meio-campo'], ['atacante', 'Atacante']], p.posicao)
  var di = seletor(v, 'Dias de treino por semana', [[2, '2 dias'], [3, '3 dias'], [4, '4 dias'], [5, '5 dias'], [6, '6 dias']], p.dias)
  var nv = seletor(v, 'Nível', [['iniciante', 'Iniciante'], ['intermediario', 'Intermediário'], ['avancado', 'Avançado']], p.nivel)
  var re = seletor(v, 'Restrição alimentar', [['nenhuma', 'Nenhuma'], ['vegetariano', 'Vegetariano'], ['sem lactose', 'Sem lactose'], ['sem gluten', 'Sem glúten']], p.restricao)
  var rf = seletor(v, 'Refeições por dia', [[3, '3 refeições'], [4, '4 refeições'], [5, '5 refeições']], p.refeicoes)
  var ac = campoL(v, 'Horário que acorda', 'time', p.acorda), ht = campoL(v, 'Horário do treino', 'time', p.horaTreino)
  v.appendChild(botao('Salvar e calcular', 'larga', function () {
    var n = { sexo: sx.value, idade: Math.min(99, Math.max(12, +id.value || 25)), peso: Math.min(250, Math.max(30, +ps.value || 70)), altura: Math.min(230, Math.max(120, +al.value || 170)), objetivo: ob.value, atividade: Number(at.value), esporte: es.value, posicao: po.value, dias: +di.value, nivel: nv.value, restricao: re.value, refeicoes: +rf.value, acorda: ac.value || '06:30', horaTreino: ht.value || '18:00' }
    gravarL('saude.json', n); aviso('Pronto. Veja Treinos e Dieta.'); SAUDE_SUB = 'treino'; ir('saude')
  }))
  v.appendChild(el('p', 'dsub', 'As contas usam a fórmula de Mifflin-St Jeor e recomendações gerais de proteína e água. É uma orientação: para dieta ou treino com doença, lesão, gestação ou competição, procure nutricionista e educador físico.'))
  M.appendChild(v)
}
function saudeTreino(p) {
  var sem = montarTreinos(p)
  var v = vidro('SEMANA DE ' + nomeEsporte(p).toUpperCase(), '◆'); v.appendChild(el('p', 'dsub', p.dias + ' dias · ' + p.nivel + ' · objetivo: ' + ({ perder: 'emagrecer', manter: 'condicionamento', ganhar: 'ganhar massa' })[p.objetivo] + (p.esporte === 'futebol' ? ' · posição: ' + p.posicao : '')))
  M.appendChild(v)
  sem.forEach(function (s) { var c = vidro(NOMES_DIA[s.dia].toUpperCase() + ' · ' + s.nome.toUpperCase()); var ul = el('ul', 'ltreino'); s.itens.forEach(function (x) { ul.appendChild(el('li', '', x)) }); c.appendChild(ul); M.appendChild(c) })
  var g = el('div', 'lacoes')
  g.appendChild(botao('Colocar nas rotinas (com avisos)', '', function () { criarRotinaTreino(p, sem); aviso('Rotina de treino criada. Ative os avisos em Notificações.') }))
  g.appendChild(botao('Montar com IA', 'sec', function () { treinoIA(p) }))
  M.appendChild(g)
  M.appendChild(el('p', 'dsub', 'Aqueça 5–10 min antes, pare se sentir dor (diferente de cansaço) e aumente a carga aos poucos.'))
}
function treinoIA(p) {
  var pedido = prompt('O que você quer no treino? (ex.: "melhorar arrancada de atacante", "treino de 30 min em casa", "foco em glúteo")'); if (!pedido) return
  aviso('Montando com IA…')
  iaJSON('Você é preparador físico. Monte UMA semana de treino em português do Brasil, segura e realista, sem promessas. Responda SOMENTE JSON {"nome":"","sessoes":[{"dia":1,"nome":"","itens":["exercício — séries × repetições/tempo"]}]}. dia: 0=domingo..6=sábado. Use os dias de treino do perfil.', 'Perfil: ' + JSON.stringify(p) + '\nPedido: ' + pedido).then(function (j) {
    var sem = (j.sessoes || []).filter(function (s) { return s && s.itens && s.itens.length }).map(function (s) { return { dia: Math.min(6, Math.max(0, +s.dia || 1)), nome: String(s.nome || 'Treino').slice(0, 40), itens: s.itens.map(String).slice(0, 12) } })
    if (!sem.length) return aviso('A IA não montou. Tente de novo.')
    M.textContent = ''; cab('TREINO COM IA', 1); var v = vidro(String(j.nome || 'TREINO').toUpperCase()); M.appendChild(v)
    sem.forEach(function (s) { var c = vidro(NOMES_DIA[s.dia].toUpperCase() + ' · ' + s.nome.toUpperCase()); var ul = el('ul', 'ltreino'); s.itens.forEach(function (x) { ul.appendChild(el('li', '', x)) }); c.appendChild(ul); M.appendChild(c) })
    M.appendChild(botao('Colocar nas rotinas', 'larga', function () { criarRotinaTreino(p, sem, j.nome); aviso('Rotina criada.') }))
  }).catch(function () { aviso('A IA não respondeu. Veja as chaves em Mais › Chaves de IA.') })
}
function criarRotinaTreino(p, sem, nome) {
  NX.rotinas.salvarRotina({ nome: nome || 'Treino · ' + nomeEsporte(p), tipo: 'treino', dias: sem.map(function (s) { return s.dia }), passos: sem.map(function (s, i) { return { id: Date.now() + i, hora: p.horaTreino || '18:00', titulo: s.nome, min: 60, nota: s.itens.slice(0, 4).join(' · ').slice(0, 290), dias: [s.dia] } }) })
  ntfyAgendar()
}
var DIETA_SEMENTE = 1
function saudeDieta(p) {
  var d = montarDieta(p, DIETA_SEMENTE)
  var v = vidro('DIETA ' + DIETA_SEMENTE + ' · ' + d.total.k + ' KCAL', '◆')
  v.appendChild(el('p', 'dsub', 'Meta: ' + d.calc.kcal + ' kcal · proteína ' + d.calc.prot + ' g · carboidrato ' + d.calc.carb + ' g · gordura ' + d.calc.gord + ' g · fibras ' + d.calc.fibra + ' g · água ' + d.calc.agua + ' L'))
  v.appendChild(el('p', 'dsub', 'Este cardápio: proteína ' + d.total.p + ' g · carbo ' + d.total.c + ' g · gordura ' + d.total.g + ' g' + (p.restricao !== 'nenhuma' ? ' · ' + p.restricao : '')))
  M.appendChild(v)
  d.refs.forEach(function (r) { var c = vidro(r.nome.toUpperCase() + ' · ~' + r.kcal + ' KCAL'); var ul = el('ul', 'ltreino'); r.itens.forEach(function (x) { ul.appendChild(el('li', '', x.txt)) }); c.appendChild(ul); M.appendChild(c) })
  var g = el('div', 'lacoes')
  g.appendChild(botao('Outra dieta', '', function () { DIETA_SEMENTE++; ir('saude') }))
  g.appendChild(botao('Lista de compras (7 dias)', 'sec', function () { listaCompras(p) }))
  g.appendChild(botao('Colocar nas rotinas', 'sec', function () { criarRotinaDieta(p, d); aviso('Horários de refeição e água nas rotinas. Ative os avisos em Notificações.') }))
  M.appendChild(g)
  M.appendChild(el('p', 'dsub', 'Pese os alimentos depois de prontos. Troque à vontade por itens parecidos (frango ↔ peixe, arroz ↔ macaxeira). Isto é uma orientação geral, não substitui nutricionista.'))
}
function listaCompras(p) {
  var tot = {}; for (var s = 1; s <= 7; s++) { montarDieta(p, s).refs.forEach(function (r) { r.itens.forEach(function (i) { tot[i.a] = (tot[i.a] || 0) + (i.g || 0) }) }) }
  M.textContent = ''; cab('LISTA DE COMPRAS', 1); var v = vidro('7 DIAS (APROXIMADO)'); Object.keys(tot).sort().forEach(function (a) { var x = ALIM[a]; v.appendChild(el('div', 'item', x.n + (x.livre ? ': à gosto' : ': ' + (tot[a] >= 1000 ? (Math.ceil(tot[a] / 100) / 10).toString().replace('.', ',') + (x.und === 'ml' ? ' L' : ' kg') : Math.ceil(tot[a] / 50) * 50 + (x.und === 'ml' ? ' ml' : ' g'))))) }); M.appendChild(v)
  M.appendChild(botao('Voltar', 'sec larga', function () { ir('saude') }))
}
function somaHora(h, min) { var a = h.split(':'), t = (+a[0]) * 60 + (+a[1]) + min; t = (t + 1440) % 1440; return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0') }
function criarRotinaDieta(p, d) {
  var acorda = p.acorda || '06:30', horas = { cafe: somaHora(acorda, 30), lanche: somaHora(acorda, 210), almoco: '12:00', tarde: somaHora(p.horaTreino || '18:00', -90), jantar: somaHora(p.horaTreino || '18:00', 120) }
  var passos = d.refs.map(function (r, i) { return { id: Date.now() + i, hora: horas[r.chave], titulo: r.nome, nota: r.itens.map(function (x) { return x.txt }).join(' · ').slice(0, 290) } })
  var c = calcSaude(p), copo = Math.round(c.agua * 1000 / 7)
  for (var k = 0; k < 7; k++) passos.push({ id: Date.now() + 100 + k, hora: somaHora(acorda, 20 + k * 130), titulo: 'Beber água (' + copo + ' ml)', nota: 'Meta do dia: ' + c.agua + ' L' })
  NX.rotinas.salvarRotina({ nome: 'Dieta e água', tipo: 'dieta', dias: [0, 1, 2, 3, 4, 5, 6], falar: false, passos: passos })
  ntfyAgendar()
}
function saudeHoje(p) {
  var dow = new Date().getDay(), s = montarTreinos(p).filter(function (x) { return x.dia === dow })[0], feitos = lerL('saude-feito.json', {}), hoje = new Date().toISOString().slice(0, 10)
  if (feitos.dia !== hoje) feitos = { dia: hoje, itens: [], agua: 0 }
  var c = calcSaude(p)
  var va = vidro('ÁGUA HOJE · ' + (feitos.agua / 1000).toString().replace('.', ',') + ' / ' + String(c.agua).replace('.', ',') + ' L')
  var bar = el('div', 'lbarra'); var f = el('div'); f.style.width = Math.min(100, feitos.agua / (c.agua * 10)) + '%'; bar.appendChild(f); va.appendChild(bar)
  var ga = el('div', 'lacoes'); [250, 500].forEach(function (ml) { ga.appendChild(botao('+ ' + ml + ' ml', ml === 250 ? '' : 'sec', function () { feitos.agua += ml; gravarL('saude-feito.json', feitos); ir('saude') })) }); va.appendChild(ga); M.appendChild(va)
  if (!s) { M.appendChild(el('p', 'vazio', 'Hoje é dia de descanso. Caminhe, alongue e beba água.')); return }
  var v = vidro('TREINO DE HOJE · ' + s.nome.toUpperCase(), '◆')
  s.itens.forEach(function (x, i) { var l = el('label', 'lchk'); var cb = el('input'); cb.type = 'checkbox'; cb.checked = feitos.itens.indexOf(i) >= 0; cb.onchange = function () { if (cb.checked) feitos.itens.push(i); else feitos.itens = feitos.itens.filter(function (y) { return y !== i }); gravarL('saude-feito.json', feitos) }; l.appendChild(cb); l.appendChild(document.createTextNode(' ' + x)); v.appendChild(l) })
  var cron = el('div', 'lcron', '00:00'), tm = null
  var g = el('div', 'lacoes')
  ;[45, 60, 90].forEach(function (seg) { g.appendChild(botao('Descanso ' + seg + ' s', 'sec', function () { clearInterval(tm); var fim = Date.now() + seg * 1000; tm = setInterval(function () { var r = Math.max(0, Math.ceil((fim - Date.now()) / 1000)); cron.textContent = '00:' + String(r).padStart(2, '0'); if (!r) { clearInterval(tm); cron.textContent = 'VAI!'; try { navigator.vibrate && navigator.vibrate([200, 100, 200]) } catch (e) {} ; falar('Descanso acabou. Bora!') } }, 250) })) })
  v.appendChild(cron); v.appendChild(g); M.appendChild(v)
}

// ================= HOLOGRAMA 3D (tela, pirâmide de holograma, óculos VR e óculos de celular) =================
var ESM = 'https://esm.sh/three@0.160.0'
var HOLO = { obj: 'nucleo', modo: 'tela', cor: '#38e8ff', foto: null, modelo: null, texto: 'NEXUS' }
var HOLO_RUN = null // a cena atual (para parar ao sair da tela)
var HOLO_OBJS = [['nucleo', 'Núcleo Nexus'], ['terra', 'Planeta Terra'], ['saturno', 'Saturno'], ['dna', 'DNA'], ['coracao', 'Coração'], ['atomo', 'Átomo'], ['galaxia', 'Galáxia'], ['texto', 'Texto 3D'], ['foto', 'Foto em 3D'], ['modelo', 'Meu modelo 3D (.glb)']]
function pararHolo() { if (HOLO_RUN) { try { HOLO_RUN.parar() } catch (e) {} HOLO_RUN = null } }
function holo() {
  cab('HOLOGRAMA 3D', 1)
  var palco = el('div', 'hpalco'); var cv = el('canvas'); palco.appendChild(cv); palco.appendChild(el('div', 'hscan')); var info = el('div', 'hinfo', 'carregando 3D…'); palco.appendChild(info); M.appendChild(palco)
  var ch = el('div', 'chips'); HOLO_OBJS.forEach(function (o) { var b = el('button', HOLO.obj === o[0] ? 'on' : '', o[1]); b.onclick = function () { if (o[0] === 'foto') return escolherFotoHolo(); if (o[0] === 'modelo') return escolherModeloHolo(); if (o[0] === 'texto') { var t = prompt('Texto do holograma:', HOLO.texto); if (!t) return; HOLO.texto = t.slice(0, 18) } HOLO.obj = o[0]; ir('holo') }; ch.appendChild(b) }); M.appendChild(ch)
  var md = el('div', 'chips'); [['tela', 'Tela'], ['piramide', 'Pirâmide (holograma real)'], ['cardboard', 'Óculos de celular'], ['vr', 'Óculos VR / AR']].forEach(function (o) { var b = el('button', HOLO.modo === o[0] ? 'on' : '', o[1]); b.onclick = function () { HOLO.modo = o[0]; ir('holo') }; md.appendChild(b) }); M.appendChild(md)
  var cores = el('div', 'chips'); [['#38e8ff', 'Ciano'], ['#7cff9b', 'Verde'], ['#ff5ad8', 'Rosa'], ['#ffb547', 'Âmbar'], ['#ffffff', 'Branco']].forEach(function (o) { var b = el('button', HOLO.cor === o[0] ? 'on' : '', o[1]); b.style.borderColor = o[0]; b.onclick = function () { HOLO.cor = o[0]; ir('holo') }; cores.appendChild(b) }); M.appendChild(cores)
  var dica = vidro('COMO USAR')
  dica.appendChild(el('p', '', HOLO.modo === 'piramide' ? 'Holograma real: faça uma pirâmide de plástico transparente (4 trapézios: base 6 cm, topo 1 cm, altura 3,5 cm), coloque de boca para baixo no centro da tela, apague a luz e aumente o brilho. O objeto aparece flutuando dentro da pirâmide.' : HOLO.modo === 'cardboard' ? 'Coloque o celular deitado num óculos VR de celular (tipo Cardboard). Toque em "Começar" e mexa a cabeça para olhar ao redor.' : HOLO.modo === 'vr' ? 'Abra este endereço no navegador do Meta Quest (ou outro óculos com WebXR) e toque em "Entrar em VR". Em celular Android com AR, aparece "Ver na sala (AR)". O iPhone ainda não libera WebXR no Safari: use "Óculos de celular".' : 'Arraste para girar, use dois dedos para aproximar. Escolha o que projetar acima. "Foto em 3D" transforma uma foto sua em holograma.'))
  M.appendChild(dica)
  var acoes = el('div', 'lacoes'); M.appendChild(acoes)
  pararHolo()
  carregarHoloCena(cv, info, acoes).catch(function (e) { info.textContent = 'Não consegui carregar o 3D (' + String(e && e.message || e).slice(0, 60) + '). Precisa de internet na primeira vez.' })
}
function escolherFotoHolo() { var i = el('input'); i.type = 'file'; i.accept = 'image/*'; i.setAttribute('capture', 'environment'); i.onchange = function () { var f = i.files && i.files[0]; if (!f) return; var im = new Image(); im.onload = function () { HOLO.foto = im; HOLO.obj = 'foto'; ir('holo') }; im.src = URL.createObjectURL(f) }; i.click() }
function escolherModeloHolo() { var i = el('input'); i.type = 'file'; i.accept = '.glb,.gltf,model/gltf-binary'; i.onchange = function () { var f = i.files && i.files[0]; if (!f) return; HOLO.modelo = URL.createObjectURL(f); HOLO.obj = 'modelo'; ir('holo') }; i.click() }
async function carregarHoloCena(cv, info, acoes) {
  var T = await import(ESM)
  var palco = cv.parentNode, W = palco.clientWidth, H = palco.clientHeight
  var R = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: false }); R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.setSize(W, H, false); R.setClearColor(0x000000, 1)
  var S = new T.Scene(), C = new T.PerspectiveCamera(50, W / H, 0.05, 200); C.position.set(0, 0, 5.5)
  var COR = new T.Color(HOLO.cor)
  var raiz = new T.Group(); S.add(raiz)
  var mat = function (op) { return new T.PointsMaterial({ color: COR, size: 0.035, transparent: true, opacity: op || 0.9, blending: T.AdditiveBlending, depthWrite: false }) }
  var linha = function (op) { return new T.LineBasicMaterial({ color: COR, transparent: true, opacity: op || 0.35, blending: T.AdditiveBlending, depthWrite: false }) }
  var pontos = function (arr, op, tam) { var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(arr, 3)); var m = mat(op); if (tam) m.size = tam; return new T.Points(g, m) }
  var esfera = function (n, r) { var a = []; for (var i = 0; i < n; i++) { var y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y), t = i * 2.39996; a.push(Math.cos(t) * rr * r, y * r, Math.sin(t) * rr * r) } return a }
  var ruido = function (x, y, z) { return Math.sin(x * 2.1 + Math.sin(y * 1.7)) * Math.cos(z * 1.9 + Math.sin(x * 1.3)) + Math.sin(y * 3.1 + z * 0.7) * 0.5 }
  var anim = []
  function montar(tipo) {
    var g = new T.Group()
    if (tipo === 'nucleo') {
      var ico = new T.LineSegments(new T.WireframeGeometry(new T.IcosahedronGeometry(1.1, 1)), linha(0.55)); g.add(ico); g.add(pontos(esfera(1400, 1.6), 0.55))
      for (var k = 0; k < 3; k++) { var an = new T.Mesh(new T.TorusGeometry(2 + k * 0.25, 0.006, 6, 160), new T.MeshBasicMaterial({ color: COR, transparent: true, opacity: 0.5, blending: T.AdditiveBlending })); an.rotation.x = 1 + k * 0.6; an.rotation.y = k; g.add(an); (function (a, v) { anim.push(function (t) { a.rotation.z = t * v }) })(an, 0.3 + k * 0.2) }
      anim.push(function (t, nivel) { var s = 1 + Math.sin(t * 2) * 0.03 + (nivel || 0) * 0.35; ico.scale.setScalar(s) })
    } else if (tipo === 'terra') {
      var a = [], b = []; esfera(9000, 1.8).forEach(function (v, i) { if (i % 3) return }); var e = esfera(9000, 1.8)
      for (var i = 0; i < e.length; i += 3) { (ruido(e[i], e[i + 1], e[i + 2]) > 0.25 ? a : b).push(e[i], e[i + 1], e[i + 2]) }
      g.add(pontos(a, 0.95, 0.04)); g.add(pontos(b.filter(function (_, j) { return Math.floor(j / 3) % 4 === 0 }), 0.25, 0.025))
      for (var la = -60; la <= 60; la += 30) { var r = 1.83 * Math.cos(la * Math.PI / 180), c = new T.Mesh(new T.TorusGeometry(r, 0.003, 4, 120), new T.MeshBasicMaterial({ color: COR, transparent: true, opacity: 0.3 })); c.rotation.x = Math.PI / 2; c.position.y = 1.83 * Math.sin(la * Math.PI / 180); g.add(c) }
      g.rotation.z = 0.4
    } else if (tipo === 'saturno') {
      g.add(pontos(esfera(2500, 1.2), 0.9)); var an2 = []; for (var i2 = 0; i2 < 5000; i2++) { var rr = 1.7 + Math.random() * 1.1, t2 = Math.random() * Math.PI * 2; an2.push(Math.cos(t2) * rr, (Math.random() - 0.5) * 0.04, Math.sin(t2) * rr) } var anel = pontos(an2, 0.6, 0.025); g.add(anel); g.rotation.x = 0.45; g.rotation.z = 0.2
    } else if (tipo === 'dna') {
      var p1 = [], p2 = [], deg = []; for (var i3 = 0; i3 < 260; i3++) { var y = -2.4 + i3 * 0.0185, t3 = i3 * 0.12; p1.push(Math.cos(t3) * 0.8, y, Math.sin(t3) * 0.8); p2.push(Math.cos(t3 + Math.PI) * 0.8, y, Math.sin(t3 + Math.PI) * 0.8); if (i3 % 9 === 0) deg.push(Math.cos(t3) * 0.8, y, Math.sin(t3) * 0.8, Math.cos(t3 + Math.PI) * 0.8, y, Math.sin(t3 + Math.PI) * 0.8) }
      g.add(pontos(p1, 1, 0.06)); g.add(pontos(p2, 1, 0.06)); var gl = new T.BufferGeometry(); gl.setAttribute('position', new T.Float32BufferAttribute(deg, 3)); g.add(new T.LineSegments(gl, linha(0.6)))
    } else if (tipo === 'coracao') {
      var h = []; for (var i4 = 0; i4 < 6000; i4++) { var t4 = Math.random() * Math.PI * 2, s4 = Math.sqrt(Math.random()), x = 16 * Math.pow(Math.sin(t4), 3), y4 = 13 * Math.cos(t4) - 5 * Math.cos(2 * t4) - 2 * Math.cos(3 * t4) - Math.cos(4 * t4); var z = (Math.random() - 0.5) * 6 * (1 - s4 * 0.6) * Math.cos(t4 / 2); h.push(x * 0.1 * s4, y4 * 0.1 * s4 + 0.3, z * 0.12) }
      var cor = pontos(h, 0.9, 0.035); g.add(cor); anim.push(function (t) { var b = 1 + Math.pow(Math.max(0, Math.sin(t * 5)), 8) * 0.12; cor.scale.setScalar(b) })
    } else if (tipo === 'atomo') {
      g.add(pontos(esfera(400, 0.35), 1, 0.05)); for (var k2 = 0; k2 < 3; k2++) { var o = new T.Group(); o.rotation.set(k2 * 1.05, k2 * 0.6, 0); var orb = new T.Mesh(new T.TorusGeometry(1.9, 0.006, 6, 160), new T.MeshBasicMaterial({ color: COR, transparent: true, opacity: 0.55 })); o.add(orb); var el2 = new T.Mesh(new T.SphereGeometry(0.09, 12, 12), new T.MeshBasicMaterial({ color: COR })); o.add(el2); g.add(o); (function (e2, v) { anim.push(function (t) { e2.position.set(Math.cos(t * v) * 1.9, Math.sin(t * v) * 1.9, 0) }) })(el2, 1.4 + k2 * 0.5) }
    } else if (tipo === 'galaxia') {
      var gx = []; for (var i5 = 0; i5 < 9000; i5++) { var br = i5 % 3, r5 = Math.pow(Math.random(), 0.6) * 3, ang = br * 2.094 + r5 * 1.8 + (Math.random() - 0.5) * 0.5; gx.push(Math.cos(ang) * r5, (Math.random() - 0.5) * 0.15 * (3 - r5), Math.sin(ang) * r5) } g.add(pontos(gx, 0.8, 0.025)); g.rotation.x = 0.9
    } else if (tipo === 'texto' || tipo === 'foto') {
      var cvs = document.createElement('canvas'), ctx = cvs.getContext('2d'), N = tipo === 'texto' ? 220 : 150
      cvs.width = N; cvs.height = tipo === 'texto' ? 70 : N
      if (tipo === 'texto') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.fillStyle = '#fff'; ctx.font = 'bold 44px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(HOLO.texto, N / 2, 36) }
      else { var im = HOLO.foto, sc = Math.min(N / im.width, N / im.height); cvs.width = Math.round(im.width * sc); cvs.height = Math.round(im.height * sc); ctx.drawImage(im, 0, 0, cvs.width, cvs.height) }
      var dd = ctx.getImageData(0, 0, cvs.width, cvs.height).data, pp = [], cc = [], esc = 4 / Math.max(cvs.width, cvs.height)
      for (var yy = 0; yy < cvs.height; yy++) for (var xx = 0; xx < cvs.width; xx++) {
        var q = (yy * cvs.width + xx) * 4, lum = (dd[q] * 0.3 + dd[q + 1] * 0.59 + dd[q + 2] * 0.11) / 255
        if (tipo === 'texto' && lum < 0.5) continue
        if (tipo === 'foto' && (xx + yy) % 1) continue
        pp.push((xx - cvs.width / 2) * esc, -(yy - cvs.height / 2) * esc, tipo === 'texto' ? (Math.random() - 0.5) * 0.25 : (lum - 0.5) * 1.4)
        cc.push(lum)
      }
      var gg = new T.BufferGeometry(); gg.setAttribute('position', new T.Float32BufferAttribute(pp, 3))
      if (tipo === 'foto') { var cols = []; cc.forEach(function (l) { cols.push(COR.r * (0.25 + l), COR.g * (0.25 + l), COR.b * (0.25 + l)) }); gg.setAttribute('color', new T.Float32BufferAttribute(cols, 3)) }
      var mm = mat(0.95); mm.size = tipo === 'foto' ? 0.03 : 0.045; if (tipo === 'foto') { mm.vertexColors = true; mm.color = new T.Color(1, 1, 1) }
      g.add(new T.Points(gg, mm))
    }
    return g
  }
  async function montarModelo() {
    var mod = await import(ESM + '/examples/jsm/loaders/GLTFLoader.js'); var L = new mod.GLTFLoader()
    var gltf = await new Promise(function (ok, erro) { L.load(HOLO.modelo, ok, undefined, erro) })
    var g = new T.Group(), cena = gltf.scene, box = new T.Box3().setFromObject(cena), tam = box.getSize(new T.Vector3()).length() || 1, ctr = box.getCenter(new T.Vector3())
    cena.position.sub(ctr); cena.traverse(function (o) { if (o.isMesh) { var w = new T.LineSegments(new T.WireframeGeometry(o.geometry), linha(0.28)); w.position.copy(o.position); w.rotation.copy(o.rotation); w.scale.copy(o.scale); o.parent.add(w); o.material = new T.MeshBasicMaterial({ color: COR, transparent: true, opacity: 0.18, blending: T.AdditiveBlending, depthWrite: false }) } })
    g.add(cena); g.scale.setScalar(3.6 / tam); return g
  }
  var obj = HOLO.obj === 'modelo' && HOLO.modelo ? await montarModelo() : montar(HOLO.obj === 'foto' && !HOLO.foto ? 'nucleo' : HOLO.obj === 'modelo' ? 'nucleo' : HOLO.obj)
  raiz.add(obj)
  // base do holograma (anéis no "chão")
  var base = new T.Group(); for (var b = 0; b < 3; b++) { var rb = new T.Mesh(new T.RingGeometry(1.6 + b * 0.35, 1.62 + b * 0.35, 96), new T.MeshBasicMaterial({ color: COR, transparent: true, opacity: 0.35 - b * 0.08, side: T.DoubleSide, blending: T.AdditiveBlending })); rb.rotation.x = -Math.PI / 2; base.add(rb) } base.position.y = -2.3; raiz.add(base)
  info.textContent = ''
  // interação: arrastar gira, pinça aproxima
  var rotY = 0, rotX = 0, zoom = 1, ult = null, dist0 = 0
  cv.addEventListener('pointerdown', function (e) { ult = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId) })
  cv.addEventListener('pointermove', function (e) { if (!ult) return; rotY += (e.clientX - ult[0]) * 0.008; rotX += (e.clientY - ult[1]) * 0.006; rotX = Math.max(-1.2, Math.min(1.2, rotX)); ult = [e.clientX, e.clientY] })
  cv.addEventListener('pointerup', function () { ult = null })
  cv.addEventListener('touchmove', function (e) { if (e.touches.length === 2) { var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); if (dist0) zoom = Math.max(0.4, Math.min(2.5, zoom * d / dist0)); dist0 = d; e.preventDefault() } }, { passive: false })
  cv.addEventListener('touchend', function () { dist0 = 0 })
  cv.addEventListener('wheel', function (e) { zoom = Math.max(0.4, Math.min(2.5, zoom * (e.deltaY > 0 ? 0.92 : 1.08))); e.preventDefault() }, { passive: false })
  var vivo = true, t0 = performance.now(), nivelVoz = 0
  window.HOLO_NIVEL = function (n) { nivelVoz = n }
  // óculos de celular: orientação do aparelho
  var orient = null
  function aplicarOrient() { if (!orient) return; var z = new T.Vector3(0, 0, 1), eu = new T.Euler(), q0 = new T.Quaternion(), q1 = new T.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); var al = T.MathUtils.degToRad(orient.alpha || 0), be = T.MathUtils.degToRad(orient.beta || 0), ga = T.MathUtils.degToRad(orient.gamma || 0), or = T.MathUtils.degToRad(screen.orientation ? screen.orientation.angle : window.orientation || 0); eu.set(be, al, -ga, 'YXZ'); C.quaternion.setFromEuler(eu); C.quaternion.multiply(q1); C.quaternion.multiply(q0.setFromAxisAngle(z, -or)) }
  function quadro() {
    var t = (performance.now() - t0) / 1000
    anim.forEach(function (f) { f(t, nivelVoz) })
    obj.rotation.y = HOLO.modo === 'piramide' ? t * 0.4 : rotY + t * 0.25; obj.rotation.x = HOLO.modo === 'piramide' ? 0 : rotX
    raiz.scale.setScalar((R.xr.isPresenting ? 0.35 : 1) * zoom * (1 + nivelVoz * 0.15)); base.rotation.y = -t * 0.3
    var flick = 0.85 + Math.random() * 0.15; R.domElement.style.opacity = flick
    var w = palco.clientWidth, h = palco.clientHeight
    if (HOLO.modo === 'piramide') {
      R.setScissorTest(true); R.clear(); var s = Math.min(w, h) / 3
      ;[[w / 2 - s / 2, 0, 0], [w / 2 + s / 2, h / 2 - s / 2, 1], [w / 2 - s / 2, h - s, 2], [w / 2 - s * 1.5, h / 2 - s / 2, 3]].forEach(function (v) {
        // v: x, y (de baixo para cima no WebGL), índice da face
        R.setViewport(v[0], v[1], s, s); R.setScissor(v[0], v[1], s, s)
        C.aspect = 1; C.position.set(Math.sin(v[2] * Math.PI / 2) * 6, 0.5, Math.cos(v[2] * Math.PI / 2) * 6); C.up.set(0, 1, 0); C.lookAt(0, 0, 0); C.rotateZ(v[2] * Math.PI / 2); C.updateProjectionMatrix(); R.render(S, C)
      })
      R.setScissorTest(false)
    } else if (HOLO.modo === 'cardboard' && !R.xr.isPresenting) {
      R.setScissorTest(true); C.aspect = (w / 2) / h; C.updateProjectionMatrix(); aplicarOrient()
      var base0 = C.position.clone(); [[-0.032, 0], [0.032, w / 2]].forEach(function (o) { C.position.copy(base0); C.translateX(o[0]); R.setViewport(o[1], 0, w / 2, h); R.setScissor(o[1], 0, w / 2, h); R.render(S, C) }); C.position.copy(base0); R.setScissorTest(false)
    } else { R.setViewport(0, 0, w, h); C.aspect = w / h; C.updateProjectionMatrix(); if (!R.xr.isPresenting) { C.position.set(0, 0, 5.5); C.up.set(0, 1, 0); C.lookAt(0, 0, 0) } R.render(S, C) }
  }
  R.setAnimationLoop(function () { if (vivo) quadro() })
  function tamanho() { var w = palco.clientWidth, h = palco.clientHeight; R.setSize(w, h, false) }
  addEventListener('resize', tamanho)
  HOLO_RUN = { parar: function () { vivo = false; R.setAnimationLoop(null); removeEventListener('resize', tamanho); try { R.dispose() } catch (e) {} } }
  // botões de modo
  acoes.appendChild(botao('Tela cheia', 'sec', function () { var f = palco.requestFullscreen || palco.webkitRequestFullscreen; if (f) f.call(palco); else palco.classList.toggle('cheio') }))
  if (HOLO.modo === 'cardboard') acoes.appendChild(botao('Começar (mexer a cabeça)', '', function () {
    var ok = function () { addEventListener('deviceorientation', function (e) { orient = e }); palco.classList.add('cheio'); try { screen.orientation.lock('landscape') } catch (e) {} }
    if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().then(function (s) { if (s === 'granted') ok(); else aviso('Sem permissão do movimento.') }); else ok()
  }))
  if (HOLO.modo === 'vr') {
    if (!navigator.xr) { acoes.appendChild(el('p', 'dsub', 'Este navegador não tem WebXR. Use o navegador do óculos (Meta Quest) ou Chrome no Android. No iPhone, use "Óculos de celular".')) }
    else {
      ;[['immersive-vr', 'Entrar em VR'], ['immersive-ar', 'Ver na sala (AR)']].forEach(function (m) {
        navigator.xr.isSessionSupported(m[0]).then(function (sup) {
          if (!sup) return
          acoes.appendChild(botao(m[1], '', function () {
            navigator.xr.requestSession(m[0], { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'] }).then(function (ses) {
              R.xr.enabled = true; R.xr.setReferenceSpaceType('local-floor'); raiz.position.set(0, 1.3, -2); raiz.scale.setScalar(0.35); if (m[0] === 'immersive-ar') R.setClearAlpha(0)
              R.xr.setSession(ses); ses.addEventListener('end', function () { R.xr.enabled = false; raiz.position.set(0, 0, 0); ir('holo') })
            }).catch(function (e) { aviso('Não abriu o modo imersivo: ' + e.message) })
          }))
        })
      })
    }
  }
}

// ================= CRIADOR DE JOGOS =================
// A IA escolhe o tipo e personaliza (tema, personagens em emoji, cores, perguntas). O motor do jogo é feito à mão,
// então o jogo SEMPRE funciona: celular (toque) e computador (teclado/mouse). Sai um arquivo .html que roda em qualquer lugar.
var JOGO_TIPOS = [['runner', 'Corrida (pular obstáculos)'], ['flappy', 'Voar (estilo Flappy)'], ['snake', 'Cobrinha'], ['breakout', 'Quebra-blocos'], ['shooter', 'Nave atiradora'], ['catcher', 'Pegar o que cai'], ['memoria', 'Jogo da memória'], ['quiz', 'Quiz de perguntas']]
var JOGO_PADRAO = {
  runner: { titulo: 'Corre, Nexus!', heroi: '🏃', inimigo: '🌵', item: '⭐', fundo1: '#0b1026', fundo2: '#3b1d6e', cor: '#ffd84d' },
  flappy: { titulo: 'Voo Livre', heroi: '🐤', inimigo: '🟩', item: '🪙', fundo1: '#4fc3f7', fundo2: '#b3e5fc', cor: '#2e7d32' },
  snake: { titulo: 'Cobra Faminta', heroi: '🟢', inimigo: '💣', item: '🍎', fundo1: '#0d1b0f', fundo2: '#14301a', cor: '#7CFF6B' },
  breakout: { titulo: 'Quebra Tudo', heroi: '⚪', inimigo: '🧱', item: '💎', fundo1: '#120a24', fundo2: '#2a0f4f', cor: '#ff4fd8' },
  shooter: { titulo: 'Defesa Galáctica', heroi: '🚀', inimigo: '👾', item: '⚡', fundo1: '#02030a', fundo2: '#0b1a3a', cor: '#38e8ff' },
  catcher: { titulo: 'Chuva de Frutas', heroi: '🧺', inimigo: '💩', item: '🍓', fundo1: '#fff3e0', fundo2: '#ffd7a8', cor: '#e65100' },
  memoria: { titulo: 'Memória', heroi: '❓', inimigo: '', item: '', fundo1: '#101827', fundo2: '#1e3a5f', cor: '#7dd3fc', pares: ['🐶', '🐱', '🦊', '🐼', '🐸', '🦁', '🐵', '🐙'] },
  quiz: { titulo: 'Quiz', heroi: '🧠', inimigo: '', item: '', fundo1: '#0f172a', fundo2: '#312e81', cor: '#a5b4fc', perguntas: [{ q: 'Qual é a capital do Acre?', o: ['Rio Branco', 'Manaus', 'Porto Velho', 'Belém'], c: 0 }, { q: 'Quantos lados tem um hexágono?', o: ['5', '6', '7', '8'], c: 1 }, { q: 'Qual planeta é conhecido como planeta vermelho?', o: ['Vênus', 'Júpiter', 'Marte', 'Saturno'], c: 2 }] }
}
// motor do jogo (vai inteiro para dentro do arquivo .html)
function jogoRuntime(C) {
  var cv = document.getElementById('c'), x = cv.getContext('2d'), W, H, DPR = Math.min(2, window.devicePixelRatio || 1)
  function tam() { W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px'; x.setTransform(DPR, 0, 0, DPR, 0, 0) }
  tam(); addEventListener('resize', tam)
  var V = Math.max(0.6, Math.min(2, C.velocidade || 1)), pts = 0, recorde = (function () { try { return +(localStorage.getItem('rec-' + C.titulo) || 0) } catch (e) { return 0 } })(), estado = 'menu', t0 = 0, ent = { x: W / 2, toque: false, tap: false, dir: null }
  var E = function (ch, px, py, s) { x.font = s + 'px "Apple Color Emoji","Segoe UI Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(ch, px, py) }
  var txt = function (t, px, py, s, cor, al) { x.font = '800 ' + s + 'px system-ui,-apple-system,Segoe UI,sans-serif'; x.textAlign = al || 'center'; x.textBaseline = 'middle'; x.fillStyle = cor || '#fff'; x.fillText(t, px, py) }
  var fundo = function () { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.fundo1); g.addColorStop(1, C.fundo2); x.fillStyle = g; x.fillRect(0, 0, W, H) }
  var col = function (a, b, r) { return Math.hypot(a.x - b.x, a.y - b.y) < r }
  var som = (function () { var ac; return function (f, d) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f; o.type = 'square'; g.gain.value = 0.04; o.connect(g); g.connect(ac.destination); o.start(); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (d || 0.1)); o.stop(ac.currentTime + (d || 0.1)) } catch (e) {} } })()
  // entrada
  addEventListener('pointerdown', function (e) { ent.toque = true; ent.tap = true; ent.x = e.clientX; ent.y = e.clientY; ent.sx = e.clientX; ent.sy = e.clientY; clique(e.clientX, e.clientY) })
  addEventListener('pointermove', function (e) { ent.x = e.clientX; ent.y = e.clientY })
  addEventListener('pointerup', function (e) { ent.toque = false; var dx = e.clientX - ent.sx, dy = e.clientY - ent.sy; if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) ent.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'd' : 'e') : (dy > 0 ? 'b' : 'c') })
  addEventListener('keydown', function (e) { var k = e.key; if (k === ' ' || k === 'ArrowUp' || k === 'w') { ent.tap = true; if (estado !== 'jogando') clique(W / 2, H / 2) } ent.dir = { ArrowLeft: 'e', ArrowRight: 'd', ArrowUp: 'c', ArrowDown: 'b', a: 'e', d: 'd', s: 'b' }[k] || ent.dir; if (k === 'ArrowLeft') ent.x -= 40; if (k === 'ArrowRight') ent.x += 40 })
  var J = {}
  function iniciar() {
    pts = 0; estado = 'jogando'; t0 = performance.now(); ent.dir = null; ent.tap = false
    if (C.tipo === 'runner') J = { y: 0, vy: 0, chao: H * 0.72, obs: [], itens: [], vel: 5 * V, prox: 60 }
    if (C.tipo === 'flappy') J = { y: H / 2, vy: 0, canos: [], prox: 0, vel: 2.6 * V, gap: Math.max(150, H * 0.26) }
    if (C.tipo === 'snake') { var n = Math.floor(Math.min(W, H) / 22); J = { n: 22, cols: Math.floor(W / 22), rows: Math.floor((H - 70) / 22), cobra: [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }], d: 'd', acc: 0, comida: null, bombas: [] }; J.comida = livre() }
    if (C.tipo === 'breakout') { var cols = Math.max(5, Math.floor(W / 70)), bw = W / cols; J = { px: W / 2, bola: { x: W / 2, y: H * 0.7, vx: 3.2 * V, vy: -4.2 * V }, blocos: [], vidas: 3 }; for (var r = 0; r < 5; r++) for (var c = 0; c < cols; c++) J.blocos.push({ x: c * bw + 3, y: 90 + r * 30, w: bw - 6, h: 24, ok: true, cor: 'hsl(' + (r * 50 + 280) % 360 + ',80%,60%)' }) }
    if (C.tipo === 'shooter') J = { px: W / 2, tiros: [], inim: [], prox: 0, cad: 0, vidas: 3, pw: [] }
    if (C.tipo === 'catcher') J = { px: W / 2, cai: [], prox: 0, vidas: 3 }
    if (C.tipo === 'memoria') { var p = (C.pares || ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝']).slice(0, 8), cs = p.concat(p).sort(function () { return Math.random() - 0.5 }); J = { cartas: cs.map(function (e) { return { e: e, ab: false, ok: false } }), abertas: [], jog: 0, trava: 0 } }
    if (C.tipo === 'quiz') J = { i: 0, perg: (C.perguntas || []).slice().sort(function () { return Math.random() - 0.5 }), escolha: -1, tempo: 0, acertos: 0 }
  }
  function fim() { estado = 'fim'; pts = Math.floor(pts); if (pts > recorde) { recorde = pts; try { localStorage.setItem('rec-' + C.titulo, recorde) } catch (e) {} } som(140, 0.4); try { navigator.vibrate && navigator.vibrate(150) } catch (e) {} }
  function livre() { var p; do { p = { x: Math.floor(Math.random() * J.cols), y: Math.floor(Math.random() * J.rows) } } while (J.cobra && J.cobra.some(function (s) { return s.x === p.x && s.y === p.y })); return p }
  function clique(cx, cy) {
    if (estado !== 'jogando') { iniciar(); return }
    if (C.tipo === 'memoria') { var g = grade(); g.forEach(function (q, i) { var c = J.cartas[i]; if (cx > q.x && cx < q.x + q.w && cy > q.y && cy < q.y + q.h && !c.ab && !c.ok && J.abertas.length < 2) { c.ab = true; J.abertas.push(i); som(500, 0.05); if (J.abertas.length === 2) { J.jog++; var a = J.cartas[J.abertas[0]], b = J.cartas[J.abertas[1]]; if (a.e === b.e) { a.ok = b.ok = true; J.abertas = []; pts += 10; som(880, 0.15); if (J.cartas.every(function (k) { return k.ok })) { pts += Math.max(0, 100 - J.jog * 3); fim() } } else J.trava = performance.now() + 800 } } }) }
    if (C.tipo === 'quiz' && J.escolha < 0) { var q = J.perg[J.i]; if (!q) return; q.o.forEach(function (o, k) { var by = H * 0.42 + k * 74; if (cy > by && cy < by + 62 && cx > 20 && cx < W - 20) { J.escolha = k; J.tempo = performance.now(); if (k === q.c) { pts += 10; J.acertos++; som(880, 0.15) } else som(160, 0.3) } }) }
  }
  function grade() { var n = J.cartas.length, cols = n > 12 ? 4 : 3, rows = Math.ceil(n / cols), m = 14, w = Math.min((W - m * (cols + 1)) / cols, ((H - 160) - m * (rows + 1)) / rows * 0.8), h = w * 1.25, ox = (W - (w * cols + m * (cols - 1))) / 2; return J.cartas.map(function (_, i) { return { x: ox + (i % cols) * (w + m), y: 110 + Math.floor(i / cols) * (h + m), w: w, h: h } }) }
  var ultimo = performance.now()
  function passo(agora) {
    var dt = Math.min(2.5, (agora - ultimo) / 16.67); ultimo = agora; fundo()
    if (estado === 'jogando') jogar(dt, agora)
    else {
      if (C.tipo !== 'memoria' && C.tipo !== 'quiz') E(C.heroi, W / 2, H * 0.32, 90)
      txt(C.titulo, W / 2, H * 0.48, Math.min(52, W / 9), C.cor)
      if (estado === 'fim') { txt((C.tipo === 'quiz' ? 'Acertos: ' + J.acertos + '/' + J.perg.length + ' · ' : '') + 'Pontos: ' + pts, W / 2, H * 0.57, 26); txt('Recorde: ' + recorde, W / 2, H * 0.63, 18, 'rgba(255,255,255,.7)'); if (C.mensagemFim) txt(C.mensagemFim, W / 2, H * 0.69, 16, 'rgba(255,255,255,.75)') }
      txt(estado === 'fim' ? 'Toque para jogar de novo' : 'Toque para começar', W / 2, H * 0.8, 20, '#fff')
    }
    ent.tap = false; requestAnimationFrame(passo)
  }
  function hud() { txt(String(Math.floor(pts)), W / 2, 40, 34, '#fff'); if (J.vidas !== undefined) txt('❤'.repeat(Math.max(0, J.vidas)), 18, 40, 20, '#ff5a6e', 'left') }
  function jogar(dt, agora) {
    var T = C.tipo
    if (T === 'runner') {
      var hx = W * 0.2; if (ent.tap && J.y >= 0) J.vy = -15; J.vy += 0.8 * dt; J.y = Math.min(0, J.y + J.vy * dt); var hy = J.chao + J.y - 28
      x.fillStyle = 'rgba(255,255,255,.15)'; x.fillRect(0, J.chao, W, 3)
      J.vel += 0.002 * dt; if (--J.prox <= 0) { J.obs.push({ x: W + 40, y: J.chao - 26 }); if (Math.random() < 0.5) J.itens.push({ x: W + 160, y: J.chao - 120 - Math.random() * 60 }); J.prox = 55 + Math.random() * 60 / V }
      J.obs.forEach(function (o) { o.x -= J.vel * dt; E(C.inimigo, o.x, o.y, 44); if (col(o, { x: hx, y: hy }, 38)) fim() }); J.obs = J.obs.filter(function (o) { return o.x > -60 })
      J.itens = J.itens.filter(function (o) { o.x -= J.vel * dt; E(C.item, o.x, o.y, 34); if (col(o, { x: hx, y: hy }, 40)) { pts += 5; som(990, 0.08); return false } return o.x > -60 })
      E(C.heroi, hx, hy, 52); pts += dt * 0.05 * V; pts = Math.round(pts * 100) / 100
    }
    if (T === 'flappy') {
      if (ent.tap) { J.vy = -8.5; som(600, 0.05) } J.vy += 0.45 * dt; J.y += J.vy * dt; var bx = W * 0.28
      if (--J.prox <= 0) { J.canos.push({ x: W + 40, g: 80 + Math.random() * (H - J.gap - 160), p: false }); J.prox = 100 / V }
      J.canos.forEach(function (c) { c.x -= J.vel * dt; x.fillStyle = C.cor; x.fillRect(c.x - 34, 0, 68, c.g); x.fillRect(c.x - 34, c.g + J.gap, 68, H); if (!c.p && c.x < bx) { c.p = true; pts++; som(880, 0.06) } if (bx + 18 > c.x - 34 && bx - 18 < c.x + 34 && (J.y - 18 < c.g || J.y + 18 > c.g + J.gap)) fim() }); J.canos = J.canos.filter(function (c) { return c.x > -80 })
      if (J.y > H || J.y < 0) fim(); x.save(); x.translate(bx, J.y); x.rotate(Math.max(-0.5, Math.min(1, J.vy * 0.06))); E(C.heroi, 0, 0, 44); x.restore()
    }
    if (T === 'snake') {
      var tam = J.n, oy = 70; if (ent.dir) { var op = { d: 'e', e: 'd', c: 'b', b: 'c' }; if (op[ent.dir] !== J.d) J.d = ent.dir; ent.dir = null }
      J.acc += dt; if (J.acc > Math.max(3, 7 / V - pts / 60)) { J.acc = 0; var h = J.cobra[0], n = { x: h.x + (J.d === 'd') - (J.d === 'e'), y: h.y + (J.d === 'b') - (J.d === 'c') }
        if (n.x < 0 || n.y < 0 || n.x >= J.cols || n.y >= J.rows || J.cobra.some(function (s) { return s.x === n.x && s.y === n.y }) || J.bombas.some(function (b) { return b.x === n.x && b.y === n.y })) return fim()
        J.cobra.unshift(n); if (n.x === J.comida.x && n.y === J.comida.y) { pts += 10; som(880, 0.08); J.comida = livre(); if (pts % 30 === 0 && C.inimigo) J.bombas.push(livre()) } else J.cobra.pop() }
      x.strokeStyle = 'rgba(255,255,255,.08)'; x.strokeRect(0, oy, J.cols * tam, J.rows * tam)
      J.cobra.forEach(function (s, i) { x.fillStyle = i ? C.cor : '#fff'; x.globalAlpha = 1 - i / (J.cobra.length + 8); x.fillRect(s.x * tam + 2, oy + s.y * tam + 2, tam - 4, tam - 4) }); x.globalAlpha = 1
      E(C.item, J.comida.x * tam + tam / 2, oy + J.comida.y * tam + tam / 2, tam); J.bombas.forEach(function (b) { E(C.inimigo, b.x * tam + tam / 2, oy + b.y * tam + tam / 2, tam) })
      txt('Deslize ou use as setas', W / 2, H - 20, 13, 'rgba(255,255,255,.5)')
    }
    if (T === 'breakout') {
      J.px += (ent.x - J.px) * 0.4; var pw = Math.max(80, W * 0.22), py = H - 60, b = J.bola
      x.fillStyle = C.cor; x.fillRect(J.px - pw / 2, py, pw, 14)
      b.x += b.vx * dt; b.y += b.vy * dt; if (b.x < 10 || b.x > W - 10) b.vx *= -1; if (b.y < 70) b.vy = Math.abs(b.vy)
      if (b.y > py - 10 && b.y < py + 14 && Math.abs(b.x - J.px) < pw / 2 + 8 && b.vy > 0) { b.vy = -Math.abs(b.vy) * 1.02; b.vx = (b.x - J.px) / (pw / 2) * 6 * V; som(440, 0.05) }
      if (b.y > H) { J.vidas--; som(160, 0.3); if (J.vidas <= 0) return fim(); b.x = W / 2; b.y = H * 0.6; b.vy = -4.2 * V }
      J.blocos.forEach(function (k) { if (!k.ok) return; x.fillStyle = k.cor; x.fillRect(k.x, k.y, k.w, k.h); if (b.x > k.x && b.x < k.x + k.w && b.y > k.y && b.y < k.y + k.h + 8) { k.ok = false; b.vy *= -1; pts += 10; som(700, 0.05) } })
      if (J.blocos.every(function (k) { return !k.ok })) { pts += 100; fim() } E(C.heroi, b.x, b.y, 22)
    }
    if (T === 'shooter') {
      J.px += (ent.x - J.px) * 0.3; var sy = H - 80; E(C.heroi, J.px, sy, 50)
      if ((J.cad -= dt) <= 0) { J.tiros.push({ x: J.px, y: sy - 30 }); J.cad = 9; som(1200, 0.02) }
      if (--J.prox <= 0) { J.inim.push({ x: 30 + Math.random() * (W - 60), y: -30, v: (1.6 + Math.random() * 1.6 + pts / 400) * V }); J.prox = Math.max(14, 45 - pts / 30) }
      x.fillStyle = C.cor; J.tiros = J.tiros.filter(function (t) { t.y -= 11 * dt; x.fillRect(t.x - 2, t.y, 4, 14); return t.y > -20 })
      J.inim = J.inim.filter(function (e) { e.y += e.v * dt; E(C.inimigo, e.x, e.y, 40); for (var i = 0; i < J.tiros.length; i++) if (col(e, J.tiros[i], 28)) { J.tiros.splice(i, 1); pts += 10; som(300, 0.06); return false } if (col(e, { x: J.px, y: sy }, 40) || e.y > H + 20) { J.vidas--; som(120, 0.25); if (J.vidas <= 0) fim(); return false } return true })
    }
    if (T === 'catcher') {
      J.px += (ent.x - J.px) * 0.35; var cy = H - 70; E(C.heroi, J.px, cy, 60)
      if (--J.prox <= 0) { J.cai.push({ x: 30 + Math.random() * (W - 60), y: -30, mau: Math.random() < 0.25, v: (2.4 + Math.random() * 2 + pts / 300) * V }); J.prox = Math.max(12, 40 - pts / 40) }
      J.cai = J.cai.filter(function (o) { o.y += o.v * dt; E(o.mau ? C.inimigo : C.item, o.x, o.y, 38); if (Math.abs(o.x - J.px) < 44 && Math.abs(o.y - cy) < 30) { if (o.mau) { J.vidas--; som(140, 0.3); if (J.vidas <= 0) fim() } else { pts += 5; som(880, 0.06) } return false } if (o.y > H + 30) { if (!o.mau) { J.vidas--; if (J.vidas <= 0) fim() } return false } return true })
    }
    if (T === 'memoria') {
      if (J.trava && agora > J.trava) { J.abertas.forEach(function (i) { J.cartas[i].ab = false }); J.abertas = []; J.trava = 0 }
      grade().forEach(function (q, i) { var c = J.cartas[i]; x.fillStyle = c.ok ? 'rgba(255,255,255,.12)' : c.ab ? '#fff' : C.cor; x.beginPath(); x.roundRect ? x.roundRect(q.x, q.y, q.w, q.h, 12) : x.rect(q.x, q.y, q.w, q.h); x.fill(); if (c.ab || c.ok) E(c.e, q.x + q.w / 2, q.y + q.h / 2, q.w * 0.55); else E(C.heroi || '❓', q.x + q.w / 2, q.y + q.h / 2, q.w * 0.35) })
      txt('Jogadas: ' + J.jog, W / 2, H - 30, 16, 'rgba(255,255,255,.7)')
    }
    if (T === 'quiz') {
      var q = J.perg[J.i]; if (!q) return fim()
      txt((J.i + 1) + '/' + J.perg.length, W / 2, 80, 16, 'rgba(255,255,255,.6)')
      x.font = '700 ' + Math.min(26, W / 16) + 'px system-ui,sans-serif'; x.fillStyle = '#fff'; x.textAlign = 'center'
      var pal = q.q.split(' '), lin = '', ly = H * 0.22; pal.forEach(function (p) { if (x.measureText(lin + p).width > W - 50) { x.fillText(lin, W / 2, ly); lin = ''; ly += 32 } lin += p + ' ' }); x.fillText(lin, W / 2, ly)
      q.o.forEach(function (o, k) { var by = H * 0.42 + k * 74; x.fillStyle = J.escolha < 0 ? 'rgba(255,255,255,.1)' : k === q.c ? '#22c55e' : k === J.escolha ? '#ef4444' : 'rgba(255,255,255,.06)'; x.beginPath(); x.roundRect ? x.roundRect(20, by, W - 40, 62, 14) : x.rect(20, by, W - 40, 62); x.fill(); txt(o, W / 2, by + 31, Math.min(20, W / 20), '#fff') })
      if (J.escolha >= 0 && performance.now() - J.tempo > 1100) { J.i++; J.escolha = -1 }
    }
    hud()
  }
  requestAnimationFrame(passo)
}
function gerarJogo(cfg) {
  var c = Object.assign({}, JOGO_PADRAO[cfg.tipo] || JOGO_PADRAO.runner, cfg)
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><title>' + String(c.titulo).replace(/</g, '') + '</title><meta name="theme-color" content="' + c.fundo1 + '"><style>html,body{margin:0;height:100%;overflow:hidden;background:' + c.fundo1 + ';touch-action:none;-webkit-user-select:none;user-select:none}canvas{display:block}</style></head><body><canvas id="c"></canvas><script>(' + jogoRuntime.toString() + ')(' + JSON.stringify(c).replace(/</g, '\\u003c') + ')<\/script></body></html>'
}
var JOGO_ATUAL = null
function jogos() {
  cab('CRIAR JOGO', 1)
  var v = vidro('DESCREVA O JOGO', '▶')
  var ta = el('textarea'); ta.rows = 3; ta.placeholder = 'Ex.: um jogo de nave para minha barbearia, com navalhas e tesouras; ou um quiz de futebol com 10 perguntas'; v.appendChild(ta)
  var tp = seletor(v, 'Tipo', [['auto', 'A IA escolhe']].concat(JOGO_TIPOS), 'auto')
  var bt = botao('Criar jogo', 'larga'); v.appendChild(bt); M.appendChild(v)
  var out = el('div'); M.appendChild(out)
  var r = el('div', 'chips'); JOGO_TIPOS.forEach(function (t) { var b = el('button', '', t[1]); b.onclick = function () { JOGO_ATUAL = Object.assign({ tipo: t[0] }, JOGO_PADRAO[t[0]]); mostrarJogo(out) }; r.appendChild(b) })
  M.appendChild(el('p', 'dsub', 'Ou jogue um modelo pronto:')); M.appendChild(r)
  if (JOGO_ATUAL) mostrarJogo(out)
  bt.onclick = function () {
    var d = ta.value.trim(); if (!d) return aviso('Descreva o jogo.')
    bt.disabled = true; bt.textContent = 'Criando…'
    iaJSON('Você é designer de jogos casuais. A partir do pedido, personalize um jogo de um destes tipos: runner, flappy, snake, breakout, shooter, catcher, memoria, quiz. Use EMOJIS como personagens. Responda SOMENTE JSON: {"tipo":"","titulo":"até 3 palavras","heroi":"1 emoji","inimigo":"1 emoji","item":"1 emoji","fundo1":"#hex escuro","fundo2":"#hex","cor":"#hex vibrante","velocidade":1,"mensagemFim":"frase curta","pares":["8 emojis diferentes (só memoria)"],"perguntas":[{"q":"pergunta","o":["4 opções"],"c":0}]}. perguntas só para quiz (8 a 12, corretas e verificáveis; c = índice da correta). velocidade de 0.8 a 1.6.', 'Pedido: ' + d + (tp.value !== 'auto' ? '\nTipo obrigatório: ' + tp.value : ''))
      .then(function (j) { if (!JOGO_PADRAO[j.tipo]) j.tipo = tp.value !== 'auto' ? tp.value : 'runner'; if (j.tipo === 'quiz' && !(j.perguntas && j.perguntas.length)) delete j.perguntas; if (j.perguntas) j.perguntas = j.perguntas.filter(function (q) { return q && q.q && q.o && q.o.length >= 2 && q.c >= 0 && q.c < q.o.length }); JOGO_ATUAL = j; mostrarJogo(out) })
      .catch(function () { aviso('A IA não respondeu; abrindo o modelo pronto.'); var t = tp.value !== 'auto' ? tp.value : 'runner'; JOGO_ATUAL = Object.assign({ tipo: t }, JOGO_PADRAO[t]); mostrarJogo(out) })
      .then(function () { bt.disabled = false; bt.textContent = 'Criar jogo' })
  }
}
function mostrarJogo(out) {
  out.textContent = ''; var html = gerarJogo(JOGO_ATUAL), nome = String(JOGO_ATUAL.titulo || 'jogo').normalize('NFD').replace(/[^\w]+/g, '-').toLowerCase().replace(/^-|-$/g, '') || 'jogo'
  var v = vidro(String(JOGO_ATUAL.titulo || 'JOGO').toUpperCase(), '✓'); var f = el('iframe', 'jprev'); f.title = 'Jogo'; f.setAttribute('sandbox', 'allow-scripts allow-same-origin'); f.srcdoc = html; v.appendChild(f)
  var g = el('div', 'lacoes')
  g.appendChild(botao('Tela cheia', '', function () { var u = URL.createObjectURL(new Blob([html], { type: 'text/html' })); window.open(u, '_blank') }))
  g.appendChild(botao('Baixar jogo', 'sec', function () { baixarArq(new Blob([html], { type: 'text/html' }), nome + '.html') }))
  if (navigator.share) g.appendChild(botao('Compartilhar', 'sec', function () { var fi = new File([html], nome + '.html', { type: 'text/html' }); navigator.share({ files: [fi], title: JOGO_ATUAL.titulo }).catch(function () {}) }))
  v.appendChild(g); v.appendChild(el('p', 'dsub', 'Para publicar: arraste o arquivo baixado em app.netlify.com/drop ou suba no itch.io. Funciona no celular e no computador.')); out.appendChild(v)
  var l = lerL('jogos.json', []); l.unshift({ data: Date.now(), cfg: JOGO_ATUAL }); gravarL('jogos.json', l.slice(0, 10))
}

// ================= VÍDEOS VIRAIS (Reels / TikTok / Shorts, 9:16) =================
// Formatos que viralizam: gancho forte nos 2 primeiros segundos, legendas grandes palavra por palavra,
// cortes rápidos, fotos em movimento (Ken Burns), barra de progresso e chamada no final.
// Tudo é desenhado e gravado aqui no aparelho (canvas + MediaRecorder). Narração com a voz do Gemini quando houver chave.
var VID_MODELOS = [
  ['curiosidade', 'Você sabia? (curiosidades)', '5 curiosidades surpreendentes e verdadeiras'],
  ['top5', 'Top 5 / ranking', 'um ranking de 5 itens com contagem regressiva'],
  ['motivacional', 'Motivacional', 'uma mensagem motivacional curta e forte, sem clichê'],
  ['enigma', 'Enigma / quiz', 'um enigma ou pergunta desafiadora, com pausa e depois a resposta'],
  ['historia', 'História em 30 s', 'uma história curta real e impressionante, com reviravolta'],
  ['dica', 'Dicas rápidas', '3 dicas práticas e úteis sobre o tema'],
  ['negocio', 'Propaganda do negócio', 'um anúncio curto para um negócio local, com oferta e chamada para o WhatsApp']
]
var VID = null
function videos() {
  cab('VÍDEO VIRAL', 1)
  var v = vidro('CRIAR VÍDEO 9:16', '▶')
  var md = seletor(v, 'Formato', VID_MODELOS.map(function (m) { return [m[0], m[1]] }), (VID && VID.modelo) || 'curiosidade')
  var tema = campoL(v, 'Tema', 'text', (VID && VID.tema) || '', 'Ex.: espaço, futebol, Acre, café, sua barbearia…')
  var ar = seletor(v, 'Narração', [['auto', 'Voz do Gemini (se tiver chave)'], ['nao', 'Sem voz (só legenda)']], 'auto')
  var arr = seletor(v, 'Estilo da legenda', [['amarelo', 'Amarelo viral'], ['branco', 'Branco limpo'], ['neon', 'Neon']], 'amarelo')
  var assin = campoL(v, 'Seu @ (aparece no final)', 'text', lerL('vid-arroba.json', ''), '@seuperfil')
  var bt = botao('Criar roteiro', 'larga'); v.appendChild(bt); M.appendChild(v)
  var out = el('div'); M.appendChild(out)
  if (VID) mostrarVideo(out)
  bt.onclick = function () {
    var t = tema.value.trim(); if (!t) return aviso('Diga o tema.')
    gravarL('vid-arroba.json', assin.value.trim())
    var m = VID_MODELOS.filter(function (x) { return x[0] === md.value })[0]
    bt.disabled = true; bt.textContent = 'Escrevendo roteiro…'
    iaJSON('Você é roteirista de vídeos curtos que viralizam no TikTok/Reels, em português do Brasil. Formato pedido: ' + m[2] + '. Regras: gancho irresistível na primeira cena (até 8 palavras), frases curtas e faladas, fatos VERDADEIROS e verificáveis (nada inventado), 6 a 9 cenas, total de 25 a 45 segundos falados, última cena com chamada (seguir/comentar). Responda SOMENTE JSON: {"titulo":"","cenas":[{"texto":"o que é falado e aparece na legenda (até 18 palavras)","foto":"busca em INGLÊS para foto de banco de imagens (3-4 palavras)","destaque":"1 palavra ou número de impacto"}],"legenda":"texto do post com 1 frase + pergunta","hashtags":["8 hashtags"]}', 'Tema: ' + t)
      .then(function (j) { j.cenas = (j.cenas || []).filter(function (c) { return c && c.texto }).slice(0, 10); if (!j.cenas.length) throw new Error('vazio'); VID = { modelo: md.value, tema: t, roteiro: j, voz: ar.value, estilo: arr.value, arroba: assin.value.trim() }; mostrarVideo(out) })
      .catch(function () { aviso('A IA não respondeu. Veja as chaves em Mais › Chaves de IA.') })
      .then(function () { bt.disabled = false; bt.textContent = 'Criar roteiro' })
  }
}
function mostrarVideo(out) {
  out.textContent = ''; var r = VID.roteiro
  var v = vidro('ROTEIRO · ' + String(r.titulo || '').toUpperCase(), '✎')
  r.cenas.forEach(function (c, i) { var ta = el('textarea', 'vcena'); ta.rows = 2; ta.value = c.texto; ta.oninput = function () { c.texto = ta.value }; v.appendChild(el('div', 'dsub', 'Cena ' + (i + 1) + (c.foto ? ' · foto: ' + c.foto : ''))); v.appendChild(ta) })
  out.appendChild(v)
  var prev = vidro('VÍDEO'); var cv = el('canvas', 'vcanvas'); cv.width = 720; cv.height = 1280; prev.appendChild(cv)
  var st = el('p', 'dsub', 'Toque em Gerar vídeo. A gravação leva o tempo do vídeo (cerca de 30 s): deixe a tela aberta.'); prev.appendChild(st)
  var g = el('div', 'lacoes'); var gb = botao('Gerar vídeo', ''); g.appendChild(gb); prev.appendChild(g); out.appendChild(prev)
  var post = vidro('TEXTO DO POST'); var tp = el('textarea'); tp.rows = 4; tp.value = (r.legenda || '') + '\n\n' + (r.hashtags || []).map(function (h) { return h.charAt(0) === '#' ? h : '#' + h }).join(' '); post.appendChild(tp); post.appendChild(botao('Copiar texto', 'sec', function () { try { navigator.clipboard.writeText(tp.value); aviso('Copiado.') } catch (e) {} })); out.appendChild(post)
  desenharCena(cv.getContext('2d'), r, 0, 0, {}, VID.estilo)
  gb.onclick = function () { gb.disabled = true; renderizarVideo(cv, st).then(function (res) { gb.disabled = false; if (!res) return; var ext = /mp4/.test(res.tipo) ? 'mp4' : 'webm'; var vid = el('video', 'vcanvas'); vid.src = URL.createObjectURL(res.blob); vid.controls = true; vid.playsInline = true; prev.insertBefore(vid, st); cv.style.display = 'none'; g.textContent = ''; g.appendChild(botao('Baixar vídeo', '', function () { baixarArq(res.blob, 'nexus-viral.' + ext) })); if (navigator.share) g.appendChild(botao('Compartilhar', 'sec', function () { navigator.share({ files: [new File([res.blob], 'nexus-viral.' + ext, { type: res.tipo })] }).catch(function () {}) })); g.appendChild(botao('Refazer', 'sec', function () { mostrarVideo(out) })); st.textContent = ext === 'webm' ? 'Pronto (WebM). No iPhone o vídeo sai em MP4.' : 'Pronto! Poste no Reels, TikTok ou Shorts.' }).catch(function (e) { gb.disabled = false; st.textContent = 'Falhou: ' + String(e && e.message || e) }) }
}
var VID_CORES = { amarelo: ['#ffe14d', '#ffffff'], branco: ['#ffffff', '#ffffff'], neon: ['#39ffcf', '#ff4fd8'] }
function quebrar(ctx, txt, larg) { var p = String(txt).split(/\s+/), lin = [], at = ''; p.forEach(function (w) { if (ctx.measureText((at + ' ' + w).trim()).width > larg && at) { lin.push(at); at = w } else at = (at + ' ' + w).trim() }); if (at) lin.push(at); return lin }
function desenharCena(x, r, i, prog, fotos, estilo, palavraAtiva, total) {
  var W = 720, H = 1280, c = r.cenas[i] || r.cenas[r.cenas.length - 1], f = fotos[i], cor = VID_CORES[estilo] || VID_CORES.amarelo
  x.fillStyle = '#000'; x.fillRect(0, 0, W, H)
  if (f) { var z = 1.08 + prog * 0.12, iw = f.width, ih = f.height, sc = Math.max(W / iw, H / ih) * z, dx = (W - iw * sc) / 2 + (i % 2 ? -1 : 1) * prog * 30, dy = (H - ih * sc) / 2; x.drawImage(f, dx, dy, iw * sc, ih * sc) }
  else { var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, 'hsl(' + (i * 47 + 220) % 360 + ',70%,22%)'); g.addColorStop(1, 'hsl(' + (i * 47 + 280) % 360 + ',70%,8%)'); x.fillStyle = g; x.fillRect(0, 0, W, H) }
  var gv = x.createLinearGradient(0, H * 0.35, 0, H); gv.addColorStop(0, 'rgba(0,0,0,0)'); gv.addColorStop(1, 'rgba(0,0,0,.78)'); x.fillStyle = gv; x.fillRect(0, 0, W, H)
  // barra de progresso em segmentos
  var n = r.cenas.length, sw = (W - 40 - (n - 1) * 6) / n; for (var k = 0; k < n; k++) { x.fillStyle = 'rgba(255,255,255,.3)'; x.fillRect(20 + k * (sw + 6), 30, sw, 6); x.fillStyle = '#fff'; x.fillRect(20 + k * (sw + 6), 30, sw * (k < i ? 1 : k === i ? prog : 0), 6) }
  // destaque grande
  if (c.destaque && prog < 0.9) { x.save(); var s = Math.min(1, prog * 6); x.globalAlpha = s; x.font = '900 120px system-ui,-apple-system,Segoe UI,sans-serif'; x.textAlign = 'center'; x.lineWidth = 14; x.strokeStyle = 'rgba(0,0,0,.6)'; var dt = String(c.destaque).toUpperCase().slice(0, 12); x.translate(W / 2, 420); x.scale(0.8 + s * 0.2, 0.8 + s * 0.2); x.strokeText(dt, 0, 0); x.fillStyle = cor[1] === '#ffffff' ? cor[0] : cor[1]; x.fillText(dt, 0, 0); x.restore() }
  // legenda palavra por palavra
  x.font = '900 62px system-ui,-apple-system,Segoe UI,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
  var lin = quebrar(x, c.texto.toUpperCase(), W - 90), y0 = H * 0.7 - (lin.length - 1) * 38, idx = 0, ativo = palavraAtiva === undefined ? Math.floor(prog * c.texto.split(/\s+/).length) : palavraAtiva
  lin.forEach(function (l, li) {
    var ws = l.split(' '), larg = x.measureText(l).width, px = W / 2 - larg / 2
    ws.forEach(function (w) { var ww = x.measureText(w + ' ').width; x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = '#000'; x.textAlign = 'left'; x.strokeText(w, px, y0 + li * 76); x.fillStyle = idx === ativo ? cor[0] : '#fff'; x.fillText(w, px, y0 + li * 76); px += ww; idx++ })
  })
  if (i === r.cenas.length - 1 && VID && VID.arroba) { x.textAlign = 'center'; x.font = '800 40px system-ui,sans-serif'; x.fillStyle = '#fff'; x.fillText('Siga ' + VID.arroba, W / 2, H - 120) }
}
function carregarFoto(busca) {
  return NX.sitegen.buscarFotos({ marca: '', nicho: busca, hero: { titulo: '' }, secoes: [], fotos: { hero: busca, galeria: [] } }, { pexels: NX.leads.cfg().pexels }).then(function (u) {
    if (!u.hero) return null
    return new Promise(function (ok) { var im = new Image(); im.crossOrigin = 'anonymous'; im.onload = function () { ok(im) }; im.onerror = function () { ok(null) }; im.src = u.hero; setTimeout(function () { ok(null) }, 12000) })
  }).catch(function () { return null })
}
function renderizarVideo(cv, st) {
  var r = VID.roteiro, x = cv.getContext('2d'), fotos = {}
  st.textContent = 'Buscando fotos…'
  return Promise.all(r.cenas.map(function (c, i) { return carregarFoto(c.foto || VID.tema).then(function (im) { if (im) { try { var t = document.createElement('canvas'); t.width = 2; t.height = 2; t.getContext('2d').drawImage(im, 0, 0, 2, 2); t.getContext('2d').getImageData(0, 0, 1, 1); fotos[i] = im } catch (e) {} } }) }))
    .then(function () {
      st.textContent = 'Gravando a narração…'
      var texto = r.cenas.map(function (c) { return c.texto }).join('. ')
      return (VID.voz === 'nao' ? Promise.resolve(null) : ttsGemini(texto).catch(function () { return null }))
    })
    .then(function (blobVoz) {
      var AC = window.AudioContext || window.webkitAudioContext, ac = new AC(), dest = ac.createMediaStreamDestination()
      return (blobVoz ? blobVoz.arrayBuffer().then(function (b) { return ac.decodeAudioData(b) }).catch(function () { return null }) : Promise.resolve(null)).then(function (buf) {
        var pal = r.cenas.map(function (c) { return c.texto.split(/\s+/).length }), totPal = pal.reduce(function (a, b) { return a + b }, 0)
        var dur = buf ? buf.duration + 0.6 : Math.max(18, totPal * 0.42), tempos = [], acc = 0
        pal.forEach(function (n) { var d = dur * n / totPal; tempos.push([acc, acc + d]); acc += d })
        var stream = cv.captureStream(30); if (buf) dest.stream.getAudioTracks().forEach(function (t) { stream.addTrack(t) })
        var tipos = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'], tipo = tipos.filter(function (t) { return window.MediaRecorder && MediaRecorder.isTypeSupported(t) })[0]
        if (!tipo) throw new Error('este navegador não grava vídeo')
        var rec = new MediaRecorder(stream, { mimeType: tipo, videoBitsPerSecond: 5000000 }), partes = []
        rec.ondataavailable = function (e) { if (e.data && e.data.size) partes.push(e.data) }
        return new Promise(function (fim) {
          rec.onstop = function () { ac.close(); fim({ blob: new Blob(partes, { type: tipo.split(';')[0] }), tipo: tipo.split(';')[0] }) }
          rec.start(250); var ini = performance.now()
          if (buf) { var src = ac.createBufferSource(); src.buffer = buf; src.connect(dest); src.connect(ac.destination); src.start() }
          st.textContent = 'Gravando… 0 s de ' + Math.round(dur) + ' s'
          ;(function loop() {
            var t = (performance.now() - ini) / 1000
            if (t >= dur) { desenharCena(x, r, r.cenas.length - 1, 1, fotos, VID.estilo); setTimeout(function () { rec.stop() }, 300); return }
            var i = 0; while (i < tempos.length - 1 && t >= tempos[i][1]) i++
            var p = (t - tempos[i][0]) / (tempos[i][1] - tempos[i][0])
            desenharCena(x, r, i, Math.min(1, p), fotos, VID.estilo, Math.floor(p * pal[i]))
            st.textContent = 'Gravando… ' + Math.floor(t) + ' s de ' + Math.round(dur) + ' s'
            requestAnimationFrame(loop)
          })()
        })
      })
    })
}

// ================= LIGAÇÃO COM O NEXUS (conversa por voz sem apertar botão, com câmera opcional) =================
var LIG = null, LIG_PERSONA = 'nexus'
var PERSONAS = { nexus: ['Nexus', ''], amigo: ['Amigo', 'Fale como um amigo próximo, descontraído e bem-humorado, frases curtas. '], treinador: ['Treinador', 'Fale como um treinador de academia e futebol motivador e direto, dando dicas práticas. '], ingles: ['Professor de inglês', 'Você é professor de inglês: converse em inglês simples, corrija meus erros com gentileza e traduza quando eu pedir. '], vendas: ['Mentor de vendas', 'Você é mentor de vendas de sites para pequenos negócios: ajude com abordagem, objeções e preço, de forma prática. '] }
function pararLigacao() { if (!LIG) return; LIG.vivo = false; try { LIG.stream.getTracks().forEach(function (t) { t.stop() }) } catch (e) {} try { LIG.cam && LIG.cam.getTracks().forEach(function (t) { t.stop() }) } catch (e) {} try { LIG.ac.close() } catch (e) {} LIG = null }
function ligacao() {
  cab('LIGAÇÃO COM O NEXUS', 1)
  var palco = el('div', 'lgpalco'); var cv = el('canvas'); cv.width = 600; cv.height = 600; palco.appendChild(cv); var vid = el('video', 'lgcam'); vid.playsInline = true; vid.muted = true; palco.appendChild(vid); var est = el('div', 'lgest', 'Toque em Ligar'); palco.appendChild(est); M.appendChild(palco)
  var ps = el('div', 'chips'); Object.keys(PERSONAS).forEach(function (k) { var b = el('button', LIG_PERSONA === k ? 'on' : '', PERSONAS[k][0]); b.onclick = function () { LIG_PERSONA = k; [].forEach.call(ps.children, function (c) { c.className = '' }); b.className = 'on' }; ps.appendChild(b) }); M.appendChild(ps)
  var g = el('div', 'lacoes'); var bl = botao('Ligar', ''); var bc = botao('Câmera', 'sec'); var bm = botao('Mudo', 'sec'); g.appendChild(bl); g.appendChild(bc); g.appendChild(bm); M.appendChild(g)
  var log = el('div', 'lglog'); M.appendChild(log)
  M.appendChild(el('p', 'dsub', 'Fale normalmente: o Nexus percebe quando você termina de falar, responde em voz alta e volta a ouvir. Com a câmera ligada, ele também vê o que você mostra. Use fone de ouvido para não haver eco.'))
  var x = cv.getContext('2d'), nivel = 0, fase = 'parado', LIG_NIV = 0
  ;(function orbe() {
    if (!cv.isConnected) return
    var t = performance.now() / 1000, W = 600, c = W / 2; x.clearRect(0, 0, W, W)
    var alvo = fase === 'falando' ? 0.35 + Math.abs(Math.sin(t * 9)) * 0.35 : fase === 'pensando' ? 0.2 + Math.sin(t * 4) * 0.08 : nivel; LIG_NIV = LIG_NIV * 0.8 + alvo * 0.2
    var cor = fase === 'ouvindo' ? '56,232,255' : fase === 'pensando' ? '167,139,250' : fase === 'falando' ? '124,255,155' : '120,140,170'
    for (var k = 4; k >= 0; k--) { var r = 110 + k * 26 + LIG_NIV * 90 * (1 - k * 0.12); var gr = x.createRadialGradient(c, c, r * 0.2, c, c, r); gr.addColorStop(0, 'rgba(' + cor + ',' + (0.35 - k * 0.05) + ')'); gr.addColorStop(1, 'rgba(' + cor + ',0)'); x.fillStyle = gr; x.beginPath(); x.arc(c, c, r, 0, 7); x.fill() }
    x.strokeStyle = 'rgba(' + cor + ',.9)'; x.lineWidth = 2; x.beginPath(); for (var a = 0; a <= 64; a++) { var an = a / 64 * Math.PI * 2, rr = 120 + Math.sin(an * 6 + t * 3) * 8 * (0.3 + LIG_NIV * 3); x.lineTo(c + Math.cos(an) * rr, c + Math.sin(an) * rr) } x.stroke()
    requestAnimationFrame(orbe)
  })()
  function linha(quem, t) { var d = el('div', 'lglin ' + quem); d.appendChild(el('b', '', quem === 'eu' ? 'Você' : PERSONAS[LIG_PERSONA][0])); d.appendChild(document.createTextNode(' ' + t)); log.insertBefore(d, log.firstChild) }
  function setFase(f, t) { fase = f; est.textContent = t || ({ ouvindo: 'Ouvindo…', pensando: 'Pensando…', falando: 'Falando…', parado: 'Toque em Ligar' })[f] }
  bc.onclick = function () {
    if (LIG && LIG.cam) { LIG.cam.getTracks().forEach(function (t) { t.stop() }); LIG.cam = null; vid.style.display = 'none'; bc.textContent = 'Câmera'; return }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 640 } }).then(function (s) { if (!LIG) LIG = { vivo: false }; LIG.cam = s; vid.srcObject = s; vid.style.display = 'block'; vid.play(); bc.textContent = 'Desligar câmera' }).catch(function () { aviso('Sem acesso à câmera.') })
  }
  bm.onclick = function () { if (!LIG) return; LIG.mudo = !LIG.mudo; bm.textContent = LIG.mudo ? 'Ativar microfone' : 'Mudo'; setFase(LIG.mudo ? 'parado' : 'ouvindo', LIG.mudo ? 'Microfone desligado' : '') }
  bl.onclick = function () {
    if (LIG && LIG.vivo) { pararLigacao(); bl.textContent = 'Ligar'; setFase('parado'); vid.style.display = 'none'; return }
    if (!NX.brain.chaves().groq) return aviso('A ligação precisa da chave do Groq (Mais › Chaves de IA).')
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } }).then(function (stream) {
      var cam = LIG && LIG.cam; LIG = { vivo: true, stream: stream, cam: cam, mudo: false }
      var AC = window.AudioContext || window.webkitAudioContext, ac = new AC(); LIG.ac = ac
      var an = ac.createAnalyser(); an.fftSize = 1024; ac.createMediaStreamSource(stream).connect(an)
      var buf = new Float32Array(an.fftSize), piso = 0.01, gravando = null, partes = [], iniFala = 0, ultVoz = 0, ocupado = false
      bl.textContent = 'Desligar'; setFase('ouvindo'); try { falar('Pode falar.') } catch (e) {}
      function rms() { an.getFloatTimeDomainData(buf); var s = 0; for (var i = 0; i < buf.length; i++) s += buf[i] * buf[i]; return Math.sqrt(s / buf.length) }
      function tipoRec() { return ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].filter(function (t) { return MediaRecorder.isTypeSupported(t) })[0] }
      ;(function vad() {
        if (!LIG || !LIG.vivo) return
        var v = rms(), agora = performance.now(); nivel = Math.min(1, v * 8)
        var falandoNexus = typeof FALANDO !== 'undefined' && FALANDO
        if (falandoNexus || ocupado || LIG.mudo) { if (!falandoNexus && !ocupado && !LIG.mudo) setFase('ouvindo'); requestAnimationFrame(vad); return }
        if (fase !== 'ouvindo') setFase('ouvindo')
        if (!gravando) { piso = piso * 0.98 + v * 0.02; if (v > Math.max(0.025, piso * 3)) { partes = []; gravando = new MediaRecorder(stream, tipoRec() ? { mimeType: tipoRec() } : undefined); gravando.ondataavailable = function (e) { if (e.data.size) partes.push(e.data) }; gravando.start(); iniFala = agora; ultVoz = agora } }
        else { if (v > Math.max(0.02, piso * 2.2)) ultVoz = agora; if (agora - ultVoz > 1100 || agora - iniFala > 15000) { var rec = gravando; gravando = null; var curto = agora - iniFala < 600; rec.onstop = function () { if (!curto) enviar(new Blob(partes, { type: rec.mimeType || 'audio/webm' })) }; rec.stop() } }
        requestAnimationFrame(vad)
      })()
      function quadroCam() { if (!LIG.cam || !vid.videoWidth) return null; var c = document.createElement('canvas'), s = Math.min(1, 768 / vid.videoWidth); c.width = vid.videoWidth * s; c.height = vid.videoHeight * s; c.getContext('2d').drawImage(vid, 0, 0, c.width, c.height); return c.toDataURL('image/jpeg', 0.75) }
      function enviar(blob) {
        ocupado = true; setFase('pensando')
        NXL.transcrever(blob).then(function (texto) {
          if (!texto || texto.length < 2) { ocupado = false; return }
          linha('eu', texto)
          var foto = quadroCam(), p = PERSONAS[LIG_PERSONA][1]
          var pedido = foto ? NXL.olhar(foto, p + 'Pergunta falada (responda curto, como numa ligação): ' + texto) : NXL.conversar((p ? '[' + p.trim() + '] ' : '') + texto + ' (responda curto, como numa conversa por telefone)')
          return pedido.then(function (resp) { resp = String(resp || ''); linha('nexus', resp); setFase('falando'); falar(resp); var esp = setInterval(function () { if (typeof FALANDO === 'undefined' || !FALANDO) { clearInterval(esp); setTimeout(function () { ocupado = false }, 350) } }, 200) })
        }).catch(function (e) { linha('nexus', 'Falha: ' + String(e && e.message || e)); ocupado = false })
      }
    }).catch(function () { aviso('Sem acesso ao microfone. Permita nas configurações do navegador.') })
  }
}
// ================= PESQUISA PROFUNDA (como o DeepSearch) =================
var PESQ = null
function pesquisa() {
  cab('PESQUISA PROFUNDA', 1)
  var v = vidro('O QUE VOCÊ QUER SABER?', '⌕'); var ta = el('textarea'); ta.rows = 3; ta.placeholder = 'Ex.: quanto cobrar por um site para pequenos negócios no Acre em 2026; melhores treinos para aumentar velocidade no futebol'; v.appendChild(ta)
  var bt = botao('Pesquisar a fundo', 'larga'); v.appendChild(bt); M.appendChild(v)
  var out = el('div'); M.appendChild(out); if (PESQ) mostrarPesquisa(out)
  bt.onclick = function () {
    var q = ta.value.trim(); if (!q) return aviso('Escreva a pergunta.')
    if (!NX.brain.chaves().groq) return aviso('A pesquisa precisa da chave do Groq.')
    bt.disabled = true; out.textContent = ''; var pr = vidro('ANDAMENTO'); out.appendChild(pr); var passo = function (t) { pr.appendChild(el('div', 'item', t)) }
    passo('Dividindo a pergunta em partes…')
    iaJSON('Divida a pergunta em 4 subperguntas de pesquisa na web, específicas e complementares. Responda SOMENTE JSON {"sub":["",""]}', q).catch(function () { return { sub: [q] } }).then(function (j) {
      var subs = (j.sub || [q]).slice(0, 5), achados = []
      return subs.reduce(function (p, s, i) { return p.then(function () { passo('Pesquisando (' + (i + 1) + '/' + subs.length + '): ' + s); return NXL.pesquisar(s).then(function (r) { achados.push('### ' + s + '\n' + r) }) }) }, Promise.resolve()).then(function () {
        passo('Juntando tudo num relatório…')
        return NX.brain.gerarTexto('Você é analista de pesquisa. Escreva um relatório em português do Brasil, claro e útil, a partir dos achados abaixo. Estrutura: Resposta curta (2-3 frases) · Pontos principais (tópicos) · Números e fatos (com a fonte citada entre parênteses) · O que fazer agora (3 passos práticos) · Fontes (lista dos sites citados). Não invente nada que não esteja nos achados; se faltar informação, diga.', 'PERGUNTA: ' + q + '\n\nACHADOS:\n' + achados.join('\n\n'), ['groq', 'gemini'])
      }).then(function (rel) { PESQ = { q: q, rel: rel }; var l = lerL('pesquisas.json', []); l.unshift({ data: Date.now(), q: q, rel: rel }); gravarL('pesquisas.json', l.slice(0, 15)); mostrarPesquisa(out) })
    }).catch(function (e) { aviso('Falhou: ' + String(e && e.message || e).slice(0, 80)) }).then(function () { bt.disabled = false })
  }
  var hist = lerL('pesquisas.json', []); if (hist.length) { var h = vidro('PESQUISAS ANTERIORES'); hist.slice(0, 6).forEach(function (it) { var b = el('button', 'item', it.q); b.style.cssText = 'width:100%;text-align:left;border:0'; b.onclick = function () { PESQ = it; mostrarPesquisa(out) }; h.appendChild(b) }); M.appendChild(h) }
}
function mostrarPesquisa(out) {
  out.textContent = ''; var v = vidro('RELATÓRIO', '✓'); v.appendChild(el('p', 'dsub', PESQ.q))
  var corpo = el('div', 'prel'); String(PESQ.rel).split('\n').forEach(function (l) { var t = l.trim(); if (!t) return; var m = /^#{1,4}\s*(.*)/.exec(t); if (m) corpo.appendChild(el('h4', '', m[1].replace(/\*\*/g, ''))); else if (/^[-*•]\s/.test(t)) corpo.appendChild(el('li', '', t.replace(/^[-*•]\s/, '').replace(/\*\*/g, ''))); else corpo.appendChild(el('p', '', t.replace(/\*\*/g, ''))) }); v.appendChild(corpo)
  var g = el('div', 'lacoes'); g.appendChild(botao('Copiar', 'sec', function () { try { navigator.clipboard.writeText(PESQ.rel); aviso('Copiado.') } catch (e) {} })); g.appendChild(botao('Ouvir resumo', 'sec', function () { falar(String(PESQ.rel).split('\n').filter(function (l) { return l.trim() && !/^#/.test(l) }).slice(0, 3).join(' ')) })); v.appendChild(g); out.appendChild(v)
}
// ---------- costura final: parar 3D/microfone ao trocar de tela ----------
var _irOriginal = ir
ir = function (n) { if (n !== 'holo') pararHolo(); if (n !== 'ligacao') pararLigacao(); return _irOriginal.apply(this, arguments) }


checarDono();fetch('/api/dono').then(function(r){return r.json()}).then(function(d){DONO=d;ir(destino())}).catch(function(){ir(destino())});
