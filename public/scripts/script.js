/* =========================
   FEATURED ALBUMS CAROUSEL
   ========================= */

   const featuredTrack = document.querySelector('.featured-track');
   const featuredLeft  = document.querySelector('.featured-left');
   const featuredRight = document.querySelector('.featured-right');
   
   function getCardStep() {
     if (!featuredTrack) return 250;
     const card = featuredTrack.querySelector('.album');
     const styles = getComputedStyle(featuredTrack);
     const gap = parseInt(styles.columnGap || styles.gap || 0, 10);
     const w = card ? card.getBoundingClientRect().width : 250;
     return w + gap;
   }
   
   function updateCarouselArrows() {
     if (!featuredTrack || !featuredLeft || !featuredRight) return;
     const max = featuredTrack.scrollWidth - featuredTrack.clientWidth - 1;
     featuredLeft.disabled = featuredTrack.scrollLeft <= 0;
     featuredRight.disabled = featuredTrack.scrollLeft >= max;
   }
   
   if (featuredTrack && featuredLeft && featuredRight) {
     featuredRight.addEventListener('click', function () {
       featuredTrack.scrollBy({ left: getCardStep(), behavior: 'smooth' });
     });
     featuredLeft.addEventListener('click', function () {
       featuredTrack.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
     });
     featuredTrack.addEventListener('scroll', updateCarouselArrows);
     window.addEventListener('resize', updateCarouselArrows);
     updateCarouselArrows();
   }
   
   /* =========================
      DEEZER 30s PREVIEW LOOKUP
      ========================= */
   
   function dzPreview(query) {
     return new Promise(function (resolve) {
       const cb = 'dzcb_' + Math.random().toString(36).slice(2);
       window[cb] = function (json) {
         try {
           const url = json && json.data && json.data[0] && json.data[0].preview ? json.data[0].preview : null;
           resolve(url);
         } finally {
           delete window[cb];
           scr.remove();
         }
       };
       const scr = document.createElement('script');
       scr.src = 'https://api.deezer.com/search?q=' + encodeURIComponent(query) + '&limit=1&output=jsonp&callback=' + cb;
       scr.onerror = function () {
         delete window[cb];
         resolve(null);
       };
       document.body.appendChild(scr);
     });
   }
   
   /* =========================
      MINI PLAYER (ONE <audio>)
      ========================= */
   
   const player = document.getElementById('song-player');
   const rows   = document.querySelectorAll('.song-row');
   
   let currentRow = null;
   
   function fmt(sec) {
     if (isNaN(sec)) return '–:–';
     const m = Math.floor(sec / 60);
     const s = Math.floor(sec % 60).toString().padStart(2, '0');
     return m + ':' + s;
   }
   
   function wireRow(row) {
     const btn  = row.querySelector('.song-btn');
     const time = row.querySelector('.song-time');
     const bar  = row.querySelector('.song-bar span');
   
     if (!btn || !time || !bar) return;
   
     // enable if we already have a src
     if (row.dataset.src) {
       btn.disabled = false;
       time.textContent = '0:30'; // previews are ~30s
     }
   
     btn.addEventListener('click', function () {
       const src = row.dataset.src || '';
       if (!src) return;
   
       // new row selected
       if (currentRow !== row) {
         if (currentRow) {
           const pbtn = currentRow.querySelector('.song-btn');
           const pbar = currentRow.querySelector('.song-bar span');
           if (pbtn) pbtn.textContent = '►';
           if (pbar) pbar.style.width = '0%';
         }
         currentRow = row;
         player.src = src;
         player.currentTime = 0;
         player.play();
         btn.textContent = '❚❚';
         return;
       }
   
       // toggle play/pause on same row
       if (player.paused) {
         player.play();
         btn.textContent = '❚❚';
       } else {
         player.pause();
         btn.textContent = '►';
       }
     });
   
     // update progress while this row is current
     player.addEventListener('timeupdate', function () {
       if (currentRow !== row) return;
       const dur = player.duration || 1;
       const pct = (player.currentTime / dur) * 100;
       bar.style.width = pct + '%';
       time.textContent = fmt(dur - player.currentTime);
     });
   
     player.addEventListener('ended', function () {
       if (!currentRow) return;
       const cbtn = currentRow.querySelector('.song-btn');
       const cbar = currentRow.querySelector('.song-bar span');
       if (cbtn) cbtn.textContent = '►';
       if (cbar) cbar.style.width = '0%';
     });
   }
   
   /* =========================================
      INIT: fetch previews, then wire the rows
      ========================================= */
   
   (async function initSongs() {
     if (!rows || rows.length === 0 || !player) return;
   
     // first: try to fetch preview URLs for rows that have data-query
     for (const row of rows) {
       const btn  = row.querySelector('.song-btn');
       const time = row.querySelector('.song-time');
   
       if (btn) btn.disabled = true;
   
       // if row already has data-src (local mp3), keep it
       if (row.dataset.src) {
         if (time) time.textContent = '0:30';
         if (btn) btn.disabled = false;
         continue;
       }
   
       const q = row.getAttribute('data-query');
       if (!q) {
         if (btn) btn.disabled = true;
         continue;
       }
   
       const url = await dzPreview(q);
       if (url) {
         row.dataset.src = url;
         if (time) time.textContent = '0:30';
         if (btn) btn.disabled = false;
       } else {
         if (time) time.textContent = 'N/A';
         if (btn) {
           btn.textContent = '—';
           btn.disabled = true;
           btn.title = 'Preview not available';
         }
       }
     }
   
     // then: wire all rows (works for both preview + local)
     rows.forEach(wireRow);
   })();

   /* =========================
   ADD-TO-PLAYLIST MODAL
   ========================= */
(function () {
  const modal        = document.getElementById('playlistModal');
  if (!modal) return; // modal not present on this page

  const closeTargets = modal.querySelectorAll('[data-close="true"]');
  const songIdInput  = modal.querySelector('#songIdInput');
  const openBtnsSel  = '.add-to-playlist-btn';

  function openModal(songId) {
    if (songIdInput) songIdInput.value = songId || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // focus the select if present
    const sel = modal.querySelector('#playlistSelect');
    if (sel) setTimeout(() => sel.focus(), 0);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // open (event delegation so it works on dynamically rendered items too)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest(openBtnsSel);
    if (!btn) return;

    const songId = btn.getAttribute('data-song-id');
    openModal(songId);
  });

  // close (x button and backdrop)
  closeTargets.forEach(el => el.addEventListener('click', closeModal));

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();