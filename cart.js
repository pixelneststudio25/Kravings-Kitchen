var WHATSAPP_NUMBER = '2349094304208';
var CART_KEY = 'kravings_cart_v3';

// ====== FILL THESE IN FROM YOUR SUPABASE PROJECT SETTINGS ======
var SUPABASE_URL = 'https://eufuhzjsnhrabxkspxjh.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZnVoempzbmhyYWJ4a3NweGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMTI0MDcsImV4cCI6MjEwNDc4ODQwN30.5r69GeVwjBMCzfOZOonpF8BJGkDFPaxKBmokCghSmNY';
// =================================================================

var supabaseClient = null;
if(window.supabase && SUPABASE_URL.indexOf('YOUR_') !== 0){
  try{ supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); }catch(e){}
}

var MENU = {
  rice: {
    label: 'Rice',
    items: [
      { id: 'jollof-rice', name: 'Jollof rice', price: 2000, note: 'Smoky, party style, cooked in one pot.', photo: 'images/jollof rice.jpg' },
      { id: 'rice-and-stew', name: 'Rice and stew', price: 2000, note: 'White rice, side of pepper stew.', photo: 'images/jollof rice.jpg' },
      { id: 'fried-rice', name: 'Fried rice', price: 2500, note: 'Mixed vegetables, lightly seasoned.', photo: 'images/jollof rice.jpg' },
      { id: 'chinese-rice', name: 'Chinese rice', price: 3000, note: 'Stir fried with a mix of proteins and veg.', photo: 'images/jollof rice.jpg' }
    ]
  },
  yamPlantainPotato: {
    label: 'Yam, plantain and potatoes',
    items: [
      { id: 'yam-fries', name: 'Yam, cut and fried', price: 2000, note: 'Golden on the outside, soft through the middle.', photo: 'images/fried yam.jpg' },
      { id: 'boiled-yam', name: 'Boiled yam', price: 2000, note: 'Soft boiled, no oil.', photo: 'images/fried yam.jpg' },
      { id: 'fried-plantain', name: 'Plantain, fried', price: 1000, note: 'Ripe, fried until the edges caramelise.', photo: 'images/fried plantains.jpg' },
      { id: 'boiled-plantain', name: 'Boiled plantain', price: 2000, note: 'Soft boiled, no oil.', photo: 'images/fried plantains.jpg' },
      { id: 'sweet-potato-fries', name: 'Sweet potato, fries', price: 2000, note: 'Cut thin, fried crisp.', photo: 'images/fried potatoes.jpg' },
      { id: 'irish-potato-fries', name: 'Irish potato, fries', price: 2500, note: 'Cut thin, fried crisp.', photo: 'images/fried potatoes.jpg' }
    ]
  },
  noodlesPasta: {
    label: 'Noodles and pasta',
    items: [
      { id: 'jollof-spaghetti', name: 'Jollof spaghetti', price: 2500, note: 'The same base sauce, twisted through spaghetti.', photo: 'images/jollof spaghetti.jpg' },
      { id: 'chicken-noodles', name: 'Chicken noodles', price: 3000, note: 'Stir fried noodles topped with chicken.', photo: 'images/noodles.jpg' },
      { id: 'beef-noodles', name: 'Beef noodles', price: 3000, note: 'Stir fried noodles topped with beef.', photo: 'images/noodles.jpg' },
      { id: 'seafood-noodles', name: 'Sea food noodles', price: 4500, note: 'Stir fried noodles with a mix of seafood.', photo: 'images/noodles.jpg' },
      { id: 'shrimp-pasta', name: 'Shrimp pasta', price: 4500, note: 'Pasta tossed with shrimp in a light sauce.', photo: 'images/noodles.jpg' },
      { id: 'stir-fry-pasta', name: 'Stir fry pasta', price: 3500, note: 'Pasta stir fried with mixed vegetables.', photo: 'images/noodles.jpg' },
      { id: 'classic-noodles', name: 'Classic noodles', price: 1500, note: 'Quick, peppery, always a safe order.', photo: 'images/noodles.jpg' },
      { id: 'noodles-full-package', name: 'Noodles full package', price: 2700, note: 'Classic noodles with eggs, served with a takeaway plate included.', photo: 'images/noodles.jpg' }
    ]
  },
  protein: {
    label: 'Protein',
    items: [
      { id: 'eggs', name: 'Eggs', price: 1000, note: 'Fried or scrambled, your call in the chat.', photo: 'images/fried eggs.jpg' },
      { id: 'chicken', name: 'Chicken', price: 3000, note: 'Grilled with a dry pepper rub.', photo: 'images/chicken.jpg' },
      { id: 'goat-meat', name: 'Goat meat', note: 'Slow cooked until it pulls apart easily.', photo: 'images/goat meat.jpg', variants: [
        { label: 'Small', price: 1500 }, { label: 'Large', price: 3000 }
      ]},
      { id: 'beef', name: 'Beef', note: 'Cut thin, peppered, grilled hot.', photo: 'images/beef.jpg', variants: [
        { label: 'Small', price: 500 }, { label: 'Large', price: 1000 }
      ]},
      { id: 'fish', name: 'Fish', note: 'Whole, grilled, bones in.', photo: 'images/fish.jpg', variants: [
        { label: 'Small', price: 3000 }, { label: 'Medium', price: 3500 }, { label: 'Large', price: 4000 }
      ]}
    ]
  },
  sauce: {
    label: 'Sauce',
    items: [
      { id: 'egg-sauce', name: 'Egg sauce', price: 1500, note: 'Peppered stew cooked through with egg.', photo: 'images/fried eggs.jpg' },
      { id: 'fish-sauce', name: 'Fish sauce', price: 2000, note: 'Peppered stew cooked through with fish.', photo: 'images/fish.jpg' }
    ]
  },
  shawarma: {
    label: 'Shawarma',
    items: [
      { id: 'shawarma', name: 'Shawarma', note: 'Rolled tight, sauce on the side if you ask.', photo: 'images/shawarma.jpg', variants: [
        { label: 'Small', price: 3800 }, { label: 'Medium', price: 4500 }, { label: 'Jumbo', price: 7000 }
      ]}
    ]
  },
  drinks: {
    label: 'Drinks',
    items: [
      { id: 'kunu', name: 'Kunu', price: 500, note: 'Cold, mild, made in house.', photo: 'images/kunu.jpg' },
      { id: 'zobo', name: 'Zobo', price: 500, note: 'Dark, tart, lightly spiced.', photo: 'images/zobo.jpg' },
      { id: 'tigernut', name: 'Tigernut', price: 1000, note: 'Cold, naturally sweet, made in house.', photo: 'images/kunu.jpg' }
    ]
  },
  extras: {
    label: 'Extras',
    items: [
      { id: 'takeaway-plate', name: 'Takeaway plate', note: 'Add this if you need your order packed to go.', photo: 'images/fried yam.jpg', variants: [
        { label: 'Small', price: 300 }, { label: 'Large', price: 500 }
      ]}
    ]
  }
};

