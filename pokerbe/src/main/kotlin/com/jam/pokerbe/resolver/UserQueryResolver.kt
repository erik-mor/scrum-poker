package com.jam.pokerbe.resolver

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.jam.pokerbe.model.User
import org.springframework.stereotype.Component
import com.jam.pokerbe.repository.UserRepository
import java.util.*

@Component
class UserQueryResolver(
        val userRepository: UserRepository
): GraphQLQueryResolver {
    fun users(sessionId: Long): List<User> {
        return userRepository.findAllBySessionId(sessionId)
    }

    fun user(id: Long): User {
        return userRepository.findById(id).get()
    }
}