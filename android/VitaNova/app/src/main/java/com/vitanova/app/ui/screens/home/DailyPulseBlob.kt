package com.vitanova.app.ui.screens.home

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun DailyPulseBlob(energy: Float, color: Color) {
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val phase by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = (2 * PI).toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(5000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart,
        ),
        label = "blobPhase"
    )
    val breathe by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(
            animation = tween(4000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse,
        ),
        label = "breathe"
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(Color.White.copy(alpha = 0.04f))
            .padding(16.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                modifier = Modifier.size(120.dp),
                contentAlignment = Alignment.Center,
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val centerX = size.width / 2
                    val centerY = size.height / 2
                    val baseRadius = size.minDimension / 2 * energy * breathe * 0.7f
                    val points = 120
                    val path = Path()

                    for (i in 0 until points) {
                        val angle = (i.toFloat() / points) * 2 * PI
                        val noise = sin(angle * 3 + phase) * 0.08f +
                                sin(angle * 5 - phase * 0.7f) * 0.05f +
                                cos(angle * 2 + phase * 1.3f) * 0.06f
                        val r = baseRadius * (1 + noise)
                        val x = centerX + (r * cos(angle)).toFloat()
                        val y = centerY + (r * sin(angle)).toFloat()

                        if (i == 0) path.moveTo(x, y)
                        else path.lineTo(x, y)
                    }
                    path.close()

                    // Glow layer
                    drawPath(path, color.copy(alpha = 0.1f), style = Fill)

                    // Main blob
                    drawPath(path, color.copy(alpha = 0.3f), style = Fill)
                }

                Text(
                    "PULSE",
                    fontSize = 8.sp,
                    letterSpacing = 3.sp,
                    color = VitaTextDim,
                )
            }

            Spacer(Modifier.height(4.dp))
            Text(
                "Daily Pulse • ${(energy * 100).toInt()}% energy",
                fontSize = 11.sp,
                color = VitaTextDim,
            )
        }
    }
}
