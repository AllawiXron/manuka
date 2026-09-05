// ===== Product Selection =====
const productButtons = document.querySelectorAll('.price-option');
const selectedProduct = document.querySelector('#selected-product');
const form = document.querySelector('#order-form');
const userName = document.querySelector('#name');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const nameError = document.querySelector('#name-error');
const phoneError = document.querySelector('#phone-error');
const addressError = document.querySelector('#address-error');

let chosenProduct = document.querySelector('.price-option.is-selected');

function chooseProduct(button, userClicked = false) {
  productButtons.forEach((option) => {
    option.classList.remove('is-selected');
    option.setAttribute('aria-pressed', 'false');
  });

  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  chosenProduct = button;

  const titleSpan = button.querySelector('.option-title');
  const titleText = titleSpan ? titleSpan.textContent.trim() : 'العرض المختار';
  if (selectedProduct) {
    selectedProduct.textContent = `${titleText} — ${button.dataset.price}`;
  }

  // Smooth scroll down to Information Filling section (Step 2)
  if (userClicked) {
    const step2Target = document.querySelector('.order-selected-summary-box') || document.querySelector('#name');
    if (step2Target) {
      step2Target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      const nameInput = document.querySelector('#name');
      if (nameInput) {
        nameInput.focus({ preventScroll: true });
      }
    }, 450);
  }
}

productButtons.forEach((button) => {
  button.addEventListener('click', () => chooseProduct(button, true));
});

function clearError(element, messageEl) {
  if (element) element.classList.remove('input-error');
  if (messageEl) messageEl.textContent = '';
}

if (userName) userName.addEventListener('input', () => clearError(userName, nameError));
if (phone) phone.addEventListener('input', () => clearError(phone, phoneError));
if (address) address.addEventListener('input', () => clearError(address, addressError));

// ===== Form Submission Handler =====
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = userName ? userName.value.trim() : '';
    const normalizedPhone = phone ? phone.value.replace(/[^0-9]/g, '') : '';
    const trimmedAddress = address ? address.value.trim() : '';
    let valid = true;

    if (userName && nameVal.length < 2) {
      userName.classList.add('input-error');
      if (nameError) nameError.textContent = 'يرجى كتابة الاسم الكريم.';
      valid = false;
    }

    if (normalizedPhone.length < 10) {
      if (phone) phone.classList.add('input-error');
      if (phoneError) phoneError.textContent = 'يرجى كتابة رقم هاتف صحيح متكون من 11 رقم.';
      valid = false;
    }

    if (trimmedAddress.length < 4) {
      if (address) address.classList.add('input-error');
      if (addressError) addressError.textContent = 'يرجى كتابة المحافظة والمنطقة بوضوح.';
      valid = false;
    }

    if (!valid) return;

    const prodName = chosenProduct ? chosenProduct.dataset.product : 'عسل مانوكا أصلي';
    const prodPrice = chosenProduct ? chosenProduct.dataset.price : '';

    const message = [
      'مرحباً، أرغب بطلب عسل مانوكا نيوزيلندي أصلي:',
      '',
      `👤 الاسم: ${nameVal}`,
      `📦 العرض: ${prodName}`,
      `💰 السعر: ${prodPrice}`,
      `📱 رقم الهاتف: ${phone.value.trim()}`,
      `📍 العنوان: ${trimmedAddress}`,
      '',
      'يرجى تأكيد الطلب والتوصيل. شكراً لكم.'
    ].join('\n');

    const submitBtn = document.querySelector('#submit-btn');
    if (submitBtn) {
      submitBtn.innerHTML = '✓ جاري فتح الواتساب لتأكيد الطلب...';
      submitBtn.style.background = '#27ae60';
    }

    setTimeout(() => {
      window.open(`https://wa.me/9647729449520?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
      if (submitBtn) {
        submitBtn.innerHTML = 'إرسال الطلب الآن <span>←</span>';
        submitBtn.style.background = '';
      }
    }, 400);
  });
}

// ===== Footer Year =====
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Countdown Timer =====
let timerExpired = false;

function updateCountdown() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay - now;

  if (diff <= 0) {
    if (!timerExpired) {
      timerExpired = true;
      const mainPriceDisplay = document.getElementById('main-price-display');
      if (mainPriceDisplay) {
        mainPriceDisplay.innerHTML = '185,000 <small>د.ع</small>';
      }
      const heroPriceBox = document.querySelector('.hero-price-box');
      if (heroPriceBox) {
        const oldPriceEl = heroPriceBox.querySelector('.old-price');
        if (oldPriceEl) oldPriceEl.style.display = 'none';
        const discEl = heroPriceBox.querySelector('.discount-badge');
        if (discEl) discEl.textContent = 'انتهى العرض المؤقت';
      }
    }
    const cdH = document.getElementById('cd-hours');
    const cdM = document.getElementById('cd-minutes');
    const cdS = document.getElementById('cd-seconds');
    if (cdH) cdH.textContent = '00';
    if (cdM) cdM.textContent = '00';
    if (cdS) cdS.textContent = '00';
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
  if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
  if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Live Viewers Counter =====
const liveCount = document.getElementById('live-count');
let currentViewers = 38 + Math.floor(Math.random() * 30);
if (liveCount) liveCount.textContent = currentViewers;

function fluctuateViewers() {
  if (!liveCount) return;
  const change = Math.floor(Math.random() * 7) - 3;
  currentViewers = Math.max(34, Math.min(73, currentViewers + change));
  liveCount.textContent = currentViewers;
  setTimeout(fluctuateViewers, 5000 + Math.random() * 7000);
}
setTimeout(fluctuateViewers, 5000 + Math.random() * 7000);

// ===== Sold Today Counter =====
const soldCount = document.getElementById('sold-count');
let currentSold = 47 + Math.floor(Math.random() * 17);
if (soldCount) soldCount.textContent = currentSold;

function incrementSold() {
  if (!soldCount) return;
  currentSold += 1;
  soldCount.textContent = currentSold;
  setTimeout(incrementSold, 45000 + Math.random() * 45000);
}
setTimeout(incrementSold, 45000 + Math.random() * 45000);

// ===== Subtle Recent Order Toast =====
const iraqiNames = ['أحمد', 'محمد', 'علي', 'حسين', 'عمار', 'مصطفى', 'كرار', 'حيدر', 'زيد', 'عباس', 'ياسر', 'مهند', 'حسن', 'جعفر', 'سجاد', 'عمر', 'أمير'];
const iraqiCities = ['بغداد', 'البصرة', 'أربيل', 'النجف', 'كربلاء', 'الموصل', 'الديوانية', 'الناصرية', 'السماوة', 'بابل', 'واسط', 'ميسان', 'ديالى', 'كركوك', 'الكوت', 'السليمانية'];
const timeAgo = ['قبل دقيقة', 'قبل دقيقتين', 'قبل 3 دقائق', 'قبل 5 دقائق'];
const orderProducts = ['علبة عسل مانوكا (115,000 د.ع)', 'العرض الذهبي (علبتين + هدية)'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const toastContainer = document.getElementById('order-toast-container');

function showOrderToast() {
  if (!toastContainer) return;
  const name = getRandomItem(iraqiNames);
  const city = getRandomItem(iraqiCities);
  const time = getRandomItem(timeAgo);
  const product = getRandomItem(orderProducts);

  const toast = document.createElement('div');
  toast.className = 'order-toast';
  toast.innerHTML = `
    <div class="toast-icon">🛒</div>
    <div class="toast-content">
      <b>${name} من ${city}</b>
      <small>طلب ${product} — ${time}</small>
    </div>
    <button class="toast-close" aria-label="إغلاق">✕</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toast.remove());
  }

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);

  setTimeout(showOrderToast, 10000 + Math.random() * 8000);
}

