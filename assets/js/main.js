import { getServices, getSpaInfo, getFaqs } from './data-store.js';

// Datos reactivos desde el almacenamiento local
let servicesData = getServices();
let spaInfo = getSpaInfo();
let faqsData = getFaqs();

// Estado de la aplicación
const state = {
  activeCategory: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('ikigai_cart') || '[]')
};

// Elementos DOM
const servicesContainer = document.getElementById('services-grid');
const filterTabs = document.querySelectorAll('.filter-tab');
const searchInput = document.getElementById('catalog-search');
const cartCountElements = document.querySelectorAll('.cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-drawer-overlay');
const btnOpenCart = document.getElementById('btn-open-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const btnCheckoutWhatsapp = document.getElementById('btn-checkout-whatsapp');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const siteHeader = document.querySelector('.site-header');
const faqsContainer = document.getElementById('faq-accordion-list');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderFaqs();
  updateBusinessInfo();
  updateCartUI();
  setupEventListeners();
  setupGiftCardPreview();
  checkBusinessStatus();

  // Escuchar cambios provenientes del panel de administración
  window.addEventListener('ikigai-store-change', () => {
    servicesData = getServices();
    spaInfo = getSpaInfo();
    faqsData = getFaqs();
    renderServices();
    renderFaqs();
    updateBusinessInfo();
    updateCartUI();
  });
});

// Renderizar tarjetas de servicios
function renderServices() {
  if (!servicesContainer) return;

  const filtered = servicesData.filter(service => {
    // Filtro por categoría
    const matchesCategory = state.activeCategory === 'all' || service.category === state.activeCategory;
    
    // Filtro por búsqueda
    const q = state.searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesName = service.name.toLowerCase().includes(q);
    const matchesDesc = (service.description || '').toLowerCase().includes(q);
    const matchesCat = (service.categoryName || '').toLowerCase().includes(q);
    const matchesBenefits = service.benefits ? service.benefits.some(b => b.toLowerCase().includes(q)) : false;
    const matchesZones = service.zones ? service.zones.some(z => z.name.toLowerCase().includes(q)) : false;

    return matchesCategory && (matchesName || matchesDesc || matchesCat || matchesBenefits || matchesZones);
  });

  if (filtered.length === 0) {
    servicesContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌿</div>
        <h3 style="font-size: 1.4rem; color: var(--color-primary-dark); margin-bottom: 0.5rem;">No encontramos servicios para tu búsqueda</h3>
        <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Intenta con otra palabra o consulta directamente a nuestro WhatsApp oficial.</p>
        <button class="btn btn-outline" id="btn-reset-filters">Restablecer filtros</button>
      </div>
    `;
    const btnReset = document.getElementById('btn-reset-filters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterTabs.forEach(t => t.classList.toggle('active', t.dataset.category === 'all'));
        renderServices();
      });
    }
    return;
  }

  servicesContainer.innerHTML = filtered.map(service => {
    // Si tiene tabla de zonas (Depilación)
    let bodyContent = '';
    if (service.zones) {
      bodyContent = `
        <div class="service-card-zones-table">
          <table>
            <tbody>
              ${service.zones.map(z => `
                <tr>
                  <td class="zone-name">${z.name}</td>
                  <td class="zone-price">${z.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (service.benefits) {
      bodyContent = `
        <ul class="service-card-benefits">
          ${service.benefits.map(b => `
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${b}</span>
            </li>
          `).join('')}
        </ul>
      `;
    }

    const whatsappMessage = encodeURIComponent(
      `Hola Spa IKIGAI, me gustaría agendar una hora para el servicio:\n*${service.name}* (${service.duration}) - ${service.priceFormatted}\n¿Tienen disponibilidad esta semana?`
    );

    const isInCart = state.cart.some(item => item.id === service.id);

    return `
      <article class="service-card" data-id="${service.id}" data-category="${service.category}">
        <div class="service-card-media">
          <img src="${service.image}" alt="${service.name}" loading="lazy">
          <span class="service-card-badge">${service.badge || 'Destacado'}</span>
          <span class="service-duration-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${service.duration}
          </span>
        </div>
        <div class="service-card-body">
          <span class="service-card-category">${service.categoryName}</span>
          <h3 class="service-card-title">${service.name}</h3>
          <p class="service-card-desc">${service.description}</p>
          
          ${bodyContent}

          ${service.packPriceFormatted ? `
            <div style="background: var(--color-sand); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; margin-bottom: 1rem; font-size: 0.8rem; color: var(--color-primary-dark); font-weight: 600;">
              ✨ Opción Pack: ${service.packPriceFormatted}
            </div>
          ` : ''}

          <div class="service-card-footer">
            <div class="service-price-block">
              <span class="service-price-label">Valor</span>
              <span class="service-price-val">${service.priceFormatted}</span>
              ${service.originalPrice ? `<span class="service-price-orig">Ref: ${service.originalPrice}</span>` : ''}
            </div>
            <div class="service-card-actions">
              <button 
                class="btn btn-sm ${isInCart ? 'btn-teal' : 'btn-outline'} btn-add-plan" 
                data-id="${service.id}"
                title="${isInCart ? 'En tu plan' : 'Agregar al plan'}"
              >
                ${isInCart ? '✓ Agregado' : '+ Plan'}
              </button>
              <a 
                href="${spaInfo.whatsappUrl}?text=${whatsappMessage}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-sm btn-whatsapp"
                title="Agendar directamente por WhatsApp"
              >
                Reservar
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Eventos para botones "+ Plan"
  document.querySelectorAll('.btn-add-plan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      toggleServiceInCart(id);
    });
  });
}

