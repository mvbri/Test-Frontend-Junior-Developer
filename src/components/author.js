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
  <div class="error">Error fetching author data.</div>

    <article>
      <img class="avatar" />
      <h2 class="name"></h2>
      <h3 class="birthdate"></h3>
      <p class="bio"></p>
    </article>
`;

class Author extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._name;
    this._avatar;
    this._birthdate;
    this._bio;
    this._url;
    this._loading = false;
  }

  static get observedAttributes() {
    return ["name", "avatar_img", "birthdate", "bio", "url_api"];
  }

  attributeChangedCallback(nameAtr, oldVal, newVal) {
    const attributeMap = {
      name: "_name",
      avatar_img: "_avatar",
      birthdate: "_birthdate",
      bio: "_bio",
      url_api: "_url",
      loading: "_loading",
    };

    if (attributeMap[nameAtr]) {
      this[attributeMap[nameAtr]] = newVal;
    }

    if (nameAtr === "url_api") return this.validateUrl();
  }

  validateUrl() {
    if (this._url) return this.fetchData();
    console.error("API URL not provided.");
  }

  async fetchData() {
    this.loading = true;
    try {
      let response = await fetch(this._url);
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
      this.loading = false;
    }
  }

  updateLoadingState() {
    const loadingElement = this.shadowRoot.querySelector(".loading");
    const articleElement = this.shadowRoot.querySelector("article");
    const errorElement = this.shadowRoot.querySelector(".error");

    if (this._loading) {
      loadingElement.style.display = "block";
      articleElement.style.display = "none";
      errorElement.style.display = "none";
    } else {
      loadingElement.style.display = "none";
      articleElement.style.display = "flex";
    }
  }

  displayData(data) {
    const mappings = [
      { prop: "_avatar", key: "avatar", selector: ".avatar", attr: "src" },
      { prop: "_name", key: "name", selector: ".name", attr: "textContent" },
      {
        prop: "_birthdate",
        key: "birthdate",
        selector: ".birthdate",
        attr: "textContent",
      },
      {
        prop: "_bio",
        key: "bio",
        selector: ".bio",
        attr: "textContent",
      },
    ];

    mappings.forEach(({ prop, key, selector, attr }) => {
      if (this._setApi) this[prop] = "";
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
      name: this._name,
      avatar: this._avatar,
      birthdate: this._birthdate,
      bio: this._bio,
    });
  }

  // getters y setters
  get name() {
    return this._name;
  }

  set name(val) {
    this._name = val;
    this.updateUI();
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(val) {
    this._avatar = val;
    this.updateUI();
  }

  get birthdate() {
    return this._birthdate;
  }

  set birthdate(val) {
    this._birthdate = val;
    this.updateUI();
  }

  get bio() {
    return this._bio;
  }

  set bio(val) {
    this._bio = val;
    this.updateUI();
  }

  get urlApi() {
    return this._url;
  }

  set urlApi(val) {
    if (this._url === val) return;
    this._url = val;

    this._setApi = true;
    this.validateUrl();
  }

  get loading() {
    return this._loading;
  }

  set loading(val) {
    const prevState = this._loading;
    if (prevState !== val) {
      this._loading = val;
      this.updateLoadingState();
    }
  }
}

customElements.define("author-item", Author);

const author = document.querySelector("author-item");

// author.name = "Edmundo";
// author.bio = "Presidente";
// author.birthdate = "el 28";
// author.avatar =
//   "https://media.istockphoto.com/id/1995160642/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude-shot-wide-angle-against-the-sky.jpg?s=1024x1024&w=is&k=20&c=0YTSZagubBiD6QQw01mFu-BLcbm0A5mKfRoLuoh3b6s=";

// author.urlApi = "http://localhost:3000/authors/1";
