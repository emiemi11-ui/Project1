package com.vitanova.app.ui.screens.home

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import java.util.Calendar
import kotlin.math.PI
import kotlin.math.sin

@Composable
fun HomeScreen(onNavigateToSettings: () -> Unit) {
    val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    val gradientColors = when {
        hour < 6 -> listOf(NightGradientStart, NightGradientEnd)
        hour < 10 -> listOf(SunriseGradientStart, SunriseGradientEnd)
        hour < 17 -> listOf(Color(0xFF0D1220), VitaDark)
        hour < 20 -> listOf(Color(0xFF0D1025), VitaDark)
        else -> listOf(NightGradientStart, NightGradientEnd)
    }

    val greeting = when {
        hour < 12 -> "Good morning"
        hour < 17 -> "Good afternoon"
        else -> "Good evening"
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(gradientColors))
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column {
                Text(greeting, fontSize = 14.sp, color = VitaTextDim)
                Text("Cpl. Stanescu", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
            }
            IconButton(onClick = onNavigateToSettings) {
                Icon(Icons.Outlined.Settings, "Settings", tint = VitaTextDim)
            }
        }

        Spacer(Modifier.height(24.dp))

        // Cognitive Score
        CognitiveScoreCard(score = 72)

        Spacer(Modifier.height(16.dp))

        // Energy Budget
        EnergyBudgetCard(remaining = 62, total = 100)

        Spacer(Modifier.height(16.dp))

        // Daily Pulse Blob
        DailyPulseBlob(energy = 0.62f, color = VitaGreen)

        Spacer(Modifier.height(16.dp))

        // Top 3 Tasks
        Text("Today's Tasks", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Spacer(Modifier.height(8.dp))

        val tasks = listOf(
            "Morning run" to "20e",
            "Team briefing" to "10e",
            "Equipment check" to "8e",
        )

        tasks.forEach { (task, energy) ->
            var checked by remember { mutableStateOf(false) }
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.05f))
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Checkbox(
                    checked = checked,
                    onCheckedChange = { checked = it },
                    colors = CheckboxDefaults.colors(
                        checkedColor = VitaGreen,
                        uncheckedColor = VitaTextDim.copy(alpha = 0.3f),
                        checkmarkColor = VitaDark,
                    ),
                    modifier = Modifier.size(20.dp),
                )
                Spacer(Modifier.width(12.dp))
                Text(
                    task,
                    fontSize = 14.sp,
                    color = if (checked) VitaTextDim else VitaTextPrimary,
                    modifier = Modifier.weight(1f),
                )
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(VitaAmber.copy(alpha = 0.1f))
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Text(energy, fontSize = 10.sp, color = VitaAmber)
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        // Habits Quick View
        Text("Habits", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Spacer(Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            listOf(
                Triple("Exercise", 83, VitaGreen),
                Triple("Meditation", 60, VitaViolet),
                Triple("Hydration", 93, VitaCyan),
            ).forEach { (name, momentum, color) ->
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color.White.copy(alpha = 0.05f))
                        .padding(12.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    MiniArc(progress = momentum / 100f, color = color)
                    Spacer(Modifier.height(4.dp))
                    Text(name, fontSize = 10.sp, color = VitaTextDim)
                    Text("${momentum}%", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = color)
                }
            }
        }

        Spacer(Modifier.height(80.dp))
    }
}

@Composable
private fun MiniArc(progress: Float, color: Color) {
    Canvas(modifier = Modifier.size(40.dp)) {
        val stroke = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round)
        drawArc(
            color = color.copy(alpha = 0.15f),
            startAngle = 135f,
            sweepAngle = 270f,
            useCenter = false,
            style = stroke,
        )
        drawArc(
            color = color,
            startAngle = 135f,
            sweepAngle = 270f * progress,
            useCenter = false,
            style = stroke,
        )
    }
}
