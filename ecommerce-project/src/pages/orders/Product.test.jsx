import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react"; // renders a component in a fake webpage,screen checks the fake web page
import userEvent from "@testing-library/user-event";
import axios from "axios"; // Fake version
import { Product } from "../home/Product";

vi.mock("axios"); // mocks the entire axios package,when we click addToCartButton to we access the fake version of axios
// but we can test the axios.post and the values given to axios,for that we have to import the axios

// The following is a test suite
describe("Product component", () => {
  let product;
  // we get loadCart from the backend but we can't contect backend to test,so we create mock test means creating a fake version,for that we have to import vi
  let loadCart; // vi,fn creates a fake function that dosen't do anything, this is called mock

  beforeEach(() => { // It is a Test Hook
    // beforeEach() is a test lifecycle hook used in automated testing to run setup code before every test case in a test suite.
    // beforeEach() runs before every it() test inside a describe() block.
    product = {
      // We are placing this outside the function so it can be accessed form anywhere,it can be accessed in both tests
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn();
  });

  it("displays the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />); // We have to pass the props as we are passing these props to Product component

    // For Product name
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs") // checks for the fake web page with element this type
    ).toBeInTheDocument(); // toBeInTheDocument() this is added by the testing-library

    // For Price
    expect(screen.getByText("$10.90")).toBeInTheDocument();

    // For image
    // We can't use getByText here so wew have tao add id to the image
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    ); // Checking whether the src attribute is equal to the image

    // For Stars
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`
    );

    // For Rating
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton); //it is asynchronous code
    // After clicking the button it sends the rquest to the backend,in our tests we should not contact a reaal backend

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled(); // Check whether our code called loadCart
  });
});
// to check we create fake webpage,we use screen for that
