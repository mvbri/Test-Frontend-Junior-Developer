
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {

  var html$3 = "<article class=\"article-container\">\r\n  <div class=\"img-container\">\r\n    <slot name=\"image\">\r\n      <img class=\"image\" alt=\"Imagen por defecto\" src=\"./img/img-default.jpg\">\r\n    </slot>\r\n  </div>\r\n    <span class=\"id\"><slot name=\"id\">ID por defecto</slot></span>\r\n    <h2 class=\"title\"><slot name=\"title\">Titulo por Defecto</slot></h2>\r\n    <h3 class=\"company\"><slot name=\"company\">Compañía por defecto</slot></h3>\r\n    <p class=\"description\"><slot name=\"description\">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates odit blanditiis tenetur. Dicta tempore ducimus animi numquam obcaecati voluptatem soluta alias sunt. Recusandae, non earum! Magni facere commodi corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, accusamus provident facilis nihil iure animi et. Quisquam asperiores voluptates eligendi repudiandae ad labore expedita tenetur adipisci, eveniet recusandae, dicta dolorem?</slot></p>\r\n    <div class=\"hidden-info hidden\">\r\n      <p class=\"content\"><slot name=\"author-content\">Contenido por defecto.</slot></p>\r\n      <p class=\"published-at\"><slot name=\"author-published\">fecha por defecto</slot></p>\r\n      <a href=\"#\" class=\"author\"><slot name=\"author\">Autor por defecto</slot></a>\r\n        <div class=\"author-info hidden\"></div>\r\n    </div>\r\n</article>\r\n <div class=\"loading none\">\r\n    <div class=\"loader-container\">\r\n      <svg class=\"loading-icon\" fill=\"hsl(228, 97%, 42%)\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <path d=\"M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z\" opacity=\".25\"/>\r\n        <path d=\"M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z\">\r\n          <animateTransform attributeName=\"transform\" type=\"rotate\" dur=\"0.75s\" values=\"0 12 12;360 12 12\" repeatCount=\"indefinite\"/>\r\n        </path>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n  <div class=\"error none\">\r\n    <p>Error fetching article list data.</p>\r\n  </div>";

  var css_248z$3 = "@import url(\"https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Maven+Pro:wght@400..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap\");\r\n\r\narticle {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  min-height: 100vh;\r\n  margin: 0 auto;\r\n  margin-bottom: 2rem;\r\n  border: 1px solid #ac8cff;\r\n  box-shadow: 0 0 18px 1px #ac8cff;\r\n  border-radius: 25px;\r\n  cursor: pointer;\r\n  padding-bottom: 2rem;\r\n  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\r\n}\r\n\r\narticle:hover {\r\n  transform: translateY(-5px);\r\n  box-shadow: 0 0 18px 3px #7d4df7;\r\n}\r\n\r\narticle * {\r\n  margin: 0;\r\n}\r\n\r\n.img-container {\r\n  width: 100%;\r\n}\r\n\r\nimg {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  -o-object-position: 50% 45%;\r\n     object-position: 50% 45%;\r\n  width: 100%;\r\n  height: 31.25rem;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n::slotted(img) {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  width: 100%;\r\n  height: auto;\r\n  margin-bottom: 2rem;\r\n  border-top-left-radius: 1.625rem;\r\n  border-top-right-radius: 1.625rem;\r\n}\r\n\r\n.title {\r\n  color: rgb(39, 36, 36);\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.hidden-info {\r\n  padding-top: 1.5rem;\r\n  opacity: 1;\r\n  visibility: visible;\r\n  place-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n}\r\n\r\n.description {\r\n  color: rgb(49, 48, 48);\r\n  text-align: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.author,\r\n.company,\r\n.description,\r\n.published-at,\r\n.content {\r\n  color: rgb(39, 36, 36);\r\n  margin-bottom: 1rem;\r\n  padding: 1.5rem;\r\n  text-align: center;\r\n}\r\n\r\n.id {\r\n  font-family: \"Maven Pro\", sans-serif;\r\n  color: rgb(39, 36, 36);\r\n  font-weight: bold;\r\n  font-size: 1.5rem;\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.id::before {\r\n  content: \"# \";\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.author {\r\n  color: #7d4df7;\r\n  font-weight: bold;\r\n}\r\n\r\n.author::before {\r\n  content: \"Publicado por: \";\r\n}\r\n\r\na {\r\n  display: inline-block;\r\n}\r\n\r\n.author-info {\r\n  padding-bottom: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.author-info > * {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.author-info *:last-child {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.none {\r\n  display: none;\r\n}\r\n\r\n.error {\r\n  text-align: center;\r\n}\r\n\r\n.loader-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  align-items: center;\r\n}\r\n\r\n.loading-icon {\r\n  width: 2rem;\r\n  height: 2rem;\r\n}\r\n";

  const apiUrlAuthor = "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/users";
  const template$3 = document.createElement("template");

  template$3.innerHTML = `
  <style>
    ${css_248z$3}
  </style>
  ${html$3}
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
      this.shadowRoot.appendChild(template$3.content.cloneNode(true));

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

      /* Para facilitar el rederizado de varios componentes desde un componente padre.*/
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
      this.#authorInfo.innerHTML = "";
      const authorTemplate = document.createElement("author-item");
      authorTemplate.setAttribute("avatar-img", author.avatar);
      authorTemplate.setAttribute("name", author.name);
      authorTemplate.setAttribute("bio", author.bio);
      authorTemplate.setAttribute("birthdate", author.birthdate);

      this.#authorInfo.appendChild(authorTemplate);
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

  // const articleOne = document.getElementById("articleOne");

  /* Aquí se atualiza con valores de la APi 

    - Los valores de las propiedades colocados directamente en el componente tienen prioridad sobre las que vienen
    mediante una petición a una API.
  */
  articleOne.apiUrl =
    "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/3";

  // getArticleTitle();

  var html$2 = "<div class=\"articlesList\">\r\n  <div class=\"article-container\"></div>\r\n  <div class=\"loading none\">\r\n    <div class=\"loader-container\">\r\n      <svg class=\"loading-icon\" fill=\"hsl(228, 97%, 42%)\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <path d=\"M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z\" opacity=\".25\"/>\r\n        <path d=\"M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z\">\r\n          <animateTransform attributeName=\"transform\" type=\"rotate\" dur=\"0.75s\" values=\"0 12 12;360 12 12\" repeatCount=\"indefinite\"/>\r\n        </path>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"error none\">No se ha encontrado el articulo que buscas</div>\r\n</div>\r\n";

  var css_248z$2 = ".none {\r\n  display: none;\r\n}\r\n\r\n.error {\r\n  text-align: center;\r\n  font-weight: bold;\r\n}\r\n\r\n.article-container {\r\n  padding: 2rem;\r\n  display: grid;\r\n  gap: 2rem;\r\n  grid-template-columns: repeat(2, minmax(300px, 1fr));\r\n}\r\n\r\n.loader-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  align-items: center;\r\n}\r\n\r\n.loading-icon {\r\n  width: 2rem;\r\n  height: 2rem;\r\n}\r\n";

  const template$2 = document.createElement("template"),
    fragment = document.createDocumentFragment();

  template$2.innerHTML = `
  <style>
    ${css_248z$2}
  </style>
  ${html$2}
`;

  class ArticleList extends HTMLElement {
    #articlesApi;
    #arrayArticles;
    #controller = null;
    #articleContainer;
    #loadingElement;
    #loading = false;
    #errorElement;
    #error = false;
    #dataLoadedPromise = null;
    #resolvePromise;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template$2.content.cloneNode(true));

      this.#articleContainer =
        this.shadowRoot.querySelector(".article-container");
      this.#loadingElement = this.shadowRoot.querySelector(".loading");
      this.#errorElement = this.shadowRoot.querySelector(".error");

      this.#dataLoadedPromise = new Promise((resolve) => {
        this.#resolvePromise = resolve;
      });
    }

    static get observedAttributes() {
      return ["articles-api", "articles-arr", "loading", "error"];
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
        case "loading":
          this.#loading = newVal === "true" ? true : false;
          break;
        case "error":
          this.#error = newVal === "true" ? true : false;
          break;
      }

      if (name === "articles-api") return this.validateUrl();

      if (name === "loading") return this.updateLoadingState();

      if (name === "error") return this.hadleError();

      if (name === "articles-arr") this.displayArrData();
    }

    validateUrl() {
      if (this.#articlesApi) return this.fetchData();

      console.error("API URL not provided.");
    }

    fetchData = async () => {
      this.setAttribute("error", false);
      this.setAttribute("loading", true);

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
        this.#resolvePromise();
      } catch (error) {
        this.setAttribute("error", true);
        let message = error.statusText || "Ocurrió un error";
        console.error("Error fetching item data:", message);
      } finally {
        this.setAttribute("loading", false);
      }
    };

    updateLoadingState() {
      if (!this.#loading) {
        this.#articleContainer.classList.remove("none");
        this.#loadingElement.classList.add("none");
        return;
      }
      this.#articleContainer.classList.add("none");
      this.#loadingElement.classList.remove("none");
    }

    hadleError() {
      if (this.#error) {
        this.#articleContainer.innerHTML = "";
        this.#errorElement.classList.remove("none");
        return;
      }
      this.#articleContainer.classList.remove("none");
      this.#errorElement.classList.add("none");
    }

    displayDataApi(data = []) {
      this.#articleContainer.innerHTML = "";
      data.forEach((article) => {
        const articleItem = document.createElement("article-item");
        articleItem.setAttribute("data", JSON.stringify(article));

        articleItem.setAttribute("id", `article-${article.id}`);

        fragment.appendChild(articleItem);
      });
      this.#articleContainer.appendChild(fragment);
    }

    displayArrData() {
      if (this.#articlesApi) return;

      let array = JSON.parse(this.#arrayArticles);

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
      this.#articleContainer.appendChild(fragment).appendChild(fragment);
    }

    // getters y setters

    get articlesApi() {
      return this.#articlesApi;
    }

    set articlesApi(val) {
      if (this.#articlesApi === val) return;
      this.setAttribute("articles-api", val);
    }

    get arrayArticles() {
      return this.#arrayArticles;
    }

    set arrayArticles(val) {
      if (this.#arrayArticles === val) return;
      this.setAttribute("articles-arr", JSON.stringify(val));
    }

    get loading() {
      return this.#dataLoadedPromise.then(() => this.#loading);
    }

    set loading(val) {
      if (this.#loading === val) return;
      this.setAttribute("loading", val);
    }

    get error() {
      return this.#dataLoadedPromise.then(() => this.#error);
    }

    set error(val) {
      if (this.#error === val) return;
      this.setAttribute("error", val);
    }
  }

  customElements.define("article-list", ArticleList);

  // const list = document.getElementById("list");

  // list.arrayArticles = [
  //   {
  //     publishedAt: "2024-06-05T03:29:00.248Z",
  //     title: "hola",
  //     image:
  //       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDKjl2MgiRWOJ-2yEkhwBasVBsikrQHS8iJszYp9av3HZUTFwLzPEAYKNjQ26znbUP2NaNlex5vnxalw_qF3mhOPAsai3W8Cg8DO2dPm5ZWUPY0x9V0uwDwHS0YisdXhHbyPxuphDnPdk/s640/Pokemon+%252831%2529.png",
  //     company: "Brakus, Hyatt and Lesch",
  //     description: "Rerum molestiae quod numquam nisi aut...",
  //     content:
  //       "Veniam sint dolorum corporis vitae porro rem maiores earum doloribus...",
  //     author: 1,
  //     id: "1",
  //   },
  //   {
  //     publishedAt: "2024-07-05T03:29:00.248Z",
  //     title: "Hola 2",
  //     image:
  //       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfXlDZYV5EqH2rr-gJ12MpVDCkv7mr1kBT21AAx1QfWrwVSK0rwSDGjfjj-I0N_T1mndx5jXEiyaRGRSw-wVnY_OPAZiIk3NftujrJQXMBsuCwUNoJ8UbtYtRoWFtRAEmkrh7ryFMV9p8/s1600/Pokemon+%25288%2529.png",
  //     company: "company 2",
  //     description: "description 2",
  //     content: "content 2",
  //     author: 60,
  //     id: "2",
  //   },
  // ];

  var html$1 = "<div class=\"loading none\">\r\n  <div class=\"loader-container\">\r\n    <svg class=\"loading-icon\" fill=\"hsl(228, 97%, 42%)\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n      <path d=\"M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z\" opacity=\".25\"/>\r\n      <path d=\"M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z\">\r\n        <animateTransform attributeName=\"transform\" type=\"rotate\" dur=\"0.75s\" values=\"0 12 12;360 12 12\" repeatCount=\"indefinite\"/>\r\n      </path>\r\n    </svg>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"error none\">Error fetching autor data.</div>\r\n\r\n<article class=\"author-container\">\r\n  <img class=\"avatar\">\r\n  <h2 class=\"name\"></h2>\r\n  <h3 class=\"birthdate\"></h3>\r\n  <p class=\"bio\"></p>\r\n</article>\r\n";

  var css_248z$1 = "article {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 80%;\r\n  min-height: 100vh;\r\n  margin: 0 auto;\r\n  margin-bottom: 2rem;\r\n  background: #f8f9f9;\r\n  border-radius: 25px;\r\n  padding: 2rem;\r\n}\r\n\r\n.avatar {\r\n  width: 400px;\r\n  height: 400px;\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  border-radius: 50%;\r\n}\r\n\r\n.none {\r\n  display: none;\r\n}\r\n\r\n.error {\r\n  text-align: center;\r\n}\r\n\r\n.loader-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  align-items: center;\r\n}\r\n\r\n.loading-icon {\r\n  width: 2rem;\r\n  height: 2rem;\r\n}\r\n";

  const template$1 = document.createElement("template");

  template$1.innerHTML = `
  <style>
    ${css_248z$1}
  </style>
  ${html$1}
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
      this.shadowRoot.appendChild(template$1.content.cloneNode(true));

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

      this.displayData();
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

    displayData(data = {}) {
      this.#avatar = this.#avatar || data.avatar;
      this.#name = this.#name || data.name;
      this.#birthdate = this.#birthdate || data.birthdate;
      this.#bio = this.#bio || data.bio;

      const mappings = [
        { prop: this.#avatar, key: "avatar", selector: ".avatar", attr: "src" },
        { prop: this.#name, key: "name", selector: ".name", attr: "textContent" },
        {
          prop: this.#birthdate,
          key: "birthdate",
          selector: ".birthdate",
          attr: "textContent",
        },
        {
          prop: this.#bio,
          key: "bio",
          selector: ".bio",
          attr: "textContent",
        },
      ];

      mappings.forEach(({ prop, selector, attr }) => {
        if (this.#setApi) return;
        const element = this.shadowRoot.querySelector(selector);
        if (element) {
          if (attr !== "textContent" && attr !== "src")
            return console.log(`El atributo ${attr} no es un atributo valido`);
          if (attr !== "textContent") return element.setAttribute(attr, prop);

          element.textContent = prop;
        }
      });
    }

    // getters y setters
    get name() {
      if (!this.#name) return this.#dataLoadedPromise.then(() => this.#name);
      return this.#name;
    }

    set name(val) {
      this.#name = val;
      this.setAttribute("name", val);
    }

    get avatar() {
      if (!this.#avatar) return this.#dataLoadedPromise.then(() => this.#avatar);
      return this.#avatar;
    }

    set avatar(val) {
      this.#avatar = val;
      this.setAttribute("avatar-img", val);
    }

    get birthdate() {
      if (!this.#birthdate)
        return this.#dataLoadedPromise.then(() => this.#birthdate);
      return this.#birthdate;
    }

    set birthdate(val) {
      this.#birthdate = val;
      this.setAttribute("birthdate", val);
    }

    get bio() {
      if (!this.#bio) return this.#dataLoadedPromise.then(() => this.#bio);
      return this.#bio;
    }

    set bio(val) {
      this.#bio = val;
      this.setAttribute("bio", val);
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
      this.#dataLoadedPromise.then(() => this.setAttribute("loading", val));
    }
  }

  customElements.define("author-item", Author);

  document.getElementById("author");

  var html = "<div>\r\n  <!-- Controles de filtrado y ordenamiento -->\r\n  <div class=\"filters-container\">\r\n    <!-- Barra de búsqueda -->\r\n    <div>\r\n      <input type=\"search\" id=\"searchInput\" placeholder=\"Buscar por título o contenido...\" class=\"search-input\">\r\n    </div>\r\n\r\n    <!-- Controles de ordenamiento -->\r\n    <div class=\"select-container\">\r\n      <div>\r\n        <label for=\"sortKey\">Ordenar por:</label>\r\n        <select class=\"select-btn\" id=\"sortKey\">\r\n          <option value=\"title\">Título</option>\r\n          <option value=\"author\">Autor</option>\r\n        </select>\r\n      </div>\r\n\r\n      <div>\r\n        <label for=\"sortDirection\">Dirección:</label>\r\n        <select class=\"select-btn\" id=\"sortDirection\">\r\n          <option value=\"desc\">Descendente</option>\r\n          <option value=\"asc\">Ascendente</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Contenedor para los artículos -->\r\n  <h1 class=\"title\">Directorio de Artículos</h1>\r\n  <div class=\"articles-container\" id=\"articlesContainer\">\r\n    <!-- Los artículos se renderizarán aquí dinámicamente usando el Custom Element -->\r\n  </div>\r\n</div>\r\n";

  var css_248z = ".filter {\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  order: 1;\r\n}\r\n\r\n.title {\r\n  text-align: center;\r\n  margin-bottom: 4rem;\r\n}\r\n\r\n.filters-container {\r\n  width: 80%;\r\n  margin: 0 auto;\r\n  padding: 2rem;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  max-width: 1600px;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.search-input {\r\n  font-size: 1rem;\r\n  font-weight: 500;\r\n  padding: 0.5rem;\r\n  padding-left: 1rem;\r\n  width: 18.75rem;\r\n  border-radius: 0.5rem;\r\n  outline: none;\r\n  border: 1px solid #6932f3;\r\n  transition: box-shadow 300ms ease;\r\n}\r\n\r\n.search-input:hover {\r\n  box-shadow: 0 0 5px 1px #ac8cff;\r\n}\r\n\r\n.select-btn {\r\n  margin-left: 0.5rem;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  width: 160px;\r\n  height: 50px;\r\n  border: 2px solid #505ac7;\r\n  border-radius: 0.25rem;\r\n  background-color: #505ac7;\r\n  box-shadow: 0px 0px 2px 0px #333333;\r\n  color: #ffffff;\r\n  font-size: 0.9375rem;\r\n  font-weight: 500;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  text-shadow: 0px 0px 0px #505ac7;\r\n  transition: all 300ms ease;\r\n}\r\n\r\n.select-btn:hover {\r\n  border-color: #505ac7;\r\n  background-color: white;\r\n  box-shadow: 0px 0px 2px 0px #333333;\r\n  color: #505ac7;\r\n  text-shadow: 0px 0px 0px #333333;\r\n}\r\n\r\n.select-container {\r\n  display: flex;\r\n  gap: 2rem;\r\n}\r\n";

  const template = document.createElement("template");

  template.innerHTML = `
  <style>
    ${css_248z}
  </style>
  ${html}
`;

  class Filter extends HTMLElement {
    #sortBy;
    #order;
    #searchQuery;
    #searchInput;
    #sortKey;
    #urlQuery;
    #articlesInfo;
    #controllerListener;
    #sortDirection;
    #articleList;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.#searchInput = this.shadowRoot.querySelector("#searchInput");
      this.#articleList = document.createElement("article-list");
      this.#sortKey = this.shadowRoot.getElementById("sortKey");
      this.#sortDirection = this.shadowRoot.getElementById("sortDirection");
    }

    static get observedAttributes() {
      return ["articles-info"];
    }

    attributeChangedCallback(name, oldValue, newVal) {
      if (oldValue === newVal) return;

      switch (name) {
        case "articles-info":
          this.#articlesInfo = newVal;
          break;
      }
    }

    connectedCallback() {
      this.render();
      this.#controllerListener = new AbortController();
      const signal = this.#controllerListener.signal;
      this.#searchInput.addEventListener(
        "input",
        (e) =>
          this.search.bind(this, e.target.value, this.#sortBy, this.#order)(),
        {
          signal,
        }
      );
      this.#sortKey.addEventListener(
        "input",
        (e) => this.sort.bind(this, e.target.value, this.#order)(),
        {
          signal,
        }
      );
      this.#sortDirection.addEventListener(
        "input",
        (e) => this.order.bind(this, e.target.value)(),
        { signal }
      );
    }

    disconnectedCallback() {
      this.#controllerListener.abort();
    }

    render() {
      this.#urlQuery = new URL(this.#articlesInfo);

      let urlParams = new URLSearchParams(window.location.search);
      this.#searchQuery = urlParams.get("search") || "";
      this.#sortBy = urlParams.get("sortBy") || "title";
      this.#order = urlParams.get("order") || "desc";

      this.search(this.#searchQuery);

      this.shadowRoot
        .querySelector("#articlesContainer")
        .appendChild(this.#articleList);
    }

    #updateUrl(queryUrl) {
      const url = new URL(window.location.href);

      if (!queryUrl) {
        url.searchParams.delete("search");
        url.searchParams.delete("sortBy");
        url.searchParams.delete("order");
        return;
      }

      const searchVal = queryUrl.searchParams.get("search") || "all";
      const sortVal = queryUrl.searchParams.get("sortBy") || "title";
      const orderVal = queryUrl.searchParams.get("order") || "desc";

      url.searchParams.set("search", searchVal);
      url.searchParams.set("sortBy", sortVal);
      url.searchParams.set("order", orderVal);
      window.history.pushState({}, "", url.toString());
    }

    search(query) {
      this.#searchQuery = query;

      // Para evitar que se hagan busquedas demasiado generales.
      if (query.length < 3 && query.length !== 0) return;

      if (query.length === 0) {
        this.#articleList.articlesApi = `${this.#articlesInfo}`;
        this.#updateUrl();
        return;
      }

      this.#urlQuery.searchParams.set("search", query);

      this.sort(this.#sortBy, this.#order);
    }

    sort(category, order) {
      if (!order) this.#order = "desc";

      const query = this.#urlQuery.searchParams.get("search") || "all";
      this.#urlQuery.searchParams.set("search", query);
      this.#urlQuery.searchParams.set("sortBy", category);
      this.#urlQuery.searchParams.set("order", this.#order);

      this.#sortBy = category;

      this.#articleList.articlesApi = `${this.#urlQuery}`;

      this.#updateUrl(this.#urlQuery);
    }

    order(val) {
      const query = this.#urlQuery.searchParams.get("search") || "all";
      this.#urlQuery.searchParams.set("search", query);

      this.#sortBy = this.#urlQuery.searchParams.get("sortBy") || "title";
      this.#urlQuery.searchParams.set("sortBy", this.#sortBy);

      this.#order = val;
      this.#urlQuery.searchParams.set("order", this.#order);

      this.#articleList.articlesApi = `${this.#urlQuery}`;
      this.#updateUrl(this.#urlQuery);
    }
  }
  customElements.define("article-filter", Filter);

  document.querySelector("#filter");

})();
//# sourceMappingURL=bundle.js.map
