// Search functionality
function search() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query === "") return;

    // Split the search query into individual words and remove empty strings
    const searchWords = query.split(/\s+/).filter(word => word.length > 0);

    const results = searchableContent.pages.map(page => {
        const titleLower = page.title.toLowerCase();
        const contentLower = page.content.toLowerCase();
        
        // Calculate match scores for each word
        const wordMatches = searchWords.map(word => {
            const titleMatches = (titleLower.match(new RegExp(word, 'g')) || []).length;
            const contentMatches = (contentLower.match(new RegExp(word, 'g')) || []).length;
            return {
                word,
                matches: titleMatches * 2 + contentMatches, // Title matches worth double
                found: titleMatches > 0 || contentMatches > 0
            };
        });

        // Calculate relevance score
        const score = {
            totalMatches: wordMatches.reduce((sum, match) => sum + match.matches, 0),
            wordsFound: wordMatches.filter(match => match.found).length,
            words: wordMatches
        };

        return {
            ...page,
            score
        };
    })
    .filter(result => result.score.wordsFound > 0) // Only keep results with at least one word match
    .sort((a, b) => {
        // Sort by number of different words found first, then by total matches
        if (b.score.wordsFound !== a.score.wordsFound) {
            return b.score.wordsFound - a.score.wordsFound;
        }
        return b.score.totalMatches - a.score.totalMatches;
    });

    displaySearchResults(results, searchWords);
}

function displaySearchResults(results, searchWords) {
    // Remove existing results if any
    const existingResults = document.getElementById("searchResults");
    if (existingResults) {
        existingResults.remove();
    }

    // Create results container
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "searchResults";
    resultsDiv.className = "search-results";

    if (results.length === 0) {
        resultsDiv.innerHTML = `<p>No results found for "${searchWords.join(' ')}"</p>`;
    } else {
        const resultsList = results.map(result => {
            const matchedWords = result.score.words
                .filter(w => w.found)
                .map(w => w.word)
                .join(', ');

            return `
                <div class="search-result-item">
                    <h3><a href="${result.url}">${highlightWords(result.title, searchWords)}</a></h3>
                    <p>${highlightWords(result.content, searchWords)}</p>
                    <div class="match-info">
                        <small>Matched words: ${matchedWords}</small>
                        <small>Score: ${result.score.totalMatches}</small>
                    </div>
                </div>
            `;
        }).join("");
        
        resultsDiv.innerHTML = `
            <h2>Search Results for "${searchWords.join(' ')}"</h2>
            ${resultsList}
            <button onclick="closeSearchResults()" class="close-results">Close</button>
        `;
    }

    // Insert results after the header
    const header = document.querySelector("header");
    header.parentNode.insertBefore(resultsDiv, header.nextSibling);
}

function highlightWords(text, words) {
    let highlightedText = text;
    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    return highlightedText;
}

function closeSearchResults() {
    const results = document.getElementById("searchResults");
    if (results) {
        results.remove();
    }
}

// Add event listener for the search input
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            search();
        }
    });

    // Active page highlighting
    const currentPage = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
