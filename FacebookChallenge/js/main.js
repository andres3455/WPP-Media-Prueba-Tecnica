document.addEventListener("DOMContentLoaded", () => {

  // Referencias del DOM
  const banner = document.getElementById('banner');
  const video = document.getElementById('video');
  const likeBtn = document.querySelector(".video-actions button:nth-child(1)");
  const commentBtn = document.querySelector(".video-actions button:nth-child(2)");
  const shareBtn = document.querySelector(".video-actions button:nth-child(3)");

  // Contadores en el dashboard
  const dashboardElements = {
    playCount: document.getElementById("playCount"),
    pauseCount: document.getElementById("pauseCount"),
    muteCount: document.getElementById("muteCount"),
    endedCount: document.getElementById("endedCount"),
    likeClicks: document.getElementById("likeClicks"),
    commentClicks: document.getElementById("commentClicks"),
    shareClicks: document.getElementById("shareClicks"),
    interacted: document.getElementById("interacted") // Nueva métrica
  };

  // URL de destino
  const targetURL = "https://www.facebook.com/watch/?v=26020679024184745&rdid=7WfetZLVIRqwq7VJ";

  // Interacciones
  const metrics = {
    playCount: 0,
    pauseCount: 0,
    muteCount: 0,
    volumeChangeCount: 0,
    endedCount: 0,
    likeClicks: 0,
    commentClicks: 0,
    shareClicks: 0,
    interacted: false // Nueva métrica de interacción
  };

  // Función para actualizar dashboard
  function updateDashboard() {
    for (const key in dashboardElements) {
      if (dashboardElements[key]) {
        if (key === "interacted") {
          dashboardElements[key].innerText = metrics.interacted ? "Sí" : "No";
        } else {
          dashboardElements[key].innerText = metrics[key];
        }
      }
    }
  }

  // Función para marcar interacción única
  function markInteracted() {
    if (!metrics.interacted) {
      metrics.interacted = true;
      updateDashboard();
      reportMetrics();
    }
  }

  // Función para enviar métricas al servidor
  function reportMetrics() {
    fetch("/api/metrics", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    }).catch(err => console.warn('Error enviando métricas:', err));
  }

  // ===================
  // Redirección al clic en banner
  // ===================
  banner.addEventListener('click', (event) => {
    if (!['BUTTON', 'VIDEO', 'INPUT', 'A'].includes(event.target.tagName)) {
      window.open(targetURL, '_blank');
    }
  });

  // ===================
  // Eventos del video
  // ===================
  video.addEventListener('play', () => { 
    metrics.playCount++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });
  
  video.addEventListener('pause', () => { 
    metrics.pauseCount++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });
  
  video.addEventListener('volumechange', () => {
    if (video.muted || video.volume === 0) metrics.muteCount++;
    else metrics.volumeChangeCount++;
    markInteracted();
    updateDashboard();
    reportMetrics();
  });
  
  video.addEventListener('ended', () => { 
    metrics.endedCount++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });

  // ===================
  // Botones de acción
  // ===================
  likeBtn.addEventListener('click', () => { 
    metrics.likeClicks++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });

  commentBtn.addEventListener('click', () => { 
    metrics.commentClicks++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });

  shareBtn.addEventListener('click', () => { 
    metrics.shareClicks++; 
    markInteracted(); 
    updateDashboard(); 
    reportMetrics(); 
  });

});
