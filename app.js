const L=[
{id:1,r:'SP',img:'l1',nome:'Chácara Vista da Serra',loc:'Atibaia, SP',tipo:'Venda',preco:1850000,terreno:'5.000 m²',q:4,area:'320 m²',extra:'Piscina e pomar'},
{id:2,r:'MG',img:'l2',nome:'Sítio Mirante do Café',loc:'Camanducaia, sul de MG',tipo:'Venda',preco:2400000,terreno:'3,2 ha',q:4,area:'410 m²',extra:'Cafezal e vista para a serra'},
{id:3,r:'RJ',img:'l3',nome:'Casa das Araucárias',loc:'Itaipava, Petrópolis, RJ',tipo:'Aluguel',preco:14500,mes:true,terreno:'3.000 m²',q:4,area:'380 m²',extra:'Lareira e jardim'},
{id:4,r:'SP',img:'l4',nome:'Casa Lago Verde',loc:'Ibiúna, SP',tipo:'Venda',preco:3200000,terreno:'1,2 ha',q:5,area:'520 m²',extra:'Acesso ao lago e deck'},
{id:5,r:'MG',img:'l5',nome:'Fazendinha Colonial',loc:'Sapucaí-Mirim, sul de MG',tipo:'Aluguel',preco:9800,mes:true,terreno:'8.000 m²',q:4,area:'290 m²',extra:'Pomar e rede na varanda'},
{id:6,r:'SP',img:'l6',nome:'Sítio Pomar e Lago',loc:'Bragança Paulista, SP',tipo:'Venda',preco:1290000,terreno:'2,5 ha',q:3,area:'210 m²',extra:'Horta, pomar e lago'}];
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const grid=document.getElementById('grid');
function draw(f){grid.innerHTML=L.filter(x=>f==='todos'||x.r===f).map(x=>`<article class="card"><div class="ph"><img src="img/${x.img}.jpg" alt="${x.nome}, ${x.loc} (imagem ilustrativa)" loading="lazy" width="1600" height="1200"><span class="seal">Verificado VerdeLar</span><span class="tag">${x.tipo}</span><span class="ex">Exemplo ilustrativo</span></div><div class="cb"><span class="loc">${x.loc}</span><h3>${x.nome}</h3><div class="price">${brl(x.preco)}${x.mes?' <small>/ mês</small>':''}</div><div class="facts"><span><b>${x.terreno}</b> de terreno</span><span><b>${x.q}</b> quartos</span><span><b>${x.area}</b> construídos</span></div><div class="facts" style="border:0;padding:0;margin:0">${x.extra}</div></div></article>`).join('');}
draw('todos');
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(o=>o.classList.toggle('on',o===b));draw(b.dataset.f);});
document.querySelectorAll('.lead-form').forEach(f=>f.addEventListener('submit',async e=>{
 e.preventDefault();const msg=f.querySelector('.msg'),em=f.email.value.trim();msg.className='msg';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){msg.textContent='Confira o e-mail, parece que falta algo.';msg.classList.add('err');f.email.focus();return;}
 const body={email:em,interesse:f.interesse.value,origem:f.dataset.origem,quando:new Date().toISOString()};
 const btn=f.querySelector('button');btn.disabled=true;
 try{
  const ep=(window.VERDELAR||{}).ENDPOINT;
  if(ep){const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});if(!r.ok)throw 0;}
  else{const k='verdelar_leads',a=JSON.parse(localStorage.getItem(k)||'[]');a.push(body);localStorage.setItem(k,JSON.stringify(a));}
  msg.textContent='Pronto! Avisamos você assim que a VerdeLar lançar.';f.email.value='';
 }catch(_){msg.textContent='Não foi possível enviar agora. Tente de novo em instantes.';msg.classList.add('err');}
 btn.disabled=false;}));
