const reviews = [
  {
    question: "우리 가족이 잘 먹을까?",
    image: "./assets/review-family.png",
    alt: "가족이 하루에 서너 개씩 먹어 한 박스를 모두 먹었다는 실구매 후기",
  },
  {
    question: "실제로 아삭하고 달콤할까?",
    image: "./assets/review-taste.png",
    alt: "과즙이 진하고 달콤하며 단단하고 아삭하다는 실구매 후기",
  },
  {
    question: "온라인으로 주문해도 괜찮을까?",
    image: "./assets/review-order.png",
    alt: "판매자가 사과 보관법을 세심하게 안내하고 상품이 단단했다는 실구매 후기",
  },
  {
    question: "배송이 느려서 시들진 않을까?",
    image: "./assets/review-delivery.png",
    alt: "제주도에도 예정일보다 이틀 일찍 도착해 신선했다는 실구매 후기",
  },
];

const question = document.querySelector("#question");
const image = document.querySelector("#review-image");
const currentNumber = document.querySelector("#current-number");
const card = document.querySelector("#review-card");
const dots = document.querySelector("#dots");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let current = 0;

reviews.forEach((review, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "dot";
  dot.setAttribute("aria-label", `${index + 1}번째 후기: ${review.question}`);
  dot.addEventListener("click", () => render(index, index > current ? 1 : -1));
  dots.appendChild(dot);
});

function render(index, direction = 1) {
  current = (index + reviews.length) % reviews.length;
  const review = reviews[current];
  card.style.setProperty("--shift", `${direction * 14}px`);
  card.classList.remove("is-changing");
  void card.offsetWidth;
  question.textContent = review.question;
  image.src = review.image;
  image.alt = review.alt;
  currentNumber.textContent = String(current + 1).padStart(2, "0");
  [...dots.children].forEach((dot, dotIndex) => dot.setAttribute("aria-current", dotIndex === current ? "true" : "false"));
  card.classList.add("is-changing");
}

previous.addEventListener("click", () => render(current - 1, -1));
next.addEventListener("click", () => render(current + 1, 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") render(current - 1, -1);
  if (event.key === "ArrowRight") render(current + 1, 1);
});

render(0);
