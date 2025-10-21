/* featured albums caroussel */
const featuredTrack = document.querySelector(".featured-track");
const featuredLeft = document.querySelector(".featured-left");
const featuredRight = document.querySelector(".featured-right");

function getCardStep() {
  if (!featuredTrack) return 250;
  const card = featuredTrack.querySelector(".album");
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
  featuredRight.addEventListener("click", () => {
    featuredTrack.scrollBy({ left: getCardStep(), behavior: "smooth" });
  });
  featuredLeft.addEventListener("click", () => {
    featuredTrack.scrollBy({ left: -getCardStep(), behavior: "smooth" });
  });
  featuredTrack.addEventListener("scroll", updateCarouselArrows);
  window.addEventListener("resize", updateCarouselArrows);
  updateCarouselArrows();
}

/* DEEZER 30s PREVIEW LOOKUP, got helped by chatGPT for this feature */
function dzPreview(query) {
  return new Promise((resolve) => {
    const cb = "dzcb_" + Math.random().toString(36).slice(2);
    window[cb] = function (json) {
      try {
        const url =
          json && json.data && json.data[0] && json.data[0].preview
            ? json.data[0].preview
            : null;
        resolve(url);
      } finally {
        delete window[cb];
        scr.remove();
      }
    };
    const scr = document.createElement("script");
    scr.src =
      "https://api.deezer.com/search?q=" +
      encodeURIComponent(query) +
      "&limit=1&output=jsonp&callback=" +
      cb;
    scr.onerror = function () {
      delete window[cb];
      resolve(null);
    };
    document.body.appendChild(scr);
  });
}

/* HOME PREVIEW MINI PLAYER */
(function initHomePreview() {
  const player = document.getElementById("hp-player");
  const rows = document.querySelectorAll(".hp-row");
  if (!player || rows.length === 0) return;

  let currentRow = null;

  const fmt = (sec) => {
    if (isNaN(sec)) return "–:–";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  player.addEventListener("timeupdate", () => {
    if (!currentRow) return;
    const bar = currentRow.querySelector(".hp-bar span");
    const time = currentRow.querySelector(".hp-time");
    const dur = player.duration || 1;
    const pct = (player.currentTime / dur) * 100;
    if (bar) bar.style.width = pct + "%";
    if (time) time.textContent = fmt(dur - player.currentTime);
  });

  player.addEventListener("ended", () => {
    if (!currentRow) return;
    const btn = currentRow.querySelector(".hp-btn");
    const bar = currentRow.querySelector(".hp-bar span");
    if (btn) btn.textContent = "►";
    if (bar) bar.style.width = "0%";
  });

  function wireRow(row) {
    const btn = row.querySelector(".hp-btn");
    const time = row.querySelector(".hp-time");
    const bar = row.querySelector(".hp-bar span");
    if (!btn || !time || !bar) return;

    // if a URL already exists, enable immediately
    if (row.dataset.src) {
      btn.disabled = false;
      time.textContent = "0:30";
    }

    btn.addEventListener("click", () => {
      const src = row.dataset.src || "";
      if (!src) return;

      // switching to a different row
      if (currentRow !== row) {
        if (currentRow) {
          const pbtn = currentRow.querySelector(".hp-btn");
          const pbar = currentRow.querySelector(".hp-bar span");
          if (pbtn) pbtn.textContent = "►";
          if (pbar) pbar.style.width = "0%";
        }
        currentRow = row;
        player.src = src;
        player.currentTime = 0;
        player.play();
        btn.textContent = "❚❚";
        return;
      }

      // toggle same row
      if (player.paused) {
        player.play();
        btn.textContent = "❚❚";
      } else {
        player.pause();
        btn.textContent = "►";
      }
    });
  }

  // resolve previews (one by one), then wire the rows
  (async function resolveAndWire() {
    for (const row of rows) {
      const btn = row.querySelector(".hp-btn");
      const time = row.querySelector(".hp-time");
      if (btn) btn.disabled = true;

      // keep any pre-set data-src, otherwise look up by data-query
      if (!row.dataset.src) {
        const q = row.getAttribute("data-query") || "";
        const url = q ? await dzPreview(q) : null;
        if (url) {
          row.dataset.src = url;
          if (time) time.textContent = "0:30";
          if (btn) btn.disabled = false;
        } else {
          if (time) time.textContent = "N/A";
          if (btn) {
            btn.textContent = "—";
            btn.disabled = true;
            btn.title = "preview not available";
          }
        }
      } else {
        if (time) time.textContent = "0:30";
        if (btn) btn.disabled = false;
      }
    }

    rows.forEach(wireRow);
  })();
})();

/* ADD-TO-PLAYLIST */
(function () {
  const modal = document.getElementById("playlistModal");
  if (!modal) return;

  const closeTargets = modal.querySelectorAll('[data-close="true"]');
  const songIdInput = modal.querySelector("#songIdInput");
  const openBtnsSel = ".add-to-playlist-btn";

  function openModal(songId) {
    if (songIdInput) songIdInput.value = songId || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // focus the select if present
    const sel = modal.querySelector("#playlistSelect");
    if (sel) setTimeout(() => sel.focus(), 0);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  // open (event delegation so it works on dynamically rendered items too)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(openBtnsSel);
    if (!btn) return;

    const songId = btn.getAttribute("data-song-id");
    openModal(songId);
  });

  // close (x button and backdrop)
  closeTargets.forEach((el) => el.addEventListener("click", closeModal));

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
