function login() {
  alert("First complete the registration process!");
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

// ✅ Registration form handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (e) => {
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
        body: new URLSearchParams({
          username,
          email,
          password
        })
      });

      const message = await response.text();

      alert(message); // ✅ success popup
      form.reset();
      closeRegisterForm();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Registration failed. Try again later.');
    }
  });
});
