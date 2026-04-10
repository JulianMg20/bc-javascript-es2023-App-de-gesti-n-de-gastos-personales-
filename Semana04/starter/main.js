// PUNTO DE ENTRADA - MAIN.JS


import { APP_CONFIG } from './config.js';
import { renderCategories, renderItems } from './ui/index.js';
import { initForm, initFilters, initModal } from './ui/index.js';
import { getAllItems } from './services/index.js';

// Inicializa la aplicación
const initApp = async () => {
  console.log(`🚀 ${APP_CONFIG.APP_NAME} iniciado`);

  // Renderiza categorías y gastos
  renderCategories();
  renderItems();

  // Inicializa eventos
  initForm();
  initFilters();
  initModal();

  // Dynamic Import → carga reportes solo cuando se necesita
  const loadReportsBtn = document.getElementById('load-reports');
  
  loadReportsBtn.addEventListener('click', async () => {
    try {
      loadReportsBtn.textContent = '⏳ Cargando...';
      loadReportsBtn.disabled = true;

      // Importación dinámica → solo carga cuando el usuario hace clic
      const { generateReport } = await import('../starter/features/reports.js');
      
      const items = getAllItems();
      const { total, average, max, byCategory, lowStock, totalItems } = 
        generateReport(items);

      // Muestra el reporte en pantalla
      document.getElementById('reports-container').innerHTML = `
        <div class="report-card success">
          <h4>💰 Total Gastado</h4>
          <div class="value">$${total.toLocaleString()}</div>
        </div>
        <div class="report-card info">
          <h4>📊 Promedio por Gasto</h4>
          <div class="value">$${Math.round(average).toLocaleString()}</div>
        </div>
        <div class="report-card warning">
          <h4>📈 Gasto más Alto</h4>
          <div class="value">${max?.name || 'N/A'}</div>
        </div>
        <div class="report-card ${lowStock.length > 0 ? 'danger' : 'success'}">
          <h4>⚠️ Gastos Bajos</h4>
          <div class="value">${lowStock.length}</div>
        </div>
        <div class="report-card">
          <h4>🔢 Total Registros</h4>
          <div class="value">${totalItems}</div>
        </div>
      `;

      loadReportsBtn.textContent = '🔄 Actualizar';
      loadReportsBtn.disabled = false;

    } catch (error) {
      console.error('Error cargando reportes:', error);
      loadReportsBtn.textContent = '❌ Error';
      loadReportsBtn.disabled = false;
    }
  });
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);