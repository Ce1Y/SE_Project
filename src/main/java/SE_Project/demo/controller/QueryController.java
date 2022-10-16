package SE_Project.demo.controller;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import SE_Project.demo.Product;
import SE_Project.demo.parameter.ProductQueryParameter;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Objects;
// import java.util.Optional;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class QueryController {

    private final List<Product> virtualDB = new ArrayList<>();

    @PostConstruct
    private void initDB() {
        virtualDB.add(new Product("1", "food", "10/17", 200));
        virtualDB.add(new Product("2", "drink", "10/18", 50));
        virtualDB.add(new Product("3", "statistic", "10/19", 300));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") String id) {
        Optional<Product> productOp = virtualDB.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();

        if (productOp.isPresent()) {
            Product product = productOp.get();
            return ResponseEntity.ok().body(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(@ModelAttribute ProductQueryParameter param){
        String keyword = param.getKeyword();
        String orderBy = param.getOrderBy();
        String sortRule = param.getSortRule();
        Comparator<Product> comparator = genSortComparator(orderBy, sortRule);

        List<Product> products = virtualDB.stream()
                .filter(p -> p.getId().toUpperCase().contains(keyword.toUpperCase()))
                .sorted(comparator)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(products);
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> replaceProduct(@PathVariable("id") String id, @RequestBody Product request) {
        Optional<Product> productOp = virtualDB.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();

        if(productOp.isPresent()) {
            Product product = productOp.get();
            if(product.getDate() != request.getDate()) {
                product.setDate(request.getDate());
            }
            if(product.getCategory() != request.getCategory()) {
                product.setCategory(request.getCategory());
            }
            if(product.getPrice() != request.getPrice()) {
                product.setPrice(request.getPrice());
            }

            return ResponseEntity.ok().body(product);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    private Comparator<Product> genSortComparator(String orderBy, String sortRule) {
        Comparator<Product> comparator = (p1, p2) -> 0;
        if(Objects.isNull(orderBy) || Objects.isNull(sortRule)) {
            return comparator;
        }

        if(orderBy.equalsIgnoreCase("price")) {
            comparator = Comparator.comparing(Product::getPrice);
        }
        else if(orderBy.equalsIgnoreCase("date")) {
            comparator = Comparator.comparing(Product::getDate);
        }
        else if(orderBy.equalsIgnoreCase("category")) {
            comparator = Comparator.comparing(Product::getCategory);
        }

        return sortRule.equalsIgnoreCase("desc")
                ? comparator.reversed()
                : comparator;
    }
}
