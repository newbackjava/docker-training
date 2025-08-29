# Gradle을 사용하여 애플리케이션 빌드
FROM gradle:7.6.1-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar

# 빌드된 JAR 파일을 실행
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
