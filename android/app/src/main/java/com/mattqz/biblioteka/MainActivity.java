package com.mattqz.biblioteka;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private final List<Book> visible = new ArrayList<>(BookData.BOOKS);
    private BookAdapter adapter;
    private TextView emptyMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        emptyMessage = findViewById(R.id.emptyMessage);

        RecyclerView productList = findViewById(R.id.productList);
        productList.setLayoutManager(new LinearLayoutManager(this));

        adapter = new BookAdapter(visible, this::openDetails);
        productList.setAdapter(adapter);

        EditText searchField = findViewById(R.id.searchField);
        searchField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filter(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });
    }

    private void filter(String query) {
        String needle = query.toLowerCase(Locale.ROOT);

        visible.clear();
        for (Book book : BookData.BOOKS) {
            if (book.getName().toLowerCase(Locale.ROOT).contains(needle)) {
                visible.add(book);
            }
        }

        adapter.notifyDataSetChanged();
        emptyMessage.setVisibility(visible.isEmpty() ? View.VISIBLE : View.GONE);
    }

    private void openDetails(Book book) {
        Intent intent = new Intent(this, BookDetailActivity.class);
        intent.putExtra("bookId", book.getId());
        startActivity(intent);
    }
}