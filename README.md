Si è partiti da un'applicazione base e sono state effettuate le seguenti modifiche:

# La watchlist, con un solo stato

Riprendete la watchlist e rifate il form di aggiunta come ieri nella playlist. Tre livelli e qualche extra, tutti partono dal base.

## Base: il form diventa un componente

- il form sta in `components/AddShowForm.tsx` ed è un vero `<form>`: si invia con «Aggiungi» e con Invio, e la pagina non si ricarica
- tutti i dati del form, valori ed errori, stanno in un solo stato
- il form non conosce la lista: quando è valido passa ad `App` il titolo nuovo senza `id`, e l'`id` lo aggiunge `App`
- i bottoni Film e Serie scelgono il tipo e basta: non inviano il form
- dopo l'aggiunta il form torna vuoto

## Medio: più errori per campo

- un campo può avere più errori insieme, e sotto il campo si vedono tutti
- titolo: obbligatorio, almeno 2 caratteri, non già nella lista, nemmeno scritto con maiuscole diverse
- anno: tra il 1900 e l'anno in corso, che non si scrive a mano
- con anche un solo errore non si aggiunge niente

## Pro: gli errori mentre scrivi

- un componente `Input` che riceve i suoi errori e pensa da solo a bordo rosso e messaggi
- prima del primo invio nessun errore; dopo, gli errori si aggiornano a ogni tasto e spariscono appena il campo è giusto
- una sola funzione aggiorna qualsiasi campo del form, al posto di una per campo

## Extra pro

- «Visto», una checkbox: i titoli visti sono barrati nella lista
- un voto da 1 a 5 con cinque stelle; un click sulla stella già scelta toglie il voto
- «Modifica» su ogni riga: il form si riempie con quel titolo, il bottone diventa «Salva» e il titolo si aggiorna invece di aggiungerne uno nuovo; «Annulla» torna all'aggiunta. Il titolo che state modificando non conta come doppione, e passando da un titolo all'altro senza salvare il form mostra sempre quello giusto