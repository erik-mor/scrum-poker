package com.jam.pokerbe.model

import javax.persistence.*

@Entity
@Table(name = "users")
class User (
        @Column(name = "name")
        var name: String,

        @Column(name = "session_id")
        val sessionId: Long
) {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    val id: Long = 0

    @Column(name = "vote")
    var vote: String? = null

    @Column(name = "has_voted")
    var hasVoted: Boolean = false

}
