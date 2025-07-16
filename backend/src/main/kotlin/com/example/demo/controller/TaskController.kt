package com.example.demo.controller

import com.example.demo.controller.model.TaskModel
import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

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
    fun newTask(@RequestBody taskModel: TaskModel) {
        allTasks.add(taskModel)
        println("Saved {$taskModel}")
    }

    @GetMapping("/all")
    fun getAllTasks(): List<TaskModel> {
        return allTasks
    }
}