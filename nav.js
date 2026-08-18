(function () {
  var pages = ["index.html", "prototype.html"];
  var file = location.pathname.split("/").pop() || "index.html";
  if (file === "") file = "index.html";
  var i = pages.indexOf(file);
  if (i < 0) i = 0;
  function go(d) {
    var n = i + d;
    if (n >= 0 && n < pages.length) location.href = pages[n];
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
