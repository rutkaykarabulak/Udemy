const select = document.querySelector("select");
const pre = document.querySelector("pre");

select.addEventListener("change", () => {
    const verse = select.value;
    updateDisplay(verse);
})

function updateDisplay(verse) {
    const URL = `${verse.replace(" ", "").toLowerCase()}.txt`;
    const request = new Request(`./${URL}`);
    const promise = fetch(request);
    promise
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(data => {
        pre.textContent = data;
    })
    .catch(error => {
        pre.textContent = "An error occured" + error;
    })
}