(function () {
  var pages = ["index.html", "framework-brief.html", "prototype.html"];
  var labels = ["Overview", "Framework brief", "Prototype"];
  var file = location.pathname.split("/").pop() || "index.html";
  if (file === "") file = "index.html";
  var i = pages.indexOf(file);
  if (i < 0) i = 0;

  function go(d) {
    var n = i + d;
    if (n >= 0 && n < pages.length) location.href = pages[n];
  }

  function buildButtons() {
    var style = document.createElement("style");
    style.textContent =
      ".nav-btn{position:fixed;top:50%;transform:translateY(-50%);z-index:2147483000;" +
      "width:42px;height:42px;border-radius:50%;border:1px solid rgba(15,17,21,.12);" +
      "background:rgba(255,255,255,.92);color:#0f1115;font-size:20px;line-height:1;" +
      "display:flex;align-items:center;justify-content:center;cursor:pointer;" +
      "box-shadow:0 2px 10px rgba(15,17,21,.10);opacity:.55;transition:opacity .15s,transform .15s;" +
      "-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);font-family:Inter,system-ui,sans-serif}" +
      ".nav-btn:hover{opacity:1}" +
      ".nav-prev{left:16px}.nav-next{right:16px}" +
      ".nav-btn[hidden]{display:none}" +
      ".nav-label{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483000;" +
      "font:600 11px/1 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;" +
      "color:#8a9098;background:rgba(255,255,255,.9);padding:6px 12px;border-radius:999px;" +
      "border:1px solid rgba(15,17,21,.08);opacity:.75}";
    document.head.appendChild(style);

    var prev = document.createElement("button");
    prev.className = "nav-btn nav-prev";
    prev.innerHTML = "‹";
    prev.title = "Previous page (←)";
    prev.setAttribute("aria-label", "Previous page");
    prev.onclick = function () { go(-1); };

    var next = document.createElement("button");
    next.className = "nav-btn nav-next";
    next.innerHTML = "›";
    next.title = "Next page (→)";
    next.setAttribute("aria-label", "Next page");
    next.onclick = function () { go(1); };

    var label = document.createElement("div");
    label.className = "nav-label";
    label.textContent = i + 1 + " / " + pages.length + " · " + labels[i];

    if (i <= 0) prev.hidden = true;
    if (i >= pages.length - 1) next.hidden = true;

    document.body.appendChild(prev);
    document.body.appendChild(next);
    document.body.appendChild(label);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildButtons);
  } else {
    buildButtons();
  }

  window.addEventListener(
    "keydown",
    function (e) {
      var target = e.target || document.body;
      var tag = (target.tagName || "").toUpperCase();
      var isEditing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable;

      if (
        isEditing ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey ||
        e.repeat
      )
        return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        var direction = e.key === "ArrowLeft" ? -1 : 1;
        var destination = i + direction;
        if (destination < 0 || destination >= pages.length) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        go(direction);
      }
    },
    true,
  );
})();
