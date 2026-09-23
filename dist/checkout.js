let offerTrigger;
function goCheckout(plan){
 const target=window.OFFER_CONFIG?.checkout?.[plan];
 if(!target){document.getElementById('checkoutNotice').showModal();return;}
 try{
  const url=new URL(target);if(url.protocol!=='https:')throw new Error('Invalid checkout');
  const current=new URLSearchParams(location.search), params=new URLSearchParams();
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const value=current.get(key);if(value)params.set(key,value);}
  try{if(params.size)localStorage.setItem('pd_utms',params.toString());else{const saved=localStorage.getItem('pd_utms');if(saved)new URLSearchParams(saved).forEach((v,k)=>params.set(k,v));}}catch{}
  params.forEach((v,k)=>url.searchParams.set(k,v));
  window.location.assign(url.href);
 }catch{document.getElementById('checkoutNotice').showModal();}
}
function openOfferModal(){offerTrigger=document.activeElement;document.getElementById('offerModal').classList.add('open');document.body.style.overflow='hidden';document.querySelector('.offer-close').focus();}
function closeOfferModal(){document.getElementById('offerModal').classList.remove('open');document.body.style.overflow='';offerTrigger?.focus();}
document.getElementById('offerModal').addEventListener('click',function(e){if(e.target===this)closeOfferModal();});
document.addEventListener('keydown',e=>{
 const modal=document.getElementById('offerModal');if(!modal.classList.contains('open')||document.getElementById('checkoutNotice').open)return;
 if(e.key==='Escape')closeOfferModal();
 if(e.key==='Tab'){const els=[...modal.querySelectorAll('button,a[href]')];const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
