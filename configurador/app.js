import { createSimulation } from './simulation.js';
import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';

const $=s=>document.querySelector(s);
const t=s=>window.ABELIFT_I18N?.t(s)||s;
const tc=s=>window.ABELIFT_I18N?.catalog(s)||s;
const catalog={
 models:{
  A01:{label:'A01 · Chapa pintada',wall:'paint_white',floor:'rubber_cement'},
  A02:{label:'A02 · Acero inoxidable',wall:'inox_satin',floor:'rubber_black'},
  A03:{label:'A03 · Laminado White Ash',wall:'lam_F8841',floor:'stone_expo'},
  A04:{label:'A04 · Laminado Gris Popular',wall:'lam_F7927',floor:'stone_tebas'},
  A05:{label:'A05 · Gris metal',wall:'paint_metal',floor:'stone_tebas'}
 },
 walls:[
  ['Chapa pintada · Blanco RAL 9016','paint_white'],['Chapa pintada · Beige RAL 1019','paint_beige'],['Chapa pintada · Marfil claro RAL 1015','paint_ivory'],['Chapa pintada · Gris perlado RAL 9022','paint_pearl'],['Chapa pintada · Gris metal RAL 9006','paint_metal'],['Chapa pintada · Negro RAL 9005','paint_black'],['Chapa pintada · Gris hormigón RAL 7023','paint_concrete'],['Chapa pintada · Violeta pastel RAL 4009','paint_lilac'],['Chapa pintada · Gris claro RAL 7040','paint_lightgrey'],
  ['Skinplate · Crema','skin_cream'],['Skinplate · Blanco simil inox.','skin_white'],['Skinplate · Gris','skin_grey'],
  ['Acero inoxidable · Satinado','inox_satin'],['Acero inoxidable · Pulido','inox_polished'],['Acero inoxidable · Checks','inox_checks'],['Acero inoxidable · Canvas','inox_canvas'],['Acero inoxidable · Cuero','inox_leather'],['Acero inoxidable · Linen','inox_linen'],
  ['Laminado · F2274 Blanco Francia','lam_F2274'],['Laminado · F2833 Arena pétrea','lam_F2833'],['Laminado · F1139 Cerezo','lam_F1139'],['Laminado · F7884 Azul China','lam_F7884'],['Laminado · F1997 Océano','lam_F1997'],['Laminado · F7837 Grafito','lam_F7837'],['Laminado · F8832 Elemental Corten','lam_F8832'],['Laminado · F8833 Elemental Graphite','lam_F8833'],['Laminado · F7923 Surf','lam_F7923'],['Laminado · F2273 Seringa','lam_F2273'],['Laminado · F8841 White Ash','lam_F8841'],['Laminado · F0190 Haya finlandesa','lam_F0190'],['Laminado · F0193 Xenon','lam_F0193'],['Laminado · F1062 Roble','lam_F1062'],['Laminado · F7927 Gris Popular','lam_F7927'],['Laminado · F8830 Elemental Concrete','lam_F8830'],['Laminado · F5873 SET Ventura Oak','lam_F5873'],['Laminado · F2478 Turquesa','lam_F2478'],['Laminado · F8849 Natural Teak','lam_F8849'],['Laminado · F8848 Blackened Legno','lam_F8848'],
  ['Vidrio lacado · Blanco puro RAL 9003','glass_white'],['Vidrio lacado · Negro estelar RAL 0337','glass_black'],['Vidrio lacado · Blanco perla RAL 1013','glass_pearl'],['Vidrio lacado · Gris metal RAL 9006','glass_metal'],['Vidrio lacado · Bronce','glass_bronze'],['Vidrio lacado · Aluminio RAL 9007','glass_aluminium'],['Vidrio lacado · Rojo terracota RAL 8815','glass_terracotta'],['Vidrio lacado · Verde pistacho RAL 1164','glass_pistachio']
 ],
 floors:[
  ['Goma antideslizante · Beige','rubber_beige'],['Goma antideslizante · Roble','rubber_oak'],['Goma antideslizante · Azul acero','rubber_blue'],['Goma antideslizante · Negro','rubber_black'],['Goma antideslizante · Arena','rubber_sand'],['Goma antideslizante · Gris','rubber_grey'],['Goma antideslizante · Gris cemento','rubber_cement'],
  ['Piedra artificial · Gris Expo','stone_expo'],['Piedra artificial · Ethereal Glow','stone_glow'],['Piedra artificial · Rougui','stone_rougui'],['Piedra artificial · Blanco Norte','stone_white'],['Piedra artificial · Negro Tebas','stone_tebas'],['Laminado · F6307 Burnt Strand','lamfloor_burnt'],['Laminado · F8830 Elemental Concrete','lamfloor_concrete'],
  ['Suelo metálico · Aluminio damero','metal_checker'],['Suelo metálico · Acero inoxidable','metal_inox'],['Suelo metálico · Chapa lagrimada','metal_tread'],
  ['Granito natural · Gris Quintana','granite_quintana'],['Granito natural · Gris Perla','granite_pearl'],['Granito natural · Rosa Porriño','granite_porrino'],['Granito natural · Blanco Cristal','granite_crystal'],['Granito natural · Negro Sudáfrica','granite_black'],['Granito natural · Blanco Trevi','granite_trevi'],['Granito natural · Negro Intenso','granite_intense'],['Granito natural · Azul Labrador oscuro','granite_labrador'],['Granito natural · Guyana Warwick Rubí','granite_ruby']
 ],
 ceilings:[['Marco','frame'],['Barras LED','bars'],['LED spots','spots'],['LED spots · Curvo','curved'],['Panel LED','panel'],['Cristal matizado','frosted']],
 mirrors:[['Sin espejo','none'],['Espejo 1/2','half'],['Espejo lama','slats'],['Espejo entero','full']],
 lights:[['Iluminación indirecta','indirect'],['Iluminación en zócalo','skirting'],['Iluminación en paños','walls'],['Iluminación en botonera','buttons'],['Iluminación en techo','ceiling'],['Sin iluminación decorativa','none']],
 rails:[['Rectangular inox.','rect_inox'],['Rectangular skinplate','rect_skin'],['Tubular recto inox pulido','round_polished'],['Tubular curvo inox satinado','curve_satin'],['Tubular curvo inox pulido','curve_polished'],['Tubular curvo pintado en negro','curve_black']],
 doorsAuto:[['Bus cristal + aluminio','bus'],['Cristal total','glass'],['Inox','inox'],['Imprimación','primer'],['Acero inox. gran mirilla','large_window']],
 doorsSemi:[['Semiautomática · Mirilla','semi_window'],['Semiautomática · Gran mirilla','semi_large']],
 doorFinishes:[['Epoxi gofrado','epoxy'],['Acero inoxidable liso','smooth'],['AISI 441 2B/BA','aisi441'],['AISI 304 2B','aisi304'],['AISI 316 2B','aisi316'],['RAL 7040','ral7040']],
 panels:[['Botonera estándar','standard'],['Botonera columna estándar','column'],['Botonera columna con iluminación','column_light']],
 landing:[['Pulsador con placa transparente','clear_plate'],['Pulsador de superficie en INOX','inox_surface'],['Pulsador grabado','engraved'],['Pulsador con display sobre acero','steel_display'],['RT42','rt42'],['US90 Jumbo','us90'],['BAS 120','bas120'],['BAS 120 Black','basblack'],['US91-EN','us91'],['US95 Jumbo','us95'],['US95-EN','us95en']],
 displays:[['Sin display','none'],['TFT 2,8 pulgadas','2.8'],['TFT 5,6 pulgadas','5.6'],['7 pulgadas','7'],['10 pulgadas','10']],
 structures:[['Sin estructura','none'],['Chapa ciega','solid'],['Chapa perforada','perforated'],['Chapa cristal','glass'],['Chapa cristal mate','frosted']],
 structureColors:[['Blanco RAL 9016','#f0eee8'],['RAL 1015','#d8c7a0'],['RAL 6013','#69755d'],['RAL 1028','#e9a21a'],['RAL 7032','#a8a69a'],['RAL 3013','#8c3c32'],['RAL 8011','#553b2c'],['RAL 4004','#4d2341'],['RAL 9001','#eee7d5'],['RAL 5022','#292f5c'],['RAL 9002','#d9d8d0'],['RAL 5002','#173c78'],['RAL 7016','#303a40'],['RAL 9005','#171717'],['RAL 2004','#e85b20']]
};
// Opciones contrastadas con las páginas 62–75 del PDF suministrado.
catalog.walls=catalog.walls.filter(x=>x[1]!=='paint_lightgrey');
catalog.walls.push(['Skinplate · Simil inox.','skin_simil'],['Vidrio lacado · Marrón claro RAL 1236 mate','glass_brown_matte'],['Vidrio lacado · Marrón claro RAL 1236','glass_brown'],['Vidrio lacado · Verde RAL 8615','glass_green'],['Vidrio lacado · Blanco perla mate','glass_pearl_matte'],['Laminado · F6307 Burnt Strand','lam_F6307'],['Laminado · F3091 Blanco Polar Brillo','lam_F3091']);
for(const [name,id] of [['RAL 1586','1586'],['RAL 8017','8017'],['Plata','silver'],['RAL 5002','5002'],['RAL 2001','2001'],['RAL 9005','9005']])catalog.walls.push(['Vidrio bajo pedido · '+name,'glass_order_'+id]);
catalog.floors=catalog.floors.filter(x=>!x[1].startsWith('lamfloor'));
catalog.floors=catalog.floors.filter(x=>x[1]!=='granite_ruby');
catalog.floors.push(['Granito natural · Warwick Rubi','granite_ruby'],['Granito natural · Guyana','granite_guyana']);
catalog.panels=[['De superficie · aluminio anodizado 920 × 220 mm','surface'],['Columna estándar · 1960 mm','column'],['Columna con iluminación','column_light']];
catalog.landing=[['Placa transparente','clear_plate'],['Superficie inox.','inox_surface'],['Grabado sobre acero','engraved'],['Con display sobre acero','steel_display'],['Superficie aluminio','aluminium']];
catalog.buttons=[['RT42','rt42'],['US90 Jumbo','us90'],['BAS 120','bas120'],['BAS 120 Black','basblack'],['US91-EN','us91'],['US95 Jumbo','us95'],['US95-EN','us95en']];
catalog.trimFinishes=[['Acero inoxidable','steel'],['Dorado','gold']];
catalog.structureColors.push(['RAL 6005','#174b36'],['RAL 7042','#8d9290']);
let viewMode='cabin',savedDisplay='5.6',displayRestricted=false,simulation=null;
const state={model:'A01',wall:'paint_white',floor:'rubber_cement',ceiling:'frame',ceilingColor:'white',mirror:'half',light:'indirect',rail:'rect_inox',doorType:'automatic',door:'bus',doorFinish:'smooth',panel:'column',landing:'inox_surface',display:'5.6',button:'rt42',use:'lift',structure:'none',structureColor:'#f0eee8',trimFinish:'steel'};

