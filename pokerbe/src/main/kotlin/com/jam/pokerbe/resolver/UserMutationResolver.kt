package com.jam.pokerbe.resolver

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.jam.pokerbe.model.User
import com.jam.pokerbe.repository.UserRepository
import org.springframework.stereotype.Component

@Component
class UserMutationResolver(
        val userRepository: UserRepository
): GraphQLMutationResolver {
    fun newUser(sessionId: Long, name: String): User {
        return userRepository.save(User(name, sessionId))
    }

    fun updateUser(id: Long, name: String, vote: String): User {
        val user = userRepository.findById(id)
        user.ifPresent {
            it.name = name
            it.vote = vote
            userRepository.save(it)
        }
        return user.get()
    }

    fun deleteUser(id: Long): Boolean {
        userRepository.deleteById(id)
        return true
    }
}