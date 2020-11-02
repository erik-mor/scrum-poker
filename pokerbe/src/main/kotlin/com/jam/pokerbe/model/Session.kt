package com.jam.pokerbe.model

import javax.persistence.*

@Entity
@Table(name = "sessions")
class Session (
        @Column(name = "name")
        var name: String,

        @Column(name = "cards")
        val cards: Int
) {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    val id: Long = 0
}
