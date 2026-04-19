(function () {
  const token = localStorage.getItem("access_token");

  // se não tiver token → volta pro login
  if (!token) {
    window.location.href = "index.html";
  }
})();
