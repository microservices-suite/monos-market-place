
module.exports = {
    apps : [{
      name   : "subscription",
      autorestart: true,
      watch: true,
      time: true,
      script : "./index.js",
      instances:4,
      env_production: {
        NODE_ENV: "prod",
        DATABASE_URL:"mongodb://mongodb:27017/monos-market-place_subscription_proddb",
        EXCHANGE:"@monos-market-place",
        AMQP_HOST:"amqp://rabbitmq:5672",
        PORT:9003
     },
     env_development: {
      NODE_ENV: "dev",
      DATABASE_URL:"mongodb://mongodb:27017/monos-market-place_subscription_devdb",
      EXCHANGE:"@monos-market-place",
      AMQP_HOST:"amqp://rabbitmq:5672",
      PORT:9003
   }
    }]
  }

