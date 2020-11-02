package com.jam.pokerbe.resolver

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.jam.pokerbe.model.User
import com.jam.pokerbe.repository.UserRepository
import org.springframework.stereotype.Component
import javax.swing.text.StyledEditorKit

@Component
class UserMutationResolver(
        val userRepository: UserRepository
): GraphQLMutationResolver {
    fun newUser(sessionId: Long, name: String): User {
        val savedUser = userRepository.findBySessionIdAndName(sessionId, name)
        return savedUser ?:
            userRepository.save(User(name, sessionId))
    }

    fun updateUser(id: Long, name: String, vote: String, hasVoted: Boolean): User {
        val user = userRepository.findById(id)
        user.ifPresent {
            it.name = name
            it.vote = vote
            it.hasVoted = hasVoted
            userRepository.save(it)
        }
        return user.get()
    }

    fun deleteUser(id: Long): Boolean {
        userRepository.deleteById(id)
        return true
    }
}