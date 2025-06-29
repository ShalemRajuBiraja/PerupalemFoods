function login() {
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginForm() {
  document.getElementById('loginModal').style.display = 'none';
}

function openOrderForm(itemName) {
  document.getElementById('orderModal').style.display = 'flex';
  document.getElementById('item').value = itemName;
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function openRegisterForm() {
  document.getElementById('registerModal').style.display = 'flex';
}

function closeRegisterForm() {
  document.getElementById('registerModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // ✅ Registration form handling
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ username, email, password })
      });

      const message = await response.text();
      alert(message);
      registerForm.reset();
      closeRegisterForm();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Registration failed. Try again later.');
    }
  });

  // ✅ Login form handling
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ email, password })
      });

      const result = await response.text();
      alert(result);

      if (result.includes('success')) {
        closeLoginForm();
      }

    } catch (err) {
      console.error('Login failed:', err);
      alert('❌ Login failed. Please try again.');
    }
  });

  // ✅ Order form handling
  const orderForm = document.getElementById('orderForm');

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (!name || !item || !quantity || !address || !payment) {
      alert('❌ Please fill in all the fields.');
      return;
    }

    alert(`🎉 Order placed successfully!\n\nItem: ${item}\nQuantity: ${quantity}\nPayment: ${payment}\n\nWe’ll deliver it soon!`);
    orderForm.reset();
    closeModal();
  });
});
