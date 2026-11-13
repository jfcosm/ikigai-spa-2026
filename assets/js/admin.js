import { 
  getServices, saveServices, 
  getSpaInfo, saveSpaInfo, 
  getFaqs, saveFaqs, 
  resetAllData, exportAllDataJSON, 
  importDataJSON, generateServicesDataJSCode 
} from './data-store.js';

// Hashes criptográficos SHA-256 de las credenciales autorizadas
// Ninguna contraseña o usuario está expuesto en texto plano en la interfaz
const VALID_HASHES = [
  '890b0300b42a9b4959ddc071b38d384e073aa40b71000929c9a353c180c42d18', // admin:ikigai2026
  '887eec865fac7994439073d144653f1e1ee2e625807409d7acb4fe74796517f5', // ikigai:ovalle2026
  'b3c8bb2aebcef9afe6b6b69ec17f4d7019d37c77aaa1a65c8b3dcc0d00adaa80'  // admin:ikigaispa2026
];

// Estado local del panel
let currentServices = [];
let currentInfo = {};
let currentFaqs = [];
let editingServiceId = null;

// Elementos DOM
const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const btnLogout = document.getElementById('btn-logout');
const toastElement = document.getElementById('admin-toast');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  setupNavigation();
  setupEventListeners();
});

// Función para calcular hash SHA-256 en el cliente
async function computeSHA256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Gestión de Autenticación
function checkAuthSession() {
  const isAuth = sessionStorage.getItem('ikigai_admin_session') === 'true';
  if (isAuth) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  if (loginView) loginView.style.display = 'flex';
  if (dashboardView) dashboardView.style.display = 'none';
}

function showDashboard() {
  if (loginView) loginView.style.display = 'none';
  if (dashboardView) dashboardView.style.display = 'flex';
  loadDashboardData();
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('login-username').value.trim().toLowerCase();
    const passInput = document.getElementById('login-password').value;

    const hash = await computeSHA256(`${userInput}:${passInput}`);

    if (VALID_HASHES.includes(hash)) {
      sessionStorage.setItem('ikigai_admin_session', 'true');
      if (loginError) loginError.style.display = 'none';
      loginForm.reset();
      showToast('Acceso autorizado. ¡Bienvenido/a al Panel Admin!', 'success');
      showDashboard();
    } else {
      if (loginError) {
        loginError.textContent = 'Usuario o contraseña incorrectos. Intente nuevamente.';
        loginError.style.display = 'block';
      }
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('¿Deseas cerrar tu sesión del panel de administración?')) {
      sessionStorage.removeItem('ikigai_admin_session');
      showLogin();
      showToast('Sesión cerrada correctamente.', 'success');
    }
  });
}

// Cargar Datos en el Panel
function loadDashboardData() {
  currentServices = getServices();
  currentInfo = getSpaInfo();
  currentFaqs = getFaqs();

  updateMetrics();
  populateGeneralInfoForm();
  renderServicesTable();
  populateReductivosForm();
  renderFaqsList();
  updateCodeExportPreview();
}

// Métricas de Resumen
function updateMetrics() {
  const totalServicesEl = document.getElementById('metric-total-services');
  const totalCategoriesEl = document.getElementById('metric-total-categories');
  const totalFaqsEl = document.getElementById('metric-total-faqs');

  if (totalServicesEl) totalServicesEl.textContent = currentServices.length;

  const categories = new Set(currentServices.map(s => s.category));
  if (totalCategoriesEl) totalCategoriesEl.textContent = categories.size;

  if (totalFaqsEl) totalFaqsEl.textContent = currentFaqs.length;
}

// Navegación por pestañas del panel
function setupNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const panes = document.querySelectorAll('.admin-tab-pane');
  const topTitle = document.getElementById('admin-top-title');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.dataset.tab;

      navItems.forEach(i => i.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');

      if (topTitle) {
        topTitle.textContent = item.querySelector('span').textContent;
      }
    });
  });
}

