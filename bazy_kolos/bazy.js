const permanentUrl = '../files/bazy'

let gallery = document.getElementById('gallery')

for (let i = 1; i <= 20; i++) {
    const img = document.createElement("img");
    img.src = `${permanentUrl}/${i}.png`
    img.addEventListener('click', (e) => {
        const target = e.target
        if (target.style.filter === '') {
            target.style.filter = "blur(10px)"
        } else {
            target.style.filter = ''
        }
    })
    gallery.appendChild(img)
}
