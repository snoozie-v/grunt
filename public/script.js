document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMessage');
    const btn = form.querySelector('button[type="submit"]');
    msg.className = 'form-message';
    msg.textContent = '';

    if (!form.checkValidity()) {
      msg.className = 'form-message err';
      msg.textContent = 'Please add your name, phone number, and what you need.';
      form.reportValidity();
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        msg.className = 'form-message ok';
        msg.textContent = "Thanks! We got it and will be in touch soon. Need us sooner? Call or text 320-815-0900.";
        form.reset();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      msg.className = 'form-message err';
      msg.textContent = (err && err.message) || 'Something went wrong. Please call or text 320-815-0900.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Request free estimate';
    }
  });
}
