package dev.secondsun;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/mirror")
public class MirrorResource {

    private static final Logger LOGGER = Logger.getLogger(MirrorResource.class.getName());


    @GET
    @Path("/{path:.*}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response hello(@PathParam("path") String path) {
        LOGGER.info("in hello with " + path);
        String url = "https://repo1.maven.org/maven2/" + path;
        try (BufferedInputStream in = new BufferedInputStream(new URL(url).openStream());
        ByteArrayOutputStream fileOutputStream = new ByteArrayOutputStream()) {
          byte dataBuffer[] = new byte[1024];
          int bytesRead;
          while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
              fileOutputStream.write(dataBuffer, 0, bytesRead);
          }
          return Response.status(200).type(MediaType.TEXT_XML_TYPE).entity(fileOutputStream.toByteArray()).build();
      } catch (IOException e) {
          LOGGER.log(Level.SEVERE, e.getMessage(), e );
        return Response.status(500).type(MediaType.TEXT_PLAIN).entity(e.getMessage()).build();
      }

        
    }
} 