package com.mattqz.biblioteka;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class BookDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);

        int bookId = getIntent().getIntExtra("bookId", -1);
        Book book = BookData.findById(bookId);

        if (book == null) {
            Toast.makeText(this, "Nie ma takiego produktu", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        setTitle(book.getName());

        ((TextView) findViewById(R.id.detailName)).setText(book.getName());
        ((TextView) findViewById(R.id.detailAuthor)).setText(book.getAuthor());
        ((TextView) findViewById(R.id.detailPrice)).setText(Format.price(book.getPrice()));
        ((TextView) findViewById(R.id.detailStock))
                .setText("Na stanie: " + book.getStock() + " szt.");
    }
}