package com.vitanova.app.ui.theme

import androidx.compose.ui.graphics.Color

// Primary palette
val VitaDark = Color(0xFF0A0A0F)
val VitaDarkSecondary = Color(0xFF12121A)
val VitaDarkTertiary = Color(0xFF1A1A2E)
val VitaPanel = Color(0xFF0B0F1C)
val VitaInk = Color(0xFF03050A)

// Accent colors
val VitaCyan = Color(0xFF00D4FF)
val VitaGreen = Color(0xFF00E5A0)
val VitaAmber = Color(0xFFF0A000)
val VitaRed = Color(0xFFE83050)
val VitaViolet = Color(0xFF7C5CFC)
val VitaBlue = Color(0xFF3054D8)
val VitaBlueLight = Color(0xFF4267E8)

// Text colors
val VitaTextPrimary = Color(0xFFE8EEFF)
val VitaTextSecondary = Color(0xFFB4C3F0)
val VitaTextDim = Color(0xFF7A90C8)

// Status colors
val StatusReady = VitaGreen
val StatusMonitor = VitaAmber
val StatusRisk = VitaRed
val StatusNonDeployable = Color(0xFFE83050).copy(alpha = 0.6f)

// Gradient helpers
val SunriseGradientStart = Color(0xFF1A1020)
val SunriseGradientEnd = Color(0xFF2A1830)
val NightGradientStart = Color(0xFF050510)
val NightGradientEnd = Color(0xFF0A0A1A)
