const { rejects } = require("node:assert");

const template = document.createElement("template"),
  fragment = document.createDocumentFragment();

template.innerHTML = `<div class="articlesList"></div>`;

class ArticleList extends HTMLElement {
  #articlesApi;
  #arrayArticles;
  #controller = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["articles-api", "articles-arr"];
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
    }

    if (name === "articles-api") {
      this.validateUrl();
    }
    if (name === "articles-arr") {
      this.displayArrData();
    }
  }

  validateUrl() {
    if (this.#articlesApi) return this.fetchData();

    console.error("API URL not provided.");
  }

  fetchData = async () => {
    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

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
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
    }
  };

  displayDataApi(data) {
    data.forEach((article) => {
      const articleItem = document.createElement("article-item");
      articleItem.setAttribute("api-url", `${this.#articlesApi}/${article.id}`);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
  }

  displayArrData() {
    if (this.#articlesApi) return;

    let array =
      !typeof this.#arrayArticles === "string"
        ? (array = this.#arrayArticles)
        : JSON.parse(this.#arrayArticles);

    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

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
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
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
    this.setAttribute("articles-arr", val);
  }
}

customElements.define("article-list", ArticleList);

const list = document.getElementById("list");
