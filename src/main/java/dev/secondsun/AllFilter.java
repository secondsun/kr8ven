package dev.secondsun;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("*")
public class AllFilter implements Filter {

    private static final Logger LOGGER = Logger.getLogger(AllFilter.class.getName());

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(request, response);
        if (response instanceof io.undertow.servlet.spec.HttpServletResponseImpl) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            if (httpResponse.getStatus() == 404) {
                LOGGER.warning(getFullURL((HttpServletRequest) request));
            }
        }

    }

    public static String getFullURL(HttpServletRequest request) {
        StringBuilder requestURL = new StringBuilder(request.getRequestURL().toString());
        String queryString = request.getQueryString();
    
        if (queryString == null) {
            return requestURL.toString();
        } else {
            return requestURL.append('?').append(queryString).toString();
        }
    }

}