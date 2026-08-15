document.addEventListener('DOMContentLoaded', () => {
  // 1. vCard Data Payload
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Ünlü;Selçuk;;;',
    'FN:Selçuk Ünlü',
    'TITLE:COO | Co-Founder',
    'ORG:Red Cat Quantum Labs',
    'TEL;TYPE=CELL,VOICE:+905426616062',
    'EMAIL;TYPE=WORK,INTERNET:selcuk@rcql.com',
    'EMAIL;TYPE=HOME,INTERNET:info@rcql.com',
    'ADR;TYPE=WORK:;;Erenköy Mh. Gülbahçe Sk. No:4 D:4;Kadıköy;İstanbul;34738;Turkey',
    'URL:https://rcql.com',
    'END:VCARD'
  ].join('\n');

  // 2. Render Center QR Code
  function renderQR() {
    const container = document.getElementById('cardQrCode');
    if (!container) return;
    try {
      const qr = qrcode(0, 'M');
      qr.addData(vCardData);
      qr.make();
      container.innerHTML = qr.createSvgTag(3, 0);
      const svg = container.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.borderRadius = '4px';
        svg.style.display = 'block';
      }
    } catch (err) {
      console.error('QR error:', err);
    }
  }

  renderQR();

  // 3. Card Flip Logic
  const businessCard = document.getElementById('businessCard');
  const flipCardBtn = document.getElementById('flipCardBtn');
  const flipToBackBtn = document.getElementById('flipToBackBtn');
  const flipToFrontBtn = document.getElementById('flipToFrontBtn');

  function toggleFlip() {
    businessCard.classList.toggle('is-flipped');
  }

  if (flipCardBtn) flipCardBtn.addEventListener('click', toggleFlip);
  if (flipToBackBtn) flipToBackBtn.addEventListener('click', toggleFlip);
  if (flipToFrontBtn) flipToFrontBtn.addEventListener('click', toggleFlip);

  // Click card back to flip to front
  const cardBack = document.querySelector('.card-back');
  if (cardBack) {
    cardBack.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        toggleFlip();
      }
    });
  }

  // 4. 3D Tilt Effect on Desktop
  if (window.innerWidth > 768) {
    const cardWrapper = document.getElementById('cardWrapper');
    if (cardWrapper) {
      cardWrapper.addEventListener('mousemove', (e) => {
        if (businessCard.classList.contains('is-flipped')) return;
        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (-y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        
        businessCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      cardWrapper.addEventListener('mouseleave', () => {
        if (!businessCard.classList.contains('is-flipped')) {
          businessCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
      });
    }
  }
});
