const CATS=['Food','Shopping','Bills','Travel','Health','Entertainment','Salary','Freelance','Other'];
const CC=['#1D9E75','#378ADD','#D85A30','#BA7517','#D4537E','#7F77DD','#639922','#0F6E56','#888780'];
const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DEF=[
  {id:1,date:'2024-11-02',description:'Monthly Salary',amount:85000,type:'income',category:'Salary'},
  {id:2,date:'2024-11-05',description:'Grocery Store',amount:3200,type:'expense',category:'Food'},
  {id:3,date:'2024-11-08',description:'Electric Bill',amount:2100,type:'expense',category:'Bills'},
  {id:4,date:'2024-11-10',description:'Zomato Order',amount:680,type:'expense',category:'Food'},
  {id:5,date:'2024-11-12',description:'Freelance Project',amount:22000,type:'income',category:'Freelance'},
  {id:6,date:'2024-11-14',description:'Amazon Shopping',amount:4500,type:'expense',category:'Shopping'},
  {id:7,date:'2024-11-17',description:'Metro Card',amount:500,type:'expense',category:'Travel'},
  {id:8,date:'2024-11-19',description:'Netflix',amount:649,type:'expense',category:'Entertainment'},
  {id:9,date:'2024-11-22',description:'Pharmacy',amount:1200,type:'expense',category:'Health'},
  {id:10,date:'2024-11-25',description:'Restaurant Dinner',amount:1800,type:'expense',category:'Food'},
  {id:11,date:'2024-11-28',description:'Internet Bill',amount:999,type:'expense',category:'Bills'},
  {id:12,date:'2024-12-01',description:'Monthly Salary',amount:85000,type:'income',category:'Salary'},
  {id:13,date:'2024-12-03',description:'Big Basket',amount:2800,type:'expense',category:'Food'},
  {id:14,date:'2024-12-05',description:'Gym Membership',amount:2500,type:'expense',category:'Health'},
  {id:15,date:'2024-12-07',description:'Uber Ride',amount:350,type:'expense',category:'Travel'},
  {id:16,date:'2024-12-09',description:'Myntra Shopping',amount:3200,type:'expense',category:'Shopping'},
  {id:17,date:'2024-12-12',description:'Mobile Bill',amount:599,type:'expense',category:'Bills'},
  {id:18,date:'2024-12-14',description:'Freelance Design',amount:18000,type:'income',category:'Freelance'},
  {id:19,date:'2024-12-17',description:'Movie Tickets',amount:900,type:'expense',category:'Entertainment'},
  {id:20,date:'2024-12-20',description:'Train to Delhi',amount:1200,type:'expense',category:'Travel'},
  {id:21,date:'2024-12-22',description:'Swiggy Order',amount:520,type:'expense',category:'Food'},
  {id:22,date:'2024-12-26',description:'Year-end Shopping',amount:5500,type:'expense',category:'Shopping'},
  {id:23,date:'2025-01-01',description:'Monthly Salary',amount:85000,type:'income',category:'Salary'},
  {id:24,date:'2025-01-04',description:'Grocery Run',amount:2900,type:'expense',category:'Food'},
  {id:25,date:'2025-01-06',description:'Electric Bill',amount:1900,type:'expense',category:'Bills'},
  {id:26,date:'2025-01-09',description:'Doctor Visit',amount:800,type:'expense',category:'Health'},
  {id:27,date:'2025-01-11',description:'Ola Cab',amount:280,type:'expense',category:'Travel'},
  {id:28,date:'2025-01-13',description:'Flipkart Sale',amount:6200,type:'expense',category:'Shopping'},
  {id:29,date:'2025-01-15',description:'Freelance Article',amount:8000,type:'income',category:'Freelance'},
  {id:30,date:'2025-01-18',description:'Spotify Premium',amount:119,type:'expense',category:'Entertainment'},
  {id:31,date:'2025-01-21',description:'Restaurant Lunch',amount:650,type:'expense',category:'Food'},
  {id:32,date:'2025-01-24',description:'Internet Bill',amount:999,type:'expense',category:'Bills'},
  {id:33,date:'2025-01-28',description:'Bus Pass',amount:700,type:'expense',category:'Travel'},
];