function formatNaira(n){ return '\u20A6' + n.toLocaleString('en-NG'); }

// Tries to load the owner's live published menu from Supabase. If Supabase
// isn't configured yet, or the request fails, or nothing has been published
// yet, the hardcoded MENU above stays in place, so the site never breaks.
window.kravingsMenuReady = (async function(){
  if(!supabaseClient) return;
  try{
    var result = await supabaseClient.from('published_snapshot').select('data').eq('id', 1).single();
    var liveData = result && result.data && result.data.data;
    if(liveData && Object.keys(liveData).length){
      Object.keys(MENU).forEach(function(k){ delete MENU[k]; });
      Object.keys(liveData).forEach(function(k){ MENU[k] = liveData[k]; });
    }
  }catch(e){ /* keep the hardcoded MENU as a safe fallback */ }
})();

function loadCart(){
  try{
    var raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){}
}

function buildWhatsAppMessage(cart){
  var lines = ['Hi Kravings Kitchen, I would like to place an order:', ''];
  var total = 0;
  Object.keys(cart).forEach(function(id){
    var line = cart[id];
    var lineTotal = line.price * line.qty;
    total += lineTotal;
    lines.push('- ' + line.qty + 'x ' + line.name + ' (' + formatNaira(lineTotal) + ')');
  });
  lines.push('');
  lines.push('Total: ' + formatNaira(total));
  lines.push('');
  lines.push('Please confirm delivery or pickup, and how to pay. Thank you.');
  return lines.join('\n');
}