// Renderizar Preguntas Frecuentes
function renderFaqs() {
  if (!faqsContainer) return;

  faqsContainer.innerHTML = faqsData.map((faq, index) => {
    const isOpen = index === 0;
    return `
      <div class="faq-item ${isOpen ? 'open' : ''}">
        <button class="faq-question" aria-expanded="${isOpen}">
          <span>${faq.question}</span>
          <svg class="faq-icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer">
          ${faq.answer}
        </div>
      </div>
    `;
  }).join('');

  setupFAQAccordion();
}

// Actualizar datos del negocio en la interfaz
function updateBusinessInfo() {
  // Enlaces de WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    const originalHref = a.getAttribute('href');
    if (originalHref.includes('?text=')) {
      const query = originalHref.split('?text=')[1];
      a.href = `${spaInfo.whatsappUrl}?text=${query}`;
    } else {
      a.href = spaInfo.whatsappUrl;
    }
  });

  // Enlaces de Instagram
  document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
    a.href = spaInfo.instagramUrl;
    if (a.textContent.includes('@')) {
      a.textContent = spaInfo.instagramHandle;
    }
  });
}

// Carrito / Plan de bienestar
function toggleServiceInCart(serviceId) {
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) return;

  const existingIndex = state.cart.findIndex(item => item.id === serviceId);
  if (existingIndex > -1) {
    state.cart.splice(existingIndex, 1);
  } else {
    state.cart.push({
      id: service.id,
      name: service.name,
      price: service.price,
      priceFormatted: service.priceFormatted,
      duration: service.duration,
      category: service.categoryName
    });
  }

  localStorage.setItem('ikigai_cart', JSON.stringify(state.cart));
  updateCartUI();
  renderServices();
}

