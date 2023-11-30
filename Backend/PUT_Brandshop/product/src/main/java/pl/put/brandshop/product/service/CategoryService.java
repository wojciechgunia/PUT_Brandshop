package pl.put.brandshop.product.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.put.brandshop.product.entity.Category;
import pl.put.brandshop.product.entity.CategoryDTO;
import pl.put.brandshop.product.exceptions.ObjectExistInDBException;
import pl.put.brandshop.product.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService
{
    private final CategoryRepository categoryRepository;

    public List<Category> getCategory()
    {
        return categoryRepository.findAllByActivate(true);
    }

    public void create(CategoryDTO categoryDTO) throws ObjectExistInDBException
    {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setShortId(UUID.randomUUID().toString().replace("-","").substring(0,12));
        category.setActivate(true);

        categoryRepository.findByName(category.getName()).ifPresent(value -> {
            throw new ObjectExistInDBException("Category exist with this name");
        });
        categoryRepository.save(category);
    }

    public Optional<Category> findCategoryByShortID(String shortId)
    {
        return categoryRepository.findByShortId(shortId);
    }

    @Transactional
    public void delete(String shortId) throws RuntimeException
    {
        categoryRepository.findByShortId(shortId).ifPresentOrElse(value -> {
            value.setActivate(false);
            categoryRepository.save(value);
        },()->{
            throw new RuntimeException();
        });
    }
}
