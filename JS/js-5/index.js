const fileNames = ["pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg","pic5.jpg"];
const thumbar = document.querySelector(".thumb-bar")
const displayedImg = document.querySelector(".displayed-img");
const btn = document.querySelector('button');
fileNames.forEach(e => {
    const img = document.createElement("img");
    img.src = "./images/"+e;
    thumbar.appendChild(img);
    img.addEventListener("click", (e) => {
        displayedImg.src = img.src;
    })
})

btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
      btn.setAttribute('class','light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class','dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });