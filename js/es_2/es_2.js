let parole = [];

const input = document.getElementById("wordInput");
const btnAggiungi = document.getElementById("addBtn");
const lista = document.getElementById("wordList");
const contatore = document.getElementById("count");
const arrayDisplay = document.getElementById("arrayDisplay");

function aggiungiParola() {
    const parola = input.value.trim();
    if (parola === "") return;

    parole.push(parola);
    input.value = "";
    mostraLista();
}

function rimuoviParola(indice) {
    parole.splice(indice, 1);
    mostraLista();
}

function mostraLista() {
    lista.innerHTML = "";

    if (parole.length === 0) {
        lista.innerHTML = '<div class="empty">Nessun elemento. Aggiungi una parola!</div>';
        contatore.textContent = "0";
        arrayDisplay.textContent = "[]";
        return;
    }

    parole.forEach((parola, i) => {
        const li = document.createElement("li");

        const testo = document.createElement("span");
        testo.textContent = `${i + 1}. ${parola}`;

        const btnElimina = document.createElement("button");
        btnElimina.textContent = "Elimina";
        btnElimina.className = "delete-btn";
        btnElimina.onclick = () => rimuoviParola(i);

        li.appendChild(testo);
        li.appendChild(btnElimina);
        lista.appendChild(li);
    });

    contatore.textContent = parole.length;
    arrayDisplay.textContent = JSON.stringify(parole);
}

btnAggiungi.addEventListener("click", aggiungiParola);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        aggiungiParola();
    }
});

mostraLista();
