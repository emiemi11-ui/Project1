package com.vitanova.app.service

import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CognitiveLoadService @Inject constructor() {

    fun calculateCognitiveScore(
        sleepHours: Float,
        hrvMs: Int,
        stressLevel: Float,
        screenTimeMinutes: Int,
    ): Int {
        val sleepFactor = (sleepHours / 8f).coerceIn(0f, 1f) * 30
        val hrvFactor = (hrvMs / 80f).coerceIn(0f, 1f) * 30
        val stressFactor = ((1f - stressLevel) * 20)
        val screenFactor = ((1f - (screenTimeMinutes / 480f).coerceIn(0f, 1f)) * 20)

        return (sleepFactor + hrvFactor + stressFactor + screenFactor).toInt().coerceIn(0, 100)
    }

    fun getCapacityDescription(score: Int): String = when {
        score >= 70 -> "High capacity — optimal for complex decisions"
        score >= 50 -> "Moderate capacity — stick to routine tasks"
        score >= 30 -> "Low capacity — avoid critical decisions"
        else -> "Very low — rest recommended"
    }
}
