package dev.aserrar.taskmanager.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern.Flag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(generator = "_user_id_seq")
    @SequenceGenerator(name = "_user_id_seq", sequenceName = "_user_id_seq", allocationSize = 1)
    private Integer id ;
    
    
    @NotBlank(message = "Name is required.")
    @NotNull(message = "Name is required.")
    private String name;

    @Email(message = "The email address is invalid.", flags = { Flag.CASE_INSENSITIVE })
    @NotBlank(message = "Email is required.")
    @NotNull(message = "Email is required.")
    private String email;

    @NotBlank(message = "Password is required.")
    @NotNull(message = "Password is required.")
    private String password;
    
    
    @Enumerated(EnumType.STRING)
    private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getUsername() {
        // throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        // throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        // throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        // throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
        return true;
    }
    @Override
    public boolean isEnabled() {
        // throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

}
