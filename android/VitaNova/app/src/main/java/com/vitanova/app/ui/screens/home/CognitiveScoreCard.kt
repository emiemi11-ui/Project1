package com.vitanova.app.ui.screens.home

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*

@Composable
fun CognitiveScoreCard(score: Int) {
    val color = when {
        score >= 70 -> VitaGreen
        score >= 50 -> VitaAmber
        score >= 30 -> Color(0xFFFF8C00)
        else -> VitaRed
    }

    var animationPlayed by remember { mutableStateOf(false) }
    val animatedProgress by animateFloatAsState(
        targetValue = if (animationPlayed) score / 100f else 0f,
        animationSpec = tween(1500, delayMillis = 300),
        label = "cogProgress"
    )
    LaunchedEffect(Unit) { animationPlayed = true }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(24.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(contentAlignment = Alignment.Center) {
                Canvas(modifier = Modifier.size(120.dp)) {
                    val stroke = Stroke(width = 8.dp.toPx(), cap = StrokeCap.Round)

                    // Background ring
                    drawArc(
                        color = Color.White.copy(alpha = 0.05f),
                        startAngle = -225f,
                        sweepAngle = 270f,
                        useCenter = false,
                        style = stroke,
                    )

                    // Progress ring
                    drawArc(
                        color = color,
                        startAngle = -225f,
                        sweepAngle = 270f * animatedProgress,
                        useCenter = false,
                        style = stroke,
                    )

                    // Glow effect
                    drawArc(
                        color = color.copy(alpha = 0.2f),
                        startAngle = -225f,
                        sweepAngle = 270f * animatedProgress,
                        useCenter = false,
                        style = Stroke(width = 16.dp.toPx(), cap = StrokeCap.Round),
                    )
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "${(animatedProgress * 100).toInt()}",
                        fontSize = 42.sp,
                        fontWeight = FontWeight.Bold,
                        color = VitaTextPrimary,
                    )
                    Text(
                        text = "COGNITIVE",
                        fontSize = 9.sp,
                        letterSpacing = 2.sp,
                        color = VitaTextDim,
                    )
                }
            }

            Spacer(Modifier.height(8.dp))

            Text(
                text = when {
                    score >= 70 -> "High capacity — optimal for complex decisions"
                    score >= 50 -> "Moderate — stick to routine tasks"
                    else -> "Low capacity — rest recommended"
                },
                fontSize = 12.sp,
                color = VitaTextDim,
            )
        }
    }
}
