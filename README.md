# Categories management

### Front-end

Install Angular CLI and the dependencies from the app. Then, run the project with `ng serve`

```sh
$ npm install -g @angular/cli
$ cd front
$ npm i
$ ng serve
```

### Back-end

Open another terminal. You need composer in order to install all project dependencies, instructions [here](https://getcomposer.org/download/).

```sh
$ cd api
$ composer install
$ php artisan serve
```

The api will be available at:

```sh
http://localhost:8000/
```

The front will be available at:

```sh
http://localhost:4200/
```

### API Endpoints

| HTTP | Address | Query |
| ------ | ------ | ------ |
| GET | /categories | filter={search} |
| GET | /categories/{category_id} | |
| POST | /categories | |
| PUT | /categories/{category_id} | |
| DELETE | /categories/{category_id} | |
