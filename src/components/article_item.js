import html from "../template.html";
import css from "../styles.css";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${css}
  </style>
  ${html}
`;

class ArticleItem extends HTMLElement {
  #image;
  #title;
  #company;
  #description;
  #author;
  #content;
  #publishedAt;
  #apiUrl;
  #id;
  #hiddenInfo;
  #authorInfo;
  #controller = null;
  #controllerListener = null;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#hiddenInfo = this.shadowRoot.querySelector(".hidden-info");
    this.#authorInfo = this.shadowRoot.querySelector(".author-info");
  }

  static get observedAttributes() {
    return [
      "image-src",
      "title-text",
      "company",
      "publishedat",
      "description",
      "content",
      "author",
      "api-url",
      "id-item",
    ];
  }

  attributeChangedCallback(name, oldValue, newVal) {
    const attributeMap = {
      "image-src": "#image",
      "title-text": "#title",
      company: "#company",
      description: "#description",
      content: "#content",
      author: "#author",
      "api-url": "#apiUrl",
      publishedat: "#publishedAt",
      "id-item": "#id",
    };

    if (attributeMap[name]) {
      this[attributeMap[name]] = newVal;
    }
    this.updateItemData();
  }

  connectedCallback() {
    this.#controllerListener = new AbortController();
    const signal = this.#controllerListener.signal;

    if (this.#apiUrl) {
      this.validateApiUrl();
    }

    this.shadowRoot
      .querySelector("article")
      .addEventListener("click", this.toggleDetails.bind(this), {
        signal,
      });

    this.shadowRoot
      .querySelector(".author")
      .addEventListener("click", this.fetchAuthorData.bind(this), {
        signal,
      });
  }

  disconnectedCallback() {
    this.#controllerListener.abort();
  }

  validateApiUrl() {
    if (this.#apiUrl) return this.fetchItemData();
    console.error("API URL not provided.");
  }

  async fetchItemData() {
    if (this.#controller) {
      this.#controller.abort();
    }

    this.#controller = new AbortController();
    const signal = this.#controller.signal;

    try {
      let response = await fetch(`${this.#apiUrl}`, { signal }),
        data = await response.json();
      if (!response.ok)
        throw { status: response.status, statusText: response.statusText };

      this.updateItemData(data);
    } catch (error) {
      if (error.name === "AbortError")
        return console.log("Petición abortada antes de completarse.");
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
    }
  }

  updateItemData(data = {}) {
    const mappings = [
      { prop: "#image", key: "image", selector: ".image", attr: "src" },
      { prop: "#id", key: "id", selector: ".id", attr: "textContent" },
      {
        prop: "#title",
        key: "title",
        selector: ".title",
        attr: "textContent",
      },
      {
        prop: "#company",
        key: "company",
        selector: ".company",
        attr: "textContent",
      },
      {
        prop: "#description",
        key: "description",
        selector: ".description",
        attr: "textContent",
      },
      {
        prop: "#author",
        key: "author",
        selector: ".author",
        attr: "textContent",
      },
      {
        prop: "#content",
        key: "content",
        selector: ".content",
        attr: "textContent",
      },
      {
        prop: "#publishedAt",
        key: "publishedAt",
        selector: ".published-at",
        attr: "textContent",
      },
    ];

    mappings.forEach(({ prop, key, selector, attr }) => {
      this[prop] = this[prop] || data[key];
      const element = this.shadowRoot.querySelector(selector);
      if (!element) return;
      if (attr !== "textContent" && attr !== "src")
        return console.log(`El atributo ${attr} no es un atributo valido`);
      if (attr === "textContent") return (element.textContent = this[prop]);
      element.setAttribute(attr, this[prop]);
    });
  }

  toggleDetails() {
    this.#hiddenInfo.classList.toggle("hidden");
  }

  async fetchAuthorData(e) {
    e.stopPropagation();
    e.preventDefault();

    this.#authorInfo.classList.toggle("hidden");

    if (this.#authorInfo.classList.contains("hidden")) return;

    console.log(this.#id);

    let url = `http://localhost:3000/authors?id=${this.#id}`,
      response = await fetch(url).catch((e) => {
        throw ErrorApiRequest(`Error en la petición: ${e}`);
      });
    if (response instanceof Error) return console.log(response);
    let data = await response.json();

    if (data.length === 0) return console.log("Autor no encontrado");

    this.displayAuthorInfo(data[0]);
  }

  displayAuthorInfo(author) {
    const authorInfo = `
            <img src=${author.avatar}></img>
            <p>${author.bio}</p>
            <p>${author.birthdate}</p>
            <p>${author.createdAt}</p>
          `;
    this.#authorInfo.innerHTML = authorInfo;
  }

  // getters y setters

  get title() {
    setTimeout(() => console.log(this.#title), 3000);
  }

  set title(val) {
    this.#title = val;
    this.updateItemData();
  }

  get image() {
    setTimeout(() => console.log(this.#image), 3000);
  }

  set image(val) {
    this.#image = val;
    this.updateItemData();
  }

  get company() {
    setTimeout(() => console.log(this.#company), 3000);
  }

  set company(val) {
    this.#company = val;
    this.updateItemData();
  }

  get description() {
    setTimeout(() => console.log(this.#description), 3000);
  }

  set description(val) {
    this.#description = val;
    this.updateItemData();
  }

  get author() {
    setTimeout(() => console.log(this.#author), 3000);
  }

  set author(val) {
    this.#author = val;
    this.updateItemData();
  }

  get content() {
    setTimeout(() => console.log(this.#content), 3000);
  }

  set content(val) {
    this.#content = val;
    this.updateItemData();
  }

  get publishedat() {
    setTimeout(() => console.log(this.#publishedAt), 3000);
  }

  set publishedat(val) {
    this.#publishedAt = val;
    this.updateItemData();
  }

  get apiUrl() {
    setTimeout(() => console.log(this.#apiUrl), 3000);
  }

  set apiUrl(val) {
    if (this.#apiUrl === val) return;
    this.#apiUrl = val;

    this.validateApiUrl();
  }
}

customElements.define("article-item", ArticleItem);

// const articleOne = new ArticleItem();

// articleOne.apiUrl =
//   "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/1";

// document.body.appendChild(articleOne);
