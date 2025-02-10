const celulas = document.querySelectorAll(".quadrado");
const telavencedor = document.getElementById("tela_vencedor");
const vitoriaX = document.getElementById("vitoriasX");
const vitoriaO = document.getElementById("vitoriasO");
const jogvez = document.getElementById("jogarvez");
let JogadorXativo = true;
let JogadorOativo = false;

let vitoriasO = 0;
let vitoriasX = 0;

const x = "X";
const o = "O";

const combinacoes = [
    [0, 1, 2],[1, 2, 3],[2, 3, 4],
    [5, 6, 7],[6, 7, 8],[7, 8, 9],
    [10, 11, 12],[11, 12, 13],[12, 13, 14],
    [15, 16, 17],[16, 17, 18],[17, 18, 19],
    [20, 21, 22],[21, 22, 23],[22, 23, 24],

    [0, 5, 10],[5, 10, 15],[10, 15, 20],
    [1, 6, 11],[6, 11, 16],[11, 16, 21],
    [2, 7, 12],[7, 12, 17],[12, 17, 22],
    [3, 8, 13],[8, 13, 18],[13, 18, 23],
    [4, 9, 14],[9, 14, 19],[14, 19, 24],

    [0, 6, 12],[1, 7, 13],[2, 8, 14],
    [5, 11, 17],[6, 12, 18],[7, 13, 19],
    [10, 16, 22],[11, 17, 23],[12, 18, 24],

    [4, 8, 12],[3, 7, 11],[2, 6, 10],
    [9, 13, 17],[8, 12, 16],[7, 11, 15],
    [14, 18, 22],[13, 17, 21],[12, 16, 20]
  ];

document.addEventListener("click", (event) => {
    if (event.target.matches(".quadrado")) {
        Jogar(event.target.id);
    }
});

if (JogadorXativo == true) {
    jogvez.textContent = "Vez do jogador: X";
} else{
    jogvez.textContent = "Vez do jogador: O";
}

function Jogar(id) {
    const quadrado = document.getElementById(id);
    console.log(quadrado)
    if (!quadrado.classList.contains("X") && !quadrado.classList.contains("O")) {
        if (JogadorXativo == true) {
            JogadorXativo = false;
            JogadorOativo = true;
            quadrado.textContent = "X";
            turno = "X";
            jogvez.textContent = "Vez do jogador: O";
            ChecarVencedor("X"); 
        } else {
            JogadorXativo = true;
            JogadorOativo = false;
            quadrado.textContent = "O";
            turno = "O";
            jogvez.textContent = "Vez do jogador: X";
            ChecarVencedor("O");
        }
    }
}

function ChecarVencedor() {
    const jogadorvencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].textContent.includes(turno);
        });
    });
    if (jogadorvencedor) {
        EncerrarJogo(turno);
    } else {
        let cont = 0;
        for (index in celulas) {
            if (!isNaN(index)) {
                if (celulas [index].textContent.includes("X") || celulas [index].textContent.includes("O")) {
                    cont++;
                }
            }
        }
        if (cont == 25) {
            EncerrarJogo();
        }
    }
}

function EncerrarJogo(jogadorvencedor = null) {
    const vencedor = document.getElementById("vencedor");
    telavencedor.style.display = "block";
    if (jogadorvencedor) {
        vencedor.textContent = `Vencedor: ${jogadorvencedor}`;
        if (jogadorvencedor == "X") {
            vitoriasX++;
            vitoriaX.textContent = `Vitórias de X: ${vitoriasX}`;
        } else {
            vitoriasO++;
            vitoriaO.textContent = `Vitórias de O: ${vitoriasO}`;
        }

    } else {
        vencedor.textContent = "Empatou";
    }
}


function ReiniciarJogo() {
    for (index in celulas) {
        if (!isNaN(index)) {
            celulas[index].textContent = null;
        }
    }
    telavencedor.style.display = "none";
}