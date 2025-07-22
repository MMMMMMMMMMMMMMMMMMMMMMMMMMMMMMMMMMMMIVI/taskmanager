package com.example.demo.controller

import com.example.demo.controller.model.TaskModel
import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.io.File

val dbFile: File = File("backend/database/tasks.json")
val allTasks: MutableList<TaskModel> = mutableListOf()

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true)
    }
}

@RestController
@RequestMapping("/task")
class TaskController {

    @PostMapping("/new")
    fun newTask(@RequestBody task: TaskModel) {
        allTasks.add(task)
        println("Saved ${task.id}")
    }

    @GetMapping("/all")
    fun getAllTasks(): List<TaskModel> {
        return allTasks
    }

    @DeleteMapping("/delete")
    fun deleteTask(@RequestBody id: String) {
        println("Deleting task with id $id")
        println("before deletion:")
        for (task in allTasks) {
            println(task.id)
        }
        allTasks.removeIf { it.id == id }
        println("after deletion:")
        for (task in allTasks) {
            println(task.id)
        }
    }
}