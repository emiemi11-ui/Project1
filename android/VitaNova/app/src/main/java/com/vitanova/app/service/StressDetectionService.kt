package com.vitanova.app.service

import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class StressDetectionService @Inject constructor() {

    enum class StressLevel { LOW, MODERATE, ELEVATED, HIGH }

    fun detectStressLevel(
        hrvVariance: Float,
        typingSpeed: Float? = null,
        touchPressure: Float? = null,
        screenTimeDelta: Float? = null,
    ): StressLevel {
        var score = 0f
        score += when {
            hrvVariance < 20 -> 0.8f
            hrvVariance < 40 -> 0.5f
            hrvVariance < 60 -> 0.2f
            else -> 0f
        }

        typingSpeed?.let {
            if (it > 1.3f) score += 0.15f // faster than baseline
        }
        touchPressure?.let {
            if (it > 1.2f) score += 0.1f // harder than baseline
        }

        return when {
            score > 0.7f -> StressLevel.HIGH
            score > 0.5f -> StressLevel.ELEVATED
            score > 0.3f -> StressLevel.MODERATE
            else -> StressLevel.LOW
        }
    }

    fun getSuggestion(level: StressLevel): String = when (level) {
        StressLevel.LOW -> "You're doing great. Keep it up."
        StressLevel.MODERATE -> "Consider a 5-minute breathing exercise."
        StressLevel.ELEVATED -> "Take a short walk. Your body needs movement."
        StressLevel.HIGH -> "Stress is elevated. Consider stepping away from current tasks."
    }
}
