package com.vitanova.app.ui.screens.health

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import kotlin.math.PI
import kotlin.math.sin

@Composable
fun HealthScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
    ) {
        Text("Health", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Spacer(Modifier.height(16.dp))

        // Vitals grid
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            VitalCard("HR", "68", "bpm", VitaRed, modifier = Modifier.weight(1f))
            VitalCard("HRV", "65", "ms", VitaGreen, modifier = Modifier.weight(1f))
        }
        Spacer(Modifier.height(8.dp))
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            VitalCard("SpO2", "98", "%", VitaCyan, modifier = Modifier.weight(1f))
            VitalCard("Temp", "36.5", "°C", VitaAmber, modifier = Modifier.weight(1f))
        }

        Spacer(Modifier.height(20.dp))

        // Sleep chart
        SleepChart()

        Spacer(Modifier.height(20.dp))

        // Stress gauge
        StressGauge(level = "Low", value = 0.22f)

        Spacer(Modifier.height(20.dp))

        // Health Connect status
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(Color.White.copy(alpha = 0.05f))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column {
                    Text("Health Connect", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                    Text("Connected • Last sync 2 min ago", fontSize = 11.sp, color = VitaGreen)
                }
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(VitaGreen)
                )
            }
        }

        Spacer(Modifier.height(80.dp))
    }
}

@Composable
private fun VitalCard(label: String, value: String, unit: String, color: Color, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Row(verticalAlignment = Alignment.Bottom) {
                Text(value, fontSize = 28.sp, fontWeight = FontWeight.Bold, color = color)
                Text(unit, fontSize = 12.sp, color = VitaTextDim, modifier = Modifier.padding(bottom = 4.dp, start = 2.dp))
            }
            Text(label, fontSize = 10.sp, letterSpacing = 2.sp, color = VitaTextDim)

            Spacer(Modifier.height(8.dp))

            // Sparkline
            Canvas(modifier = Modifier.fillMaxWidth().height(24.dp)) {
                val points = listOf(0.5f, 0.6f, 0.4f, 0.7f, 0.55f, 0.65f, 0.5f)
                val step = size.width / (points.size - 1)
                for (i in 0 until points.size - 1) {
                    drawLine(
                        color = color.copy(alpha = 0.5f),
                        start = Offset(i * step, size.height * (1 - points[i])),
                        end = Offset((i + 1) * step, size.height * (1 - points[i + 1])),
                        strokeWidth = 2.dp.toPx(),
                        cap = StrokeCap.Round,
                    )
                }
            }
        }
    }
}

@Composable
private fun SleepChart() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
    ) {
        Column {
            Text("Sleep — Last 7 nights", fontSize = 10.sp, letterSpacing = 2.sp, color = VitaTextDim)
            Spacer(Modifier.height(12.dp))

            val sleepHours = listOf(7.2f, 6.5f, 8.1f, 5.8f, 7.5f, 6.9f, 7.8f)

            Row(
                modifier = Modifier.fillMaxWidth().height(100.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                verticalAlignment = Alignment.Bottom,
            ) {
                sleepHours.forEach { hours ->
                    Column(
                        modifier = Modifier.weight(1f),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        val heightFraction = hours / 9f
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .fillMaxHeight(heightFraction)
                                .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp))
                                .background(
                                    Brush.verticalGradient(
                                        listOf(VitaBlueLight, VitaViolet)
                                    )
                                )
                        )
                    }
                }
            }

            Spacer(Modifier.height(4.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(4.dp),
            ) {
                sleepHours.forEach { hours ->
                    Text(
                        "${hours}h",
                        fontSize = 8.sp,
                        color = VitaTextDim,
                        modifier = Modifier.weight(1f),
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                    )
                }
            }
        }
    }
}

@Composable
private fun StressGauge(level: String, value: Float) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
    ) {
        Column {
            Text("Stress Level", fontSize = 10.sp, letterSpacing = 2.sp, color = VitaTextDim)
            Spacer(Modifier.height(12.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                // Semicircular gauge
                Box(modifier = Modifier.size(80.dp), contentAlignment = Alignment.Center) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        val stroke = Stroke(width = 6.dp.toPx(), cap = StrokeCap.Round)
                        // Background
                        drawArc(
                            brush = Brush.sweepGradient(
                                listOf(VitaGreen, VitaAmber, VitaRed),
                            ),
                            startAngle = 180f,
                            sweepAngle = 180f,
                            useCenter = false,
                            style = Stroke(width = 6.dp.toPx(), cap = StrokeCap.Round),
                            alpha = 0.2f,
                        )
                        // Value
                        drawArc(
                            color = when {
                                value < 0.3f -> VitaGreen
                                value < 0.6f -> VitaAmber
                                else -> VitaRed
                            },
                            startAngle = 180f,
                            sweepAngle = 180f * value,
                            useCenter = false,
                            style = stroke,
                        )
                    }
                    Text(level, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = VitaGreen)
                }

                Spacer(Modifier.width(16.dp))

                Column {
                    Text(
                        "Based on HRV variance, typing patterns, and activity data",
                        fontSize = 11.sp,
                        color = VitaTextDim,
                    )
                    Spacer(Modifier.height(8.dp))
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(VitaGreen.copy(alpha = 0.1f))
                            .padding(8.dp)
                    ) {
                        Text(
                            "Consider a short walk or breathing exercise",
                            fontSize = 10.sp,
                            color = VitaGreen,
                        )
                    }
                }
            }
        }
    }
}
