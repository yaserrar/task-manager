package dev.aserrar.taskmanager.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import dev.aserrar.taskmanager.user.User;
import dev.aserrar.taskmanager.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private String secretKey = "logb9O0stkmpzD6AZeDohCKpbDHB11EAtt/2FS2ctQqDf1PJjvzRv1ZyRh7pv2zIv1bobhcLLZvHxYd4cykaGFJjK0SKfhn9DuQFmEJb64VXKTLRVtEijl7uI4D0zVrh7pL5fU88eDRFHh2WiwwspkYgyo0faZmnvCeZtmg/OkyubA2CFxyZp03WzaYR17AcQ+55lcJwiDAbKZFepVL1Pxd9cSR2Fv3Wjs4piab1/oU+x/6hDNRkzqx9M0NmB7f+QusDjOGx/sd42A0pn9L4//lam3d3D9UnCkG1tjEpuhY6YQYh8VVwsyaA8VE7z1n6Yu+Ce5lrgg1mp8YSNqxJpIiRX08aoepeTsivfwTT8hg=";
  private long jwtExpiration = 1000*60*60*24;

  @Autowired
  UserRepository userRepository;

  public String extractUsername(String token) {
    Claims claims = Jwts.parserBuilder()
                        .setSigningKey(getSignInKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                      
    String email = claims.getSubject();
    return email;
  }

  public String generateToken(UserDetails userDetails) {
    return generateToken(new HashMap<>(), userDetails);
  }

  public String generateToken(
      Map<String, Object> extraClaims,
      UserDetails userDetails
  ) {
    return buildToken(extraClaims, userDetails, jwtExpiration);
  }

  private String buildToken( Map<String, Object> extraClaims, UserDetails userDetails, long expiration ) {
    String email = userDetails.getUsername();
    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      extraClaims.put("name", user.getName());
      extraClaims.put("id", user.getId());
    }

    return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(email)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    Claims claims = Jwts.parserBuilder()
                        .setSigningKey(getSignInKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
    Date expiration = claims.getExpiration();
    return expiration.before(new Date());
  }

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}