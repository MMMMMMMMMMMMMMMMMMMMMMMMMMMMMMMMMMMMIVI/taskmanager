package com.example.demo.controller

import com.example.demo.controller.model.TaskModel
import jakarta.annotation.PostConstruct
import jakarta.annotation.PreDestroy
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.springframework.stereotype.Component

@Component
class CachingTasks {

    @PreDestroy
    fun saveTasksToFile() {
        val jsonString = Json.encodeToString(allTasks)
        dbFile.writeText(jsonString)
        println("Saved ${allTasks.size} tasks")
    }

    @PostConstruct
    fun readTasksFromFile() {
        if (dbFile.exists()) {
            val jsonString = dbFile.readText()
            allTasks.addAll(Json.decodeFromString<List<TaskModel>>(jsonString))
            println("Loaded ${allTasks.size} tasks")
        }
    }
}
