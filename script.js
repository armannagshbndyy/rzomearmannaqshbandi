// همه اسکریپت‌ها بعد از لود شدن DOM اجرا میشن
document.addEventListener('DOMContentLoaded', function () {

  /* ================== Navbar Toggle ================== */
  const btn = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (btn && navList) {
    btn.addEventListener('click', () => {
      navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  /* ================== Smooth Scroll ================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ================== Contact Form ================== */
  const contactForm = document.getElementById('contactForm');
  const result = document.getElementById('contactResult');

  if (contactForm && result) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      result.textContent = 'در حال ارسال...';

      const data = new FormData(contactForm);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            message: data.get('message')
          })
        });

        const json = await res.json();
        result.textContent = res.ok ? 'پیام با موفقیت ارسال شد.' : (json?.error || 'خطا در ارسال.');
      } catch {
        result.textContent = 'خطا در ارتباط با سرور.';
      }
    });
  }

  /* ================== Modal for Project Preview ================== */
  const modal = document.getElementById('siteModal');
  const iframe = document.getElementById('siteModalFrame');
  const closeBtn = document.getElementById('closeSiteModal');

  // باز کردن مودال
  document.querySelectorAll('.open-site-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-site');
      if (!url) return;

      iframe.src = url;
      modal.classList.add('active');
    });
  });

  // بستن مودال
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      iframe.src = '';
    });
  }

  // بستن مودال با کلیک روی بک‌گراند
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        iframe.src = '';
      }
    });
  }

});


/* ================== Loader ================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const content = document.getElementById('content');

    if (loaderWrapper) loaderWrapper.style.display = 'none';
    if (content) content.style.display = 'block';
  }, 5000);
});
