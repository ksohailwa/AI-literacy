// 🔍 Simple search function for header search bar
function search() {
  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    alert("Searching for: " + query);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); 
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
