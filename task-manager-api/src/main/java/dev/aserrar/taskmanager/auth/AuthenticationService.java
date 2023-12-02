package dev.aserrar.taskmanager.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.aserrar.taskmanager.config.JwtService;
import dev.aserrar.taskmanager.user.Role;
import dev.aserrar.taskmanager.user.User;
import dev.aserrar.taskmanager.user.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public Boolean register(RegisterRequest request) {
    var user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.user)
        .build();
    repository.save(user);
    return true;
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );

    var user = repository.findByEmail(request.getEmail()).orElseThrow();
    var jwtToken = jwtService.generateToken(user);

    return AuthenticationResponse.builder().accessToken(jwtToken).build();
  }

}