const libraries = [
  ['HR Current Affairs','HR CA','Full current-affairs practice collection and monthly review sets.','hr-ca-quiz-hub.html'],
  ['Current Affairs','SpeedyCA','SpeedyCA quiz archive with rapid review trainers.','speedyca-quiz-hub.html'],
  ['HR Eklavya Book','Eklavya','Comprehensive quiz series plus dedicated D-series trainers.','hr-eklavya-quiz-hub.html'],
  ['Previous-Year Questions','HR PYQ','Authentic exam-question practice with detailed solutions.','hr-pyq-quiz-hub.html'],
  ['AH Collection','AH Quiz','Animal Husbandry specialized topic and module trainers.','ah-quiz-hub.html'],
  ['Computer Studies','Computer','Fundamentals, networking, office tools, and hardware practice.','computer-quiz-hub.html'],
  ['English Vocabulary','Vocab Energy','Blackbook vocabulary mastery missions, synonyms, and idioms.','english-vocab-quiz-hub.html']
];
const key='mr-study-pwa-goals'; let selected=new Date(); let weekStart=startOfWeek(new Date());
const $=id=>document.getElementById(id); const goals=()=>JSON.parse(localStorage.getItem(key)||'[]'); const save=v=>localStorage.setItem(key,JSON.stringify(v));
function startOfWeek(d){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x} function iso(d){return d.toISOString().slice(0,10)} function format(d,o){return new Intl.DateTimeFormat('en-IN',o).format(d)}
function renderLibraries(){ $('libraryCards').innerHTML=libraries.map(([tag,title,description,href])=>`<a class="card" href="https://rajasthancet565456-ui.github.io/MR-STUDY/${href}#library"><span class="tag">${tag.toUpperCase()}</span><h3>${title}</h3><p>${description}</p><b>OPEN LIBRARY →</b></a>`).join(''); $('quizLibrary').innerHTML=libraries.map((x,i)=>`<option value="${x[1]}">${x[1]}</option>`).join('') }
function render(){const all=goals(), days=[...Array(7)].map((_,i)=>{const d=new Date(weekStart);d.setDate(d.getDate()+i);return d}); $('weekLabel').textContent=`${format(days[0],{day:'numeric',month:'short'})} — ${format(days[6],{day:'numeric',month:'short',year:'numeric'})}`; const inWeek=all.filter(g=>days.some(d=>iso(d)===g.date)), done=inWeek.filter(g=>g.done).length; $('progressText').textContent=`${done} / ${inWeek.length} quizzes done`; $('progressPercent').textContent=`${inWeek.length?Math.round(done/inWeek.length*100):0}% week progress`; $('completedStat').innerHTML=`${done} <small>DONE THIS WEEK</small>`; $('days').innerHTML=days.map(d=>{const items=all.filter(g=>g.date===iso(d));return `<button class="day ${iso(d)===iso(selected)?'active':''}" data-day="${iso(d)}"><span>${format(d,{weekday:'short'}).toUpperCase()}</span><small>${d.getDate()}</small><i>${items.length}</i></button>`}).join(''); const items=all.filter(g=>g.date===iso(selected)); $('selectedDate').textContent=format(selected,{weekday:'long',day:'numeric',month:'long'}); $('selectedHeading').textContent=items.length?`${items.length} quiz${items.length>1?'zes':''} scheduled`:'No quizzes yet'; $('tasks').innerHTML=items.map(g=>`<li><input data-check="${g.id}" type="checkbox" ${g.done?'checked':''} aria-label="Mark ${g.title} complete"><label class="${g.done?'done':''}">${g.title} <small>· ${g.library}</small></label><button class="remove" data-remove="${g.id}" aria-label="Remove ${g.title}">×</button></li>`).join(''); $('emptyState').hidden=items.length>0 }
function openDialog(){ $('quizTitle').value=''; $('quizDialog').showModal(); $('quizTitle').focus() }
renderLibraries(); render();
$('days').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(b){selected=new Date(`${b.dataset.day}T00:00:00`);render()}});
$('tasks').addEventListener('change',e=>{if(e.target.dataset.check){const v=goals().map(g=>g.id===e.target.dataset.check?{...g,done:e.target.checked}:g);save(v);render()}});
$('tasks').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){save(goals().filter(g=>g.id!==b.dataset.remove));render()}});
$('addQuiz').onclick=openDialog; $('dockAdd').onclick=openDialog; $('saveQuiz').onclick=e=>{const title=$('quizTitle').value.trim();if(!title){e.preventDefault();$('quizTitle').focus();return}save([...goals(),{id:crypto.randomUUID(),title,library:$('quizLibrary').value,date:iso(selected),done:false}]);render()};
$('previousWeek').onclick=()=>{weekStart.setDate(weekStart.getDate()-7);selected=new Date(weekStart);render()}; $('nextWeek').onclick=()=>{weekStart.setDate(weekStart.getDate()+7);selected=new Date(weekStart);render()}; $('todayWeek').onclick=()=>{weekStart=startOfWeek(new Date());selected=new Date();render()};
$('themeToggle').onclick=()=>{document.documentElement.classList.toggle('light');const light=document.documentElement.classList.contains('light');$('themeToggle').innerHTML=light?'☾ <span>DARK</span>':'☀ <span>LIGHT</span>';localStorage.setItem('mr-study-theme',light?'light':'dark')}; if(localStorage.getItem('mr-study-theme')==='light')$('themeToggle').click();
if('serviceWorker'in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));

// Automatically add small profile badge at bottom-right without hiding content
window.addEventListener('DOMContentLoaded', () => {
    const oldFooter = document.getElementById('er-mohit-footer');
    if (oldFooter) oldFooter.remove();

    if (document.getElementById('er-mohit-corner')) return;

    const cornerDiv = document.createElement('div');
    cornerDiv.id = 'er-mohit-corner';
    
    cornerDiv.style.cssText = `
        position: fixed;
        bottom: 15px;
        right: 15px;
        z-index: 9999;
        text-align: center;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(5px);
        padding: 6px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        width: 75px;
        pointer-events: auto;
    `;

    cornerDiv.innerHTML = `
        <img src="mohit.png" alt="ER.Mohit" style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.2); display: block; margin: 0 auto 3px auto;">
        <span style="color: #333; font-size: 11px; font-family: sans-serif; font-weight: bold; display: block;">ER.Mohit</span>
    `;

    document.body.appendChild(cornerDiv);
});
