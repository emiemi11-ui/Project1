package com.vitanova.app.domain.model

data class ReadinessData(
    val overallScore: Int,
    val cognitiveLoad: Int,
    val energyRemaining: Int,
    val energyTotal: Int = 100,
    val heartRate: Int,
    val hrv: Int,
    val spO2: Int,
    val temperature: Float,
    val stressLevel: Float,
    val sleepHours: Float,
    val sleepQuality: Int,
)

data class HabitProgress(
    val id: Long,
    val name: String,
    val target: String,
    val consecutiveDays: Int,
    val totalDays: Int = 30,
    val graceDaysUsed: Int,
    val maxGraceDays: Int = 1,
    val momentumScore: Float,
    val isRecoveryMode: Boolean,
    val consecutiveMissed: Int = 0,
)

data class SpecialistContact(
    val id: String,
    val name: String,
    val role: SpecialistRole,
    val lastMessage: String,
    val unreadCount: Int,
    val isOnline: Boolean = true,
)

enum class SpecialistRole {
    PHYSICIAN, PSYCHOLOGIST, TRAINER, COMMANDER
}
