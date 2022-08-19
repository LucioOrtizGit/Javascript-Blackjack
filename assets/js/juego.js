
//Patron Modulo (Funcion autoinvocada privada)
const moduloBlackjack = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias del HTML
    const bPedir = document.querySelector('#Pedir'),
          bDetener = document.querySelector('#Detener'),
          bNuevo = document.querySelector('#Nuevo'),
          puntosHTML = document.querySelectorAll('small'),
          divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasCpu = document.querySelector('#computadora-cartas');


    //Creacion nueva baraja
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    //Coger una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();
        return carta;
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //CPU
    const turnoCpu = (puntosMinimos) => {
        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasCpu.append(imgCarta);
            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));


        setTimeout(() => {

            if (puntosComputadora ===  puntosMinimos) {
                alert('Nadie Gana :(');
            } else if (puntosMinimos > 21) {
                alert('Cpu WIN!');
            } else if (puntosComputadora > 21) {
                alert('Jugador WIN!');
            } else {
                alert('Cpu WIN!');
            }
        }, 100);
    }

    //Eventos
    bPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn("Perdiste");
            bPedir.disabled = true;
            bDetener.disabled = true;
            turnoCpu(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21, bien");
            bPedir.disabled = true;
            bDetener.disabled = true;
            turnoCpu(puntosJugador);
        }

    });

    bDetener.addEventListener('click', () => {
        bPedir.disabled = true;
        bDetener.disabled = true;

        turnoCpu(puntosJugador);

    });

    bNuevo.addEventListener('click', () => {
        location.reload();

    });

    //publico
    return 'Bienvenido al Blackjack';
})();



