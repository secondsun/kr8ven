package dev.secondsun;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.json.JsonBuilderFactory;

import org.junit.jupiter.api.Test;

import dev.secondsun.vo.Repository;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.filter.log.ErrorLoggingFilter;
import io.restassured.http.ContentType;


public class RepositoryResourceTest {

    public static final Repository MAVEN_CENTRAL;

    static {
            MAVEN_CENTRAL = new Repository();
            MAVEN_CENTRAL.identifier = "mavenCentral";
            MAVEN_CENTRAL.name = "Maven Central";
            MAVEN_CENTRAL.remoteUrl = "https://repo1.maven.org/maven2/";
    }

    @Test
    public void testPutRepository() {
        given()
        .filter(ErrorLoggingFilter.errorLogger())
        .contentType(ContentType.JSON)
        .body("{\"name\":\"Maven Central\",\"identifier\":\"mavenCentral\",\"remoteUrl\":\"https://repo1.maven.org/maven2/\"}")
        .when().put("/repository/mavenCentral")
        .then()
        .statusCode(200)
        .body(is("{\"id\":2,\"name\":\"Maven Central\",\"identifier\":\"mavenCentral\",\"remoteUrl\":\"https://repo1.maven.org/maven2/\",\"persistent\":false}"));
    }


    // public void testMirrorEndpoint() throws Exception {

    //     String pomResponse = new String(Files.readAllBytes(Paths.get(getClass().getClassLoader().getResource("nexus-buildsupport-all-2.9.1-02.pom").toURI())));

    //     given()
    //       .when().get("/mirror/org/sonatype/nexus/buildsupport/nexus-buildsupport-all/2.9.1-02/nexus-buildsupport-all-2.9.1-02.pom")
    //       .then()
    //          .statusCode(200)
    //          .header("content-type", "text/xml;charset=UTF-8")
    //          .header("content-length", "5690")
    //          .body(is(pomResponse));
    // }

}
