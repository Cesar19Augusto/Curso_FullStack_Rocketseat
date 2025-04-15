const colors = ["#FF5733", "#3357FF", "#33FF57", "#B399FF", "#F4D03F"];
const blocks = document.querySelectorAll(".block");

blocks.forEach((block, index) => {
    block.style.backgroundColor = colors[index % colors.length]; 

    // O primeiro índice é 0, então usamos index % 5 === 3 para ajustar melhor a posição
    if ((index + 1) % 5 === 0) { 
        block.style.gridColumn = "span 2";
        block.style.width = "87%";
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight - 1) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});