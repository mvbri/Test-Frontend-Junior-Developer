const template = document.createElement("template"),
  fragment = document.createDocumentFragment();

template.innerHTML = `<div class="articlesList"></div>`;

class ArticleList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._articlesApi;
    this._arrayArticles;
    this._controller = null;
  }

  static get observedAttributes() {
    return ["articles-api", "articles-arr"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const attributeMap = {
      "articles-api": "_articlesApi",
      "articles-arr": "_arrayArticles",
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
    if (this._articlesApi) return this.fetchData();

    console.error("API URL not provided.");
  }

  async fetchData() {
    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

    if (this._controller) {
      this._controller.abort();
    }

    this._controller = new AbortController();
    const signal = this._controller.signal;

    try {
      let response = await fetch(this._articlesApi, { signal });

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
      articleItem.setAttribute("api-url", `${this._articlesApi}/${article.id}`);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
  }

  displayArrData() {
    if (this._articlesApi) return;
    const array = JSON.parse(this._arrayArticles);

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
    setTimeout(() => console.log(this._articlesApi), 3000);
  }

  set articlesApi(val) {
    this._articlesApi = val;
    this.setAttribute("articles-api", val);
  }

  get arrayArticles() {
    setTimeout(() => console.log(this._arrayArticles), 3000);
  }

  set arrayArticles(val) {
    this._arrayArticles = JSON.stringify(val);
    this.setAttribute("articles-arr", JSON.stringify(val));
  }
}

customElements.define("article-list", ArticleList);

const articleList = document.querySelector("article-list");
