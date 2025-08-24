import html from "../templates/template.html";
import css from "../css/styles.css";

const apiUrlAuthor = process.env.API_URL;
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
  #dataLoadedPromise;
  #resolvePromise;
  #rejectedPromise;
  #loading = false;
  #loadingElment;
  #articleContainer;
  #error;
  #errorElement;
  #data;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#hiddenInfo = this.shadowRoot.querySelector(".hidden-info");
    this.#authorInfo = this.shadowRoot.querySelector(".author-info");

    this.#articleContainer =
      this.shadowRoot.querySelector(".article-container");
    this.#loadingElment = this.shadowRoot.querySelector(".loading");

    this.#errorElement = this.shadowRoot.querySelector(".error");
    this.#error = false;

    this.#dataLoadedPromise = new Promise((resolve, reject) => {
      this.#resolvePromise = resolve;
      this.#rejectedPromise = reject;
    });
  }

  static get observedAttributes() {
    return [
      "image-src",
      "title-text",
      "company",
      "published-at",
      "description",
      "content",
      "author",
      "api-url",
      "id-item",
      "loading",
      "error",
      "data",
    ];
  }

  attributeChangedCallback(name, oldValue, newVal) {
    if (oldValue === newVal) return;

    switch (name) {
      case "image-src":
        this.#image = newVal;
        break;
      case "title-text":
        this.#title = newVal;
        break;
      case "company":
        this.#company = newVal;
        break;
      case "description":
        this.#description = newVal;
        break;
      case "content":
        this.#content = newVal;
        break;
      case "author":
        this.#author = newVal;
        break;
      case "api-url":
        this.#apiUrl = newVal;
        break;
      case "published-at":
        this.#publishedAt = newVal;
        break;
      case "id-item":
        this.#id = newVal;
        break;
      case "loading":
        this.#loading = newVal === "true" ? true : false;
        break;
      case "error":
        this.#error = newVal === "true" ? true : false;
        break;
      case "data":
        this.#data;
        break;
    }

    if (name === "loading") return this.updateLoadingState();

    if (name === "api-url") return this.fetchItemData();

    if (name === "error") return this.handleError();

    if (name === "data") {
      try {
        const data = JSON.parse(newVal);
        this.updateItemData(data);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
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
    this.setAttribute("loading", true);

    if (this.#controller) {
      this.#controller.abort();
    }

    this.#controller = new AbortController();
    const signal = this.#controller.signal;

    try {
      let response = await fetch(this.#apiUrl, { signal }),
        data = await response.json();
      if (!response.ok)
        throw { status: response.status, statusText: response.statusText };
      this.updateItemData(data);
      this.#resolvePromise();
    } catch (error) {
      this.setAttribute("error", true);
      console.error("Error fetching item data:", error);
      if (error.name === "AbortError")
        return console.log("Petición abortada antes de completarse.");
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
      this.#rejectedPromise(error);
    } finally {
      this.setAttribute("loading", false);
    }
  }

  updateLoadingState() {
    if (!this.#loading) {
      this.#articleContainer.classList.remove("none");
      this.#loadingElment.classList.add("none");
      return;
    }

    this.#articleContainer.classList.add("none");
    this.#loadingElment.classList.remove("none");
  }

  handleError() {
    if (this.#error) this.#articleContainer.style.display = "none";
    this.#errorElement.classList.remove("none");
  }

  updateItemData(data = {}) {
    this.#image = this.#image || data.image;
    this.#id = this.#id || data.id;
    this.#title = this.#title || data.title;
    this.#company = this.#company || data.company;
    this.#description = this.#description || data.description;
    this.#author = this.#author || data.author;
    this.#content = this.#content || data.content;
    this.#publishedAt = this.#publishedAt || data.publishedAt;

    const mappings = [
      { prop: this.#image, selector: ".image", attr: "src" },
      { prop: this.#id, selector: ".id", attr: "textContent" },
      {
        prop: this.#title,
        selector: ".title",
        attr: "textContent",
      },
      {
        prop: this.#company,
        selector: ".company",
        attr: "textContent",
      },
      {
        prop: this.#description,
        selector: ".description",
        attr: "textContent",
      },
      {
        prop: this.#author,
        selector: ".author",
        attr: "textContent",
      },
      {
        prop: this.#content,
        selector: ".content",
        attr: "textContent",
      },
      {
        prop: this.#publishedAt,
        selector: ".published-at",
        attr: "textContent",
      },
    ];

    mappings.forEach(({ prop, selector, attr }) => {
      const element = this.shadowRoot.querySelector(selector);
      if (!element) return;
      if (attr !== "textContent" && attr !== "src")
        return console.log(`El atributo ${attr} no es un atributo valido`);
      if (attr === "src") return element.setAttribute(attr, prop);
      element.textContent = prop;
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

    let url = `${apiUrlAuthor}?id=${this.#id}`,
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
    if (!this.#title) return this.#dataLoadedPromise.then(() => this.#title);
    return this.#title;
  }

  set title(val) {
    if (this.#title === val) return;
    this.setAttribute("title-text", val);
  }

  get image() {
    if (!this.#image) return this.#dataLoadedPromise.then(() => this.#image);
    return this.#image;
  }

  set image(val) {
    if (this.#image === val) return;
    this.setAttribute("image-src", val);
  }

  get company() {
    if (!this.#company)
      return this.#dataLoadedPromise.then(() => this.#company);
    return this.#company;
  }

  set company(val) {
    if (this.#company === val) return;
    this.setAttribute("company", val);
  }

  get description() {
    if (!this.#description)
      return this.#dataLoadedPromise.then(() => this.#description);
    return this.#description;
  }

  set description(val) {
    if (this.#description === val) return;
    this.setAttribute("description", val);
  }

  get author() {
    if (!this.#author) return this.#dataLoadedPromise.then(() => this.#author);
    return this.#author;
  }

  set author(val) {
    if (this.#author === val) return;
    this.setAttribute("author", val);
  }

  get content() {
    if (!this.#content)
      return this.#dataLoadedPromise.then(() => this.#content);
    return this.#content;
  }

  set content(val) {
    if (this.#content === val) return;
    this.setAttribute("content", val);
  }

  get publishedAt() {
    if (!this.#publishedAt)
      return this.#dataLoadedPromise.then(() => this.#publishedAt);
    return this.#publishedAt;
  }

  set publishedAt(val) {
    if (this.#publishedAt === val) return;
    this.setAttribute("published-at", val);
  }

  get id() {
    if (!this.#id) return this.#dataLoadedPromise.then(() => this.#id);
    return this.#id;
  }

  set id(val) {
    if (this.#id === val) return;
    this.setAttribute("id-item", val);
  }

  get apiUrl() {
    if (!this.#apiUrl) return this.#dataLoadedPromise.then(() => this.#apiUrl);
    return this.#apiUrl;
  }

  set apiUrl(val) {
    if (this.#apiUrl === val) return;
    this.setAttribute("api-url", val);
  }

  get loading() {
    if (!this.#loading)
      return this.#dataLoadedPromise.then(() => this.#loading);
    return this.#loading;
  }

  set loading(val) {
    if (this.#loading === val) return;
    this.setAttribute("loading", val);
  }
}

customElements.define("article-item", ArticleItem);

/* Aquí se prueba el desarrollo mediante la creación de una
   nueva instancia del web Compenent.
*/

const articleOne = document.getElementById("articleOne");

/* Aquí se atualiza con valores de la APi 

  - Los valores de las propiedades colocados directamente en el componente tienen prioridad sobre las que vienen
  mediante una petición a una API.
*/
articleOne.apiUrl =
  "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/1";

/* Estas asignaciones como se mencionó antes tendrán prioridad,
  es decir, que sobreescribiran la información traída desde la API.
*/

// articleOne.title = "Hola title desde JS";
// articleOne.author = "Hola autor desde JS";
// articleOne.company = "Hola compañia desde JS";
// articleOne.description = "Hola descrición desde JS";
// articleOne.content = "Hola contenido desde JS";
// articleOne.publishedAt = "Hola Fecha de publicación desde JS";
// articleOne.image =
//   "https://images.wikidexcdn.net/mwuploads/wikidex/a/ad/latest/20211225033009/EP1181_Gengar_de_Ash.png";

/* Ya que usamos promesas como medio para manejar la posible asincronia
   de las propiedades necesitaremos usar un mecanismo que permita el
   correcto manejo de promesas en este caso async await.
*/

const getArticleTitle = async () => {
  console.log("Información de intancia");
  try {
    const titleValue = await articleOne.title;
    console.log("Título:", titleValue);

    const authorValue = await articleOne.author;
    console.log("Autor:", authorValue);

    const companyValue = await articleOne.company;
    console.log("Compañía:", companyValue);

    const descriptionValue = await articleOne.description;
    console.log("Descripción:", descriptionValue);

    const contentValue = await articleOne.content;
    console.log("Contenido:", contentValue);

    const publishedAtValue = await articleOne.publishedAt;
    console.log("Fecha de publicación:", publishedAtValue);

    const idValue = await articleOne.id;
    console.log("ID:", idValue);
  } catch (error) {
    console.error(
      "Error al obtener la información del artículo:",
      error.message
    );
  }
};

// getArticleTitle();
