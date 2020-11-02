package com.jam.pokerbe.repository

import com.jam.pokerbe.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findAllBySessionId(sessionId: Long): List<User>
    fun findBySessionIdAndName(sessionId: Long, name: String): User?
}
