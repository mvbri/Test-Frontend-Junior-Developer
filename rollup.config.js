// Build plugins
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
// Serve plugins
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import html from "rollup-plugin-html";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const banner = `/**
 * Copyright (C) ${new Date().getFullYear()} by ${
  pkg._author
} - All Rights Reserved
 * @name ${pkg.name}
 * @_author Videsk
 * @license ${pkg.license}
 * Written by ${pkg._author}
 * Date ${Date.now()}
 *
 * ${pkg._description}
 * 
 * Do not copy this code.
*/`;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "serve", "--", "--dev"],
        {
          shell: true,
        }
      );
      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

const defaultPlugins = [
  html({ include: "./src/**/*.html" }),
  json(),
  postcss({ inject: false }),
  resolve({ browser: true }),
  commonjs(),
  copy({
    targets: [
      { src: "src/index.html", dest: "public" }, // Copia index.html a la carpeta public
      // Puedes añadir más si tienes otros archivos estáticos en src que quieras copiar:
      // { src: 'src/assets/**/*', dest: 'public/assets' } // Ejemplo: copiar toda la carpeta assets
    ],
    verbose: true, // Opcional: muestra en la consola qué archivos se copian
  }),
];

const configBuild = [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/component.js",
        format: "iife",
        sourcemap: !production,
        strict: false,
        banner,
      },
    ],
    plugins: defaultPlugins,
  },
];

const configDev = [
  {
    input: "src/index.js",
    output: [
      {
        file: "public/bundle.js",
        format: "iife",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [
      ...defaultPlugins,
      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),
      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload("public"),
    ],
    watch: {
      clearScreen: true,
    },
  },
];

export default process.env.NODE_ENV === "production" ? configBuild : configDev;
