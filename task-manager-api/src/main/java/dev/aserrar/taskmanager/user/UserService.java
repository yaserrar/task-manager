package dev.aserrar.taskmanager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> allUsers(){
       return userRepository.findAll();
    }
}
