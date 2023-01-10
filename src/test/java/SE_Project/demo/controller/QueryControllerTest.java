package SE_Project.demo.controller;

import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
public class QueryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void getAllProducts_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/allProducts");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }



    @Test
    public void getCategoryCount_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/CategoryCount");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }


    @Test
    public void getDateTotal_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/date?date=2023-01-10");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }

    @Test
    public void getMonthOutcome_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/monthOutcome?date=2023-01-10");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }

    @Test
    public void getMonthIncome_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/monthIncome?date=2023-01-10");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }

    @Test
    public void getProductsByCategory_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/products/category?category=food");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }

    @Test
    public void getProductsByDescriptionLike_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/products/description?description=food");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(404));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }

    @Test
    public void ggetProductByPriceBetween_success() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/pricebetween?pricefrom=100&priceto=500");

        mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200));
        //  .andExpect(jsonPath("$.createdDate", notNullValue()))
        // .andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }


    @Test
    public void createProduct_success() throws Exception {
        Product productRequest = new Product();
        productRequest.setDate("2023-01-10");
        productRequest.setCategory("food");
        productRequest.setPrice(100);
        productRequest.setDescription("high");
        productRequest.setAccountingType(Type.expense);
        productRequest.setEmail("0524eric@gmail.com");
        productRequest.setAccDate("2023-01-10-17-22");
        productRequest.setLoginMethod("local");

        String json = objectMapper.writeValueAsString(productRequest);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json);

        mockMvc.perform(requestBuilder)
                .andExpect(status().is(201));

        //.andExpect(jsonPath("$.createdDate", notNullValue()))
        //.andExpect(jsonPath("$.lastModifiedDate", notNullValue()));
    }


}