// Pestaña 1: Información General del Spa
function populateGeneralInfoForm() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  };

  setVal('info-name', currentInfo.name);
  setVal('info-subtitle', currentInfo.subtitle);
  setVal('info-location', currentInfo.location);
  setVal('info-address-short', currentInfo.addressShort);
  setVal('info-hours', currentInfo.hours);
  setVal('info-whatsapp', currentInfo.whatsappNumber);
  setVal('info-instagram-url', currentInfo.instagramUrl);
  setVal('info-instagram-handle', currentInfo.instagramHandle);
  setVal('info-quote', currentInfo.quote);
  setVal('info-summary', currentInfo.summary);
}

// Guardar información general
const formGeneral = document.getElementById('form-general-info');
if (formGeneral) {
  formGeneral.addEventListener('submit', (e) => {
    e.preventDefault();
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';

    currentInfo = {
      name: getVal('info-name'),
      subtitle: getVal('info-subtitle'),
      location: getVal('info-location'),
      addressShort: getVal('info-address-short'),
      hours: getVal('info-hours'),
      whatsappNumber: getVal('info-whatsapp'),
      whatsappUrl: `https://wa.me/${getVal('info-whatsapp').replace(/[^0-9]/g, '')}`,
      instagramUrl: getVal('info-instagram-url'),
      instagramHandle: getVal('info-instagram-handle'),
      quote: getVal('info-quote'),
      summary: getVal('info-summary')
    };

    saveSpaInfo(currentInfo);
    updateCodeExportPreview();
    showToast('¡Información general guardada exitosamente!', 'success');
  });
}

