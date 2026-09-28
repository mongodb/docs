package org.example;

import jakarta.persistence.Embeddable;

@Embeddable
public record ReviewId(long publisherId, long bookNo) {
}
