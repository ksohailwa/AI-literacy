// 🔍 Simple search function for header search bar
function search() {
  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    alert("Searching for: " + query);
  }
}
