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

  // 2. Render High-Res SVG QR Codes
  function renderQR(containerId, cellSize = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
      const qr = qrcode(0, 'M');
      qr.addData(vCardData);
      qr.make();
      container.innerHTML = qr.createSvgTag(cellSize, 0);
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

  function generateQRCodes() {
    renderQR('cardQrCode', 3);
    renderQR('modalQrCode', 7);
  }

  generateQRCodes();

  // 3. Elements
  const businessCard = document.getElementById('businessCard');
  const flipCardBtn = document.getElementById('flipCardBtn');
  const flipToBackBtn = document.getElementById('flipToBackBtn');
  const flipToFrontBtn = document.getElementById('flipToFrontBtn');

  const frontQrContainer = document.getElementById('frontQrContainer');
  const openFullQrBtn = document.getElementById('openFullQrBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');

  // 4. Card Flip Logic
  function toggleFlip() {
    businessCard.classList.toggle('is-flipped');
  }

  if (flipCardBtn) flipCardBtn.addEventListener('click', toggleFlip);
  if (flipToBackBtn) flipToBackBtn.addEventListener('click', toggleFlip);
  if (flipToFrontBtn) flipToFrontBtn.addEventListener('click', toggleFlip);

  const cardBack = document.querySelector('.card-back');
  if (cardBack) {
    cardBack.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        toggleFlip();
      }
    });
  }

  // 5. Fullscreen QR Modal Interactions
  function openQrModal() {
    qrModal.classList.add('is-active');
    qrModal.setAttribute('aria-hidden', 'false');
  }

  function closeQrModal() {
    qrModal.classList.remove('is-active');
    qrModal.setAttribute('aria-hidden', 'true');
  }

  if (frontQrContainer) frontQrContainer.addEventListener('click', openQrModal);
  if (openFullQrBtn) openFullQrBtn.addEventListener('click', openQrModal);
  if (closeQrModalBtn) closeQrModalBtn.addEventListener('click', closeQrModal);

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQrModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrModal.classList.contains('is-active')) {
      closeQrModal();
    }
  });

  // 6. 3D Tilt Effect on Desktop
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
