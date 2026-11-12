/* Manual product catalogue. Update this file when products, variants or images change. */
const GOD_PRODUCTS = [
 {id:'tank',name:'Signature Tank Top',type:'TOP',description:'Athletic sleeveless top with contrast red finishing and the GOD DESIGN message.',image:'tank-black.png',colors:['Black','White','Ash'],details:'Premium combed cotton jersey · 95% cotton / 5% elastane · 220–240 GSM · soft, breathable, pre-shrunk',sizes:['S','M','L','XL','XXL'],kind:'individual'},
 {id:'shorts',name:'Signature Shorts',type:'SHORTS',description:'Matching athletic shorts with contrast panels and branded detailing.',image:'shorts-black.png',colors:['Black','Ash'],details:'Premium cotton–polyester interlock · 65% cotton / 35% polyester · 220–280 GSM · smooth, durable, low-pilling',sizes:['S','M','L','XL','XXL'],kind:'individual'},
 {id:'visor',name:'GOD DESIGN Sun Visor',type:'HEADWEAR',description:'Branded sun visor with adjustable back fastening.',image:'sun-visor-product.png',colors:['Black'],sizes:['Adjustable'],kind:'individual',details:'Premium cotton twill · 100% cotton · adjustable circumference 55–62 cm'},
 {id:'set',name:'The Coordinated Set',type:'TOP + SHORTS',description:'The Signature Tank Top and matching Shorts in one coordinated colourway.',image:'black-coordinated-set.png',colors:['Black','Ash'],details:'Includes one tank top and one matching pair of shorts. Select one shared colour and size for the set.',sizes:['S','M','L','XL','XXL'],kind:'set'}
];
const GOD_WA_NUMBER = '2348074228832';
const GOD_CART_KEY = 'godDesignPreorderCartV1';
const GOD_COLOR_IMAGES = {Black:'black-coordinated-set.png',Ash:'ash-coordinated-set.png'};
function godImage(product,color){ if(product.id==='set') return GOD_COLOR_IMAGES[color]; if(product.id==='tank') return 'tank-'+color.toLowerCase()+'.png'; if(product.id==='shorts') return 'shorts-'+color.toLowerCase()+'.png'; return product.image; }
function godReadCart(){try{const raw=JSON.parse(localStorage.getItem(GOD_CART_KEY)||'[]');if(!Array.isArray(raw))return [];return raw.map(x=>{const p=GOD_PRODUCTS.find(v=>v.id===x.id);if(!p)return null;const color=p.colors.includes(x.color)?x.color:p.colors[0];const size=p.sizes.includes(x.size)?x.size:p.sizes[0];const qty=Math.max(1,Math.min(99,Math.floor(Number(x.qty)||1)));return {key:godLineKey(p.id,color,size),id:p.id,name:p.name,color,size,qty,image:godImage(p,color)}}).filter(Boolean)}catch(e){return []}}
function godSaveCart(cart){localStorage.setItem(GOD_CART_KEY,JSON.stringify(cart));godUpdateCount()}
function godUpdateCount(){const count=godReadCart().reduce((n,x)=>n+x.qty,0);document.querySelectorAll('#nav-count').forEach(el=>el.textContent=count)}
function godEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function godToast(message){const el=document.getElementById('toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(window.godToastTimer);window.godToastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
function godLineKey(id,color,size){return [id,color,size].join('::')}
function godAdd(productId,color,size,qty=1){const product=GOD_PRODUCTS.find(p=>p.id===productId);if(!product)return;const cart=godReadCart(),key=godLineKey(productId,color,size),found=cart.find(x=>x.key===key);if(found)found.qty+=qty;else cart.push({key,id:productId,name:product.name,color,size,qty,image:godImage(product,color)});godSaveCart(cart);godToast(product.name+' added to your bag');}
