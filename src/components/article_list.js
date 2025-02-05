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
    return ["articles_api", "articles_arr"];
  }

  attributeChangedCallback(nameAtr, oldVal, newVal) {
    const attributeMap = {
      articles_api: "_articlesApi",
      articles_arr: "_arrayArticles",
    };

    if (attributeMap[nameAtr]) {
      this[attributeMap[nameAtr]] = newVal;
    }
  }

  connectedCallback() {
    if (!this._articlesApi && !this._arrayArticles)
      return console.log("No haz ingresado ninguna data");

    if (this._articlesApi) this.validateUrl();
    if (this._arrayArticles) this.displayArrData();
  }

  validateUrl() {
    if (this._articlesApi) return this.fetchData();

    console.error("API URL not provided.");
  }

  async fetchData() {
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
    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

    data.forEach((article) => {
      const articleItem = document.createElement("article-item");
      articleItem.setAttribute("api_url", `${this._articlesApi}/${article.id}`);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
  }

  displayArrData() {
    const array = JSON.parse(this._arrayArticles);

    this.shadowRoot.querySelector(".articlesList").innerHTML = "";

    array.forEach((article) => {
      const articleItem = document.createElement("article-item");
      articleItem.setAttribute("publishedat", article.publishedAt);
      articleItem.setAttribute("title_text", article.title);
      articleItem.setAttribute("image_src", article.image);
      articleItem.setAttribute("company", article.company);
      articleItem.setAttribute("description", article.description);
      articleItem.setAttribute("content", article.content);
      articleItem.setAttribute("author", article.author);
      articleItem.setAttribute("id_item", article.id);
      articleItem.setAttribute("id", `article-${article.id}`);

      fragment.appendChild(articleItem);
    });
    this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
  }

  get articlesApi() {
    return this._articlesApi;
  }

  set articlesApi(val) {
    this._articlesApi = val;
    this.validateUrl();
  }

  get arrayArticles() {
    return this._arrayArticles;
  }

  set arrayArticles(val) {
    this._arrayArticles = JSON.stringify(val);
    this.displayArrData();
  }
}

window.customElements.define("article-list", ArticleList);

const articleList = document.querySelector("article-list");

// articleList.articlesApi =
//   "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles";

// articleList.arrayArticles = [
//   {
//     publishedAt: "2024-06-05T03:29:00.248Z",
//     title: "Modificado",
//     image: "https://loremflickr.com/640/480",
//     company: "Brakus, Hyatt and Lesch",
//     description: "Rerum molestiae quod numquam nisi aut...",
//     content:
//       "Veniam sint dolorum corporis vitae porro rem maiores earum doloribus...",
//     author: 1,
//     id: "1",
//   },
//   {
//     publishedAt: "2024-07-05T03:29:00.248Z",
//     title: "Modificado",
//     image: "https://loremflickr.com/320/240/dog",
//     company: "company 2",
//     description: "description 2",
//     content: "content 2",
//     author: "Matthew Sanford 4",
//     id: "2",
//   },
// ];
