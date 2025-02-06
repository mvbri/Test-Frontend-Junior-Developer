
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {

  const template$2 = document.createElement("template");

  template$2.innerHTML = `
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
      padding-bottom: 2rem;
    }

    article * {
    margin: 0;
    font-family: "Roboto", serif;
    }

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 15px 15px 0 0;
    }

    .title {
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .hidden-info {  
      padding-top: 1.5rem;
      opacity: 1;
      visibility: visible;
      place-items: center;
      flex-direction: column;
    }

    .hidden {
      display: none;
      visibility: hidden;
      opacity: 0;
    }

   .author, .company, .description, .published-at, .content {
      margin-bottom: 1rem;
    }

    .image {
      margin-bottom: 2rem;
    }
      

    .id {
      font-weight: bold;
      font-size: 27px;
    }

    .id::before {
      content: "# ";
    }

    a {
      text-decoration: none;
    }

    .author {
      color: blue;
      font-weight: bold;
    }

    .author::before {
      content: "Autor: "
    }

    a {
      display: inline-block;
    }

    .author-info {
      padding-bottom: 2rem;
      text-align: center;
    }

    .author-info > * {
      margin-bottom: 1rem;
    }

    .author-info *:last-child{
      margin-bottom: 0;
    }

  </style>
  <article>
      <img class="image" />
      <span class="id"></span>
      <h2 class="title"></h2>
      <h3 class="company"></h3>
      <p class="description"></p>
      <div class= "hidden-info hidden">
        <a href="#" class="author"></a>
        <div class="author-info hidden"></div>
        <p class="content"></p>
        <p class="published-at"></p>
      </div>
  </article>
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
    }

    connectedCallback() {
      this.validateApiUrl();

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
      return this._title;
    }

    set title(val) {
      this._title = val;
      this.updateItemData();
    }

    get image() {
      return this._image;
    }

    set image(val) {
      this._image = val;
      this.updateItemData();
    }

    get company() {
      return this._company;
    }

    set company(val) {
      this._company = val;
      this.updateItemData();
    }

    get description() {
      return this._description;
    }

    set description(val) {
      this._description = val;
      this.updateItemData();
    }

    get author() {
      return this._author;
    }

    set author(val) {
      this._author = val;
      this.updateItemData();
    }

    get content() {
      return this._content;
    }

    set content(val) {
      this._content = val;
      this.updateItemData();
    }

    get publishedat() {
      return this._publishedAt;
    }

    set publishedat(val) {
      this._publishedAt = val;
      this.updateItemData();
    }

    get apiUrl() {
      return this._apiUrl;
    }

    set apiUrl(val) {
      if (this._apiUrl === val) return;
      this._apiUrl = val;

      this.validateApiUrl();
    }
  }

  window.customElements.define("article-item", ArticleItem);

  // document.getElementById("article-one").title =
  //   "1.Titulo modificado desde el JS";
  // document.getElementById("article-one").company = "2.Compañia modificada des JS";
  // document.getElementById("article-one").description =
  //   "3.Descripción modificada desde JS";
  // document.getElementById("article-one").author = "4.Author Modificado desde JS";
  // document.getElementById("article-one").content =
  //   "5.Contenido modificado desde JS";
  // document.getElementById("article-one").publishedat =
  //   "6. Fecha modificada desde JS";
  // document.getElementById("article-one").image =
  //   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png";
  // document.getElementById("article-one").apiUrl =
  //   "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles/1";

  // Para los elementos que vengan asincronamente.
  // setTimeout(() => {
  //   console.log(document.getElementById("article-one").company);
  //   console.log(document.getElementById("article-one").apiUrl);
  //   console.log(document.getElementById("article-one").publishedat);
  //   console.log(document.getElementById("article-one").title);
  //   console.log(document.getElementById("article-one").image);
  //   console.log(document.getElementById("article-one").content);
  //   console.log(document.getElementById("article-one").description);
  //   console.log(document.getElementById("article-one").author);
  // }, 3000);

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
      return this._articlesApi;
    }

    set articlesApi(val) {
      this._articlesApi = val;
      this.setAttribute("articles_api", val);
    }

    get arrayArticles() {
      return this._arrayArticles;
    }

    set arrayArticles(val) {
      this._arrayArticles = JSON.stringify(val);
      this.setAttribute("articles_arr", JSON.stringify(val));
    }
  }

  window.customElements.define("article-list", ArticleList);

  document.querySelector("article-list");

  // articleList.articlesApi =
  //   "https://67900f0149875e5a1a9441cf.mockapi.io/api/v1/articles";

  // articleList.arrayArticles = [
  //   {
  //     publishedAt: "2024-06-05T03:29:00.248Z",
  //     title: "Modificado JS",
  //     image: "https://loremflickr.com/640/480",
  //     company: "Brakus, Hyatt and Lesch",
  //     description: "Rerum molestiae quod numquam nisi aut...",
  //     content:
  //       "Veniam sint dolorum corporis vitae porro rem maiores earum doloribus...",
  //     author: 1,
  //     id: "1",
  //   },
  //   {
  //     publishedAt: "2024-07-05T03:29:00.248Z",
  //     title: "Modificado JS",
  //     image: "https://loremflickr.com/320/240/dog",
  //     company: "company 2",
  //     description: "description 2",
  //     content: "content 2",
  //     author: "Matthew Sanford 4",
  //     id: "2",
  //   },
  // ];

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

  document.querySelector("author-item");

})();
//# sourceMappingURL=bundle.js.map
