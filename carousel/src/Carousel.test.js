import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("render without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
})


it("should match snapshot", () => {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move forward to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Confirm we're on the second image
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // Move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("hides the left arrow on the first image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Left arrow should not be visible on the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument();

  // Right arrow should be visible
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrow).toBeInTheDocument();
});

it("hides the right arrow on the last image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Right arrow should not be visible on the last image
  expect(rightArrow).not.toBeInTheDocument();

  // Left arrow should be visible
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();
});