function ls(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
function lss(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

let transactions=ls('kk_tx',DEF.map(t=>({...t})));
let role=ls('kk_role','admin');
let theme=ls('kk_theme','light');
let sortKey='date';let sortDir=-1;
let editId=null;let delId=null;
let lineInst=null;let donutInst=null;

function fmt(n){return'₹'+Math.abs(Math.round(n)).toLocaleString('en-IN')}
function fmtD(d){const p=d.split('-');return`${p[2]} ${MN[+p[1]-1]}`}
function today(){return new Date().toISOString().split('T')[0]}
function getTC(){return theme==='dark'?'#7A7870':'#B0AEA8'}
function getGC(){return theme==='dark'?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)'}

function applyTheme(){
  document.documentElement.setAttribute('data-theme',theme);
  setTimeout(()=>{if(lineInst||donutInst)renderCharts();},60);
}
function toggleTheme(){theme=theme==='light'?'dark':'light';lss('kk_theme',theme);applyTheme();}

function applyRole(){
  const p=document.getElementById('rolePill');
  p.className='role-pill '+(role==='admin'?'role-admin':'role-viewer');
  document.getElementById('roleIcon').textContent=role==='admin'?'✦':'◎';
  document.getElementById('roleText').textContent=role==='admin'?'Admin':'Viewer';
  const ab=document.getElementById('addBtn');
  if(ab)ab.style.display=role==='admin'?'':'none';
}
function toggleRole(){
  role=role==='admin'?'viewer':'admin';
  lss('kk_role',role);applyRole();renderFeed();
  toast(role==='admin'?'Switched to Admin':'Switched to Viewer','ok');
}

function showPage(name,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  el.classList.add('active');
}

function toast(msg,type='ok'){
  const w=document.getElementById('toastWrap');
  const t=document.createElement('div');
  t.className='toast';
  t.innerHTML=`<div class="t-dot ${type}"></div><span style="color:var(--text)">${msg}</span>`;
  w.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(6px)';t.style.transition='all 0.2s';setTimeout(()=>t.remove(),200);},2600);
}

function getSummary(tx){
  tx=tx||transactions;
  const inc=tx.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
  const exp=tx.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
  return{income:inc,expenses:exp,balance:inc-exp};
}

function renderOverview(){
  const{income,expenses,balance}=getSummary();
  const sr=income>0?Math.round((income-expenses)/income*100):0;
  document.getElementById('heroNum').textContent=fmt(balance);
  document.getElementById('heroNum').style.color=balance<0?'var(--red)':'var(--text)';
  document.getElementById('heroSub').textContent=balance>=0
    ?`${fmt(income)} earned · ${fmt(expenses)} spent · ${sr}% saved`
    :`${fmt(Math.abs(balance))} overspent across ${transactions.length} transactions`;
  document.getElementById('metricsStrip').innerHTML=`
    <div class="metric">
      <div class="metric-label">Total income</div>
      <div class="metric-val" style="color:var(--green)">${fmt(income)}</div>
      <div class="metric-sub">${transactions.filter(t=>t.type==='income').length} entries</div>
    </div>
    <div class="metric">
      <div class="metric-label">Total expenses</div>
      <div class="metric-val" style="color:var(--red)">${fmt(expenses)}</div>
      <div class="metric-sub">${transactions.filter(t=>t.type==='expense').length} entries</div>
    </div>`;
  const sm=document.getElementById('savingsMeter');
  const srClamped=Math.max(0,Math.min(100,sr));
  const barColor=sr>=20?'var(--green)':sr>=0?'var(--accent)':'var(--red)';
  sm.innerHTML=`
    <div class="sm-label">Savings rate</div>
    <div class="sm-val" style="color:${barColor}">${sr}%</div>
    <div class="sm-bar-bg"><div class="sm-bar" style="width:${srClamped}%;background:${barColor}"></div></div>
    <div class="sm-note">${sr>=20?'Above recommended 20% — well done.':sr>=0?`${20-sr}% below the recommended target.`:'Spending exceeds income.'}</div>`;
}

function renderCharts(){
  const byMonth={};
  [...transactions].sort((a,b)=>a.date.localeCompare(b.date)).forEach(t=>{
    const m=t.date.slice(0,7);
    if(!byMonth[m])byMonth[m]=0;
    byMonth[m]+=(t.type==='income'?1:-1)*t.amount;
  });
  let run=0;const labels=[];const data=[];
  Object.keys(byMonth).sort().forEach(m=>{
    run+=byMonth[m];
    const[y,mo]=m.split('-');
    labels.push(MN[+mo-1]+' '+y.slice(2));data.push(Math.round(run));
  });
  const hasLine=labels.length>0;
  document.getElementById('lineWrap').style.display=hasLine?'':'none';
  document.getElementById('lineEmpty').style.display=hasLine?'none':'flex';
  if(hasLine){
    if(lineInst)lineInst.destroy();
    lineInst=new Chart(document.getElementById('lineChart'),{
      type:'line',
      data:{labels,datasets:[{data,borderColor:'var(--accent)',backgroundColor:'rgba(193,123,47,0.06)',borderWidth:1.5,pointBackgroundColor:'var(--accent)',pointRadius:3,pointHoverRadius:5,fill:true,tension:0.3}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>'₹'+c.parsed.y.toLocaleString('en-IN')}}},scales:{x:{grid:{display:false},ticks:{font:{size:10,family:'DM Mono'},color:getTC()}},y:{grid:{color:getGC()},ticks:{font:{size:10,family:'DM Mono'},color:getTC(),callback:v=>'₹'+(Math.abs(v)>=1000?Math.round(v/1000)+'k':v)}}}}
    });
  }
  const catD={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{catD[t.category]=(catD[t.category]||0)+t.amount;});
  const eCats=Object.keys(catD).filter(c=>catD[c]>0).sort((a,b)=>catD[b]-catD[a]);
  const hasDon=eCats.length>0;
  document.getElementById('donutWrap').style.display=hasDon?'':'none';
  document.getElementById('donutEmpty').style.display=hasDon?'none':'flex';
  if(hasDon){
    if(donutInst)donutInst.destroy();
    const colors=eCats.map(c=>CC[CATS.indexOf(c)]||'#888780');
    donutInst=new Chart(document.getElementById('donutChart'),{
      type:'doughnut',
      data:{labels:eCats,datasets:[{data:eCats.map(c=>Math.round(catD[c])),backgroundColor:colors,borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.label}: ₹${c.parsed.toLocaleString('en-IN')}`}}}}
    });
    const total=eCats.reduce((a,c)=>a+catD[c],0);
    document.getElementById('donutLegend').innerHTML=eCats.map((c,i)=>`
      <div class="legend-row">
        <div class="legend-left"><div class="legend-dot" style="background:${colors[i]}"></div>${c}</div>
        <div class="legend-bar-wrap"><div class="legend-bar" style="width:${Math.round(catD[c]/total*100)}%;background:${colors[i]}"></div></div>
        <div class="legend-pct">${Math.round(catD[c]/total*100)}%</div>
      </div>`).join('');
  }
}

function getFiltered(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  const tf=document.getElementById('typeFilter').value;
  const cf=document.getElementById('catFilter').value;
  const days=parseInt(document.getElementById('dateFilter').value)||0;
  let rows=[...transactions];
  if(q)rows=rows.filter(t=>t.description.toLowerCase().includes(q)||t.category.toLowerCase().includes(q));
  if(tf)rows=rows.filter(t=>t.type===tf);
  if(cf)rows=rows.filter(t=>t.category===cf);
  if(days){const cut=new Date();cut.setDate(cut.getDate()-days);rows=rows.filter(t=>new Date(t.date)>=cut);}
  rows.sort((a,b)=>{
    let va=a[sortKey],vb=b[sortKey];
    if(sortKey==='amount'){va=+va;vb=+vb;}
    return va>vb?sortDir:va<vb?-sortDir:0;
  });
  return rows;
}

function renderFeed(){
  const rows=getFiltered();
  document.getElementById('txCount').textContent=`${rows.length} of ${transactions.length}`;
  const feed=document.getElementById('txFeed');
  if(!rows.length){feed.innerHTML='<div class="empty-feed">No transactions match your filters</div>';renderTxSide([]);return;}
  const byMonth={};
  rows.forEach(t=>{const m=t.date.slice(0,7);if(!byMonth[m])byMonth[m]=[];byMonth[m].push(t);});
  const isAdmin=role==='admin';
  let html='';
  Object.keys(byMonth).sort((a,b)=>b.localeCompare(a)).forEach(m=>{
    const[y,mo]=m.split('-');
    html+=`<div class="feed-month">${MN[+mo-1]} ${y}</div>`;
    byMonth[m].forEach(t=>{
      html+=`<div class="feed-item">
        <span class="fi-date">${fmtD(t.date)}</span>
        <span class="fi-desc">${t.description}</span>
        <span class="fi-cat">${t.category}</span>
        <span class="fi-type ${t.type}">${t.type==='income'?'Income':'Expense'}</span>
        <span class="fi-amount ${t.type}">${t.type==='income'?'+':'-'}${fmt(t.amount)}</span>
        <span class="fi-actions">${isAdmin?`<button class="btn-sm btn-edit" onclick="openModal(${t.id})">Edit</button><button class="btn-sm btn-del" onclick="openDelModal(${t.id})">Delete</button>`:''}</span>
      </div>`;
    });
  });
  feed.innerHTML=html;
  renderTxSide(rows);
}

function renderTxSide(rows){
  const{income,expenses,balance}=getSummary(rows);
  const side=document.getElementById('txSide');
  side.innerHTML=`
    <div class="tss-label">Filtered summary</div>
    <div class="divider" style="margin:8px 0 14px"></div>
    <div class="tx-side-stat">
      <div class="tss-label">Balance</div>
      <div class="tss-val" style="color:${balance>=0?'var(--green)':'var(--red)'}">${fmt(balance)}</div>
    </div>
    <div class="tx-side-stat">
      <div class="tss-label">Income</div>
      <div class="tss-val" style="color:var(--green)">${fmt(income)}</div>
      <div class="tss-sub">${rows.filter(t=>t.type==='income').length} entries</div>
    </div>
    <div class="tx-side-stat">
      <div class="tss-label">Expenses</div>
      <div class="tss-val" style="color:var(--red)">${fmt(expenses)}</div>
      <div class="tss-sub">${rows.filter(t=>t.type==='expense').length} entries</div>
    </div>
    <div class="divider"></div>
    <div class="tss-label" style="margin-bottom:8px">Top categories</div>
    ${(()=>{
      const cd={};rows.filter(t=>t.type==='expense').forEach(t=>{cd[t.category]=(cd[t.category]||0)+t.amount;});
      const sorted=Object.keys(cd).sort((a,b)=>cd[b]-cd[a]).slice(0,4);
      const max=sorted.length?cd[sorted[0]]:1;
      return sorted.map(c=>`
        <div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:11px;color:var(--text2)">${c}</span>
            <span style="font-family:var(--mono);font-size:11px;color:var(--text2)">${fmt(cd[c])}</span>
          </div>
          <div style="height:3px;background:var(--surface3);border-radius:2px;overflow:hidden">
            <div style="height:3px;width:${Math.round(cd[c]/max*100)}%;background:${CC[CATS.indexOf(c)]||'#888'};border-radius:2px"></div>
          </div>
        </div>`).join('')||'<div style="font-size:11px;color:var(--text3);font-style:italic">No expenses</div>';
    })()}`;
}

function setSort(key){
  if(sortKey===key)sortDir*=-1;else{sortKey=key;sortDir=-1;}
  document.querySelectorAll('.sort-btn').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('sb-'+key);
  if(el)el.classList.add('active');
  el.textContent=key.charAt(0).toUpperCase()+key.slice(1)+(sortDir===1?' ↑':' ↓');
  renderFeed();
}

function openDelModal(id){delId=id;document.getElementById('delModal').style.display='block';}
function closeDelModal(){delId=null;document.getElementById('delModal').style.display='none';}
function confirmDel(){
  transactions=transactions.filter(t=>t.id!==delId);
  lss('kk_tx',transactions);closeDelModal();renderAll();
  toast('Transaction deleted','err');
}

function clearErrs(){
  ['fDesc','fAmount','fDate'].forEach(f=>{document.getElementById(f).classList.remove('err');});
  ['eDesc','eAmount','eDate'].forEach(e=>{document.getElementById(e).style.display='none';});
}
function fieldErr(fid,eid){document.getElementById(fid).classList.add('err');document.getElementById(eid).style.display='block';}

function openModal(id){
  editId=id||null;clearErrs();
  document.getElementById('modalTitle').textContent=id?'Edit transaction':'New transaction';
  if(id){
    const t=transactions.find(x=>x.id===id);
    document.getElementById('fDesc').value=t.description;
    document.getElementById('fAmount').value=t.amount;
    document.getElementById('fDate').value=t.date;
    document.getElementById('fType').value=t.type;
    document.getElementById('fCat').value=t.category;
  }else{
    document.getElementById('fDesc').value='';
    document.getElementById('fAmount').value='';
    document.getElementById('fDate').value=today();
    document.getElementById('fType').value='expense';
    document.getElementById('fCat').value='Food';
  }
  document.getElementById('txModal').style.display='block';
}
function closeModal(){document.getElementById('txModal').style.display='none';}

function saveTx(){
  const desc=document.getElementById('fDesc').value.trim();
  const amount=parseFloat(document.getElementById('fAmount').value);
  const date=document.getElementById('fDate').value;
  let ok=true;
  clearErrs();
  if(!desc){fieldErr('fDesc','eDesc');ok=false;}
  if(!amount||amount<=0){fieldErr('fAmount','eAmount');ok=false;}
  if(!date){fieldErr('fDate','eDate');ok=false;}
  if(!ok)return;
  const type=document.getElementById('fType').value;
  const category=document.getElementById('fCat').value;
  if(editId){
    const t=transactions.find(x=>x.id===editId);
    Object.assign(t,{description:desc,amount,date,type,category});
    toast('Transaction updated','ok');
  }else{
    transactions.push({id:Date.now(),date,description:desc,amount,type,category});
    toast('Transaction added','ok');
  }
  lss('kk_tx',transactions);closeModal();renderAll();
}

function exportCSV(){
  const rows=getFiltered();
  if(!rows.length){toast('Nothing to export','err');return;}
  const csv=['Date,Description,Category,Type,Amount',...rows.map(t=>[t.date,`"${t.description}"`,t.category,t.type,t.amount].join(','))].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='ledger.csv';a.click();
  toast(`Exported ${rows.length} rows`,'ok');
}

function renderInsights(){
  const catD={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{catD[t.category]=(catD[t.category]||0)+t.amount;});
  const eCats=Object.keys(catD).sort((a,b)=>catD[b]-catD[a]);
  const total=eCats.reduce((a,c)=>a+catD[c],0);
  const top=eCats[0]||null;
  const{income,expenses,balance}=getSummary();
  const sr=income>0?Math.round((income-expenses)/income*100):0;
  const byMonth={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{const m=t.date.slice(0,7);byMonth[m]=(byMonth[m]||0)+t.amount;});
  const months=Object.keys(byMonth).sort();
  const lm=months[months.length-1];const pm=months[months.length-2];
  let momVal='–';let momDesc='Need more data.';let momColor='var(--text)';
  if(lm&&pm&&byMonth[pm]){
    const diff=byMonth[lm]-byMonth[pm];const pct=Math.abs(Math.round(diff/byMonth[pm]*100));
    const[y,mo]=lm.split('-');
    momVal=(diff>0?'+':'-')+pct+'%';
    momDesc=`Spent ${pct}% ${diff>0?'more':'less'} in ${MN[+mo-1]} ${y} vs prior month.`;
    momColor=diff>0?'var(--red)':'var(--green)';
  }
  if(!transactions.length){
    document.getElementById('insLayout').innerHTML='<div class="ins-card wide"><div style="padding:40px;text-align:center;color:var(--text3);font-style:italic;font-size:13px">Add transactions to see insights</div></div>';return;
  }
  document.getElementById('insLayout').innerHTML=`
    <div class="ins-card wide">
      <div class="ins-top">Spending breakdown</div>
      <div class="ins-bar-section">
        ${eCats.map((c,i)=>`
          <div class="ins-bar-row">
            <div class="ins-bar-label">${c}</div>
            <div class="ins-bar-bg"><div class="ins-bar-fill" style="width:${total?Math.round(catD[c]/total*100):0}%;background:${CC[CATS.indexOf(c)]||'#888'}"></div></div>
            <div class="ins-bar-val">${fmt(catD[c])}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Top category</div>
      <div class="ins-big">${top||'—'}</div>
      <div class="ins-desc">${top?`${fmt(catD[top])} — ${Math.round(catD[top]/total*100)}% of all expenses.`:''}</div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Month-on-month</div>
      <div class="ins-big" style="color:${momColor}">${momVal}</div>
      <div class="ins-desc">${momDesc}</div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Savings rate</div>
      <div class="ins-big" style="color:${sr>=20?'var(--green)':sr>=0?'var(--accent)':'var(--red)'}">${sr}%</div>
      <div class="ins-desc">${sr>=20?'Above the 20% target — great discipline.':sr>=0?`${20-sr}pp below recommended. Target 20%.`:'Outspending income — review urgently.'}</div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Net balance</div>
      <div class="ins-big" style="color:${balance>=0?'var(--green)':'var(--red)'}">${fmt(balance)}</div>
      <div class="ins-desc">${balance>=0?`${fmt(income)} in, ${fmt(expenses)} out.`:`${fmt(Math.abs(balance))} overspent across all time.`}</div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Avg expense</div>
      <div class="ins-big">${fmt(transactions.filter(t=>t.type==='expense').length?Math.round(total/transactions.filter(t=>t.type==='expense').length):0)}</div>
      <div class="ins-desc">Per transaction across ${transactions.filter(t=>t.type==='expense').length} expense entries.</div>
    </div>
    <div class="ins-card half">
      <div class="ins-top">Total transactions</div>
      <div class="ins-big">${transactions.length}</div>
      <div class="ins-desc">${transactions.filter(t=>t.type==='income').length} income · ${transactions.filter(t=>t.type==='expense').length} expense entries recorded.</div>
    </div>`;
}

function populateCatFilter(){
  const sel=document.getElementById('catFilter');
  CATS.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o);});
}

function renderAll(){
  renderOverview();renderCharts();renderFeed();renderInsights();
}

applyTheme();applyRole();populateCatFilter();renderAll();