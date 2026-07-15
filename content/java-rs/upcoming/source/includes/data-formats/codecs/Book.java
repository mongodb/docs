package org.example;

// Defines a custom class that contains fields describing a book
// start class
public class Book {
    private String title;
    private ReadStatus readStatus = ReadStatus.UNREAD;
    private Integer pageCount;

    public Book() {}

    // ...
// end class

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ReadStatus getReadStatus() {
        return readStatus;
    }

    public void setReadStatus(ReadStatus readStatus) {
        this.readStatus = readStatus;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    @Override
    public String toString() {
        return "Book [title=" + title + ", readStatus=" + readStatus + ", pageCount=" + pageCount + "]";
    }
}

