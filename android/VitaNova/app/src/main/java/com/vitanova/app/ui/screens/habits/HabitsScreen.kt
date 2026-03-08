package com.vitanova.app.ui.screens.habits

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*

data class HabitData(
    val name: String,
    val target: String,
    val completedDays: Int,
    val totalDays: Int = 30,
    val momentumScore: Int,
    val graceDaysUsed: Int = 0,
    val isRecoveryMode: Boolean = false,
    var isCompletedToday: Boolean = false,
)

@Composable
fun HabitsScreen() {
    var habits by remember {
        mutableStateOf(
            listOf(
                HabitData("Morning Exercise", "30 min", 25, momentumScore = 83),
                HabitData("Meditation", "15 min", 18, momentumScore = 60),
                HabitData("Hydration", "2.5L", 28, momentumScore = 93),
                HabitData("Reading", "20 min", 12, momentumScore = 40, isRecoveryMode = true),
                HabitData("Sleep by 23:00", "Target", 20, momentumScore = 67),
            )
        )
    }

    Scaffold(
        containerColor = Color.Transparent,
        floatingActionButton = {
            FloatingActionButton(
                onClick = { },
                containerColor = VitaCyan,
                contentColor = VitaDark,
            ) {
                Icon(Icons.Default.Add, "Add Habit")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(20.dp),
        ) {
            Text("Habits", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
            Text("Elastic Streaks", fontSize = 12.sp, color = VitaGreen, letterSpacing = 1.sp)

            Spacer(Modifier.height(16.dp))

            habits.forEachIndexed { index, habit ->
                ElasticStreakCard(
                    habit = habit,
                    onMarkComplete = {
                        habits = habits.toMutableList().apply {
                            val h = this[index]
                            this[index] = h.copy(
                                isCompletedToday = !h.isCompletedToday,
                                completedDays = if (!h.isCompletedToday) h.completedDays + 1 else h.completedDays - 1,
                            )
                        }
                    }
                )
                Spacer(Modifier.height(12.dp))
            }

            Spacer(Modifier.height(80.dp))
        }
    }
}

@Composable
private fun ElasticStreakCard(habit: HabitData, onMarkComplete: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
    ) {
        Column {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column {
                    Text(habit.name, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                    Text(habit.target, fontSize = 11.sp, color = VitaTextDim)
                }
                Text(
                    "${habit.completedDays}/${habit.totalDays}d",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = VitaGreen,
                )
            }

            Spacer(Modifier.height(8.dp))

            // Streak grid (30 squares)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(2.dp),
            ) {
                for (i in 0 until 30) {
                    val color = when {
                        i < habit.completedDays -> VitaGreen
                        i == habit.completedDays && habit.isCompletedToday -> VitaGreen
                        else -> Color.White.copy(alpha = 0.08f)
                    }
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .aspectRatio(1f)
                            .clip(RoundedCornerShape(2.dp))
                            .background(color)
                    )
                }
            }

            Spacer(Modifier.height(8.dp))

            // Momentum bar
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(4.dp)
                        .clip(RoundedCornerShape(2.dp))
                        .background(Color.White.copy(alpha = 0.05f))
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxHeight()
                            .fillMaxWidth(habit.momentumScore / 100f)
                            .clip(RoundedCornerShape(2.dp))
                            .background(VitaAmber)
                    )
                }
                Spacer(Modifier.width(8.dp))
                Text("${habit.momentumScore}%", fontSize = 10.sp, color = VitaAmber)
            }

            // Recovery mode banner
            if (habit.isRecoveryMode) {
                Spacer(Modifier.height(8.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(VitaAmber.copy(alpha = 0.1f))
                        .padding(8.dp)
                ) {
                    Text(
                        "Recovery Mode: Simplified target active",
                        fontSize = 10.sp,
                        color = VitaAmber,
                    )
                }
            }

            Spacer(Modifier.height(8.dp))

            // Mark complete button
            Button(
                onClick = onMarkComplete,
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (habit.isCompletedToday) VitaGreen.copy(alpha = 0.2f) else VitaGreen,
                    contentColor = if (habit.isCompletedToday) VitaGreen else VitaDark,
                ),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth().height(40.dp),
            ) {
                Text(
                    if (habit.isCompletedToday) "COMPLETED" else "MARK COMPLETE",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp,
                )
            }
        }
    }
}