const controls=[
 ['Uso previsto','El uso modifica las opciones de pantalla de la botonera','use',[['Ascensor','lift'],['Unifamiliar / homelift','home']]],
 ['Pulsador','Familia de pulsador de rellano, no de cabina (p. 73)','button',catalog.buttons],
 ['Modelo de cabina','Selecciona una base del catálogo','model',Object.entries(catalog.models).map(([k,v])=>[v.label,k])],
 ['Paños / paredes','Chapa, skinplate, inox., laminados y vidrio lacado','wall',catalog.walls],
 ['Suelo','Goma, piedra artificial, metal y granito natural','floor',catalog.floors],
 ['Techo','Diseños de techo disponibles','ceiling',catalog.ceilings],
 ['Color del techo','Acabado indicado en catálogo','ceilingColor',[['Blanco','white'],['Negro','black'],['Acero inoxidable','steel']]],
 ['Espejo','Formato del espejo','mirror',catalog.mirrors],
 ['Iluminación','Ubicación de iluminación decorativa','light',catalog.lights],
 ['Pasamanos','Seis configuraciones del catálogo','rail',catalog.rails],
 ['Tipo de puerta','Automática o semiautomática','doorType',[['Automática','automatic'],['Semiautomática','semi']]],
 ['Diseño de puerta','Modelos según tipo de puerta','door',catalog.doorsAuto],
 ['Marco y perfiles','Acabado decorativo orientativo, sujeto a confirmación','trimFinish',catalog.trimFinishes],
 ['Acabado de puerta','Acabados de hoja','doorFinish',catalog.doorFinishes],
 ['Botonera de cabina','Opciones de columna y estándar','panel',catalog.panels],
 ['Pulsador de rellano','Modelos indicados en catálogo','landing',catalog.landing],
 ['Display','Tamaños disponibles en catálogo','display',catalog.displays],
 ['Estructura','Acabados de estructura SUMASA incluidos en documentación','structure',catalog.structures],
 ['Color de estructura','Colores RAL mostrados en catálogo de estructura','structureColor',catalog.structureColors]
];
const controlsRoot=$('#controls');
function makeSelect(group,idx){
 const wrap=document.createElement('div');wrap.className='control-group';
 const title=document.createElement('div');title.className='control-title';
 const h=document.createElement('h3');h.textContent=group[0];h.id='label-'+group[2];
 const span=document.createElement('span');span.textContent='';
 title.append(h,span);
 const select=document.createElement('select');select.dataset.key=group[2];select.setAttribute('aria-labelledby','label-'+group[2]);
 group[3].forEach(([label,value])=>{const o=document.createElement('option');o.value=value;o.textContent=label;select.append(o)});
 select.value=state[group[2]];
 
 wrap.append(title,select);
 if(group[2]==='use'){const n=document.createElement('p');n.id='useNotice';n.className='use-notice';n.setAttribute('role','status');wrap.append(n)}
 controlsRoot.append(wrap);
}
controls.forEach(makeSelect);
function updateOptions(){
 const doorSel=$('[data-key="door"]');
 const list=state.doorType==='automatic'?catalog.doorsAuto:catalog.doorsSemi;
 doorSel.innerHTML='';list.forEach(([label,value])=>{const o=document.createElement('option');o.value=value;o.textContent=label;doorSel.append(o)});
 if(!list.some(x=>x[1]===state.door))state.door=list[0][1];
 doorSel.value=state.door;
}
updateOptions();

