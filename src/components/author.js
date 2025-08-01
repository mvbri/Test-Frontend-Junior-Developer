const template = document.createElement("template");

template.innerHTML = `


  <style>

    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      min-height: 100vh;
      margin: 0 auto;
      margin-bottom: 2rem;
      background: #f8f9f9;
      border-radius: 25px;
      cursor: pointer;
      padding: 2rem;
    }

    .avatar {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border-radius: 50%;
    }
  
    .loading {
      color: purple;
      text-align: center;
      display: none;
    }

    .error {
      display: none;
      text-align: center;
    }

  </style>

  <div class="loading">
    <span>Loading...</span>
  </div>

  <div class="error">Error fetching autor data.</div>

  <article>
    <img class="avatar" />
    <h2 class="name"></h2>
    <h3 class="birthdate"></h3>
    <p class="bio"></p>
  </article>
`;

class Author extends HTMLElement {
  #name;
  #avatar;
  #birthdate;
  #bio;
  #url;
  #loading = false;
  #setApi;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["name", "avatar-img", "birthdate", "bio", "url-api", "loading"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const attributeMap = {
      name: "#name",
      "avatar-img": "#avatar",
      birthdate: "#birthdate",
      bio: "#bio",
      "url-api": "#url",
      loading: "#loading",
    };

    if (attributeMap[name]) {
      this[attributeMap[name]] = newVal;
    }

    if (name === "url-api") return this.validateUrl();
    if (name === "loading") return this.updateLoadingState();
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
    } catch (error) {
      let message = error.statusText || "Ha ocurrido un error";
      console.error("Error fetching item data:", message);
      this.shadowRoot.querySelector(".error").style.display = "block";
    } finally {
      this.setAttribute("loading", false);
    }
  }

  updateLoadingState() {
    const loadingElement = this.shadowRoot.querySelector(".loading"),
      articleElement = this.shadowRoot.querySelector("article"),
      errorElement = this.shadowRoot.querySelector(".error");

    if (this.#loading !== "true") {
      loadingElement.style.display = "none";
      articleElement.style.display = "flex";
      return;
    }
    loadingElement.style.display = "block";
    articleElement.style.display = "none";
    errorElement.style.display = "none";
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
    setTimeout(() => console.log(this.#name), 3000);
  }

  set name(val) {
    this.#name = val;
    this.updateUI();
  }

  get avatar() {
    setTimeout(() => console.log(this.#avatar), 3000);
  }

  set avatar(val) {
    this.#avatar = val;
    this.updateUI();
  }

  get birthdate() {
    setTimeout(() => console.log(this.#birthdate), 3000);
  }

  set birthdate(val) {
    this.#birthdate = val;
    this.updateUI();
  }

  get bio() {
    setTimeout(() => console.log(this.#bio), 3000);
  }

  set bio(val) {
    this.#bio = val;
    this.updateUI();
  }

  get urlApi() {
    setTimeout(() => console.log(this.#url), 3000);
  }

  set urlApi(val) {
    if (this.#url === val) return;
    this.#url = val;

    this.#setApi = true;
    this.validateUrl();
  }

  get loading() {
    setTimeout(() => console.log(this.#loading), 3000);
  }

  set loading(val) {
    setTimeout(() => this.setAttribute("loading", val), 3000);
  }
}

customElements.define("author-item", Author);