setTimeout(showOrderToast, 3000);

// ===== Exit Intent Popup (115K -> 113K Discount) =====
let exitPopupShown = false; // Allow showing on exit attempt per session test
const exitOverlay = document.getElementById('exit-popup-overlay');
const exitClose = document.getElementById('exit-popup-close');
const exitCta = document.getElementById('exit-popup-cta');

function showExitPopup() {
  if (exitPopupShown || !exitOverlay) return;
  exitPopupShown = true;
  exitOverlay.classList.add('show');
}

function hideExitPopup() {
  if (!exitOverlay) return;
  exitOverlay.classList.remove('show');
}

if (exitClose) exitClose.addEventListener('click', hideExitPopup);
if (exitOverlay) exitOverlay.addEventListener('click', (e) => {
  if (e.target === exitOverlay) hideExitPopup();
});

// Trigger 1: Desktop mouse move up to URL/Tab bar
document.addEventListener('mouseleave', (e) => {
  if (e.clientY < 50) {
    showExitPopup();
  }
});

// Trigger 2: Document mouseout to top window
document.addEventListener('mouseout', (e) => {
  if (!e.relatedTarget && e.clientY < 30) {
    showExitPopup();
  }
});

// Trigger 3: Mobile tab switch / visibility hide
let pageHiddenTime = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pageHiddenTime = Date.now();
  } else {
    if (Date.now() - pageHiddenTime > 1000) {
      showExitPopup();
    }
  }
});

// Exit popup CTA action (apply 113k discount)
if (exitCta) {
  exitCta.addEventListener('click', () => {
    hideExitPopup();

    const mainPriceDisplay = document.getElementById('main-price-display');
    if (mainPriceDisplay) {
      mainPriceDisplay.innerHTML = '113,000 <small>د.ع</small>';
    }

    const singleOption = productButtons[0];
    if (singleOption) {
      singleOption.dataset.price = '113,000 د.ع';
      const bTag = singleOption.querySelector('b');
      if (bTag) bTag.innerHTML = '113 <small>ألف د.ع</small>';
      chooseProduct(singleOption);
    }

    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
