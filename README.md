# ebook
A vueJs web Application which is a reader that can render e-books in EPUB format

## Demo
  ![image](https://github.com/shihui0328/eBook/blob/master/demo/demo-2020-09-26.gif)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Brief
I made a static resource server using nginx, and let this app access my local folder through port 8081. <br>
VUE_APP_RES_URL in .env.development can be modified with other ports.<br>
baseUrl could also be modified with your folder path.<br>
The path to use this app should be localhost:8080/(your folder path)|(epub book name)<br>
