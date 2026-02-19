<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/refs/heads/master/docs/assets/logo.png">
</h1>

<div align="center">
  <strong>Minimal customizable performance-stable Angular components for rendering After Effects animations. Compatible with Angular 9+.</strong>
</div>

<br/>

<div align="center">
  <!-- GitHub Actions -->
  <a href="https://github.com/ngx-lottie/ngx-lottie/actions/workflows/ngx-lottie.yml">
    <img src="https://github.com/ngx-lottie/ngx-lottie/actions/workflows/ngx-lottie.yml/badge.svg?branch=master" alt="GitHubActions" />
  </a>

  <!-- License -->
  <a href="https://github.com/ngx-lottie/ngx-lottie/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="Licence: MIT" />
  </a>
  <!-- Package -->
  <a href="https://www.npmjs.com/package/ngx-lottie">
    <img src="https://badge.fury.io/js/ngx-lottie.svg" alt="npm version" height="18" />
  </a>
</div>

## Packages

This monorepo contains two packages for rendering Lottie animations in Angular:

### 📦 [ngx-lottie](https://github.com/ngx-lottie/ngx-lottie/blob/master/docs/ngx-lottie.md)

The main package for rendering JSON-based Lottie animations using `lottie-web`.

```bash
npm i lottie-web ngx-lottie
```

**Features:**

- Multiple renderer support (SVG, Canvas, HTML)
- Advanced caching
- Server-side rendering support
- Tree-shakable architecture

[**Read full documentation →**](https://github.com/ngx-lottie/ngx-lottie/blob/master/docs/ngx-lottie.md)

---

### 🚀 [ngx-lottie/dotlottie](https://github.com/ngx-lottie/ngx-lottie/blob/master/docs/ngx-lottie-dotlottie.md)

Secondary package for rendering `.lottie` files using `@lottiefiles/dotlottie-web` with WebAssembly and Web Worker support.

```bash
npm i @lottiefiles/dotlottie-web ngx-lottie
```

**Features:**

- WebAssembly-powered rendering
- Web Worker support for better performance
- State machine support
- Smaller file sizes with `.lottie` format

[**Read full documentation →**](https://github.com/ngx-lottie/ngx-lottie/blob/master/docs/ngx-lottie-dotlottie.md)

## Compatibility with Angular Versions

<table>
  <thead>
    <tr>
      <th>ngx-lottie</th>
      <th>Angular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        7.x
      </td>
      <td>
        >= 8 < 13
      </td>
    </tr>
    <tr>
      <td>
        8.x
      </td>
      <td>
        13
      </td>
    </tr>
    <tr>
      <td>
        9.x
      </td>
      <td>
        14
      </td>
    </tr>
    <tr>
      <td>
        10.x
      </td>
      <td>
        15
      </td>
    </tr>
    <tr>
      <td>
        11.x
      </td>
      <td>
        17
      </td>
    </tr>
    <tr>
      <td>
        12.x
      </td>
      <td>
        18
      </td>
    </tr>
    <tr>
      <td>
        13.x
      </td>
      <td>
        19
      </td>
    </tr>
    <tr>
      <td>
        20.x
      </td>
      <td>
        20
      </td>
    </tr>
    <tr>
      <td>
        21.x
      </td>
      <td>
        21
      </td>
    </tr>
  </tbody>
</table>

## Which Package Should I Use?

| Use `ngx-lottie` when...               | Use `ngx-lottie/dotlottie` when... |
| -------------------------------------- | ---------------------------------- |
| You have JSON animation files          | You have `.lottie` files           |
| You need maximum compatibility         | You want smaller file sizes        |
| You use advanced `lottie-web` features | You need Web Worker rendering      |
| You need HTML renderer support         | You need state machine support     |

## License

MIT © [Artur Androsovych](https://github.com/arturovt)
