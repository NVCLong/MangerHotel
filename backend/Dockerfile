FROM openjdk:23-slim-bullseye

COPY target/MangerHotel-0.0.1-SNAPSHOT.jar  MangerHotel-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/MangerHotel-0.0.1-SNAPSHOT.jar"]
#VOLUME /tmp
#EXPOSE 8080
#ARG JAR_FILE=target/spring-boot-docker.jar
#ADD ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]