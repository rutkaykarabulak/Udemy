const ul = document.querySelector("ul");

const add = document.querySelector(".add");
const newItem = document.querySelector("#newItem");
add.addEventListener("click", () => {
    const textContent = newItem.value;
    if (textContent !== "") {
        const li = document.createElement("li");
        li.textContent = textContent;
        const button = document.createElement("button");
        button.textContent = "Delete";
        li.appendChild(button);
        ul.appendChild(li);
    }
})

const deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach(b => b.addEventListener("click", () => {
    const parentLi = b.parentElement;
    console.log(b.parentElement === b.parentNode);
    parentLi.remove();
}))