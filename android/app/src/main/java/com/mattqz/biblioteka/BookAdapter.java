package com.mattqz.biblioteka;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class BookAdapter extends RecyclerView.Adapter<BookAdapter.BookViewHolder> {

    public interface OnBookClickListener {
        void onBookClick(Book book);
    }

    private final List<Book> books;
    private final OnBookClickListener listener;

    public BookAdapter(List<Book> books, OnBookClickListener listener) {
        this.books = books;
        this.listener = listener;
    }

    @NonNull
    @Override
    public BookViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_book, parent, false);
        return new BookViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull BookViewHolder holder, int position) {
        holder.bind(books.get(position), listener);
    }

    @Override
    public int getItemCount() {
        return books.size();
    }

    static class BookViewHolder extends RecyclerView.ViewHolder {

        private final TextView nameView;
        private final TextView categoryView;
        private final TextView priceView;
        private final TextView stockView;

        BookViewHolder(@NonNull View itemView) {
            super(itemView);
            nameView = itemView.findViewById(R.id.bookName);
            categoryView = itemView.findViewById(R.id.bookCategory);
            priceView = itemView.findViewById(R.id.bookPrice);
            stockView = itemView.findViewById(R.id.bookStock);
        }

        void bind(Book book, OnBookClickListener listener) {
            nameView.setText(book.getName());
            categoryView.setText(book.getGenre());
            priceView.setText(Format.price(book.getPrice()));

            if (book.getStock() == 0) {
                stockView.setText("Niedostępny");
                stockView.setTextColor(Color.RED);
            } else {
                stockView.setText("Na stanie: " + book.getStock() + " szt.");
            }

            itemView.setOnClickListener(view -> listener.onBookClick(book));
        }
    }
}