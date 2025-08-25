import html from "../templates/template-author.html";
import css from "../css/author.css";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${css}
  </style>
  ${html}
`;

class Author extends HTMLElement {
  #name;
  #avatar;
  #birthdate;
  #bio;
  #url;
  #loading = false;
  #dataLoadedPromise;
  #resolvePromise;
  #rejectedPromise;
  #loadingElement;
  #articleElement;
  #error = false;
  #errorElement;
  #setApi;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#loadingElement = this.shadowRoot.querySelector(".loading");
    this.#articleElement = this.shadowRoot.querySelector(".author-container");
    this.#errorElement = this.shadowRoot.querySelector(".error");

    this.#dataLoadedPromise = new Promise((resolve, reject) => {
      this.#resolvePromise = resolve;
      this.#rejectedPromise = reject;
    });
  }

  static get observedAttributes() {
    return [
      "name",
      "avatar-img",
      "birthdate",
      "bio",
      "url-api",
      "loading",
      "error",
    ];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) return;

    switch (name) {
      case "name":
        this.#name = newVal;
        break;
      case "avatar-img":
        this.#avatar = newVal;
        break;
      case "birthdate":
        this.#birthdate = newVal;
        break;
      case "bio":
        this.#bio = newVal;
        break;
      case "url-api":
        this.#url = newVal;
        break;
      case "loading":
        this.#loading = newVal === "true" ? true : false;
        break;
      case "error":
        this.#error = newVal === "true" ? true : false;
        break;
    }

    if (name === "url-api") return this.validateUrl();
    if (name === "loading") return this.updateLoadingState();
    if (name === "error") return this.handleError();
  }

  validateUrl() {
    if (this.#url) return this.fetchData();
    console.error("API URL not provided.");
  }

  async fetchData() {
    this.setAttribute("loading", true);
    try {
      let response = await fetch(this.#url);
      let data = await response.json();

      if (!response.ok) {
        throw { status: response.status, statusText: response.statusText };
      }

      this.displayData(data);
      this.#resolvePromise();
    } catch (error) {
      this.setAttribute("error", true);
      let message = error.statusText || "Ha ocurrido un error";
      console.error("Error fetching item data:", message);
      this.shadowRoot.querySelector(".error").style.display = "block";
      this.#rejectedPromise(error);
    } finally {
      this.setAttribute("loading", false);
    }
  }

  updateLoadingState() {
    if (!this.#loading) {
      this.#loadingElement.classList.add("none");
      this.#articleElement.classList.remove("none");
      return;
    }
    this.#loadingElement.classList.remove("none");
    this.#articleElement.classList.add("none");
  }

  handleError() {
    if (this.#error) this.#articleElement.style.display = "none";
    this.#errorElement.classList.remove("none");
  }

  displayData(data) {
    const mappings = [
      { prop: "#avatar", key: "avatar", selector: ".avatar", attr: "src" },
      { prop: "#name", key: "name", selector: ".name", attr: "textContent" },
      {
        prop: "#birthdate",
        key: "birthdate",
        selector: ".birthdate",
        attr: "textContent",
      },
      {
        prop: "#bio",
        key: "bio",
        selector: ".bio",
        attr: "textContent",
      },
    ];

    mappings.forEach(({ prop, key, selector, attr }) => {
      if (this.#setApi) this[prop] = "";
      this[prop] = this[prop] || data[key];
      const element = this.shadowRoot.querySelector(selector);
      if (element) {
        if (attr !== "textContent" && attr !== "src")
          return console.log(`El atributo ${attr} no es un atributo valido`);
        if (attr === "textContent") return (element.textContent = this[prop]);

        element.setAttribute(attr, this[prop]);
      }
    });
  }

  updateUI() {
    this.displayData({
      name: this.#name,
      avatar: this.#avatar,
      birthdate: this.#birthdate,
      bio: this.#bio,
    });
  }

  // getters y setters
  get name() {
    if (!this.#name) return this.#dataLoadedPromise.then(() => this.#name);
    return this.#name;
  }

  set name(val) {
    this.#name = val;
    this.updateUI();
  }

  get avatar() {
    if (!this.#avatar) return this.#dataLoadedPromise.then(() => this.#avatar);
    return this.#avatar;
  }

  set avatar(val) {
    this.#avatar = val;
    this.updateUI();
  }

  get birthdate() {
    if (!this.#birthdate)
      return this.#dataLoadedPromise.then(() => this.#birthdate);
    return this.#birthdate;
  }

  set birthdate(val) {
    this.#birthdate = val;
    this.updateUI();
  }

  get bio() {
    if (!this.#bio) return this.#dataLoadedPromise.then(() => this.#bio);
    return this.#bio;
  }

  set bio(val) {
    this.#bio = val;
    this.updateUI();
  }

  get urlApi() {
    if (!this.#url) return this.#dataLoadedPromise.then(() => this.#url);
    return this.#url;
  }

  set urlApi(val) {
    if (this.#url === val) return;
    this.#url = val;

    this.#setApi = true;
    this.validateUrl();
  }

  get loading() {
    if (!this.#loading)
      return this.#dataLoadedPromise.then(() => this.#loading);
    return this.#loading;
  }

  set loading(val) {
    console.log("hola");
    this.#dataLoadedPromise.then(() => this.setAttribute("loading", val));
  }
}

customElements.define("author-item", Author);

const author1 = document.getElementById("author");
