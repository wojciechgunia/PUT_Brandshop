package pl.put.brandshop.product.fasade;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.put.brandshop.product.entity.CategoryDTO;
import pl.put.brandshop.product.entity.Response;
import pl.put.brandshop.product.exceptions.ObjectExistInDBException;
import pl.put.brandshop.product.mediator.CategoryMediator;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/category")
@RequiredArgsConstructor
public class CategoryController
{
    private final CategoryMediator categoryMediator;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CategoryDTO>> getCategory()
    {
        return categoryMediator.getCategory();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO)
    {
        try
        {
            categoryMediator.createCategory(categoryDTO);
        }
        catch (ObjectExistInDBException e)
        {
            return ResponseEntity.status(400).body(new Response("Category exist with this name"));
        }
        return ResponseEntity.ok(new Response("Operation end Success"));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Response> deleteCategory(@RequestParam String shortID)
    {
        return categoryMediator.deleteCategory(shortID);
    }
}
