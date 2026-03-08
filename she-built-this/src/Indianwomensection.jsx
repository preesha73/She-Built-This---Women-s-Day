import { useState, useRef, useEffect } from "react";

const indianWomen = [
{
id:1,
name:"Kalpana Chawla",
year:"1962–2003",
title:"First Indian Woman in Space",
domain:"Aerospace Engineering",
color:"#FF6F00",
accent:"#FFB300",
icon:"🚀",
state:"Haryana",
org:"NASA",
story:"Born in Karnal, Haryana, Kalpana Chawla became the first woman of Indian origin to travel to space. She flew aboard the Space Shuttle Columbia in 1997, logging 376 hours in space. She perished heroically in the Columbia disaster of 2003 on her second mission.",
quote:"The path from dreams to success does exist.",
legacy:"Inspired an entire generation of Indian women to pursue science and engineering.",
impact:[
"First Indian woman in space",
"376 hours in orbit",
"Mission Specialist on STS-87 and STS-107",
"Congressional Space Medal of Honor"
]
},
{
id:2,
name:"Tessy Thomas",
year:"1963 – present",
title:"Missile Woman of India",
domain:"Defence & Missile Technology",
color:"#1B5E20",
accent:"#66BB6A",
icon:"🎯",
state:"Kerala",
org:"DRDO",
story:"Known as the Missile Woman of India, Dr. Tessy Thomas was the Project Director for Agni-IV and Agni-V missiles.",
quote:"Science has no gender.",
legacy:"Paved the way for women in defence R&D.",
impact:[
"Project Director Agni-IV & V",
"First woman missile project head",
"Scientist of the Year DRDO"
]
},
{
id:3,
name:"Ritu Karidhal",
year:"1975 – present",
title:"Rocket Woman of India",
domain:"Space Science",
color:"#880E4F",
accent:"#F48FB1",
icon:"🛸",
state:"Uttar Pradesh",
org:"ISRO",
story:"Mission Director of India's Mars Orbiter Mission (Mangalyaan).",
quote:"When you love your work, you give it everything.",
legacy:"Helped India reach Mars on first attempt.",
impact:[
"Mission Director Mangalyaan",
"Chandrayaan-2 Deputy Ops Director",
"ISRO Team Achievement Award"
]
},
{
id:4,
name:"Muthayya Vanitha",
year:"1969 – present",
title:"Satellite Mission Director",
domain:"Satellite Technology",
color:"#1A237E",
accent:"#90CAF9",
icon:"🛰️",
state:"Tamil Nadu",
org:"ISRO",
story:"First woman Project Director of Chandrayaan-2 mission.",
quote:"Every person contributed equally.",
legacy:"Inspired women in satellite engineering.",
impact:[
"Project Director Chandrayaan-2",
"30+ years at ISRO"
]
},
{
id:5,
name:"Sudha Murthy",
year:"1950 – present",
title:"Engineer & Philanthropist",
domain:"Technology & Social Impact",
color:"#4A148C",
accent:"#CE93D8",
icon:"💡",
state:"Karnataka",
org:"Infosys Foundation",
story:"First woman engineer hired at TELCO and co-founder of Infosys Foundation.",
quote:"Kindness is strength.",
legacy:"Transformed education and healthcare in India.",
impact:[
"First woman engineer TELCO",
"Co-founder Infosys",
"Padma Bhushan"
]
},
{
id:6,
name:"Priya Natarajan",
year:"1969 – present",
title:"Dark Matter Researcher",
domain:"Astrophysics",
color:"#006064",
accent:"#80DEEA",
icon:"🌌",
state:"Tamil Nadu",
org:"Yale University",
story:"Created first high-resolution dark matter maps.",
quote:"The universe is stranger than we suppose.",
legacy:"Fundamental contributions to cosmology.",
impact:[
"Dark matter mapping pioneer",
"TIME 100 Influential"
]
},
{
id:7,
name:"Neena Gupta",
year:"1959 – present",
title:"Mathematics Pioneer",
domain:"Pure Mathematics",
color:"#BF360C",
accent:"#FFAB91",
icon:"∑",
state:"West Bengal",
org:"Indian Statistical Institute",
story:"Solved the 70-year-old Zariski Cancellation Problem.",
quote:"Mathematics is about ideas.",
legacy:"Put India on global math research map.",
impact:[
"Ramanujan Prize",
"Bhatnagar Prize"
]
},
{
id:8,
name:"Falguni Nayar",
year:"1963 – present",
title:"Entrepreneur",
domain:"Technology & Business",
color:"#C62828",
accent:"#EF9A9A",
icon:"💄",
state:"Gujarat",
org:"Nykaa",
story:"Founded Nykaa at age 50.",
quote:"Age is just a number.",
legacy:"India's first self-made woman billionaire.",
impact:[
"Founded Nykaa",
"Women-led unicorn"
]
}
];





/* Sparkle Hover Hook */

