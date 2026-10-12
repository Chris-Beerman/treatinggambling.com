// The criteria board: one page-load sequence lights the sample case, then visitors can toggle tiles.
(function () {
  var board = document.getElementById("board");
  if (!board) return;
  var tiles = Array.prototype.slice.call(board.querySelectorAll(".tile"));
  var countEl = board.querySelector(".count");
  var sevEl = board.querySelector(".sev");
  // DSM-5 severity: 4–5 mild, 6–7 moderate, 8–9 severe
  function update() {
    var n = tiles.filter(function (t) { return t.getAttribute("aria-pressed") === "true"; }).length;
    countEl.textContent = n;
    var label = "Below threshold", level = 0;
    if (n >= 8) { label = "Severe"; level = 3; }
    else if (n >= 6) { label = "Moderate"; level = 2; }
    else if (n >= 4) { label = "Mild"; level = 1; }
    sevEl.textContent = label;
    board.setAttribute("data-level", level);
  }
  tiles.forEach(function (t) {
    t.addEventListener("click", function () {
      t.setAttribute("aria-pressed", t.getAttribute("aria-pressed") === "true" ? "false" : "true");
      update();
    });
  });
  // Sample case: chasing, preoccupation, escape, lying, failed attempts, bailouts → 6, moderate
  var sample = [5, 3, 4, 6, 2, 8];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    sample.forEach(function (i) { tiles[i].setAttribute("aria-pressed", "true"); });
    update();
    return;
  }
  sample.forEach(function (i, k) {
    setTimeout(function () {
      tiles[i].setAttribute("aria-pressed", "true");
      update();
    }, 500 + k * 260);
  });
})();
