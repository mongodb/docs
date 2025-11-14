import com.mongodb.hibernate.annotations.ObjectIdGenerator;
import org.bson.types.ObjectId;
import java.util.List;

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
	private int runtime;
	private List<String> cast;


	public Movie(String title, String plot, int year, int runtime, List<String> cast) {
 		this.title = title;
		this.plot = plot;
		this.year = year;
		this.runtime = runtime;
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

	public int getRuntime() {
		return runtime;
	}

	public void setRuntime(int runtime) {
		this.runtime = runtime;
	}

	public List<String> getCast() {
		return cast;
	}
	
	public void setCast(List<String> cast) {
		this.cast = cast;
	}
}