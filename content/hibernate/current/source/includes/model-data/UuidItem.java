package org.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "items")
public class UuidItem {

    @Id
    @UuidGenerator // or: @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    public UuidItem(String title) {
        this.title = title;
    }

    public UuidItem() {
    }

    // Getter and setter methods
}
