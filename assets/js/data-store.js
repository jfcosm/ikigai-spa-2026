// Gestor de persistencia de datos (Local Store con sincronización)
import { servicesData as defaultServices, spaInfo as defaultInfo, defaultFaqs } from './services-data.js';

const STORAGE_KEYS = {
  SERVICES: 'ikigai_services',
  SPA_INFO: 'ikigai_info',
  FAQS: 'ikigai_faqs'
};

export function getServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error al cargar servicios desde localStorage:', err);
  }
  return JSON.parse(JSON.stringify(defaultServices));
}

export function saveServices(services) {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  broadcastChange('services', services);
}

export function getSpaInfo() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SPA_INFO);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error al cargar información del spa desde localStorage:', err);
  }
  return JSON.parse(JSON.stringify(defaultInfo));
}

export function saveSpaInfo(info) {
  localStorage.setItem(STORAGE_KEYS.SPA_INFO, JSON.stringify(info));
  broadcastChange('info', info);
}

export function getFaqs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAQS);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error al cargar FAQs desde localStorage:', err);
  }
  return JSON.parse(JSON.stringify(defaultFaqs || []));
}

export function saveFaqs(faqs) {
  localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  broadcastChange('faqs', faqs);
}

export function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.SERVICES);
  localStorage.removeItem(STORAGE_KEYS.SPA_INFO);
  localStorage.removeItem(STORAGE_KEYS.FAQS);
  broadcastChange('reset', null);
}

export function exportAllDataJSON() {
  const data = {
    services: getServices(),
    spaInfo: getSpaInfo(),
    faqs: getFaqs(),
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  return JSON.stringify(data, null, 2);
}

export function importDataJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (data.services && Array.isArray(data.services)) {
      saveServices(data.services);
    }
    if (data.spaInfo && typeof data.spaInfo === 'object') {
      saveSpaInfo(data.spaInfo);
    }
    if (data.faqs && Array.isArray(data.faqs)) {
      saveFaqs(data.faqs);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Genera el código JavaScript que se puede copiar directamente en `services-data.js`
export function generateServicesDataJSCode() {
  const services = getServices();
  const info = getSpaInfo();
  const faqs = getFaqs();

  return `// Catálogo oficial de servicios, tratamientos y precios de Spa IKIGAI (Ovalle)
// Generado automáticamente desde el Panel de Administración

export const servicesData = ${JSON.stringify(services, null, 2)};

// Datos del Negocio
export const spaInfo = ${JSON.stringify(info, null, 2)};

// Preguntas Frecuentes
export const defaultFaqs = ${JSON.stringify(faqs, null, 2)};
`;
}

function broadcastChange(type, payload) {
  window.dispatchEvent(new CustomEvent('ikigai-store-change', { detail: { type, payload } }));
}
