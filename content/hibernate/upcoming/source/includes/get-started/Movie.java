package org.example;

import com.mongodb.hibernate.annotations.ObjectIdGenerator;
import org.bson.types.ObjectId;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {
	@Id
	@ObjectIdGenerator
	private ObjectId id;
	private String title;
	private String plot;
	private int year;
	private String[] cast;


	public Movie(String title, String plot, int year, String[] cast) {
 		this.title = title;
		this.plot = plot;
		this.year = year;
		this.cast = cast;
 	}

	public Movie() {

	}

	public ObjectId getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPlot() {
		return plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}
	
	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String[] getCast() {
		return cast;
	}
	
	public void setCast(String[] cast) {
		this.cast = cast;
	}
}