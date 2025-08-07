const template = document.createElement("template");

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
    const attributeMap = {
      "articles-api": "#articlesApi",
      "articles-arr": "#arrayArticles",
    };

    if (attributeMap[name]) {
      this[attributeMap[name]] = newVal;
    }

    if (nameAtr === "articles-api") {
      this.validateUrl();
    }
    if (nameAtr === "articles-arr") {
      this.displayArrData();
    }
  }

  validateUrl() {
    if (this.#articlesApi) return this.fetchData();

    console.error("API URL not provided.");
  }

  async fetchData() {
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
  }

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
    const array = JSON.parse(this.#arrayArticles);

    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

    array.forEach((article) => {
      const articleItem = document.createElement("article-item");
      articleItem.setAttribute("publishedat", article.publishedAt);
      articleItem.setAttribute("title-text", article.title);
      articleItem.setAttribute("image-src", article.image);
      articleItem.setAttribute("company", article.company);
      articleItem.setAttribute("description", article.description);
      articleItem.setAttribute("content", article.content);
      articleItem.setAttribute("author", article.author);
      articleItem.setAttribute("id-item", article.id);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
  }

  // getters y setters

  get articlesApi() {
    setTimeout(() => console.log(this.#articlesApi), 3000);
  }

  set articlesApi(val) {
    this.#articlesApi = val;
    this.setAttribute("articles-api", val);
  }

  get arrayArticles() {
    setTimeout(() => console.log(this.#arrayArticles), 3000);
  }

  set arrayArticles(val) {
    this.#arrayArticles = JSON.stringify(val);
    this.setAttribute("articles-arr", JSON.stringify(val));
  }
}

customElements.define("article-list", ArticleList);
