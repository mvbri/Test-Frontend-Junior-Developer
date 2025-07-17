
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {

  var html = "<article>\r\n  <div class=\"img-container\">\r\n    <slot name=\"image-slot\">\r\n      <img alt=\"Imagen por defecto\" src=\"./img/img-default.jpg\">\r\n    </slot>\r\n  </div>\r\n    <span class=\"id\"><slot name=\"id\">ID por defecto</slot></span>\r\n    <h2 class=\"title\"><slot name=\"title\">Titulo por Defecto</slot></h2>\r\n    <h3 class=\"company\"><slot name=\"company\">Compañía por defecto</slot></h3>\r\n    <p class=\"description\"><slot name=\"description\">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates odit blanditiis tenetur. Dicta tempore ducimus animi numquam obcaecati voluptatem soluta alias sunt. Recusandae, non earum! Magni facere commodi corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, accusamus provident facilis nihil iure animi et. Quisquam asperiores voluptates eligendi repudiandae ad labore expedita tenetur adipisci, eveniet recusandae, dicta dolorem?</slot></p>\r\n    <div class=\"hidden-info hidden\">\r\n      <a href=\"#\" class=\"author\"><slot name=\"author\">Autor por defecto</slot></a>\r\n      <div class=\"author-info hidden\"></div>\r\n      <p class=\"content\"><slot name=\"author-content\">Contenido por defecto.</slot></p>\r\n      <p class=\"published-at\"><slot name=\"author-published\">fecha por defecto</slot></p>\r\n    </div>\r\n</article>";

  var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Maven+Pro:wght@400..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap\");\r\n\r\narticle {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 80%;\r\n  min-height: 100vh;\r\n  margin: 0 auto;\r\n  margin-bottom: 2rem;\r\n  border: 1px solid #ac8cff;\r\n  box-shadow: -1px 2px 9px 3px #ac8cff;\r\n  border-radius: 25px;\r\n  cursor: pointer;\r\n  padding-bottom: 2rem;\r\n}\r\n\r\narticle * {\r\n  margin: 0;\r\n}\r\n\r\n.img-container {\r\n  width: 100%;\r\n}\r\n\r\nimg {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  -o-object-position: 50% 45%;\r\n     object-position: 50% 45%;\r\n  width: 100%;\r\n  height: 31.25rem;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n::slotted(img) {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  width: 100%;\r\n  height: auto;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n.title {\r\n  color: rgb(39, 36, 36);\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.hidden-info {\r\n  padding-top: 1.5rem;\r\n  opacity: 1;\r\n  visibility: visible;\r\n  place-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n}\r\n\r\n.description {\r\n  color: rgb(49, 48, 48);\r\n  text-align: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.author,\r\n.company,\r\n.description,\r\n.published-at,\r\n.content {\r\n  color: rgb(39, 36, 36);\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.id {\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  color: rgb(39, 36, 36);\r\n  font-weight: bold;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.id::before {\r\n  content: \"# \";\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.author {\r\n  color: blue;\r\n  font-weight: bold;\r\n}\r\n\r\n.author::before {\r\n  content: \"Autor: \";\r\n}\r\n\r\na {\r\n  display: inline-block;\r\n}\r\n\r\n.author-info {\r\n  padding-bottom: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.author-info > * {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.author-info *:last-child {\r\n  margin-bottom: 0;\r\n}\r\n";

  const template$2 = document.createElement("template");

  template$2.innerHTML = `
  <style>
    ${css_248z}
  </style>
  ${html}
`;

  class ArticleItem extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template$2.content.cloneNode(true));

      this._hiddenInfo = this.shadowRoot.querySelector(".hidden-info");
      this._authorInfo = this.shadowRoot.querySelector(".author-info");
      this._onToggleDetails = (e) => this.toggleDetails(e);
      this._onFetchAuthorData = (e) => this.fetchAuthorData(e);
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

    attributeChangedCallback(nameAtr, oldVal, newVal) {
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
      if (this._apiUrl) {
        this.validateApiUrl();
      }

      this.shadowRoot
        .querySelector("article")
        .addEventListener("click", this._onToggleDetails);

      this.shadowRoot
        .querySelector(".author")
        .addEventListener("click", this._onFetchAuthorData);
    }

    disconnectedCallback() {
      this.shadowRoot
        .querySelector("article")
        .removeEventListener("click", this._onToggleDetails);

      this.shadowRoot
        .querySelector(".author")
        .removeEventListener("click", this._onFetchAuthorData);
    }

    validateApiUrl() {
      if (this._apiUrl) return this.fetchItemData();

      console.error("API URL not provided.");
      this.updateItemData();
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
      if (this._image || data["image"]) {
        this.shadowRoot.querySelector(".image").style.display = "block";
      }

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
        if (element) {
          if (attr !== "textContent" && attr !== "src")
            return console.log(`El atributo ${attr} no es un atributo valido`);
          if (attr === "textContent") return (element.textContent = this[prop]);

          element.setAttribute(attr, this[prop]);
        }
      });
    }

    toggleDetails() {
      this._hiddenInfo.classList.toggle("hidden");
    }

    async fetchAuthorData(e) {
      e.stopPropagation();
      e.preventDefault();

      this._authorInfo.classList.toggle("hidden");

      if (!this._authorInfo.classList.contains("hidden")) {
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

  const template$1 = document.createElement("template"),
    fragment = document.createDocumentFragment();

  template$1.innerHTML = `<div class="articlesList"></div>`;

  class ArticleList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template$1.content.cloneNode(true));

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

      if (nameAtr === "articles_api") {
        this.validateUrl();
      }
      if (nameAtr === "articles_arr") {
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
        articleItem.setAttribute("api_url", `${this._articlesApi}/${article.id}`);
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

    // getters y setters

    get articlesApi() {
      setTimeout(() => console.log(this._articlesApi), 3000);
    }

    set articlesApi(val) {
      this._articlesApi = val;
      this.setAttribute("articles_api", val);
    }

    get arrayArticles() {
      setTimeout(() => console.log(this._arrayArticles), 3000);
    }

    set arrayArticles(val) {
      this._arrayArticles = JSON.stringify(val);
      this.setAttribute("articles_arr", JSON.stringify(val));
    }
  }

  customElements.define("article-list", ArticleList);

  document.querySelector("article-list");

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
      return ["name", "avatar_img", "birthdate", "bio", "url_api", "loading"];
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
      if (nameAtr === "loading") return this.updateLoadingState();
    }

    validateUrl() {
      if (this._url) return this.fetchData();
      console.error("API URL not provided.");
    }

    async fetchData() {
      this.setAttribute("loading", true);
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
        this.setAttribute("loading", false);
      }
    }

    updateLoadingState() {
      const loadingElement = this.shadowRoot.querySelector(".loading"),
        articleElement = this.shadowRoot.querySelector("article"),
        errorElement = this.shadowRoot.querySelector(".error");

      if (this._loading !== "true") {
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
      setTimeout(() => console.log(this._name), 3000);
    }

    set name(val) {
      this._name = val;
      this.updateUI();
    }

    get avatar() {
      setTimeout(() => console.log(this._avatar), 3000);
    }

    set avatar(val) {
      this._avatar = val;
      this.updateUI();
    }

    get birthdate() {
      setTimeout(() => console.log(this._birthdate), 3000);
    }

    set birthdate(val) {
      this._birthdate = val;
      this.updateUI();
    }

    get bio() {
      setTimeout(() => console.log(this._bio), 3000);
    }

    set bio(val) {
      this._bio = val;
      this.updateUI();
    }

    get urlApi() {
      setTimeout(() => console.log(this._url), 3000);
    }

    set urlApi(val) {
      if (this._url === val) return;
      this._url = val;

      this._setApi = true;
      this.validateUrl();
    }

    get loading() {
      setTimeout(() => console.log(this._loading), 3000);
    }

    set loading(val) {
      setTimeout(() => this.setAttribute("loading", val), 3000);
    }
  }

  customElements.define("author-item", Author);

})();
//# sourceMappingURL=bundle.js.map
