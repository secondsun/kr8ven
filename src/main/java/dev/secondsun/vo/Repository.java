package dev.secondsun.vo;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Repository extends PanacheEntity {

    public String name;
    public String identifier;
    public String remoteUrl;

    public static Repository findByIdentifier(String identifier) {
        return find("identifier", identifier).firstResult();
    }

}