function initCartUI(){
  var cart = loadCart();

  var cartItemsEl = document.getElementById('cart-items');
  var cartTotalEl = document.getElementById('cart-total');
  var cartCountEls = document.querySelectorAll('.cart-count');
  var checkoutBtn = document.getElementById('checkout-btn');
  var mobileBar = document.getElementById('mobile-cart-bar');
  var mobileSummary = document.getElementById('mobile-cart-summary');
  var mobileTotal = document.getElementById('mobile-cart-total');

  function renderCart(){
    var ids = Object.keys(cart);
    var total = 0, count = 0;
    if(cartItemsEl){
      cartItemsEl.innerHTML = '';
      if(ids.length === 0){
        var empty = document.createElement('p');
        empty.className = 'cart-empty';
        empty.textContent = 'Your cart is empty. Add something from the menu.';
        cartItemsEl.appendChild(empty);
      }
      ids.forEach(function(id){
        var line = cart[id];
        total += line.price * line.qty;
        count += line.qty;
        var row = document.createElement('div');
        row.className = 'cart-line';
        row.innerHTML =
          '<div class="cart-line-info">' +
            '<h5>' + line.name + '</h5>' +
            '<span>' + formatNaira(line.price) + ' each</span>' +
            '<div class="cart-line-price">' + formatNaira(line.price * line.qty) + '</div>' +
            '<div class="qty-control">' +
              '<button data-action="dec" aria-label="Decrease quantity">\u2212</button>' +
              '<span>' + line.qty + '</span>' +
              '<button data-action="inc" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<button class="remove-line" data-action="remove">Remove</button>' +
          '</div>';
        row.querySelector('[data-action="dec"]').addEventListener('click', function(){ changeQty(id, -1); });
        row.querySelector('[data-action="inc"]').addEventListener('click', function(){ changeQty(id, 1); });
        row.querySelector('[data-action="remove"]').addEventListener('click', function(){ removeLine(id); });
        cartItemsEl.appendChild(row);
      });
    } else {
      ids.forEach(function(id){ total += cart[id].price * cart[id].qty; count += cart[id].qty; });
    }

    if(cartTotalEl) cartTotalEl.textContent = formatNaira(total);
    if(mobileTotal) mobileTotal.textContent = formatNaira(total);
    if(mobileSummary) mobileSummary.textContent = count + (count === 1 ? ' item' : ' items');
    cartCountEls.forEach(function(el){
      if(count > 0){ el.hidden = false; el.textContent = count; }
      else { el.hidden = true; }
    });
    if(mobileBar) mobileBar.classList.toggle('show', count > 0);
    document.body.classList.toggle('has-items', count > 0);
    if(checkoutBtn) checkoutBtn.disabled = count === 0;
  }

  function addToCart(id, name, price){
    if(cart[id]){ cart[id].qty += 1; }
    else { cart[id] = { name: name, price: price, qty: 1 }; }
    saveCart(cart);
    renderCart();
    showAddedToast(name);
    pulseCartIcon();
  }
  function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id].qty += delta;
    if(cart[id].qty <= 0) delete cart[id];
    saveCart(cart);
    renderCart();
  }
  function removeLine(id){
    delete cart[id];
    saveCart(cart);
    renderCart();
  }

  var cartDrawer = document.getElementById('cart-drawer');
  var cartOverlay = document.getElementById('cart-overlay');
  function openCart(){ if(cartDrawer){ cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); } }
  function closeCart(){ if(cartDrawer){ cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); } }

  var toastTimer = null;
  function showAddedToast(name){
    var toast = document.getElementById('add-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'add-toast';
      toast.className = 'add-toast';
      toast.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = name + ' added to your order';
    clearTimeout(toastTimer);
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
  }

  function pulseCartIcon(){
    document.querySelectorAll('.cart-open-btn').forEach(function(btn){
      btn.classList.remove('pulse');
      void btn.offsetWidth;
      btn.classList.add('pulse');
    });
  }

  var openBtns = document.querySelectorAll('.cart-open-btn');
  openBtns.forEach(function(b){ b.addEventListener('click', openCart); });
  var closeBtn = document.getElementById('cart-close-btn');
  if(closeBtn) closeBtn.addEventListener('click', closeCart);
  if(cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if(mobileBar) mobileBar.addEventListener('click', openCart);

  if(checkoutBtn){
    checkoutBtn.addEventListener('click', function(){
      if(Object.keys(cart).length === 0) return;
      var msg = encodeURIComponent(buildWhatsAppMessage(cart));
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
    });
  }

  window.addEventListener('storage', function(e){
    if(e.key === CART_KEY){ cart = loadCart(); renderCart(); }
  });

  window.kravingsAddToCart = addToCart;
  renderCart();
}

function initScrollReveal(){
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');
  if(prefersReduced || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function(el){ observer.observe(el); });
}

function initNavScroll(){
  var navEl = document.getElementById('site-nav');
  if(!navEl || navEl.classList.contains('scrolled') && navEl.dataset.staticScrolled) return;
  function onScroll(){
    if(window.scrollY > 40){ navEl.classList.add('scrolled'); }
    else if(!navEl.dataset.staticScrolled){ navEl.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initMobileDrawer(){
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var drawer = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('drawer-overlay');
  if(!hamburgerBtn || !drawer || !overlay) return;
  function closeDrawer(){
    hamburgerBtn.classList.remove('open'); drawer.classList.remove('open');
    overlay.classList.remove('open'); hamburgerBtn.setAttribute('aria-expanded','false');
  }
  hamburgerBtn.addEventListener('click', function(){
    var isOpen = drawer.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeDrawer); });
}

document.addEventListener('DOMContentLoaded', function(){
  window.kravingsMenuReady.then(function(){
    initCartUI();
    initScrollReveal();
    initNavScroll();
    initMobileDrawer();
  });
});
