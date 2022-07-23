# SMARKET CLIENT FRONTEND

### Клиентское приложение для курса Java Developer и проекта SMarket

## Важно: приложение адаптировано для работы в двух режимах: dev и prod

Запуск dev режима происходит командой 

````shell
npm run start
````
В этом режиме приложение стартует на http://localhost:3000 и использует заранее определенные категории, цены и товары, 
можно полностью протестировать клиентскую часть без бэкенда.


Запуск prod режима происходит в контейнере docker, для запуска используется Dockerfile.
В этом режиме приложение разворачивается на nginx и слушает порт 80. Для доступа к контейнеру
необходимо пробросить любой порт машины на 80 порт контейнера, например использовать команды:

````shell
docker build -t client-smarket .
docker run -d --name smarket-client-app -p 3000:80 client-smarket
````

Чтобы остановить контейнер используйте команду 

````shell
docker stop smarket-client-app
````

Чтобы удалить готовый образ используйте команду

````shell
docker rm smarket-client-app
docker rmi client-smarket:latest
````

## Docker-compose
Вы можете собрать все докерфайлы в один репозиторий для запуска проекта целиком, для этого используйте compose (пример: https://www.baeldung.com/ops/multiple-dockerfiles)
Чтобы собрать клиент из стороннего репозитория добавьте в него Dockerfile.client и запустите build в compose файле

Подсказка: вы можете протестировать работу Dockerfile.client командой
````shell
docker build -f Dockerfile.client -t client-smarket .
docker run -d --name smarket-client-app -p 3000:80 client-smarket
````

## Настройки проекта
Для корректного взаимодействия с микро-сервисами необходимо указать адреса, на которых они расположены.

### stock-service
Конфигурация расположена в файле /src/store/stock.api.ts
За адрес сервера отвечает параметр baseUrl

### price-service
Конфигурация расположена в файле /src/store/price.api.ts
За адрес сервера отвечает параметр baseUrl

### Приложение
#### Чтобы поменять title приложения нужно обновить функцию getAppName() в файле /src/store/utils.ts
#### Все наборы mock данных также расположены в utils.ts
#### Авторизация пользователей не входит в данную версию приложения и для имитации пользователей используется файл mock-user.component.ts
