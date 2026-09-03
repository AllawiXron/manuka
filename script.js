const productButtons = document.querySelectorAll('.price-option');
const selectedProduct = document.querySelector('#selected-product');
const form = document.querySelector('#order-form');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const phoneError = document.querySelector('#phone-error');
const addressError = document.querySelector('#address-error');

let chosenProduct = document.querySelector('.price-option.is-selected');

function chooseProduct(button) {
  productButtons.forEach((option) => {
    option.classList.remove('is-selected');
    option.setAttribute('aria-pressed', 'false');
  });

  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  chosenProduct = button;
  selectedProduct.textContent = `${button.querySelector('.option-top > span').textContent} — ${button.dataset.price}`;
}

productButtons.forEach((button) => {
  button.addEventListener('click', () => chooseProduct(button));
});

function clearError(element, message) {
  element.classList.remove('input-error');
  message.textContent = '';
}

phone.addEventListener('input', () => clearError(phone, phoneError));
address.addEventListener('input', () => clearError(address, addressError));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const normalizedPhone = phone.value.replace(/[^0-9]/g, '');
  const trimmedAddress = address.value.trim();
  let valid = true;

  if (normalizedPhone.length < 10) {
    phone.classList.add('input-error');
    phoneError.textContent = 'اكتب رقم هاتف صحيح للتواصل معك.';
    valid = false;
  }

  if (trimmedAddress.length < 8) {
    address.classList.add('input-error');
    addressError.textContent = 'اكتب عنوانك بشكل أوضح، مثل المحافظة والمنطقة.';
    valid = false;
  }

  if (!valid) return;

  const message = [
    'مرحباً، أرغب بطلب عسل مانوكا من Manuka IRAQ.',
    '',
    `العرض: ${chosenProduct.dataset.product}`,
    `السعر: ${chosenProduct.dataset.price}`,
    `رقم الهاتف: ${phone.value.trim()}`,
    `العنوان: ${trimmedAddress}`,
    '',
    'يرجى التواصل معي لتأكيد الطلب. شكراً.'
  ].join('\n');

  window.open(`https://wa.me/9647729449520?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelector('#year').textContent = new Date().getFullYear();
