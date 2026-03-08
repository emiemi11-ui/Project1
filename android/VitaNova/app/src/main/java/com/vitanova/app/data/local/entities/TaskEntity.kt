package com.vitanova.app.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tasks")
data class TaskEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val energyCost: Int,
    val duration: String,
    val priority: String,
    val circadianSlot: String,
    val completed: Boolean = false,
    val createdAt: Long = System.currentTimeMillis(),
)
