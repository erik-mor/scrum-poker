package com.jam.pokerbe

import com.jam.pokerbe.model.Session
import com.jam.pokerbe.repository.SessionRepository
import org.springframework.web.bind.annotation.*


@RestController
class TestController(
        val sessionRepository: SessionRepository
) {

    @GetMapping("/test")
    fun test() {
        val sessions = sessionRepository.findAll();
        print(sessions)
    }

    @PostMapping("/create/{name}")
    fun createSession(@PathVariable name: String) {
        sessionRepository.save(Session(name))
    }
}