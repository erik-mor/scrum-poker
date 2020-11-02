package com.jam.pokerbe.resolver

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.jam.pokerbe.model.Session
import com.jam.pokerbe.repository.SessionRepository
import org.springframework.stereotype.Component

@Component
class SessionMutationResolver (
        val sessionRepository: SessionRepository
): GraphQLMutationResolver{
    fun newSession(name: String, cards: Int): Session {
        return sessionRepository.save(Session(name, cards))
    }

    fun updateSession(id: Long, name: String): Session {
        val session = sessionRepository.findById(id);
        session.ifPresent {
            it.name = name
            sessionRepository.save(it)
        }
        return session.get()
    }

    fun deleteSession(id: Long): Boolean {
        sessionRepository.deleteById(id)
        return true
    }
}