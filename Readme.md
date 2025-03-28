<a id="readme-top"></a>

### Сделано с помощью

- [![React][React.js]][React-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]

## Установка

1. Клонируйте репозиторий
   ```sh
   git clone https://github.com/Candymanzz/SchoolDiningApp.git
   ```
2. Установите NPM пакеты в директориях client и server
   ```sh
   npm install
   ```
3. Измените переменные в `.env` в директории server
   ```env
   PORT='ПОРТ ДЛЯ СЕРВЕРА'
   DB_NAME='ИМЯ БАЗЫ ДАННЫХ В POSTGRESQL'
   DB_USER='ИМЯ ПОЛЬЗОВАТЕЛЯ БАЗЫ ДАННЫХ'
   DB_PASSWORD='ПАРОЛЬ ПОЛЬЗОВАТЕЛЯ БАЗЫ ДАННЫХ'
   DB_HOST=localhost
   DB_PORT='ПОРТ БАЗЫ ДАННЫХ'
   ```
4. Измените переменные в `.env` в директории client
   ```env
   REACT_APP_API_URL=http://localhost:PORT/
   ```
5. Для запуска сервера в директории server выполнить команду
   ```sh
   npm run dev
   ```
6. Для запуска клиента в директории client выполнить команду
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->

## Использование

При запуске Web-приложения нажать кнопку Authorization и ввести admin пароль и admin почта.

Кнопка Seeding для автозаполнения бд

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