function useCardSparkle(cardRef){
const canvasRef=useRef(null);
const sparks=useRef([]);
const raf=useRef(null);

useEffect(()=>{

const card=cardRef.current;
const canvas=canvasRef.current;
if(!card||!canvas) return;

const ctx=canvas.getContext("2d");

const resize=()=>{
canvas.width=card.offsetWidth;
canvas.height=card.offsetHeight;
};

resize();
window.addEventListener("resize",resize);

const colors=["#F48FB1","#CE93D8","#90CAF9","#FFCC80","#ffffff"];

const addSpark=(x,y)=>{
for(let i=0;i<6;i++){
sparks.current.push({
x,y,
vx:(Math.random()-0.5)*3,
vy:(Math.random()-0.5)*3-1,
r:Math.random()*2+1,
alpha:1,
color:colors[Math.floor(Math.random()*colors.length)]
});
}
};

const animate=()=>{
ctx.clearRect(0,0,canvas.width,canvas.height);

sparks.current=sparks.current.filter(s=>s.alpha>0.03);

sparks.current.forEach(s=>{

ctx.globalAlpha=s.alpha;
ctx.fillStyle=s.color;

ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.x+=s.vx;
s.y+=s.vy;
s.vy+=0.05;
s.alpha*=0.92;

});

ctx.globalAlpha=1;

if(sparks.current.length>0){
raf.current=requestAnimationFrame(animate);
}else{
raf.current=null;
}

};

const move=(e)=>{
const rect=card.getBoundingClientRect();
addSpark(e.clientX-rect.left,e.clientY-rect.top);

if(!raf.current) animate();
};

const leave=()=>{
sparks.current=[];
};

card.addEventListener("mousemove",move);
card.addEventListener("mouseleave",leave);

return()=>{
card.removeEventListener("mousemove",move);
card.removeEventListener("mouseleave",leave);
window.removeEventListener("resize",resize);
if(raf.current) cancelAnimationFrame(raf.current);
};

},[cardRef]);

return canvasRef;
}





/* Woman Card */

function WomanCard({woman,onClick,isSelected}){

const cardRef=useRef(null);
const sparkleCanvas=useCardSparkle(cardRef);

return(

<div
ref={cardRef}
className={`iw-card ${isSelected?"iw-selected":""}`}
style={{
"--iwcolor":woman.color,
"--iwaccent":woman.accent,
position:"relative",
overflow:"hidden"
}}
onClick={()=>onClick(woman)}
>

<canvas
ref={sparkleCanvas}
style={{
position:"absolute",
inset:0,
pointerEvents:"none",
borderRadius:"16px",
zIndex:3
}}
/>

<div className="iw-card-top">
<div className="iw-icon">{woman.icon}</div>

<div className="iw-meta">
<div className="iw-domain" style={{color:woman.accent}}>
{woman.domain}
</div>

<div className="iw-state">
📍 {woman.state} · {woman.org}
</div>
</div>
</div>

<div className="iw-name">{woman.name}</div>
<div className="iw-card-title">{woman.title}</div>

<div className="iw-year" style={{color:woman.accent}}>
{woman.year}
</div>

{isSelected&&(
<div
className="iw-active-bar"
style={{background:woman.color}}
/>
)}

</div>

);

}





/* Detail Panel */

function IndianDetail({woman,onClose}){

if(!woman) return null;

return(

<div className="detail-overlay" onClick={onClose}>

<div
className="detail-panel iw-detail"
onClick={(e)=>e.stopPropagation()}
style={{"--wcolor":woman.color,"--waccent":woman.accent}}
>

<button className="detail-close" onClick={onClose}>✕</button>

<div className="iw-detail-header">

<div className="iw-detail-icon">{woman.icon}</div>

<div>
<div className="iw-detail-domain" style={{color:woman.accent}}>
{woman.domain}
</div>

<div className="detail-name">{woman.name}</div>
<div className="detail-role">{woman.title}</div>

<div className="iw-detail-meta">
📍 {woman.state} · 🏛️ {woman.org} · 📅 {woman.year}
</div>
</div>

</div>

<div className="detail-section">
<div className="detail-label">HER STORY</div>
<div className="detail-text">{woman.story}</div>
</div>

<blockquote className="detail-quote">
"{woman.quote}"
</blockquote>

<ul className="iw-impact-list">
{woman.impact.map((i,index)=>(
<li key={index}>{i}</li>
))}
</ul>

<div className="detail-impact">
<div className="detail-label">LEGACY</div>
<div className="detail-impact-text">{woman.legacy}</div>
</div>

</div>
</div>

);

}





/* Main Section */

export default function IndianWomenSection(){

const[selected,setSelected]=useState(null);

const handleClick=(woman)=>{
setSelected(prev=>prev?.id===woman.id?null:woman);
};

return(

<section className="iw-section">

<div className="iw-header">
<div className="iw-tag">Bharat Ki Betiyaan</div>

<h2 className="iw-title">
Made in <span className="iw-india">India</span>
</h2>

<p className="iw-sub">
Eight Indian women who redefined science, technology and society.
</p>
</div>

<div className="iw-grid">

{indianWomen.map(w=>(
<WomanCard
key={w.id}
woman={w}
onClick={handleClick}
isSelected={selected?.id===w.id}
/>
))}

</div>

<IndianDetail woman={selected} onClose={()=>setSelected(null)}/>

</section>

);

}