const stage=$('#stage'), scene=new THREE.Scene();scene.background=new THREE.Color('#e1ebf4');
const camera=new THREE.PerspectiveCamera(34,stage.clientWidth/stage.clientHeight,.1,100);camera.position.set(0,1.7,7.8);
const isMobile = matchMedia('(max-width: 700px)').matches;
let renderer,webglAvailable=true;
try{renderer=new THREE.WebGLRenderer({antialias:!isMobile,alpha:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});}
catch(error){
 webglAvailable=false;
 renderer={domElement:document.createElement('canvas'),shadowMap:{},capabilities:{getMaxAnisotropy(){return 1}},setPixelRatio(){},setSize(){},render(){}};
 const notice=$('#loading');notice.textContent='Vista 3D no disponible en este navegador. Activa la aceleración gráfica o utiliza otro navegador compatible con WebGL. Puedes seguir eligiendo acabados y enviar una solicitud de presupuesto.';notice.classList.add('webgl-notice');notice.setAttribute('role','status');
 $('#simStart').disabled=true;
 document.querySelector('.view-tag').textContent='Vista 3D no disponible';
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6));
renderer.setSize(stage.clientWidth,stage.clientHeight);
renderer.shadowMap.enabled=false;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.18;if(webglAvailable){stage.prepend(renderer.domElement);$('#loading').remove();}
scene.add(new THREE.HemisphereLight(0xffffff,0x746b60,1.75));
const sun=new THREE.DirectionalLight(0xfff3df,2.65);sun.position.set(4,7,5);scene.add(sun);
const fill=new THREE.DirectionalLight(0xdce8f2,1.55);fill.position.set(-5,4,-3);scene.add(fill);
const rim=new THREE.DirectionalLight(0xffffff,1.05);rim.position.set(1,3,-6);scene.add(rim);
const cabin=new THREE.Group();scene.add(cabin);
const W=3.15,H=3.25,D=2.72;
const groups={walls:new THREE.Group(),floor:new THREE.Group(),ceiling:new THREE.Group(),doors:new THREE.Group(),details:new THREE.Group(),mirror:new THREE.Group(),rail:new THREE.Group(),panel:new THREE.Group(),structure:new THREE.Group(),landing:new THREE.Group()};
Object.values(groups).forEach(g=>cabin.add(g));
const M=(color,roughness=.45,metalness=0,extra={})=>new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
const matMetal={steel:M('#b7bdbe',.2,.88),black:M('#252625',.25,.7),brass:M('#b28a4e',.23,.8)};
function mesh(group,name,geo,material,pos){const o=new THREE.Mesh(geo,material);o.name=name;o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;group.add(o);return o}
function box(group,name,size,material,pos){return mesh(group,name,new THREE.BoxGeometry(...size),material,pos)}
function cyl(group,name,r,len,pos,material,rot=[0,0,0]){const o=mesh(group,name,new THREE.CylinderGeometry(r,r,len,28),material,pos);o.rotation.set(...rot);return o}
function textureFrom(label,base,accent='#ffffff'){
 let seed=123;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');x.fillStyle=base;x.fillRect(0,0,512,512);
 if(label.includes('lam_')||label.includes('skin_')){
  for(let i=0;i<420;i++){x.globalAlpha=.025+random()*.08;x.strokeStyle=i%2?accent:'#25221d';x.lineWidth=.4+random()*2;x.beginPath();let y=random()*512;x.moveTo(0,y);x.bezierCurveTo(160,y-12,320,y+12,512,y+random()*8-4);x.stroke()}x.globalAlpha=1;
 }else if(label.includes('inox')){
  for(let i=0;i<900;i++){x.globalAlpha=.035;x.strokeStyle=i%2?'#fff':'#333';x.lineWidth=.5;x.beginPath();let y=random()*512;x.moveTo(0,y);x.lineTo(512,y);x.stroke()}x.globalAlpha=1;
 }else if(label.includes('stone')||label.includes('granite')){
  for(let i=0;i<95;i++){x.globalAlpha=.13;x.strokeStyle=accent;x.lineWidth=1+random()*3;x.beginPath();let px=random()*512,py=random()*512;x.moveTo(px,py);for(let j=0;j<4;j++){px+=random()*70-20;py+=random()*45-20;x.lineTo(px,py)}x.stroke()}x.globalAlpha=1;
 }else if(label.includes('metal')){
  for(let i=0;i<18;i++){x.strokeStyle='#555';x.globalAlpha=.35;x.lineWidth=3;x.beginPath();x.moveTo(i*32,0);x.lineTo(i*32,512);x.stroke()}x.globalAlpha=1;
 }
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1.4,1.5);t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;
}
const wallColors={
 paint_white:'#e9e8e2',paint_beige:'#b9a991',paint_ivory:'#d9d0bd',paint_pearl:'#c6c5c0',paint_metal:'#888b8a',paint_black:'#292a2b',paint_concrete:'#747571',paint_lilac:'#aaa0b4',paint_lightgrey:'#b6b8b7',
 skin_cream:'#c9bda8',skin_white:'#d8d8d3',skin_grey:'#777b7c',
 inox_satin:'#aeb4b4',inox_polished:'#d4d9d8',inox_checks:'#9da5a5',inox_canvas:'#899091',inox_leather:'#767d7e',inox_linen:'#b3b9b8',
 lam_F2274:'#eee9df',lam_F2833:'#c7b89e',lam_F1139:'#85533c',lam_F7884:'#315d85',lam_F1997:'#23536a',lam_F7837:'#424748',lam_F8832:'#8a6047',lam_F8833:'#42403c',lam_F7923:'#a6b6b1',lam_F2273:'#b3a18c',lam_F8841:'#c9b99d',lam_F0190:'#b78b5e',lam_F0193:'#b3b2aa',lam_F1062:'#a57b4d',lam_F7927:'#858783',lam_F8830:'#aaa69c',lam_F5873:'#806347',lam_F2478:'#2d9a9c',lam_F8849:'#9b744f',lam_F8848:'#332c27',
 glass_white:'#e9e8e0',glass_black:'#26272a',glass_pearl:'#ded8c9',glass_metal:'#858989',glass_bronze:'#84664c',glass_aluminium:'#8f9696',glass_terracotta:'#9a5746',glass_pistachio:'#899c68'
};
const floorColors={lamfloor_burnt:'#78563c',lamfloor_concrete:'#a8a49a',rubber_beige:'#b9aa91',rubber_oak:'#9b7854',rubber_blue:'#667c89',rubber_black:'#262626',rubber_sand:'#c4b59d',rubber_grey:'#8a8c89',rubber_cement:'#777976',stone_expo:'#777a77',stone_glow:'#c5c0b4',stone_rougui:'#8c7565',stone_white:'#d6d2c8',stone_tebas:'#343331',metal_checker:'#9fa5a5',metal_inox:'#b9c0c0',metal_tread:'#777e7f',granite_quintana:'#777b78',granite_pearl:'#b4b3ae',granite_porrino:'#a97e78',granite_crystal:'#d5d1c7',granite_black:'#292b2b',granite_trevi:'#c9c6bd',granite_intense:'#242424',granite_labrador:'#343f50',granite_ruby:'#55434a'};
Object.assign(wallColors,{skin_simil:'#aeb4b4',glass_brown:'#956e51',glass_brown_matte:'#956e51',glass_green:'#4d8571',glass_pearl_matte:'#ded8c9',lam_F6307:'#78563c',lam_F3091:'#f4f4ef',glass_order_1586:'#cf1d26',glass_order_8017:'#4e332b',glass_order_silver:'#b9baba',glass_order_5002:'#1e3886',glass_order_2001:'#c94b2b',glass_order_9005:'#171717'});floorColors.granite_guyana='#b4aba4';
function wallMat(){
 let col=wallColors[state.wall]||'#aaa';
 const isSteel=state.wall.startsWith('inox');
 const isGlass=state.wall.startsWith('glass');
 return M('#ffffff',isSteel?.24:isGlass?.2:.52,isSteel?.78:isGlass?.18:0,{
   map:textureFrom(state.wall,col,'#eee'),
   envMapIntensity:1.15
 });
}
function floorMat(){
 let col=floorColors[state.floor]||'#999';
 const polished=state.floor.startsWith('stone')||state.floor.startsWith('granite');
 return M('#ffffff',polished?.27:.62,polished?.18:.08,{map:textureFrom(state.floor,col,'#eee')});
}
function clearGroup(g){
 const materials=new Set(),textures=new Set();
 g.traverse(o=>{o.geometry?.dispose();for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m&&!Object.values(matMetal).includes(m))materials.add(m)});
 for(const m of materials){if(m.map)textures.add(m.map);if(m.alphaMap)textures.add(m.alphaMap);m.dispose()}for(const t of textures)t.dispose();g.clear();
}
function rebuild(){
 // Dispose the previous scene-specific point lights before rebuilding.
 for(let i=cabin.children.length-1;i>=0;i--){
   const child=cabin.children[i];
   if(child.isLight) cabin.remove(child);
 }
 Object.values(groups).forEach(clearGroup);
 const wm=wallMat(),fm=floorMat(),steel=matMetal.steel,accent=state.ceilingColor==='black'?matMetal.black:state.ceilingColor==='steel'?steel:M('#eee9de');
 const trim=state.trimFinish==='gold'?matMetal.brass:steel;
 // Three-sided enclosure and floor
 box(groups.walls,'Lateral izquierdo',[.13,H,D],wm,[-W/2,H/2,0]);box(groups.walls,'Lateral derecho',[.13,H,D],wm,[W/2,H/2,0]);box(groups.walls,'Fondo',[W,H,.13],wm,[0,H/2,-D/2]);
 box(groups.floor,'Base estructural del suelo',[W,.15,D],M('#34332f',.72,.18),[0,.075,0]);
 const floorSurface=new THREE.Mesh(new THREE.PlaneGeometry(W-.12,D-.12),fm);floorSurface.name='Acabado superior del suelo';floorSurface.rotation.x=-Math.PI/2;floorSurface.position.set(0,.153,0);groups.floor.add(floorSurface);
 const floorEdge=M('#77736b',.3,.72);
 box(groups.floor,'Perfil suelo frontal',[W-.08,.018,.035],floorEdge,[0,.157,D/2-.045]);
 box(groups.floor,'Perfil suelo trasero',[W-.08,.018,.035],floorEdge,[0,.157,-D/2+.045]);
 box(groups.floor,'Perfil suelo izquierdo',[.035,.018,D-.12],floorEdge,[-W/2+.045,.157,0]);
 box(groups.floor,'Perfil suelo derecho',[.035,.018,D-.12],floorEdge,[W/2-.045,.157,0]);
 box(groups.floor,'Zócalo frontal',[W-.08,.06,.045],trim,[0,.19,D/2-.08]);
 // Wall panel seams and corner trims
 for(let x of [-1.03,0,1.03]){box(groups.details,'Moldura vertical',[.018,2.8,.035],trim,[x,1.62,-D/2+.09]);}
 for(let side of [-1,1])for(let z of [-.85,0,.85])box(groups.details,'Junta panel lateral',[.03,2.75,.018],trim,[side*(W/2-.1),1.62,z]);
 box(groups.details,'Zócalo fondo',[W,.13,.06],trim,[0,.18,-D/2+.1]);
 box(groups.details,'Zócalo izquierdo',[.06,.13,D],trim,[-W/2+.1,.18,0]);box(groups.details,'Zócalo derecho',[.06,.13,D],trim,[W/2-.1,.18,0]);
 // Continuous ceiling with a perimeter frame; all fittings face the cabin.
 box(groups.ceiling,'Techo',[W,.13,D],accent,[0,H,0]);
 for(const x of [-W/2+.1,W/2-.1])box(groups.ceiling,'Perfil lateral de techo',[.035,.025,D-.12],trim,[x,H-.1,0]);
 for(const z of [-D/2+.1,D/2-.1])box(groups.ceiling,'Perfil frontal de techo',[W-.12,.025,.035],trim,[0,H-.1,z]);
 const ceilingY=x=>state.ceiling==='curved'?H-.12-.16*Math.pow(x/(W/2-.16),2):H-.1;
 if(state.ceiling==='curved'){
  const width=W-.32,depth=D-.32,geo=new THREE.PlaneGeometry(width,depth,40,1);
  const vertices=geo.attributes.position;
  for(let i=0;i<vertices.count;i++){const x=vertices.getX(i),z=vertices.getY(i);vertices.setXYZ(i,x,ceilingY(x),z);}
  geo.computeVertexNormals();const material=accent.clone();material.side=THREE.DoubleSide;
  mesh(groups.ceiling,'Panel curvo',geo,material,[0,0,0]);
 }
 if(state.ceiling==='panel'||state.ceiling==='frosted')box(groups.ceiling,'Panel difusor',[W-.55,.025,D-.55],M(state.ceiling==='frosted'?'#d8ddd9':'#f4f0e5',.3,.05,{emissive:'#fff0ce',emissiveIntensity:state.ceiling==='panel'?1.2:.35}),[0,H-.15,0]);
 if(state.ceiling==='bars')for(let i=-2;i<=2;i++)box(groups.ceiling,'Barra LED',[.045,.025,D-.55],M('#fff4dc',.2,0,{emissive:'#ffe7bd',emissiveIntensity:1.6}),[i*.48,H-.15,0]);
 if(['spots','frame','curved'].includes(state.ceiling))for(const x of [-1.05,1.05])for(const z of [-.82,.82]){
  const y=ceilingY(x)-.025;
  cyl(groups.ceiling,'Aro foco',.105,.025,[x,y,z],trim);
  cyl(groups.ceiling,'Foco LED',.072,.012,[x,y-.019,z],M('#fff1d3',.2,0,{emissive:'#ffe7c4',emissiveIntensity:2}));
 }
 // Door portal and leaf geometry
 const dmat=doorMaterial();
 box(groups.doors,'Jamba izq',[.045,H,.07],trim,[-W/2+.04,H/2,D/2-.02]);box(groups.doors,'Jamba der',[.045,H,.07],trim,[W/2-.04,H/2,D/2-.02]);
 box(groups.doors,'Dintel',[W-.035,.045,.07],trim,[0,H-.0225,D/2-.02]);
 const leafMat=dmat;
 if(state.doorType==='automatic'){
  const leafW=state.door==='glass'? .66 : .76;
  const left=box(groups.doors,'Hoja corredera izquierda',[leafW,2.65,.055],leafMat,[-.42,1.42,D/2-.15]);
  const right=box(groups.doors,'Hoja corredera derecha',[leafW,2.65,.055],leafMat,[.42,1.42,D/2-.15]);
  if(state.door==='bus'||state.door==='glass'||state.door==='large_window'){
   for(let x of [-.42,.42])box(groups.doors,'Paño acristalado',[leafW-.12,1.55,.012],new THREE.MeshPhysicalMaterial({color:'#aebfc1',metalness:.18,roughness:.12,transmission:.18,transparent:true,opacity:.72}),[x,1.55,D/2-.11]);
  }
  if(state.door==='large_window')for(let x of [-.42,.42])box(groups.doors,'Gran mirilla',[leafW-.12,.65,.02],new THREE.MeshPhysicalMaterial({color:'#9aafb3',metalness:.1,roughness:.14,transparent:true,opacity:.65}),[x,2.05,D/2-.1]);
 }else{
  const door=box(groups.doors,'Puerta semiautomática',[1.48,2.65,.07],leafMat,[0,1.42,D/2-.15]);
  const winH=state.door==='semi_large'?.72:.38;
  box(groups.doors,'Mirilla',[.58,winH,.018],new THREE.MeshPhysicalMaterial({color:'#9bb0b4',roughness:.18,transparent:true,opacity:.7}),[0,1.95,D/2-.1]);
  box(groups.doors,'Marco mirilla',[.68,winH+.1,.025],trim,[0,1.95,D/2-.12]);
 }
 // Mirror types
 if(state.mirror!=='none'){
  const mh=state.mirror==='half'?1.15:state.mirror==='slats'?2.35:2.65;
  const mirrorMat=new THREE.MeshPhysicalMaterial({color:'#9faeb0',metalness:.72,roughness:.13,clearcoat:1});
  box(groups.mirror,'Marco espejo',[1.35,mh+.12,.035],trim,[0,1.7,-D/2+.09]);
  if(state.mirror==='slats'){for(let i=0;i<5;i++)box(groups.mirror,'Lama espejo',[.19,mh,.018],mirrorMat,[-.48+i*.24,1.7,-D/2+.119]);}
  else box(groups.mirror,'Espejo',[1.25,mh,.018],mirrorMat,[0,1.7,-D/2+.119]);
 }
 // Handrail
 if(state.rail!=='none'){
  const rm=state.rail.includes('black')?matMetal.black:state.rail==='rect_skin'?M(wallColors[state.wall]||'#c9bda8'):steel;
  if(state.rail.startsWith('rect')){box(groups.rail,'Pasamanos rectangular',[1.75,.075,.09],rm,[0,1.02,-D/2+.24]);}
  else {const rail=cyl(groups.rail,'Pasamanos tubular',.035,1.8, [0,1.03,-D/2+.22],rm,[0,0,Math.PI/2]);if(state.rail.startsWith('curve')){rail.visible=false;const pts=[new THREE.Vector3(-.9,1.03,-D/2+.12),new THREE.Vector3(-.72,1.03,-D/2+.28),new THREE.Vector3(.72,1.03,-D/2+.28),new THREE.Vector3(.9,1.03,-D/2+.12)];mesh(groups.rail,'Pasamanos curvo',new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),32,.035,12,false),rm,[0,0,0]);}}
  for(let x of [-.72,.72])cyl(groups.rail,'Soporte pasamanos',.025,.14,[x,.95,-D/2+.22],rm,[Math.PI/2,0,0]);
 }
 // Cabin operating panel and display
 const px=W/2-.17,pz=.4;
 const surface=state.panel==='surface',ph=surface?1.05:2.24;
 const pmat=M('#b2b7b7',.26,.8);
 box(groups.panel,'Placa botonera',[.065,ph,.35],pmat,[px,1.55,pz]);
 const dh=({'2.8':.12,'5.6':.19,'7':.23,'10':.29})[state.display];
 if(dh){box(groups.panel,'Display',[.025,dh,.28],M('#09212a',.16,.2,{emissive:'#102d37',emissiveIntensity:.6}),[px-.048,surface?1.91:2.35,pz]); panelLabel('↑  0',[px-.064,surface?1.91:2.35,pz],.22,.1);}
 const count=surface?3:8;
 for(let i=0;i<count;i++){
  const y=surface?1.59-i*.12:1.93-Math.floor(i/2)*.16,z=surface?pz:pz+(i%2?-.08:.08);
  cyl(groups.panel,'Aro pulsador',.05,.02,[px-.05,y,z],matMetal.steel,[0,0,Math.PI/2]);
  cyl(groups.panel,'Pulsador de planta',.038,.02,[px-.067,y,z],M(i===0?'#324e34':'#333b3d',.28,.4,{emissive:i===0?'#2c9d39':'#000',emissiveIntensity:.5}),[0,0,Math.PI/2]);
  panelLabel(String(i),[px-.081,y,z],.052,.052);
 }
 for(let i=0;i<3;i++){const z=pz+(i-1)*.1,y=surface?1.15:1.09;
 cyl(groups.panel,'Servicio / alarma',.035,.025,[px-.065,y,z],M(i===1?'#e8c344':'#536064'),[0,0,Math.PI/2]);panelLabel(['◀▶','!','▶◀'][i],[px-.082,y,z],.045,.045);}
 if(state.panel==='column_light'||state.light==='buttons')for(const z of [pz-.15,pz+.15])box(groups.panel,'Luz columna',[.018,ph-.12,.018],M('#fff1d0',.3,0,{emissive:'#ffe7be',emissiveIntensity:2}),[px-.052,1.55,z]);
 buildLanding();
 // Decorative illumination zones
 const ledMat=M('#fff0d0',.2,0,{emissive:'#ffe7bf',emissiveIntensity:state.light==='none'?0:1.8});
 if(state.light==='indirect'||state.light==='walls')for(let x of [-1.4,1.4])box(groups.details,'Línea LED vertical',[.025,2.65,.035],ledMat,[x,1.72,-D/2+.12]);
 if(state.light==='skirting')box(groups.details,'Luz zócalo',[W-.3,.035,.035],ledMat,[0,.26,-D/2+.13]);
 if(state.light==='ceiling')box(groups.details,'Luz perimetral techo',[W-.4,.025,.04],ledMat,[0,H-.16,D/2-.2]);
 // SUMASA structure model, separate external frame around the cabin opening
 if(state.structure!=='none'){
  const col=new THREE.MeshStandardMaterial({color:state.structureColor,metalness:.48,roughness:.3,wireframe:false});
  for(let x of [-W/2-.22,W/2+.22])box(groups.structure,'Pilar estructura',[.13,H+.22,.13],col,[x,(H+.22)/2,D/2+.15]);
  box(groups.structure,'Travesaño superior',[W+.57,.13,.13],col,[0,H+.16,D/2+.15]);
  for(const x of [-W/2-.22,W/2+.22]){
   const material=state.structure==='glass'||state.structure==='frosted'?new THREE.MeshPhysicalMaterial({color:'#bbd0d2',transparent:true,opacity:state.structure==='glass'?.18:.5,roughness:state.structure==='glass'?.1:.8,side:THREE.DoubleSide}):col.clone();
   if(state.structure==='perforated'){const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,64,64);ctx.fillStyle='#000';ctx.beginPath();ctx.arc(32,32,15,0,Math.PI*2);ctx.fill();const map=new THREE.CanvasTexture(c);map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(12,15);material.alphaMap=map;material.alphaTest=.5;material.side=THREE.DoubleSide;}
   box(groups.structure,'Cerramiento lateral',[.035,H,D],material,[x,H/2,0]);
  }

 }
 // Lighting adjustment
 const on=state.light!=='none';
 if(on){const pl=new THREE.PointLight(0xffe6c4,state.light==='ceiling'?10:6,5);pl.position.set(0,H-.3,0);cabin.add(pl);}
}
function doorMaterial(){
 const finish={
  epoxy:M('#8e9292',.5,.15),smooth:M('#b8c0c0',.22,.82),
  aisi441:M('#aeb6b7',.2,.86),aisi304:M('#d0d5d4',.17,.9),
  aisi316:M('#c2c9c9',.16,.92),ral7040:M('#858b8d',.45,.12)
 };
 if(state.door==='glass')return new THREE.MeshPhysicalMaterial({color:'#b8d5df',transparent:true,opacity:.22,roughness:.1});
 if(state.door==='primer')return M('#8a8e8e',.85,.05);
 if(state.doorFinish && finish[state.doorFinish]) return finish[state.doorFinish];
 const map={bus:M('#9ca8a8',.22,.48),glass:new THREE.MeshPhysicalMaterial({color:'#9eb4b7',metalness:.1,roughness:.1,transparent:true,opacity:.42}),inox:matMetal.steel,primer:M('#777c7e',.65,.15),large_window:matMetal.steel,semi_window:matMetal.steel,semi_large:matMetal.steel};
 return map[state.door]||matMetal.steel
}
const ground=mesh(scene,'Suelo estudio',new THREE.PlaneGeometry(80,80),M('#c7c3bc',.95),[0,-.02,0]);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;
const base=box(scene,'Base showroom',[W+.45,.12,D+.35],M('#a7a198',.7,.1),[0,-.12,0]);
const orbit=new OrbitControls(camera,renderer.domElement);orbit.target.set(0,1.48,-.05);orbit.enableDamping=true;orbit.minDistance=.35;orbit.maxDistance=14;orbit.maxPolarAngle=Math.PI*.94;orbit.enablePan=true;
function change(key,value){
 if(simulation?.active)return;
 state[key]=value;
 if(key==='model'){const p=catalog.models[value];state.wall=p.wall;state.floor=p.floor;syncSelect('wall');syncSelect('floor');}
 if(key==='doorType'){const list=value==='automatic'?catalog.doorsAuto:catalog.doorsSemi;state.door=list[0][1];updateOptions();}
 applyUseRule();
 rebuild();updateVisibility();updateSummary();
 const focus=({panel:'panel',display:'panel',use:'panel',landing:'landing',button:'landing',ceiling:'ceiling',ceilingColor:'ceiling',floor:'floor',doorType:'doors',door:'doors',doorFinish:'doors',structure:'exterior',structureColor:'exterior'})[key];if(focus)focusView(focus);
}
function syncSelect(key){const s=$(`[data-key="${key}"]`);if(s)s.value=state[key]}
function updateSummary(){
 const model=catalog.models[state.model].label;
 const get=(arr,key)=>arr.find(x=>x[1]===key)?.[0]||key;
 $('#summary').textContent=`${model} · ${get(catalog.walls,state.wall)} · ${get(catalog.floors,state.floor)}`;
}
controlsRoot.addEventListener('change',e=>{const s=e.target.closest('select[data-key]');if(s)change(s.dataset.key,s.value)});
function resetAll(){savedDisplay='5.6';displayRestricted=false;Object.assign(state,{model:'A01',wall:'paint_white',floor:'rubber_cement',ceiling:'frame',ceilingColor:'white',mirror:'half',light:'indirect',rail:'rect_inox',doorType:'automatic',door:'bus',doorFinish:'smooth',panel:'column',landing:'inox_surface',display:'5.6',button:'rt42',use:'lift',structure:'none',structureColor:'#f0eee8',trimFinish:'steel'});controls.forEach(g=>syncSelect(g[2]));$('[data-key=display]').disabled=false;updateOptions();applyUseRule();rebuild();updateVisibility();updateSummary();resetView()}
function resetView(){focusView('cabin')}
$('#reset').onclick=resetAll;$('#resetView').onclick=resetView;
applyUseRule();rebuild();updateVisibility();updateSummary();
function configText(){return controls.map(([label,,key,options])=>{
 const list=key==='door'?[...catalog.doorsAuto,...catalog.doorsSemi]:options;
 const selected=list.find(x=>x[1]===state[key]);
 return t(label)+': '+tc(selected?.[0]||state[key]);
}).join('\n');}
$('#request').onclick=()=>{$('#details').textContent=configText();$('#modal').classList.add('open')};
$('#close').onclick=()=>$('#modal').classList.remove('open');$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('open')});
// Envía el resumen de la cabina y los datos del cliente a Formspree.
const configForm = $('#form');
const configFeedback = $('#configFeedback');
const configButton = configForm.querySelector('button[type="submit"]');
const configEndpoint = window.ABELIFT_FORMS?.configurador;
const configReady = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(configEndpoint || '');
if (configReady) {
  configFeedback.textContent = t('Completa tus datos y enviaremos tu solicitud a ABELIFT.');
}
configForm.onsubmit = async event => {
  event.preventDefault();
  if (!configReady) {
    configFeedback.textContent = t('El formulario aún no está conectado. Contacta por correo a info@abelift.cat.');
    return;
  }
  const values = new FormData(configForm);
  values.set('tipo_solicitud', 'Diseño de cabina 3D');
  values.set('configuracion_seleccionada', configText());
  values.set('nota_tecnica', 'Configuración orientativa: requiere verificación técnica y comercial de ABELIFT.');
  configButton.disabled = true;
  configForm.setAttribute('aria-busy','true');
  configFeedback.textContent = t('Enviando solicitud…');
  try {
    const response = await fetch(configEndpoint, {
      method: 'POST', body: values, headers: {Accept:'application/json'}
    });
    if (!response.ok) throw new Error('Formspree status: '+response.status);
    configForm.reset();
    configFeedback.textContent = t('Solicitud enviada correctamente. ABELIFT se pondrá en contacto contigo.');
  } catch (error) {
    console.error('ABELIFT: error en el envío del diseño', error);
    configFeedback.textContent = t('No se ha podido enviar la solicitud. Vuelve a intentarlo o escribe a info@abelift.cat.');
  } finally {
    configButton.disabled = false;
    configForm.removeAttribute('aria-busy');
  }
};
window.addEventListener('abelift:language',()=>{updateSummary();if($('#modal').classList.contains('open'))$('#details').textContent=configText();});
window.addEventListener('resize',()=>{camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight)});
let lastFrame=0;
function animate(now=0){
 requestAnimationFrame(animate);
 if(now-lastFrame < 15) return;
 const dt=lastFrame?Math.min((now-lastFrame)/1000,.05):0;
 lastFrame=now;
 simulation?.tick(dt);
 orbit.update();
 renderer.render(scene,camera);
}
animate();

