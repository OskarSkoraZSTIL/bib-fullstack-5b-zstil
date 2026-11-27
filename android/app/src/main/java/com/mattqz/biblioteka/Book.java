package com.mattqz.biblioteka;

public class Book {

    private final int id;
    private final String name;
    private final String author;
    private final String price;
    private final int stock;
    private final String genre;

    public Book(int id, String name, String author,
                   String price, int stock, String genre) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.stock = stock;
        this.genre = genre;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public String getGenre() {
        return genre;
    }
}