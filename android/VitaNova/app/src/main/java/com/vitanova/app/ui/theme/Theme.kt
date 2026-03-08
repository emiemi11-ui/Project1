package com.vitanova.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

@Immutable
data class VitaNovaColors(
    val background: Color = VitaDark,
    val surface: Color = VitaDarkSecondary,
    val surfaceVariant: Color = VitaDarkTertiary,
    val panel: Color = VitaPanel,
    val cyan: Color = VitaCyan,
    val green: Color = VitaGreen,
    val amber: Color = VitaAmber,
    val red: Color = VitaRed,
    val violet: Color = VitaViolet,
    val blue: Color = VitaBlue,
    val textPrimary: Color = VitaTextPrimary,
    val textSecondary: Color = VitaTextSecondary,
    val textDim: Color = VitaTextDim,
)

val LocalVitaNovaColors = staticCompositionLocalOf { VitaNovaColors() }

private val DarkColorScheme = darkColorScheme(
    primary = VitaCyan,
    secondary = VitaGreen,
    tertiary = VitaViolet,
    background = VitaDark,
    surface = VitaDarkSecondary,
    surfaceVariant = VitaDarkTertiary,
    onPrimary = VitaDark,
    onSecondary = VitaDark,
    onBackground = VitaTextPrimary,
    onSurface = VitaTextPrimary,
    error = VitaRed,
)

object VitaNovaTheme {
    val colors: VitaNovaColors
        @Composable
        get() = LocalVitaNovaColors.current
}

@Composable
fun VitaNovaTheme(content: @Composable () -> Unit) {
    val vitaColors = VitaNovaColors()

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = VitaDark.toArgb()
            window.navigationBarColor = VitaDark.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = false
                isAppearanceLightNavigationBars = false
            }
        }
    }

    CompositionLocalProvider(LocalVitaNovaColors provides vitaColors) {
        MaterialTheme(
            colorScheme = DarkColorScheme,
            typography = VitaNovaTypography,
            content = content
        )
    }
}
