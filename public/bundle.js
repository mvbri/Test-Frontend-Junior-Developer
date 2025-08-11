
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {

  var html = "<article>\r\n  <div class=\"img-container\">\r\n    <slot name=\"image\">\r\n      <img class=\"image\" alt=\"Imagen por defecto\" src=\"./img/img-default.jpg\">\r\n    </slot>\r\n  </div>\r\n    <span class=\"id\"><slot name=\"id\">ID por defecto</slot></span>\r\n    <h2 class=\"title\"><slot name=\"title\">Titulo por Defecto</slot></h2>\r\n    <h3 class=\"company\"><slot name=\"company\">Compañía por defecto</slot></h3>\r\n    <p class=\"description\"><slot name=\"description\">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates odit blanditiis tenetur. Dicta tempore ducimus animi numquam obcaecati voluptatem soluta alias sunt. Recusandae, non earum! Magni facere commodi corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, accusamus provident facilis nihil iure animi et. Quisquam asperiores voluptates eligendi repudiandae ad labore expedita tenetur adipisci, eveniet recusandae, dicta dolorem?</slot></p>\r\n    <div class=\"hidden-info hidden\">\r\n      <a href=\"#\" class=\"author\"><slot name=\"author\">Autor por defecto</slot></a>\r\n      <div class=\"author-info hidden\"></div>\r\n      <p class=\"content\"><slot name=\"author-content\">Contenido por defecto.</slot></p>\r\n      <p class=\"published-at\"><slot name=\"author-published\">fecha por defecto</slot></p>\r\n    </div>\r\n</article>";

  var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Maven+Pro:wght@400..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap\");\r\n\r\narticle {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 80%;\r\n  min-height: 100vh;\r\n  margin: 0 auto;\r\n  margin-bottom: 2rem;\r\n  border: 1px solid #ac8cff;\r\n  box-shadow: -1px 2px 9px 3px #ac8cff;\r\n  border-radius: 25px;\r\n  cursor: pointer;\r\n  padding-bottom: 2rem;\r\n}\r\n\r\narticle * {\r\n  margin: 0;\r\n}\r\n\r\n.img-container {\r\n  width: 100%;\r\n}\r\n\r\nimg {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  -o-object-position: 50% 45%;\r\n     object-position: 50% 45%;\r\n  width: 100%;\r\n  height: 31.25rem;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n::slotted(img) {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  width: 100%;\r\n  height: auto;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n.title {\r\n  color: rgb(39, 36, 36);\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.hidden-info {\r\n  padding-top: 1.5rem;\r\n  opacity: 1;\r\n  visibility: visible;\r\n  place-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n}\r\n\r\n.description {\r\n  color: rgb(49, 48, 48);\r\n  text-align: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.author,\r\n.company,\r\n.description,\r\n.published-at,\r\n.content {\r\n  color: rgb(39, 36, 36);\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.id {\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  color: rgb(39, 36, 36);\r\n  font-weight: bold;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.id::before {\r\n  content: \"# \";\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.author {\r\n  color: blue;\r\n  font-weight: bold;\r\n}\r\n\r\n.author::before {\r\n  content: \"Autor: \";\r\n}\r\n\r\na {\r\n  display: inline-block;\r\n}\r\n\r\n.author-info {\r\n  padding-bottom: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.author-info > * {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.author-info *:last-child {\r\n  margin-bottom: 0;\r\n}\r\n";

  const template$2 = document.createElement("template");

  template$2.innerHTML = `
  <style>
    ${css_248z}
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
      this.shadowRoot.appendChild(template$2.content.cloneNode(true));

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

  // getArticleTitle();

  const template$1 = document.createElement("template"),
    fragment = document.createDocumentFragment();

  template$1.innerHTML = `<div class="articlesList"></div>`;

  class ArticleList extends HTMLElement {
    #articlesApi;
    #arrayArticles;
    #controller = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template$1.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ["articles-api", "articles-arr"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (newVal === oldVal) return;

      switch (name) {
        case "articles-api":
          this.#articlesApi = newVal;
          break;
        case "articles-arr":
          this.#arrayArticles = newVal;
          break;
      }

      if (name === "articles-api") {
        this.validateUrl();
      }
      if (name === "articles-arr") {
        this.displayArrData();
      }
    }

    validateUrl() {
      if (this.#articlesApi) return this.fetchData();

      console.error("API URL not provided.");
    }

    fetchData = async () => {
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
    };

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

      let array =
        !typeof this.#arrayArticles === "string"
          ? (array = this.#arrayArticles)
          : JSON.parse(this.#arrayArticles);

      this.shadowRoot.querySelector(".articlesList").innerHTML = "";

      array.forEach((article) => {
        const articleItem = document.createElement("article-item");

        const mappings = {
          "published-at": article.publishedAt,
          "title-text": article.title,
          "image-src": article.image,
          company: article.company,
          description: article.description,
          content: article.content,
          author: article.author,
          "id-item": article.id,
          id: `article-${article.id}`,
        };

        for (const [clave, valor] of Object.entries(mappings))
          articleItem.setAttribute(clave, valor);

        fragment.appendChild(articleItem);
      });
      this.shadowRoot.querySelector(".articlesList").appendChild(fragment);
    }

    // getters y setters

    get articlesApi() {
      return this.#articlesApi;
    }

    set articlesApi(val) {
      this.setAttribute("articles-api", val);
    }

    get arrayArticles() {
      return this.#arrayArticles;
    }

    set arrayArticles(val) {
      this.setAttribute("articles-arr", val);
    }
  }

  customElements.define("article-list", ArticleList);

  document.getElementById("list");

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

})();
//# sourceMappingURL=bundle.js.map