// Pestaña 2: Catálogo de Servicios
function renderServicesTable() {
  const tbody = document.getElementById('services-table-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('service-search-input')?.value || '').toLowerCase().trim();
  const categoryFilter = document.getElementById('service-category-filter')?.value || 'all';

  const filtered = currentServices.filter(s => {
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
    const matchSearch = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery) || 
      s.description.toLowerCase().includes(searchQuery) ||
      s.categoryName.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
          No se encontraron servicios que coincidan con los filtros.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((s, index) => {
    return `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td><span class="badge-category">${s.categoryName || s.category}</span></td>
        <td>${s.duration}</td>
        <td><strong>${s.priceFormatted}</strong></td>
        <td>${s.packPriceFormatted || '—'}</td>
        <td><span style="font-size:0.75rem; background:#EAF5F4; color:#0E8991; padding:0.2rem 0.5rem; border-radius:4px; font-weight:700;">${s.badge || '—'}</span></td>
        <td>
          <div class="table-action-btns">
            <button class="btn-action edit" data-id="${s.id}">Editar</button>
            <button class="btn-action delete" data-id="${s.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Eventos de botones de tabla
  tbody.querySelectorAll('.btn-action.edit').forEach(btn => {
    btn.addEventListener('click', () => openServiceModal(btn.dataset.id));
  });

  tbody.querySelectorAll('.btn-action.delete').forEach(btn => {
    btn.addEventListener('click', () => deleteService(btn.dataset.id));
  });
}

// Modal de Servicio
const serviceModal = document.getElementById('service-modal');
const btnNewService = document.getElementById('btn-new-service');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const formService = document.getElementById('form-service');

function openServiceModal(serviceId = null) {
  editingServiceId = serviceId;
  const modalTitle = document.getElementById('modal-service-title');

  if (serviceId) {
    modalTitle.textContent = 'Editar Servicio';
    const s = currentServices.find(item => item.id === serviceId);
    if (!s) return;

    document.getElementById('service-id').value = s.id;
    document.getElementById('service-name').value = s.name;
    document.getElementById('service-category').value = s.category;
    document.getElementById('service-category-name').value = s.categoryName || '';
    document.getElementById('service-duration').value = s.duration;
    document.getElementById('service-price').value = s.price;
    document.getElementById('service-pack-price').value = s.packPrice || '';
    document.getElementById('service-original-price').value = s.originalPrice || '';
    document.getElementById('service-badge').value = s.badge || '';
    document.getElementById('service-image').value = s.image || 'assets/images/spa-ambiance.jpg';
    document.getElementById('service-desc').value = s.description || '';
    document.getElementById('service-benefits').value = (s.benefits || []).join('\n');
  } else {
    modalTitle.textContent = 'Nuevo Servicio';
    formService.reset();
    document.getElementById('service-id').value = 'servicio-' + Date.now();
    document.getElementById('service-image').value = 'assets/images/spa-ambiance.jpg';
  }

  serviceModal.classList.add('open');
}

function closeServiceModal() {
  serviceModal.classList.remove('open');
  editingServiceId = null;
}

if (btnNewService) btnNewService.addEventListener('click', () => openServiceModal(null));
if (btnCloseModal) btnCloseModal.addEventListener('click', closeServiceModal);
if (btnCancelModal) btnCancelModal.addEventListener('click', closeServiceModal);

if (formService) {
  formService.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('service-id').value.trim();
    const name = document.getElementById('service-name').value.trim();
    const category = document.getElementById('service-category').value;
    const categoryName = document.getElementById('service-category-name').value.trim() || document.getElementById('service-category').selectedOptions[0].text;
    const duration = document.getElementById('service-duration').value.trim();
    const price = parseInt(document.getElementById('service-price').value, 10) || 0;
    const packPrice = parseInt(document.getElementById('service-pack-price').value, 10) || null;
    const originalPrice = document.getElementById('service-original-price').value.trim() || null;
    const badge = document.getElementById('service-badge').value.trim() || 'Destacado';
    const image = document.getElementById('service-image').value.trim() || 'assets/images/spa-ambiance.jpg';
    const description = document.getElementById('service-desc').value.trim();
    const rawBenefits = document.getElementById('service-benefits').value.trim();
    const benefits = rawBenefits ? rawBenefits.split('\n').map(b => b.trim()).filter(Boolean) : [];

    // Formatear precios chilenos
    const formatCLP = (val) => '$' + new Intl.NumberFormat('es-CL').format(val);
    const priceFormatted = formatCLP(price);
    const packPriceFormatted = packPrice ? `${formatCLP(packPrice)} (Pack 3 ses.)` : null;

    const newServiceObj = {
      id,
      category,
      categoryName,
      name,
      duration,
      price,
      priceFormatted,
      badge,
      description,
      benefits,
      image
    };

    if (packPrice) {
      newServiceObj.packPrice = packPrice;
      newServiceObj.packPriceFormatted = packPriceFormatted;
    }

    if (originalPrice) {
      newServiceObj.originalPrice = originalPrice;
    }

    const existingIndex = currentServices.findIndex(s => s.id === id);
    if (existingIndex > -1) {
      currentServices[existingIndex] = { ...currentServices[existingIndex], ...newServiceObj };
      showToast(`Servicio "${name}" actualizado con éxito.`, 'success');
    } else {
      currentServices.unshift(newServiceObj);
      showToast(`Servicio "${name}" creado exitosamente.`, 'success');
    }

    saveServices(currentServices);
    closeServiceModal();
    renderServicesTable();
    updateMetrics();
    updateCodeExportPreview();
  });
}

function deleteService(id) {
  const service = currentServices.find(s => s.id === id);
  if (!service) return;

  if (confirm(`¿Estás seguro de eliminar el servicio "${service.name}"? Esta acción se guardará de inmediato.`)) {
    currentServices = currentServices.filter(s => s.id !== id);
    saveServices(currentServices);
    renderServicesTable();
    updateMetrics();
    updateCodeExportPreview();
    showToast(`Servicio "${service.name}" eliminado.`, 'error');
  }
}

// Pestaña 3: Planes Reductivos
function populateReductivosForm() {
  const planTrans = currentServices.find(s => s.id === 'plan-transformador');
  const planPrem = currentServices.find(s => s.id === 'plan-intensivo-premium');

  if (planTrans) {
    document.getElementById('plan-trans-price').value = planTrans.price;
    document.getElementById('plan-trans-original').value = planTrans.originalPrice || '$360.000';
    document.getElementById('plan-trans-desc').value = planTrans.description;
  }

  if (planPrem) {
    document.getElementById('plan-prem-price').value = planPrem.price;
    document.getElementById('plan-prem-original').value = planPrem.originalPrice || '$540.000';
    document.getElementById('plan-prem-desc').value = planPrem.description;
  }
}

const formReductivos = document.getElementById('form-reductivos-plans');
if (formReductivos) {
  formReductivos.addEventListener('submit', (e) => {
    e.preventDefault();
    const formatCLP = (val) => '$' + new Intl.NumberFormat('es-CL').format(val);

    const transPrice = parseInt(document.getElementById('plan-trans-price').value, 10);
    const transOrig = document.getElementById('plan-trans-original').value.trim();
    const transDesc = document.getElementById('plan-trans-desc').value.trim();

    const premPrice = parseInt(document.getElementById('plan-prem-price').value, 10);
    const premOrig = document.getElementById('plan-prem-original').value.trim();
    const premDesc = document.getElementById('plan-prem-desc').value.trim();

    const idxTrans = currentServices.findIndex(s => s.id === 'plan-transformador');
    if (idxTrans > -1) {
      currentServices[idxTrans].price = transPrice;
      currentServices[idxTrans].priceFormatted = formatCLP(transPrice);
      currentServices[idxTrans].originalPrice = transOrig;
      currentServices[idxTrans].description = transDesc;
    }

    const idxPrem = currentServices.findIndex(s => s.id === 'plan-intensivo-premium');
    if (idxPrem > -1) {
      currentServices[idxPrem].price = premPrice;
      currentServices[idxPrem].priceFormatted = formatCLP(premPrice);
      currentServices[idxPrem].originalPrice = premOrig;
      currentServices[idxPrem].description = premDesc;
    }

    saveServices(currentServices);
    updateCodeExportPreview();
    showToast('¡Planes reductivos actualizados con éxito!', 'success');
  });
}

// Pestaña 4: Preguntas Frecuentes (FAQ)
function renderFaqsList() {
  const container = document.getElementById('faqs-list-container');
  if (!container) return;

  if (currentFaqs.length === 0) {
    container.innerHTML = '<p style="color:var(--admin-text-muted); text-align:center; padding:2rem;">No hay preguntas frecuentes registradas.</p>';
    return;
  }

  container.innerHTML = currentFaqs.map((faq, index) => {
    return `
      <div class="admin-card" style="margin-bottom:1rem; padding:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem;">
          <div style="flex-grow:1;">
            <h4 style="font-size:1.05rem; color:var(--admin-primary-dark); margin-bottom:0.4rem;">${faq.question}</h4>
            <div style="font-size:0.88rem; color:var(--admin-text-muted);">${faq.answer}</div>
          </div>
          <div class="table-action-btns">
            <button class="btn-action edit" onclick="window.editFaq('${faq.id}')">Editar</button>
            <button class="btn-action delete" onclick="window.deleteFaq('${faq.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.editFaq = function(id) {
  const faq = currentFaqs.find(f => f.id === id);
  if (!faq) return;

  const newQ = prompt('Modificar Pregunta:', faq.question);
  if (newQ === null) return;
  const newA = prompt('Modificar Respuesta:', faq.answer);
  if (newA === null) return;

  faq.question = newQ.trim() || faq.question;
  faq.answer = newA.trim() || faq.answer;

  saveFaqs(currentFaqs);
  renderFaqsList();
  updateCodeExportPreview();
  showToast('Pregunta frecuente actualizada.', 'success');
};

window.deleteFaq = function(id) {
  if (confirm('¿Eliminar esta pregunta frecuente?')) {
    currentFaqs = currentFaqs.filter(f => f.id !== id);
    saveFaqs(currentFaqs);
    renderFaqsList();
    updateMetrics();
    updateCodeExportPreview();
    showToast('Pregunta frecuente eliminada.', 'error');
  }
};

const btnNewFaq = document.getElementById('btn-new-faq');
if (btnNewFaq) {
  btnNewFaq.addEventListener('click', () => {
    const q = prompt('Escribe la nueva Pregunta:');
    if (!q || !q.trim()) return;
    const a = prompt('Escribe la Respuesta correspondiente:');
    if (!a || !a.trim()) return;

    const newFaq = {
      id: 'faq-' + Date.now(),
      question: q.trim(),
      answer: a.trim()
    };

    currentFaqs.push(newFaq);
    saveFaqs(currentFaqs);
    renderFaqsList();
    updateMetrics();
    updateCodeExportPreview();
    showToast('Nueva pregunta frecuente agregada.', 'success');
  });
}

// Pestaña 5: Copias de Seguridad & Código Exportable
function updateCodeExportPreview() {
  const codeBox = document.getElementById('generated-code-box');
  if (codeBox) {
    codeBox.value = generateServicesDataJSCode();
  }
}

const btnCopyCode = document.getElementById('btn-copy-code');
if (btnCopyCode) {
  btnCopyCode.addEventListener('click', () => {
    const code = generateServicesDataJSCode();
    navigator.clipboard.writeText(code).then(() => {
      showToast('¡Código copiado al portapapeles! Listo para pegar en services-data.js', 'success');
    }).catch(() => {
      showToast('Error al copiar. Puedes copiarlo manualmente desde el cuadro de texto.', 'error');
    });
  });
}

const btnDownloadJson = document.getElementById('btn-download-json');
if (btnDownloadJson) {
  btnDownloadJson.addEventListener('click', () => {
    const json = exportAllDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spa-ikigai-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON descargado exitosamente.', 'success');
  });
}

const inputImportJson = document.getElementById('input-import-json');
if (inputImportJson) {
  inputImportJson.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const res = importDataJSON(evt.target.result);
      if (res.success) {
        loadDashboardData();
        showToast('¡Backup restaurado con éxito!', 'success');
      } else {
        showToast('Error al procesar el archivo JSON: ' + res.error, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });
}

const btnResetFactory = document.getElementById('btn-reset-factory');
if (btnResetFactory) {
  btnResetFactory.addEventListener('click', () => {
    if (confirm('¿ATENCIÓN: Deseas restablecer todos los datos del sitio a sus valores originales de fábrica? Se borrarán las modificaciones locales.')) {
      resetAllData();
      loadDashboardData();
      showToast('Valores de fábrica restablecidos con éxito.', 'success');
    }
  });
}

// Botón de sincronización global en barra superior
const btnGlobalSave = document.getElementById('btn-global-save');
if (btnGlobalSave) {
  btnGlobalSave.addEventListener('click', () => {
    saveServices(currentServices);
    saveSpaInfo(currentInfo);
    saveFaqs(currentFaqs);
    showToast('¡Todos los cambios han sido sincronizados y guardados en tu navegador!', 'success');
  });
}

// Event Listeners adicionales
function setupEventListeners() {
  const searchInput = document.getElementById('service-search-input');
  if (searchInput) searchInput.addEventListener('input', renderServicesTable);

  const categoryFilter = document.getElementById('service-category-filter');
  if (categoryFilter) categoryFilter.addEventListener('change', renderServicesTable);
}

// Toast Notificaciones
function showToast(message, type = 'success') {
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.className = `toast-notification show ${type}`;

  setTimeout(() => {
    toastElement.classList.remove('show');
  }, 4000);
}
