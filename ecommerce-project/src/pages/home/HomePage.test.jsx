import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react"; // renders a component in a fake webpage,screen checks the fake web page
import { MemoryRouter } from "react-router"; // specificaally for testing
import axios from "axios"; // Fake version
import { HomePage } from "./HomePage";

vi.mock("axios"); //mocking axios
// In HomePage axios.get gets the product details and displays it, we return something in HomePage
// So we need to mock the implementation = make the mock   do whatever we want
describe("HomePage component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      // When ever we want to get something, it runs this function
      if (urlPath === "/api/products") {
        return {
          // the following should match the reponse we are getting from axios.get
          data: [
            // it should return data property which should be an array
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correct", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />;
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText(
        "Intermediate Size Basketball"
      )
    ).toBeInTheDocument();

  });
});
// within() lets us find thing within a specific element
