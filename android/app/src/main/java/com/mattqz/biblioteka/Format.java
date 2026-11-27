package com.mattqz.biblioteka;

import java.text.NumberFormat;
import java.util.Locale;

public final class Format {

    private Format() {
    }

    public static String price(String value) {
        NumberFormat formatter =
                NumberFormat.getCurrencyInstance(Locale.forLanguageTag("pl-PL"));
        return formatter.format(Double.parseDouble(value));
    }
}