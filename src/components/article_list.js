import html from "../templates/template-list.html";
import css from "../css/article-list.css";

const template = document.createElement("template"),
  fragment = document.createDocumentFragment();

template.innerHTML = `
  <style>
    ${css}
  </style>
  ${html}
`;

class ArticleList extends HTMLElement {
  #articlesApi;
  #arrayArticles;
  #controller = null;
  #articleContainer;
  #loadingElement;
  #loading = false;
  #errorElement;
  #error = false;
  #dataLoadedPromise = null;
  #resolvePromise;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#articleContainer =
      this.shadowRoot.querySelector(".article-container");
    this.#loadingElement = this.shadowRoot.querySelector(".loading");
    this.#errorElement = this.shadowRoot.querySelector(".error");

    this.#dataLoadedPromise = new Promise((resolve) => {
      this.#resolvePromise = resolve;
    });
  }

  static get observedAttributes() {
    return ["articles-api", "articles-arr", "loading", "error"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) return;

    switch (name) {
      case "articles-api":
        this.#articlesApi = newVal;
        break;
      case "articles-arr":
        this.#arrayArticles = newVal;
        break;
      case "loading":
        this.#loading = newVal;
        break;
      case "error":
        this.#error = newVal;
        break;
    }

    if (name === "articles-api") return this.validateUrl();

    if (name === "loading") return this.updateLoadingState();

    if (name === "error") return this.hadleError();

    if (name === "articles-arr") this.displayArrData();
  }

  validateUrl() {
    if (this.#articlesApi) return this.fetchData();

    console.error("API URL not provided.");
  }

  fetchData = async () => {
    this.setAttribute("loading", true);

    if (this.#controller) {
      this.#controller.abort();
    }

    this.#controller = new AbortController();
    const signal = this.#controller.signal;

    try {
      let response = await fetch(this.#articlesApi, { signal });

      if (!response.ok)
        throw { status: response.status, statusText: response.statusText };

      let data = await response.json();
      this.displayDataApi(data);
    } catch (error) {
      this.setAttribute("error", true);
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
    } finally {
      this.setAttribute("loading", false);
      this.#resolvePromise();
    }
  };

  updateLoadingState() {
    if (this.#loading === "false") {
      this.#articleContainer.classList.remove("none");
      this.#loadingElement.classList.add("none");
      return;
    }
    this.#articleContainer.classList.add("none");
    this.#loadingElement.classList.remove("none");
  }

  hadleError() {
    if (this.#error === "false") {
      this.#articleContainer.classList.remove("none");
      this.#errorElement.classList.add("none");
      return;
    }

    this.#articleContainer.classList.add("none");
    this.#errorElement.classList.remove("none");
  }

  displayDataApi(data) {
    data.forEach((article) => {
      const articleItem = document.createElement("article-item");
      articleItem.setAttribute("api-url", `${this.#articlesApi}/${article.id}`);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.#articleContainer.appendChild(fragment);
  }

  displayArrData() {
    if (this.#articlesApi) return;

    let array = JSON.parse(this.#arrayArticles);

    array.forEach((article) => {
      const articleItem = document.createElement("article-item");

      const mappings = {
        "published-at": article.publishedAt,
        "title-text": article.title,
        "image-src": article.image,
        company: article.company,
        description: article.description,
        content: article.content,
        author: article.author,
        "id-item": article.id,
        id: `article-${article.id}`,
      };

      for (const [clave, valor] of Object.entries(mappings))
        articleItem.setAttribute(clave, valor);

      fragment.appendChild(articleItem);
    });
    this.#articleContainer.appendChild(fragment).appendChild(fragment);
  }

  // getters y setters

  get articlesApi() {
    return this.#articlesApi;
  }

  set articlesApi(val) {
    this.setAttribute("articles-api", val);
  }

  get arrayArticles() {
    return this.#arrayArticles;
  }

  set arrayArticles(val) {
    this.setAttribute("articles-arr", JSON.stringify(val));
  }

  get loading() {
    return this.#dataLoadedPromise.then(() => this.#loading);
  }

  set loading(val) {
    this.setAttribute("loading", val);
  }

  get error() {
    return this.#dataLoadedPromise.then(() => this.#error);
  }

  set error(val) {
    this.setAttribute("error", val);
  }
}

customElements.define("article-list", ArticleList);

// const list = document.getElementById("list");

// list.arrayArticles = [
//   {
//     publishedAt: "2024-06-05T03:29:00.248Z",
//     title: "hola",
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDKjl2MgiRWOJ-2yEkhwBasVBsikrQHS8iJszYp9av3HZUTFwLzPEAYKNjQ26znbUP2NaNlex5vnxalw_qF3mhOPAsai3W8Cg8DO2dPm5ZWUPY0x9V0uwDwHS0YisdXhHbyPxuphDnPdk/s640/Pokemon+%252831%2529.png",
//     company: "Brakus, Hyatt and Lesch",
//     description: "Rerum molestiae quod numquam nisi aut...",
//     content:
//       "Veniam sint dolorum corporis vitae porro rem maiores earum doloribus...",
//     author: 1,
//     id: "1",
//   },
//   {
//     publishedAt: "2024-07-05T03:29:00.248Z",
//     title: "Hola 2",
//     image:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfXlDZYV5EqH2rr-gJ12MpVDCkv7mr1kBT21AAx1QfWrwVSK0rwSDGjfjj-I0N_T1mndx5jXEiyaRGRSw-wVnY_OPAZiIk3NftujrJQXMBsuCwUNoJ8UbtYtRoWFtRAEmkrh7ryFMV9p8/s1600/Pokemon+%25288%2529.png",
//     company: "company 2",
//     description: "description 2",
//     content: "content 2",
//     author: 60,
//     id: "2",
//   },
// ];