function panelLabel(text,pos,w,h){const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#fafafa';ctx.font='bold 150px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,128);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=mesh(groups.panel,'Identificador '+text,new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide}),pos);o.rotation.y=-Math.PI/2;}
function buildLanding(){
 const g=groups.landing; const black=state.button==='basblack';
 const tall=state.landing==='steel_display',wide=state.landing==='clear_plate';
 const m=state.landing==='clear_plate'?new THREE.MeshPhysicalMaterial({color:'#cddedf',transparent:true,opacity:.4}):M(black?'#222':'#bcc0c1',.3,.7);
 box(g,'Placa rellano',[wide?.38:.26,tall?.6:.4,.04],m,[-2.05,1.5,1.5]);
 const r=state.button.includes('us9')?.063:.048;
 cyl(g,'Pulsador rellano',r,.025,[-2.05,1.47,1.54],M(black?'#222':'#dee3e3',.25,.7),[Math.PI/2,0,0]);
 const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');x.fillStyle='#c8e7af';x.font='bold 65px Arial';x.textAlign='center';x.fillText(tall?'↑ 0':'▲',128,87);const t=new THREE.CanvasTexture(c);const o=mesh(g,'Señal rellano',new THREE.PlaneGeometry(.16,.09),new THREE.MeshBasicMaterial({map:t,transparent:true}),[-2.05,tall?1.67:1.47,1.563]);
}
function updateVisibility(){
 groups.doors.visible=viewMode==='doors'||viewMode==='exterior';
 groups.ceiling.visible=viewMode!=='landing';
 groups.structure.visible=viewMode==='exterior';groups.landing.visible=viewMode==='landing'||viewMode==='exterior';
 const onlyLanding=viewMode==='landing';
 for(const k of ['walls','floor','details','mirror','rail','panel'])groups[k].visible=!onlyLanding;
 for(const wall of groups.walls.children)wall.visible=true;
}
function focusView(mode){viewMode=mode;updateVisibility();const views={cabin:[[0,1.7,7.8],[0,1.55,0]],panel:[[0,1.55,.4],[1.4,1.55,.4]],landing:[[-2.05,1.5,2.55],[-2.05,1.5,1.5]],ceiling:[[0,1.3,1.05],[0,3.1,-.3]],floor:[[0,2.5,2.8],[0,.15,-.2]],doors:[[-.5,1.8,6.8],[0,1.6,1.2]],exterior:[[-6,4,8],[0,1.6,0]]};const [pos,target]=views[mode];camera.fov=({panel:85,ceiling:65,floor:50})[mode]||34;camera.updateProjectionMatrix();camera.position.set(...pos);orbit.target.set(...target);orbit.update();document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===mode)));}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>focusView(b.dataset.view));
simulation=createSimulation({scene,cabin,groups,state,camera,orbit,onExit:()=>{applyUseRule();focusView('cabin')}});
window.__editor={simulation,state,catalog,groups,focusView,change,renderer,camera};

function applyUseRule(){
 const restricted=state.use==='home'&&state.panel==='column';
 if(restricted&&!displayRestricted)savedDisplay=state.display;
 if(restricted)state.display='none';
 if(!restricted&&displayRestricted)state.display=savedDisplay;
 displayRestricted=restricted;
 const sel=$('[data-key=display]');sel.disabled=restricted;syncSelect('display');
 const notice=document.getElementById('useNotice');
 if(notice){notice.textContent=restricted?'Vivienda unifamiliar: la columna estándar va sin pantalla. Hemos retirado el display del diseño.':state.use==='home'?'Vivienda unifamiliar. La restricción de pantalla del catálogo corresponde a la columna estándar.':'Ascensor. Puedes elegir el tamaño de pantalla; al regresar a este uso se recupera tu selección anterior.';notice.dataset.restricted=String(restricted);}
}
