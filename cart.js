var WHATSAPP_NUMBER = '2347078368574';
var CART_KEY = 'kravings_cart_v2';

var MENU = {
  main: {
    label: 'Main dish',
    items: [
      { id: 'jollof-rice', name: 'Jollof rice', price: 1500, note: 'Smoky, party style, cooked in one pot.', photo: 'images/jollof-rice.jpg' },
      { id: 'jollof-spaghetti', name: 'Jollof spaghetti', price: 2000, note: 'The same base sauce, twisted through spaghetti.', photo: 'images/jollof-spaghetti.jpg' },
      { id: 'yam-fries', name: 'Yam, cut and fried', price: 2000, note: 'Golden on the outside, soft through the middle.', photo: 'images/fried-yam.jpg' },
      { id: 'irish-sweet-potato', name: 'Irish and sweet potato', price: 2000, note: 'Two potatoes, one plate, lightly seasoned.', photo: 'images/fried-potatoes.jpg' },
      { id: 'plantain', name: 'Plantain', price: 500, note: 'Ripe, fried until the edges caramelise.', photo: 'images/fried-plantains.jpg' },
      { id: 'noodles', name: 'Noodles', price: 1500, note: 'Quick, peppery, always a safe order.', photo: 'images/noodles.jpg' }
    ]
  },
  protein: {
    label: 'Protein',
    items: [
      { id: 'eggs', name: 'Eggs', price: 1000, note: 'Fried or scrambled, your call in the chat.', photo: 'images/fried-eggs.jpg' },
      { id: 'chicken', name: 'Chicken', price: 3000, note: 'Grilled with a dry pepper rub.', photo: 'images/chicken.jpg' },
      { id: 'goat-meat', name: 'Goat meat', note: 'Slow cooked until it pulls apart easily.', photo: 'images/goat-meat.jpg', variants: [
        { label: 'Small', price: 1000 }, { label: 'Medium', price: 1500 }, { label: 'Large', price: 3000 }
      ]},
      { id: 'beef', name: 'Beef', price: 500, note: 'Cut thin, peppered, grilled hot.', photo: 'images/beef.jpg' },
      { id: 'fish', name: 'Fish', price: 1000, note: 'Whole, grilled, bones in.', photo: 'images/fish.jpg' }
    ]
  },
  shawarma: {
    label: 'Shawarma',
    items: [
      { id: 'shawarma', name: 'Shawarma', note: 'Rolled tight, sauce on the side if you ask.', photo: 'images/shawarma.jpg', variants: [
        { label: 'Small', price: 3500 }, { label: 'Medium', price: 4500 }, { label: 'Jumbo', price: 6000 }
      ]}
    ]
  },
  drinks: {
    label: 'Drinks',
    items: [
      { id: 'kunu', name: 'Kunu', price: 500, note: 'Cold, mild, made in house.', photo: 'images/kunu.jpg' },
      { id: 'zobo', name: 'Zobo', price: 500, note: 'Dark, tart, lightly spiced.', photo: 'images/zobo.jpg' }
    ]
  }
};

function formatNaira(n){ return '\u20A6' + n.toLocaleString('en-NG'); }

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
  initCartUI();
  initScrollReveal();
  initNavScroll();
  initMobileDrawer();
});
