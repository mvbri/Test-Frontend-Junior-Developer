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
  #dataLoadedPromise = null;
  #resolvePromise;
  #rejectedPromise;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#hiddenInfo = this.shadowRoot.querySelector(".hidden-info");
    this.#authorInfo = this.shadowRoot.querySelector(".author-info");

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
    ];
  }

  attributeChangedCallback(name, oldValue, newVal) {
    if (oldValue === newVal) {
      return;
    }
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
      this.#resolvePromise();
    } catch (error) {
      if (error.name === "AbortError")
        return console.log("Petición abortada antes de completarse.");
      let message = error.statusText || "Ocurrió un error";
      console.error("Error fetching item data:", message);
      this.#rejectedPromise(error);
    }
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
    if (!this.#title) return this.#dataLoadedPromise.then(() => this.#title);
    return this.#title;
  }

  set title(val) {
    this.#title = val;
    this.updateItemData();
  }

  get image() {
    if (!this.#image) return this.#dataLoadedPromise.then(() => this.#image);
    return this.#image;
  }

  set image(val) {
    this.#image = val;
    this.updateItemData();
  }

  get company() {
    if (!this.#company)
      return this.#dataLoadedPromise.then(() => this.#company);
    return this.#company;
  }

  set company(val) {
    this.#company = val;
    this.updateItemData();
  }

  get description() {
    if (!this.#description)
      return this.#dataLoadedPromise.then(() => this.#description);
    return this.#description;
  }

  set description(val) {
    this.#description = val;
    this.updateItemData();
  }

  get author() {
    if (!this.#author) return this.#dataLoadedPromise.then(() => this.#author);
    return this.#author;
  }

  set author(val) {
    this.#author = val;
    this.updateItemData();
  }

  get content() {
    if (!this.#content)
      return this.#dataLoadedPromise.then(() => this.#content);
    return this.#content;
  }

  set content(val) {
    this.#content = val;
    this.updateItemData();
  }

  get publishedAt() {
    if (!this.#publishedAt)
      return this.#dataLoadedPromise.then(() => this.#publishedAt);
    return this.#publishedAt;
  }

  set publishedAt(val) {
    this.#publishedAt = val;
    this.updateItemData();
  }

  get id() {
    if (!this.#id) return this.#dataLoadedPromise.then(() => this.#id);
    return this.#id;
  }

  set id(val) {
    this.#id = val;
    this.updateItemData();
  }

  get apiUrl() {
    if (!this.#apiUrl) return this.#dataLoadedPromise.then(() => this.#apiUrl);
    return this.#apiUrl;
  }

  set apiUrl(val) {
    if (this.#apiUrl === val) return;
    this.#apiUrl = val;

    this.validateApiUrl();
  }
}

customElements.define("article-item", ArticleItem);

/* Aquí se prueba el desarrollo mediante la creación de una
   nueva instancia del web Compenent.
*/

const articleOne = new ArticleItem();

/* Aquí se atualiza con valores de la APi 

  - Los valores traidos de la API tienen prioridad sobre las establecidad
    directamente con los setters.
*/
articleOne.apiUrl =
  "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/1";

/* Aquí insertamos la instancia del Web Compenent en el DOM */

document.body.appendChild(articleOne);

/* Estas asignaciones como se mencionó antes tendrán prioridad;
  es decir, que sobreescribiran la información de traída de API.
*/

articleOne.title = "Hola title";
articleOne.author = "Hola autor";
articleOne.company = "Hola compañia";
articleOne.description = "Hola descrición";
articleOne.content = "Hola contenido";
articleOne.publishedAt = "Hola Fecha de publicación";
articleOne.image =
  "https://images.wikidexcdn.net/mwuploads/wikidex/a/ad/latest/20211225033009/EP1181_Gengar_de_Ash.png";

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
