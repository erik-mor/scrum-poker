package com.jam.pokerbe.model

import javax.persistence.*

@Entity
@Table(name = "sessions")
class Session (
        @Column(name = "name")
        var name: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    val id: Long = 0
}
