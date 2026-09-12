document.querySelector('#year').textContent = new Date().getFullYear();
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => {
    const active = link.hash === '#' + entry.target.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  }); });
}, {rootMargin: '-15% 0px -55% 0px', threshold: 0});
document.querySelectorAll('main section').forEach(section => observer.observe(section));
document.querySelector('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  const status = document.querySelector('#form-status');
  if (!name || !message) { status.textContent = '请填写称呼和留言内容，不能只有空格。'; return; }
  const text = `给 zhuzihe 的留言\n称呼：${name}\n邮箱：${data.get('email')}\n\n${message}`;
  try { await navigator.clipboard.writeText(text); status.textContent = '留言已复制，尚未发送。接收邮箱补充后即可联系。'; }
  catch { status.textContent = '浏览器未允许复制，请手动选择并复制你填写的内容。留言尚未发送。'; }
});
