package com.vitanova.app.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun ReadinessGauge(
    value: Int,
    modifier: Modifier = Modifier,
) {
    var animationPlayed by remember { mutableStateOf(false) }
    val animatedValue by animateFloatAsState(
        targetValue = if (animationPlayed) value / 100f else 0f,
        animationSpec = tween(1500),
        label = "gaugeValue"
    )
    LaunchedEffect(Unit) { animationPlayed = true }

    Box(
        modifier = modifier.size(160.dp, 100.dp),
        contentAlignment = Alignment.BottomCenter,
    ) {
        Canvas(modifier = Modifier.matchParentSize()) {
            val stroke = Stroke(width = 10.dp.toPx(), cap = StrokeCap.Round)

            // Background
            drawArc(
                brush = Brush.sweepGradient(
                    0f to VitaRed.copy(alpha = 0.2f),
                    0.5f to VitaAmber.copy(alpha = 0.2f),
                    1f to VitaGreen.copy(alpha = 0.2f),
                ),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = false,
                style = stroke,
            )

            // Active
            drawArc(
                brush = Brush.sweepGradient(
                    0f to VitaRed,
                    0.5f to VitaAmber,
                    1f to VitaGreen,
                ),
                startAngle = 180f,
                sweepAngle = 180f * animatedValue,
                useCenter = false,
                style = stroke,
            )

            // Needle
            val needleAngle = PI + PI * animatedValue
            val needleLength = size.minDimension * 0.35f
            val centerX = size.width / 2
            val centerY = size.height
            drawLine(
                color = VitaTextPrimary,
                start = Offset(centerX, centerY),
                end = Offset(
                    centerX + (cos(needleAngle) * needleLength).toFloat(),
                    centerY + (sin(needleAngle) * needleLength).toFloat(),
                ),
                strokeWidth = 3.dp.toPx(),
                cap = StrokeCap.Round,
            )
        }

        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "${(animatedValue * 100).toInt()}",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = VitaTextPrimary,
            )
            Text(
                text = "READINESS",
                fontSize = 8.sp,
                letterSpacing = 2.sp,
                color = VitaTextDim,
            )
        }
    }
}
