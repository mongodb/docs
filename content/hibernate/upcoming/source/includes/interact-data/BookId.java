package org.example;

import jakarta.persistence.Embeddable;

@Embeddable
public record BookId(long publisherId, long bookNo) {
}
