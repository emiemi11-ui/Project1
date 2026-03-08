package com.vitanova.app.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "habits")
data class HabitEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val target: String,
    val consecutiveDays: Int = 0,
    val graceDaysUsed: Int = 0,
    val momentumScore: Float = 0f,
    val isRecoveryMode: Boolean = false,
    val createdAt: Long = System.currentTimeMillis(),
)
