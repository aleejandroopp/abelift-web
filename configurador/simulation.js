import * as THREE from 'three';
// Illustrative sequence only: no engineering dimensions or operating speeds.
export function createSimulation({scene,cabin,groups,state,camera,orbit,onExit}){
 const root=new THREE.Group();root.name='Demostración de recorrido';root.visible=false;scene.add(root);
 let elapsed=0,active=false,paused=false,copy=null,person=null,doorMotion=null,landings=[],lastStatus='',follow=false;
 const materials=new Set(),geometries=new Set(),maps=new Set();
 function mat(color,extra={}){const m=new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.15,...extra});materials.add(m);return m}
 function add(parent,geometry,material,position){geometries.add(geometry);const o=new THREE.Mesh(geometry,material);o.position.set(...position);parent.add(o);return o}
 const box=(p,size,m,pos)=>add(p,new THREE.BoxGeometry(...size),m,pos);
 function clear(){root.clear();for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of maps)t.dispose();geometries.clear();materials.clear();maps.clear();landings=[];}
 function cloneCabin(){const c=new THREE.Group();for(const key of ['walls','floor','ceiling','details','mirror','rail','panel','doors']){const g=groups[key].clone(true);g.visible=true;g.traverse(o=>{o.visible=true;if(o.isMesh){o.geometry=o.geometry.clone();geometries.add(o.geometry);o.material=o.material.clone();materials.add(o.material);}});g.name=key;c.add(g)}return c}
 function doors(group,manual){
  if(manual){const pivot=new THREE.Group();pivot.position.set(-.74,0,1.21);group.add(pivot);for(const o of [...group.children])if(o!==pivot&&['Puerta semiautomática','Mirilla','Marco mirilla'].includes(o.name)){group.remove(o);o.position.sub(pivot.position);pivot.add(o)}return v=>pivot.rotation.y=-v*Math.PI*.51;}
  const moving=[...group.children].filter(o=>['Hoja corredera izquierda','Hoja corredera derecha','Paño acristalado','Gran mirilla'].includes(o.name)).map(o=>({o,x:o.position.x}));return v=>moving.forEach(({o,x})=>o.position.x=x+Math.sign(x)*.88*v);
 }
 function landingDoor(y){
 const g=groups.doors.clone(true);g.visible=true;g.position.set(0,y,.25);
 g.traverse(o=>{o.visible=true;if(o.isMesh){o.geometry=o.geometry.clone();geometries.add(o.geometry);o.material=o.material.clone();materials.add(o.material)}});
 root.add(g);return doors(g,state.doorType==='semi');
 }
 function avatar(){const g=new THREE.Group(),coat=mat('#38586c'),skin=mat('#c5a080'),dark=mat('#303936');
  add(g,new THREE.SphereGeometry(.14,16,12),skin,[0,1.6,0]);box(g,[.38,.57,.24],coat,[0,1.17,0]);
  const limbs=[];for(const side of [-1,1]){const leg=new THREE.Group();leg.position.set(side*.105,.87,0);g.add(leg);box(leg,[.14,.72,.14],dark,[0,-.36,0]);box(leg,[.16,.09,.27],dark,[0,-.75,-.04]);limbs.push(leg);const arm=new THREE.Group();arm.position.set(side*.25,1.4,0);g.add(arm);box(arm,[.12,.53,.12],coat,[0,-.26,0]);add(arm,new THREE.SphereGeometry(.075,12,8),skin,[0,-.57,0]);limbs.push(arm);}g.userData.limbs=limbs;root.add(g);return g;
 }
 function label(text,y){const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');x.fillStyle='#263b3e';x.font='bold 58px Arial';x.textAlign='center';x.fillText(text,128,83);const map=new THREE.CanvasTexture(c);maps.add(map);const m=new THREE.MeshBasicMaterial({map,transparent:true});materials.add(m);add(root,new THREE.PlaneGeometry(1.1,.55),m,[-2.65,y+1,2.9]);}
 function build(){clear();copy=cloneCabin();root.add(copy);doorMotion=doors(copy.getObjectByName('doors'),state.doorType==='semi');const steel=mat('#566769'),floor=mat('#b9b5ab');
  for(const x of [-1.92,1.92])for(const z of [-1.65,1.67])box(root,[.09,12,.09],steel,[x,5.8,z]);
  for(const x of [-1.7,1.7])box(root,[.055,11,.055],mat('#8e9998'),[x,5,-1.45]);
  for(let i=0;i<3;i++){const y=i*4.2;box(root,[6,.18,2.9],floor,[0,y+.06,2.95]);box(root,[3.9,.09,.09],steel,[0,y+3.5,-1.65]);label('0'+i,y);landings.push(landingDoor(y));}
  box(root,[3.8,11.6,.035],mat('#a5b7bb',{transparent:true,opacity:.18,depthWrite:false}),[0,5.8,-1.7]);person=avatar();apply(0);
 }
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
 function apply(t){
  let y=0,open=0,z=3.8,py=.15,walking=false,status='La persona se acerca';
  if(t<2){z=5-1.2*smooth(t/2);walking=true}
  else if(t<4){open=smooth((t-2)/2);status=state.doorType==='semi'?'Apertura manual · representación':'Las puertas se abren'}
  else if(t<7){open=1;z=3.8-3.6*smooth((t-4)/3);walking=true;status='Entrada en la cabina'}
  else if(t<9){open=1-smooth((t-7)/2);z=.2;status='Cierre de puertas'}
  else if(t<14){y=8.4*smooth((t-9)/5);z=.2;status='Subiendo a planta 02'}
  else if(t<16){y=8.4;z=.2;open=smooth((t-14)/2);status=state.doorType==='semi'?'Apertura manual en destino':'Llegada · apertura de puertas'}
  else if(t<19){y=8.4;open=1;z=.2+3.6*smooth((t-16)/3);walking=true;status='Salida en planta 02'}
  else if(t<21){y=8.4;open=1-smooth((t-19)/2);status='Cierre para el regreso'}
  else if(t<26){y=8.4*(1-smooth((t-21)/5));status='Bajando a planta baja'}
  else{status='Recorrido completado';}
  py=(t<19?y:(t>=19?8.4:0))+.15;copy.position.y=y;doorMotion(open);
  landings.forEach((fn,i)=>fn(Math.abs(y-i*4.2)<.001?open:0));
  person.position.set(.2,py,z);person.rotation.y=t>=16&&t<19?0:Math.PI;
  person.userData.limbs.forEach((limb,i)=>limb.rotation.x=walking?Math.sin(t*8)*(i%2?.35:.45)*(i<2?1:-1):0);
  if(state.doorType==='semi'&&((t>=2&&t<4)||(t>=14&&t<16)))person.userData.limbs[1].rotation.x=-1;
  if(follow){camera.position.set(.3,y+2.05,8.5);orbit.target.set(0,y+1.6,0);orbit.update();}
  const floorText=y<.01?'PB':y>8.39?'02':'En recorrido';document.getElementById('simFloor').textContent=floorText;
  document.getElementById('simProgress').value=t/26*100;
  if(status!==lastStatus){document.getElementById('simStatus').textContent=status;lastStatus=status;}
 }
 function overview(){follow=false;camera.fov=42;camera.aspect=document.getElementById('stage').clientWidth/document.getElementById('stage').clientHeight;camera.updateProjectionMatrix();const narrow=camera.aspect<1;camera.position.set(narrow?14:10,8,narrow?26:21);orbit.target.set(0,5.4,.5);orbit.maxDistance=45;orbit.update();}
 function start(){if(active)return;active=true;paused=false;elapsed=0;build();root.visible=true;cabin.visible=false;overview();document.getElementById('simulationPanel').hidden=false;document.getElementById('simPause').textContent='Pausar';document.querySelectorAll('#controls select, #reset, #request, #resetView, [data-view]').forEach(e=>e.disabled=true);document.getElementById('simStart').hidden=true;apply(0);}
 function stop(){if(!active)return;active=false;root.visible=false;cabin.visible=true;clear();document.getElementById('simulationPanel').hidden=true;document.querySelectorAll('#controls select, #reset, #request, #resetView, [data-view]').forEach(e=>e.disabled=false);document.getElementById('simStart').hidden=false;orbit.maxDistance=14;onExit();}
 function tick(dt){if(!active||paused)return;elapsed=Math.min(26,elapsed+dt);apply(elapsed);if(elapsed===26){paused=true;document.getElementById('simPause').textContent='Repetir';}}
 function pause(){if(elapsed===26){elapsed=0;paused=false;}else paused=!paused;document.getElementById('simPause').textContent=paused?'Continuar':'Pausar';}
 document.getElementById('simStart').onclick=start;document.getElementById('simExit').onclick=stop;document.getElementById('simPause').onclick=pause;document.getElementById('simRestart').onclick=()=>{elapsed=0;paused=false;apply(0);document.getElementById('simPause').textContent='Pausar'};
 document.getElementById('simOverview').onclick=overview;document.getElementById('simFollow').onclick=()=>{follow=true;camera.fov=45;camera.updateProjectionMatrix();apply(elapsed)};
 return {start,stop,tick,pause,get active(){return active},get time(){return elapsed},get root(){return root},get cabin(){return copy},get passenger(){return person},inspect:()=>({elapsed,paused,manual:state.doorType==='semi'})};
}
