
# Monos Market Place

Welcome to **Monos Market Place**! This project leverages a microservices architecture and monorepo strategy.
Suite CLI manages the monorepo and is the task runner that makes running microservices effortless.
60% of the code was generated by suiteCLI. 
The project comes with built-in telemetry,distributed tracing and monitoring tools for a robust and scalable application.



## Prerequisites

Before running the project, ensure the following tools are installed on your system:

- **Docker** and **Docker Compose** (version 3.8 or later)
- **[Suite CLI (version 4.01)](https://www.npmjs.com/package/@microservices-suite/cli)**  
  Install globally:
  ```bash
  sudo npm install -g suite@latest
  ```

## Installation and Setup

### Start the Application
```bash
suite start -a monos-market-place
```

## Services

- **User Service**  
  - URL: [http://localhost:9001](http://localhost:9001)
  - Container Name: `user`

- **Payment Service**  
  - URL: [http://localhost:9002](http://localhost:9002)
  - Container Name: `payment`

- **Subscription Service**  
  - URL: [http://localhost:9003](http://localhost:9003)
  - Container Name: `subscription`

- **Product Service**  
  - URL: [http://localhost:9008](http://localhost:9008)
  - Container Name: `product`

- **Webserver (via Nginx)**  
  - URL: [http://localhost:4000](http://localhost:4000)
  - Container Name: `nginx`

- **API Gateway (Krakend)**  
  - URL: [http://localhost:8000](http://localhost:8000)
  - Dashboard: [http://localhost:8090](http://localhost:8090)
  - Container Name: `krakend`

- **MongoDB**  
  - URL: [http://localhost:27017](http://localhost:27017)
  - Container Name: `mongodb`

- **RabbitMQ Dashboard**  
  - URL: [http://localhost:15672](http://localhost:15672)
  - Container Name: `rabbitmq`

- **InfluxDB**  
  - URL: [http://localhost:8086](http://localhost:8086)
  - Container Name: `influxdb`

- **Grafana Dashboard**  
  - URL: [http://localhost:3000](http://localhost:3000)
  - Container Name: `grafana`

- **Jaeger Dashboard**  
  - URL: [http://localhost:16686](http://localhost:16686)
  - Container Name: `jaeger`

- **Kibana Dashboard**  
  - URL: [http://localhost:5601](http://localhost:5601)
  - Container Name: `kibana`

### Stop the Services
```bash
suite stop monos-market-place
```

### Clean Up docker volumes
```bash
suite prune -v [-f]
```

### Clean Up all docker artifacts
```bash
suite prune -a [-f]
```