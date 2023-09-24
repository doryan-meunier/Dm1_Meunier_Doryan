document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input");
    const playButton = document.getElementById("valider"); // Correction ici
    const message = document.getElementById("message");
    let nombreMystere;
    let tentativesRestantes = 6;

    function genererNombreMystere() {
        nombreMystere = Math.floor(Math.random() * 100) + 1;
    }

    function afficherMessage(messageText, couleur) {
        message.style.color = couleur;
        message.textContent = messageText;
    }

    function rejouer() {
        genererNombreMystere();
        tentativesRestantes = 6;
        afficherMessage("", "black");
        input.value = "";
        playButton.textContent = "Jouer";
        input.removeAttribute("disabled");
    }

    playButton.addEventListener("click", function () {
        if (playButton.textContent === "Rejouer ?") {
            rejouer();
            return;
        }

        const valeurSaisie = input.value.trim();

        if (valeurSaisie === "") {
            afficherMessage("Veuillez saisir un nombre.", "black");
            return;
        }

        const nombreSaisi = parseInt(valeurSaisie);

        if (isNaN(nombreSaisi) || nombreSaisi < 1 || nombreSaisi > 100) {
            afficherMessage("Nombre invalide. Entrez un nombre entre 1 et 100.", "black");
            return;
        }

        tentativesRestantes--;

        if (nombreSaisi < nombreMystere) {
            afficherMessage("Trop petit", "blue");
        } else if (nombreSaisi > nombreMystere) {
            afficherMessage("Trop grand", "blue");
        } else {
            afficherMessage("Gagné ! Le nombre mystère était " + nombreMystere, "green");
            playButton.textContent = "Rejouer ?";
            input.setAttribute("disabled", "disabled");
        }

        if (tentativesRestantes === 0) {
            afficherMessage("Perdu. Le nombre mystère était " + nombreMystere, "red");
            playButton.textContent = "Rejouer ?";
            input.setAttribute("disabled", "disabled");
        }
    });

    // Initialisation du jeu au chargement de la page
    genererNombreMystere();
});
