import compileTemplate from './src/pages/main/index.pug';

const app = document.getElementById('app');
app!.innerHTML = compileTemplate();
