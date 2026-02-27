import jakarta.data.Sort;
import jakarta.data.page.PageRequest;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("/fruits")
public class FruitResource {

    private final FruitRepository fruitRepository;

    private static final Sort<Fruit> ASC = Sort.asc("name");
    private static final Sort<Fruit> DESC = Sort.desc("name");

    public FruitResource(FruitRepository fruitRepository) {
        this.fruitRepository = fruitRepository;
    }

    @Path("/offset")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<Fruit> offset(@QueryParam("page") @DefaultValue("1") long page,
                                 @QueryParam("size") @DefaultValue("2") int size) {
        var pageRequest = PageRequest.ofPage(page).size(size);
        return fruitRepository.offSet(pageRequest).content();
    }

    @Path("/cursor")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<Fruit> cursor(@QueryParam("after") @DefaultValue("") String after,
                                  @QueryParam("before") @DefaultValue("") String before,
                                  @QueryParam("size") @DefaultValue("2") int size) {
        if (!after.isBlank()) {
            var pageRequest = PageRequest.ofSize(size).afterCursor(PageRequest.Cursor.forKey(after));
            return fruitRepository.cursor(pageRequest, ASC).content();
        } else if (!before.isBlank()) {
            var pageRequest = PageRequest.ofSize(size).beforeCursor(PageRequest.Cursor.forKey(before));
            return fruitRepository.cursor(pageRequest, DESC).stream().toList();
        }
        var pageRequest = PageRequest.ofSize(size);
        return fruitRepository.cursor(pageRequest, ASC).content();
    }

}
