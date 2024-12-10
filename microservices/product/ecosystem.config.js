
module.exports = {
    apps : [{
      name   : "product",
      autorestart: true,
      watch: true,
      time: true,
      script : "./index.js",
      instances:4,
      env_production: {
        NODE_ENV: "prod",
        DATABASE_URL:"mongodb://mongodb:27017/monos-market-place_product_proddb",
        EXCHANGE:"@monos-market-place",
        AMQP_HOST:"amqp://rabbitmq:5672",
        PORT:9008
     },
     env_development: {
      NODE_ENV: "dev",
      DATABASE_URL:"mongodb://mongodb:27017/monos-market-place_product_devdb",
      EXCHANGE:"@monos-market-place",
      AMQP_HOST:"amqp://rabbitmq:5672",
      PORT:9008
   }
    }]
  }

