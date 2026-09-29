(function(){
  var root=document.documentElement;
  // theme
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  document.getElementById('themeBtn').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    var next=dark?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  // menu
  var nav=document.getElementById('nav'),mb=document.getElementById('menuBtn');
  mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
  // typed snippet
  var lines=[
    '<span class="c">// profile.js</span>\n',
    '<span class="k">const</span> gihan = {\n',
    '  name: <span class="s">"Gihan Wimalaweera"</span>,\n',
    '  city: <span class="s">"Colombo, Sri Lanka"</span>,\n',
    '  studying: <span class="s">"Software Engineering"</span>,\n',
    '  loves: [<span class="s">"Programming"</span>,\n',
    '          <span class="s">"Web Development"</span>,\n',
    '          <span class="s">"Mobile Apps"</span>],\n',
    '  available: <span class="k">true</span>\n};'
  ];
  var el=document.getElementById('typed'),html=lines.join('');
  var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(still){el.innerHTML=html}else{
    var i=0,out='',tag=false;
    (function step(){
      while(i<html.length){var ch=html[i++];out+=ch;if(ch==='<')tag=true;if(ch==='>'){tag=false}if(!tag)break}
      el.innerHTML=out+'<span class="caret"></span>';
      if(i<html.length)setTimeout(step,28);
    })();
  }
  // project filter
  var btns=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('#grid .card');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    var f=b.dataset.f;cards.forEach(function(c){c.hidden=!(f==='all'||c.dataset.c===f)});
  })});
  // active nav link
  var links=document.querySelectorAll('nav a');
  var io=new IntersectionObserver(function(en){en.forEach(function(e){
    if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)})}
  })},{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s)});
  // form
  var f=document.getElementById('form'),st=document.getElementById('status');
  function bad(id,m){document.getElementById('e-'+id).textContent=m;return !m}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('name').value.trim(),m=document.getElementById('email').value.trim(),g=document.getElementById('msg').value.trim();
    var ok=[bad('name',n?'':'Enter your name.'),bad('email',/^\S+@\S+\.\S+$/.test(m)?'':'Enter a valid email address.'),bad('msg',g.length>=10?'':'Write at least 10 characters.')].every(Boolean);
    if(!ok){st.textContent='';return}
    var url='mailto:gihan.wimalaweera@example.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(g+'\n\nReply to: '+m);
    st.textContent='Thanks, '+n+'. Your email app is opening with the message ready to send.';
    location.href=url;f.reset();
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
