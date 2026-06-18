(function () {
  const key = document.currentScript?.getAttribute("data-key");
  if (!key) return;

  const BASE = "https://aria.vn"; // change to your domain

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #aria-widget-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(124,58,237,0.4);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s;
    }
    #aria-widget-btn:hover { transform: scale(1.05); }
    #aria-widget-btn svg { width: 24px; height: 24px; fill: white; }
    #aria-widget-frame {
      position: fixed; bottom: 92px; right: 24px; z-index: 9998;
      width: 360px; height: 520px; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.15); border: none;
      display: none; overflow: hidden;
    }
    #aria-widget-frame.open { display: block; }
    #aria-widget-badge {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #ef4444; color: white; font-size: 11px;
      font-weight: bold; display: flex; align-items: center;
      justify-content: center; font-family: sans-serif;
    }
  `;
  document.head.appendChild(style);

  // Button
  const btn = document.createElement("button");
  btn.id = "aria-widget-btn";
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;
  btn.title = "Chat với chúng tôi";

  const badge = document.createElement("div");
  badge.id = "aria-widget-badge";
  badge.textContent = "1";
  btn.style.position = "relative";
  btn.appendChild(badge);

  // Frame
  const frame = document.createElement("iframe");
  frame.id = "aria-widget-frame";
  frame.src = `${BASE}/widget/${key}`;
  frame.allow = "microphone";

  document.body.appendChild(frame);
  document.body.appendChild(btn);

  let open = false;
  btn.addEventListener("click", () => {
    open = !open;
    frame.classList.toggle("open", open);
    badge.style.display = open ? "none" : "flex";
  });
})();
