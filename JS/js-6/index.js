async function populate() {
    const requestURL =  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

    const getRequest = new Request(requestURL);

    await fetch(getRequest).then(async (response) => {
        const superHeroes = await response.json();
        populateHeader(superHeroes);
        populateHeroes(superHeroes);
    })
}

function populateHeader(data) {
    const header = document.querySelector("header");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("p");
    h1.textContent = data.squadName;
    h2.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
    header.appendChild(h1);
    header.appendChild(h2);
}

function populateHeroes(data) {
    const firstH1 = document.createElement("h2");
    const secondH2 = document.createElement("h2");
    const thirdH3 = document.createElement("h2");
    const section = document.querySelector("section");

    const secretIdentity = "Secret Identity: ";
    const age = "Age: ";
    const superpowers = "Superpowers:";
    const members = data.members;

    for(const member of members) {
        const article = document.createElement("article");
        const articleHeader = document.createElement("h2");
        const articleP = document.createElement("p");
        const articleAge = document.createElement("p");
        const articleSuperpowers = document.createElement("p");
        const articleList = document.createElement("ul");
        
        articleHeader.textContent = member.name;
        articleP.textContent = secretIdentity + member.secretIdentity;
        articleAge.textContent = age + member.age;
        articleSuperpowers.textContent = superpowers;
        
        // paragraphs
        article.appendChild(articleHeader);
        article.appendChild(articleP);
        article.appendChild(articleAge);
        article.appendChild(articleSuperpowers);

        // list items
        for(const superpower of member.powers) {
            const li = document.createElement("li");
            li.textContent = superpower;
            articleList.appendChild(li);
        }
        article.appendChild(articleList);
        section.appendChild(article);
    }

}
populate();
  