package com.example.sklep;

import java.util.Arrays;
import java.util.List;

public final class BookData {

    private BookData() {
        // klasa tylko na dane, nie tworzymy jej obiektów
    }

    public static final List<Book> BOOKS = Arrays.asList(
            new Book(12, "Balladyna",
                    "Juliusz Słowacki", "24.99", 7, "Dramat romantyczny"),
            new Book(9, "Ferdydurke",
                    "Witold Gombrowicz", "29.50", 11, "Powieść"),
            new Book(11, "Kamienie na szaniec",
                    "Aleksander Kamiński", "32.99", 10, "Literatura wojenna"),
            new Book(6, "Krzyżacy",
                    "Henryk Sienkiewicz", "36.75", 9, "Powieść historyczna"),
            new Book(3, "Lalka",
                    "Bolesław Prus", "34.90", 15, "Powieść realistyczna"),
            new Book(1, "Ogniem i mieczem",
                    "Henryk Sienkiewicz", "39.99", 12, "Powieść historyczna"),
            new Book(10, "Pan Tadeusz",
                    "Adam Mickiewicz", "25.99", 13, "Epopeja"),
            new Book(5, "Potop",
                    "Henryk Sienkiewicz", "42.00", 10, "Powieść historyczna"),
            new Book(2, "Przedwiośnie",
                    "Stefan Żeromski", "27.50", 8, "Powieść"),
            new Book(7, "Quo Vadis",
                    "Henryk Sienkiewicz", "31.99", 14, "Powieść historyczna"),
            new Book(4, "Wesele",
                    "Stanisław Wyspiański", "22.99", 0, "Dramat"),
            new Book(8, "Zemsta",
                    "Aleksander Fredro", "19.90", 6, "Komedia")
    );

    public static Book findById(int id) {
        for (Book book : BOOKS) {
            if (book.getId() == id) {
                return book;
            }
        }
        return null;
    }
}