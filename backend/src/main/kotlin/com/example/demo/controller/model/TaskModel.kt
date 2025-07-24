package com.example.demo.controller.model

import kotlinx.serialization.Serializable
import java.util.UUID

@Serializable
class TaskModel {
    var id: String = UUID.randomUUID().toString()
    var title: String = ""
    var description: String = ""
    var dueDate: String = ""
    var priority: String = ""
    var status: String = ""
}
