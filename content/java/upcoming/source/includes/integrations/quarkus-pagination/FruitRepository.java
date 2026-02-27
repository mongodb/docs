import jakarta.data.Sort;
import jakarta.data.page.CursoredPage;
import jakarta.data.page.Page;
import jakarta.data.page.PageRequest;
import jakarta.data.repository.BasicRepository;
import jakarta.data.repository.Find;
import jakarta.data.repository.OrderBy;
import jakarta.data.repository.Repository;

@Repository
public interface FruitRepository extends BasicRepository<Fruit, String> {

    @Find
    CursoredPage<Fruit> cursor(PageRequest pageRequest, Sort<Fruit> order);

    @Find
    @OrderBy("name")
    Page<Fruit> offSet(PageRequest pageRequest);

    long countBy();

}
