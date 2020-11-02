package com.jam.pokerbe.resolver

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.jam.pokerbe.model.Session
import com.jam.pokerbe.repository.SessionRepository
import org.springframework.stereotype.Component

@Component
class SessionQueryResolver(
        val sessionRepository: SessionRepository
) : GraphQLQueryResolver {

    fun sessions(): List<Session> {
        return sessionRepository.findAll()
    }

    fun session(sessionId: Long): Session? {
        return  sessionRepository.findById(sessionId).get()
    }
}