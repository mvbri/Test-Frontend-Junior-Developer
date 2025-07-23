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
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._hiddenInfo = this.shadowRoot.querySelector(".hidden-info");
    this._authorInfo = this.shadowRoot.querySelector(".author-info");
    this._image;
    this._title;
    this._company;
    this._description;
    this._author;
    this._content;
    this._publishedAt;
    this._apiUrl;
    this._id;
    this._controller = null;
    this._controllerListener = null;
  }

  static get observedAttributes() {
    return [
      "image_src",
      "title_text",
      "company",
      "publishedat",
      "description",
      "content",
      "author",
      "api_url",
      "id_item",
    ];
  }

  attributeChangedCallback(nameAtr, newVal) {
    const attributeMap = {
      image_src: "_image",
      title_text: "_title",
      company: "_company",
      description: "_description",
      content: "_content",
      author: "_author",
      api_url: "_apiUrl",
      publishedat: "_publishedAt",
      id_item: "_id",
    };

    if (attributeMap[nameAtr]) {
      this[attributeMap[nameAtr]] = newVal;
    }
    this.updateItemData();
  }

  connectedCallback() {
    this._controllerListener = new AbortController();
    const signal = this._controllerListener.signal;

    if (this._apiUrl) {
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
    this._controllerListener.abort();
  }

  validateApiUrl() {
    if (this._apiUrl) return this.fetchItemData();
    console.error("API URL not provided.");
  }

  async fetchItemData() {
    if (this._controller) {
      this._controller.abort();
    }

    this._controller = new AbortController();
    const signal = this._controller.signal;

    try {
      let response = await fetch(`${this._apiUrl}`, { signal }),
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
      { prop: "_image", key: "image", selector: ".image", attr: "src" },
      { prop: "_id", key: "id", selector: ".id", attr: "textContent" },
      {
        prop: "_title",
        key: "title",
        selector: ".title",
        attr: "textContent",
      },
      {
        prop: "_company",
        key: "company",
        selector: ".company",
        attr: "textContent",
      },
      {
        prop: "_description",
        key: "description",
        selector: ".description",
        attr: "textContent",
      },
      {
        prop: "_author",
        key: "author",
        selector: ".author",
        attr: "textContent",
      },
      {
        prop: "_content",
        key: "content",
        selector: ".content",
        attr: "textContent",
      },
      {
        prop: "_publishedAt",
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
    this._hiddenInfo.classList.toggle("hidden");
  }

  async fetchAuthorData(e) {
    e.stopPropagation();
    e.preventDefault();

    this._authorInfo.classList.toggle("hidden");

    if (this._authorInfo.classList.contains("hidden")) return;
    try {
      let url = `http://localhost:3000/authors?id=${this._id}`,
        response = await fetch(url),
        data = await response.json();

      if (!response.ok)
        throw { status: response.status, statusText: response.statusText };

      if (data.length === 0) return console.log("Autor no encontrado");

      this.displayAuthorInfo(data[0]);
    } catch (error) {
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
    }
  }

  displayAuthorInfo(author) {
    const authorInfo = `
            <img src=${author.avatar}></img>
            <p>${author.bio}</p>
            <p>${author.birthdate}</p>
            <p>${author.createdAt}</p>
          `;
    this._authorInfo.innerHTML = authorInfo;
  }

  // getters y setters

  get title() {
    setTimeout(() => console.log(this._title), 3000);
  }

  set title(val) {
    this._title = val;
    this.updateItemData();
  }

  get image() {
    setTimeout(() => console.log(this._image), 3000);
  }

  set image(val) {
    this._image = val;
    this.updateItemData();
  }

  get company() {
    setTimeout(() => console.log(this._company), 3000);
  }

  set company(val) {
    this._company = val;
    this.updateItemData();
  }

  get description() {
    setTimeout(() => console.log(this._description), 3000);
  }

  set description(val) {
    this._description = val;
    this.updateItemData();
  }

  get author() {
    setTimeout(() => console.log(this._author), 3000);
  }

  set author(val) {
    this._author = val;
    this.updateItemData();
  }

  get content() {
    setTimeout(() => console.log(this._content), 3000);
  }

  set content(val) {
    this._content = val;
    this.updateItemData();
  }

  get publishedat() {
    setTimeout(() => console.log(this._publishedAt), 3000);
  }

  set publishedat(val) {
    this._publishedAt = val;
    this.updateItemData();
  }

  get apiUrl() {
    setTimeout(() => console.log(this._apiUrl), 3000);
  }

  set apiUrl(val) {
    if (this._apiUrl === val) return;
    this._apiUrl = val;

    this.validateApiUrl();
  }
}

customElements.define("article-item", ArticleItem);

const articleOne = new ArticleItem();

articleOne.apiUrl =
  "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/1";

articleOne.setAttribute("id_item", "1");
document.body.appendChild(articleOne);
