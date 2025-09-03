import html from "../templates/template-filter.html";
import css from "../css/filter.css";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${css}
  </style>
  ${html}
`;

class Filter extends HTMLElement {
  #sortBy;
  #order;
  #searchQuery;
  #searchInput;
  #sortKey;
  #urlQuery;
  #articlesInfo;
  #controllerListener;
  #sortDirection;
  #articleList;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#searchInput = this.shadowRoot.querySelector("#searchInput");
    this.#articleList = document.createElement("article-list");
    this.#sortKey = this.shadowRoot.getElementById("sortKey");
    this.#sortDirection = this.shadowRoot.getElementById("sortDirection");
  }

  static get observedAttributes() {
    return ["articles-info"];
  }

  attributeChangedCallback(name, oldValue, newVal) {
    if (oldValue === newVal) return;

    switch (name) {
      case "articles-info":
        this.#articlesInfo = newVal;
        break;
    }
  }

  connectedCallback() {
    this.render();
    this.#controllerListener = new AbortController();
    const signal = this.#controllerListener.signal;
    this.#searchInput.addEventListener(
      "input",
      (e) =>
        this.search.bind(this, e.target.value, this.#sortBy, this.#order)(),
      {
        signal,
      }
    );
    this.#sortKey.addEventListener(
      "input",
      (e) => this.sort.bind(this, e.target.value, this.#order)(),
      {
        signal,
      }
    );
    this.#sortDirection.addEventListener(
      "input",
      (e) => this.order.bind(this, e.target.value)(),
      { signal }
    );
  }

  disconnectedCallback() {
    this.#controllerListener.abort();
  }

  render() {
    this.#urlQuery = new URL(this.#articlesInfo);

    let urlParams = new URLSearchParams(window.location.search);
    this.#searchQuery = urlParams.get("search") || "";
    this.#sortBy = urlParams.get("sortBy") || "title";
    this.#order = urlParams.get("order") || "desc";

    this.search(this.#searchQuery);

    this.shadowRoot
      .querySelector("#articlesContainer")
      .appendChild(this.#articleList);
  }

  #updateUrl(queryUrl) {
    const url = new URL(window.location.href);

    if (!queryUrl) {
      url.searchParams.delete("search");
      url.searchParams.delete("sortBy");
      url.searchParams.delete("order");
      return;
    }

    const searchVal = queryUrl.searchParams.get("search") || "all";
    const sortVal = queryUrl.searchParams.get("sortBy") || "title";
    const orderVal = queryUrl.searchParams.get("order") || "desc";

    url.searchParams.set("search", searchVal);
    url.searchParams.set("sortBy", sortVal);
    url.searchParams.set("order", orderVal);
    window.history.pushState({}, "", url.toString());
  }

  search(query) {
    this.#searchQuery = query;

    // Para evitar que se hagan busquedas demasiado generales.
    if (query.length < 3 && query.length !== 0) return;

    if (query.length === 0) {
      this.#articleList.articlesApi = `${this.#articlesInfo}`;
      this.#updateUrl();
      return;
    }

    this.#urlQuery.searchParams.set("search", query);

    this.sort(this.#sortBy, this.#order);
  }

  sort(category, order) {
    if (!order) this.#order = "desc";

    const query = this.#urlQuery.searchParams.get("search") || "all";
    this.#urlQuery.searchParams.set("search", query);
    this.#urlQuery.searchParams.set("sortBy", category);
    this.#urlQuery.searchParams.set("order", this.#order);

    this.#sortBy = category;

    this.#articleList.articlesApi = `${this.#urlQuery}`;

    this.#updateUrl(this.#urlQuery);
  }

  order(val) {
    const query = this.#urlQuery.searchParams.get("search") || "all";
    this.#urlQuery.searchParams.set("search", query);

    this.#sortBy = this.#urlQuery.searchParams.get("sortBy") || "title";
    this.#urlQuery.searchParams.set("sortBy", this.#sortBy);

    this.#order = val;
    this.#urlQuery.searchParams.set("order", this.#order);

    this.#articleList.articlesApi = `${this.#urlQuery}`;
    this.#updateUrl(this.#urlQuery);
  }
}
customElements.define("article-filter", Filter);

const filter = document.querySelector("#filter");
