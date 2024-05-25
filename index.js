let searchInput = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(objects) {
    let {
        title,
        link,
        description
    } = objects;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(arrayValues) {
    spinner.classList.toggle("d-none");
    for (let items of arrayValues) {
        createAndAppend(items);
    }
}

function searchValue(event) {
    let options = {
        method: "GET"
    };
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");
        let value = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })

    }
}

searchInput.addEventListener("keydown", searchValue)