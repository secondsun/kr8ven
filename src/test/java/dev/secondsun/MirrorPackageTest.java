package dev.secondsun;

import io.quarkus.test.junit.QuarkusTest;

import static org.junit.jupiter.api.Assertions.fail;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class MirrorPackageTest {


    @Test
    public void testMirrorEndpoint() throws Exception {

        String pomResponse = new String(Files.readAllBytes(Paths.get(getClass().getClassLoader().getResource("nexus-buildsupport-all-2.9.1-02.pom").toURI())));

        given()
          .when().get("/mirror/org/sonatype/nexus/buildsupport/nexus-buildsupport-all/2.9.1-02/nexus-buildsupport-all-2.9.1-02.pom")
          .then()
             .statusCode(200)
             .header("content-type", "text/xml;charset=UTF-8")
             .header("content-length", "5690")
             .body(is(pomResponse));
    }


}