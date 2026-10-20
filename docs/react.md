# React
#### *<q>Co się stanie jak się użyje `id` zamiast indeksu?</q>*
Strona sprawdza dane po indeksie, a nie po id - to znaczy, ze jesli w `frontend/src/format.js` produkt o `"id": 12` będzie wyświetlany jako pierwszy, ponieważ jest pierwszy w liście, czyli ma indeks "1"

Natomiast jakby sprawdzała dane po `id`, to wtedy książka o `"id": 1` będzie wyświetlana jako pierwsza, pomimo tego że jest na indeksie n'tym.