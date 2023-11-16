const API_KEY = "niTWK6pRiLoZgNbKgypzuXhbdOeWU0WA";
const SECRET_API_KEY = "5btP4uu8fOC7pPng";

// document objects
const searchTerm = document.querySelector("#search");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const submit = document.querySelector(".submit");
const results = document.querySelector(".results");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const nav = document.querySelector("nav");
const section = document.querySelector("section");

let pageNumber = 0;

/**
 * Fetches the all documents with given search term withing startDate and endDate
 * @param term: term to be searched
 * @param startDate: start date of the articles to be searched
 * @param endDate: end date of the articles to be searched
 * @return Promise 
*/
async function getDocs(term, startDate, endDate, pageNumber) {
    const base_url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&begin_date=${startDate}&end_date=${endDate}&q=${term}&page=${pageNumber}&fq=document_type:("article")`;
    const request = new Request(base_url, {
        method: "GET"
    });
    return fetch(request).then((response) => {
        if (!response.ok) {
            console.log("An error happened during HTTP request");
        }
        return response;
    })
    .then(data => {
        return data.json();
    })
    .then(json => {
        return json.response.docs;
    })
    .catch(error => {
        throw Error("An error happened" + error);
    });
}

function init() {
    submit.addEventListener("click", search);
    next.addEventListener("click", nextPage);
    prev.addEventListener("click", prevPage);
}

async function search(e) {
    e.preventDefault();
    pageNumber = 0;
    await fetchResults();
}

async function fetchResults() {
    let start = startDate.value;
    let end = endDate.value;
    let term = searchTerm.value;
    let docs = await getDocs(term, start, end, pageNumber);

    displayResult(docs);
}

/**
 * Displays all the given documents in result section 
 * */
function displayResult(docs) {
    section.innerHTML = "";

    nav.style.display = docs.length === 10 ? "block" : "none";
    if (docs.length === 0) {
        const para = document.createElement("p");
        para.textContent = "There is no article to display";
        section.appendChild(para);
    } else {
        for (const doc of docs) {
            createArticle(doc);
        }
    }

}

/**
 * Creates an p,h2,img,a element inside of article element and appends it to the section element.
 * @param {*} doc: to getch information related to article 
 */
function createArticle(doc) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const para1 = document.createElement("p");
    const keywordPara = document.createElement("p");
    keywordPara.classList.add("keywords");

    console.log(doc);

    link.href = doc.web_url;
    link.textContent = doc.headline.main;
    for (const keyword of doc.keywords) {
        const span = document.createElement("span");
        span.textContent = `${keyword.value} `;
        keywordPara.appendChild(span);
    }
    if (doc.multimedia.length > 0) {
        img.src = `http://www.nytimes.com/${doc.multimedia[0].url}`;
        img.alt = doc.headline.main;
      }

      article.appendChild(h2);
      h2.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(keywordPara);
      section.appendChild(article);
}

async function nextPage() {
    pageNumber++;
    await fetchResults();
}

async function prevPage() {
    pageNumber--;
    await fetchResults();
}

init();
