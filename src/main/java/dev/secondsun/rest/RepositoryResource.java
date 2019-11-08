package dev.secondsun.rest;

import dev.secondsun.vo.Repository;

import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.logging.Logger;

@Path("/repository")
public class RepositoryResource {
    private static final Logger LOGGER = Logger.getLogger(RepositoryResource.class.getName());

    @Path("/{identifier}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Repository getRepository(@PathParam("identifier") String identifier) {
        return Repository.findByIdentifier(identifier);
    }

    @Transactional
    @GET
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public Repository create() {
        if (Repository.findByIdentifier("mavenCentral") == null) {
            Repository M2 = new Repository();
            M2.identifier = "mavenCentral";
            M2.name = "Maven Central";
            M2.remoteUrl = "https://repo1.maven.org/maven2/";
            M2.persistAndFlush();

        }

        return Repository.findByIdentifier("mavenCentral");
    }


}
