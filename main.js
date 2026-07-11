import { books } from "./data.js";

const listEl = document.getElementById("bookList");

for (const book of books) {
  const li = document.createElement("li");
  li.textContent = `${book.title} by ${book.author} — ${book.rating}★`;
  listEl.appendChild(li);
}