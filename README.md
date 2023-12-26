# Buda Technical Assesment: Spread

Hola!, este es el resultado de la tarea Spread API de Buda.com

## Setup

Para levantar la API de forma local, se deben ejecutar los siguientes comandos:

```bash
npm install
npm start
```

En el caso de utilizar docker, basta con 

```bash
docker compose up --build
```

La aplicación estará disponible en [http://localhost:8080](http://localhost:8080)

## Tests

Para ejecutar los tests unitarios y e2e, basta con el comando:

```bash
npm run test
```

Los cuales serán ejecutados con coverage y de la mano del [Node Native Test Runner](https://nodejs.org/api/test.html)

## Documentación API

La API desarrollada tiene los siguientes endpoints

### PUT /spread/alert
* Body: 
  * spread: valor de spread a utilizar como alerta
    ```JSON
    {
      "spread": 12345
    }
    ```
* Posibles outputs:
  * 200: Spread actualizado
    ```JSON
    {
      "status": "success"
    }
    ```
  * 500: Ocurrió un error en el servidor

### GET /spread/:marketId

Entrega el spread de un mercado dado

* URL params: 
  * marketId: id del mercado del cual se quiere consultar el spread
* Posibles outputs:
  * 200: Spread del mercado indicado
    ```JSON
    {
      "status": "success",
      "spread": 293645
    }
    ```
  * 404: Mercado no encontrado
    ```JSON
    {
      "status": "error",
      "message": "Market id not found"
    }
    ```
  * 500: Ocurrió un error en el servidor

### GET /spread

Entrega el spread de todos los mercados disponibles en buda.com

* Posibles outputs:
  * 200: Spread de todos los mercados
    ```JSON
    {
      "status": "success",
      "spreads": [
        {
          "market": "BTC-CLP",
          "spread": 298582
        },
        {
          "market": "BTC-COP",
          "spread": 3461741.5400000215
        },
        {
          "market": "ETH-CLP",
          "spread": 33859
        },
        {
          "market": "ETH-BTC",
          "spread": 0.0013214699999999982
        },
        {
          "market": "BTC-PEN",
          "spread": 2484.75
        },
        {
          "market": "ETH-PEN",
          "spread": 194.32999999999993
        },
        {
          "market": "ETH-COP",
          "spread": 192959.81000000052
        },
        {
          "market": "BCH-BTC",
          "spread": 0.0014189699999999994
        },
        {
          "market": "BCH-CLP",
          "spread": 1832.929999999993
        },
        {
          "market": "BCH-COP",
          "spread": 4899.900000000023
        },
        {
          "market": "BCH-PEN",
          "spread": 39.460000000000036
        },
        {
          "market": "BTC-ARS",
          "spread": 0
        },
        {
          "market": "ETH-ARS",
          "spread": 0
        },
        {
          "market": "BCH-ARS",
          "spread": 0
        },
        {
          "market": "LTC-BTC",
          "spread": 0.000046370000000000005
        },
        {
          "market": "LTC-CLP",
          "spread": 838.9900000000052
        },
        {
          "market": "LTC-COP",
          "spread": 5971.799999999988
        },
        {
          "market": "LTC-PEN",
          "spread": 5.920000000000016
        },
        {
          "market": "LTC-ARS",
          "spread": 0
        },
        {
          "market": "USDC-CLP",
          "spread": 15.549999999999955
        },
        {
          "market": "USDC-COP",
          "spread": 0.010000000000218279
        },
        {
          "market": "USDC-PEN",
          "spread": 0.019999999999999574
        },
        {
          "market": "USDC-ARS",
          "spread": 0
        },
        {
          "market": "BTC-USDC",
          "spread": 446.0300000000061
        },
        {
          "market": "USDT-USDC",
          "spread": 0.0018000000000000238
        }
      ]
    }
    ```
  * 500: Ocurrió un error en el servidor