function updateCartUI() {
  const count = state.cart.length;
  cartCountElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const formattedSubtotal = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(subtotal);
  
  if (cartSubtotalElement) {
    cartSubtotalElement.textContent = formattedSubtotal;
  }

  if (cartItemsContainer) {
    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🌸</div>
          <h4>Tu plan de bienestar está vacío</h4>
          <p style="font-size: 0.88rem; margin-top: 0.25rem;">Agrega tratamientos desde el catálogo para cotizar o agendar tu sesión combinada.</p>
        </div>
      `;
      if (btnCheckoutWhatsapp) btnCheckoutWhatsapp.disabled = true;
    } else {
      if (btnCheckoutWhatsapp) btnCheckoutWhatsapp.disabled = false;
      cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>${item.duration} • ${item.category}</span>
          </div>
          <div class="cart-item-price-remove">
            <div class="cart-item-price">${item.priceFormatted}</div>
            <button class="btn-remove-item" data-id="${item.id}">Quitar</button>
          </div>
        </div>
      `).join('');

      cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          toggleServiceInCart(id);
        });
      });
    }
  }

  // Actualizar enlace de WhatsApp con el desglose completo
  if (btnCheckoutWhatsapp && state.cart.length > 0) {
    let msg = `Hola Spa IKIGAI, deseo coordinar una cita para los siguientes servicios:\n\n`;
    state.cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.duration}) - ${item.priceFormatted}\n`;
    });
    msg += `\n*Total estimado:* ${formattedSubtotal}\nUbicación: ${spaInfo.addressShort || 'Cecilia Videla 755, Ovalle'}.\n¿Qué disponibilidad tienen para agendar?`;
    
    btnCheckoutWhatsapp.href = `${spaInfo.whatsappUrl}?text=${encodeURIComponent(msg)}`;
  }
}

// Configurar Event Listeners generales
function setupEventListeners() {
  // Pestañas de filtrado
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.activeCategory = e.currentTarget.dataset.category;
      renderServices();
    });
  });

  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderServices();
    });
  }

  // Drawer de Carrito
  if (btnOpenCart) {
    btnOpenCart.addEventListener('click', () => {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Menú móvil
  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenuDrawer.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Header con sombra al hacer scroll
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

// Generador en Vivo de Gift Card
function setupGiftCardPreview() {
  const recipientInput = document.getElementById('gift-recipient-name');
  const senderInput = document.getElementById('gift-sender-name');
  const serviceSelect = document.getElementById('gift-service-select');
  const messageInput = document.getElementById('gift-message-text');
  const btnGiftWhatsapp = document.getElementById('btn-gift-whatsapp');

  const previewRecipient = document.getElementById('card-preview-recipient');
  const previewSender = document.getElementById('card-preview-sender');
  const previewService = document.getElementById('card-preview-service');
  const previewMessage = document.getElementById('card-preview-message');

  function updateGiftCard() {
    const to = recipientInput ? recipientInput.value.trim() || 'Un ser especial' : 'Un ser especial';
    const from = senderInput ? senderInput.value.trim() || 'Quien te aprecia' : 'Quien te aprecia';
    const service = serviceSelect ? serviceSelect.value : 'Experiencia de Bienestar IKIGAI ($40.000)';
    const note = messageInput ? messageInput.value.trim() || '“Un momento de relajación y desconexión pensado especialmente para ti.”' : '';

    if (previewRecipient) previewRecipient.textContent = to;
    if (previewSender) previewSender.textContent = from;
    if (previewService) previewService.textContent = service;
    if (previewMessage) previewMessage.textContent = note;

    if (btnGiftWhatsapp) {
      const giftMsg = encodeURIComponent(
        `Hola Spa IKIGAI, quiero solicitar una Gift Card Virtual con los siguientes datos:\n\n` +
        `• *Para:* ${to}\n` +
        `• *De:* ${from}\n` +
        `• *Tratamiento / Monto:* ${service}\n` +
        `• *Dedicatoria:* ${note}\n\n` +
        `¿Cómo procedemos con el pago y la emisión digital? Muchas gracias.`
      );
      btnGiftWhatsapp.href = `${spaInfo.whatsappUrl}?text=${giftMsg}`;
    }
  }

  if (recipientInput) recipientInput.addEventListener('input', updateGiftCard);
  if (senderInput) senderInput.addEventListener('input', updateGiftCard);
  if (serviceSelect) serviceSelect.addEventListener('change', updateGiftCard);
  if (messageInput) messageInput.addEventListener('input', updateGiftCard);

  updateGiftCard();
}

// Acordeón de FAQ
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      // Remover listeners duplicados
      const newBtn = questionBtn.cloneNode(true);
      questionBtn.parentNode.replaceChild(newBtn, questionBtn);

      newBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

// Verificar si está abierto según el horario de Ovalle (Lunes a Sábado de 9:00 a 19:00)
function checkBusinessStatus() {
  const statusBadge = document.getElementById('business-status-badge');
  if (!statusBadge) return;

  const now = new Date();
  // Hora de Chile (America/Santiago)
  const chileOptions = { timeZone: 'America/Santiago', hour12: false, weekday: 'short', hour: 'numeric', minute: 'numeric' };
  const formatter = new Intl.DateTimeFormat('es-CL', chileOptions);
  const parts = formatter.formatToParts(now);
  
  let hour = 12;
  parts.forEach(p => {
    if (p.type === 'hour') hour = parseInt(p.value, 10);
  });
  
  const day = now.getDay(); // 0 es Domingo, 1 a 6 es Lunes a Sábado
  const isOpen = (day >= 1 && day <= 6) && (hour >= 9 && hour < 19);

  if (isOpen) {
    statusBadge.innerHTML = `
      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:#25D366; margin-right:4px;"></span>
      Abierto ahora (09:00 - 19:00 hrs)
    `;
    statusBadge.style.color = '#1D7847';
  } else {
    statusBadge.innerHTML = `
      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:#C2934A; margin-right:4px;"></span>
      Horario: Lunes a Sábado 09:00 - 19:00 hrs
    `;
  }
}
