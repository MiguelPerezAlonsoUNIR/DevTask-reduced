# Stage 1: Build the Spring Boot app
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the built JAR
FROM openjdk:17
WORKDIR /app
COPY --from=builder /build/target/devboard-backend-1.0.0.jar /app/app.jar
CMD ["java", "-jar", "/app/app.jar"]
