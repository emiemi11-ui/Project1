package com.vitanova.app.ui.screens.tasks

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
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

data class TaskItem(
    val name: String,
    val energyCost: Int,
    val duration: String,
    val priority: String,
    var completed: Boolean = false,
)

data class CircadianSection(
    val name: String,
    val timeRange: String,
    val tasks: List<TaskItem>,
    val color: Color,
)

@Composable
fun TasksScreen() {
    var sections by remember {
        mutableStateOf(
            listOf(
                CircadianSection("Morning Deep Work", "06:00 - 11:00", listOf(
                    TaskItem("Tactical briefing review", 15, "45 min", "HIGH"),
                    TaskItem("Report writing", 20, "60 min", "HIGH"),
                ), VitaCyan),
                CircadianSection("Midday Collaboration", "11:00 - 14:00", listOf(
                    TaskItem("Team coordination call", 10, "30 min", "MEDIUM"),
                ), VitaGreen),
                CircadianSection("Afternoon Active", "14:00 - 18:00", listOf(
                    TaskItem("Physical training", 25, "90 min", "HIGH"),
                    TaskItem("Equipment maintenance", 8, "30 min", "LOW"),
                ), VitaAmber),
                CircadianSection("Evening Review", "18:00 - 22:00", listOf(
                    TaskItem("After-action report", 12, "40 min", "MEDIUM"),
                ), VitaViolet),
            )
        )
    }

    val totalEnergy = 100
    val usedEnergy = sections.flatMap { it.tasks }.filter { it.completed }.sumOf { it.energyCost }
    val remainingEnergy = totalEnergy - usedEnergy

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
    ) {
        Text("Tasks", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Text("Circadian Scheduler", fontSize = 12.sp, color = VitaViolet, letterSpacing = 1.sp)

        Spacer(Modifier.height(12.dp))

        // Energy budget header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(Color.White.copy(alpha = 0.05f))
                .padding(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("ENERGY", fontSize = 10.sp, letterSpacing = 2.sp, color = VitaTextDim)
                Text(
                    "$remainingEnergy/$totalEnergy pts",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (remainingEnergy < 20) VitaRed else VitaGreen,
                )
            }
        }

        if (remainingEnergy < 20) {
            Spacer(Modifier.height(8.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(8.dp))
                    .background(VitaRed.copy(alpha = 0.1f))
                    .padding(8.dp)
            ) {
                Text("Low energy — consider deferring non-critical tasks", fontSize = 11.sp, color = VitaRed)
            }
        }

        Spacer(Modifier.height(16.dp))

        // Circadian sections
        sections.forEachIndexed { sIdx, section ->
            var expanded by remember { mutableStateOf(true) }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color.White.copy(alpha = 0.05f))
                    .padding(12.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { expanded = !expanded },
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Column {
                            Text(section.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                            Text(section.timeRange, fontSize = 10.sp, color = VitaTextDim)
                        }
                        Box(
                            modifier = Modifier
                                .size(4.dp)
                                .clip(RoundedCornerShape(2.dp))
                                .background(section.color)
                        )
                    }

                    if (expanded) {
                        Spacer(Modifier.height(8.dp))
                        section.tasks.forEachIndexed { tIdx, task ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp)
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(Color.White.copy(alpha = 0.04f))
                                    .padding(10.dp),
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Checkbox(
                                    checked = task.completed,
                                    onCheckedChange = {
                                        sections = sections.toMutableList().apply {
                                            val sec = this[sIdx]
                                            val tasks = sec.tasks.toMutableList()
                                            tasks[tIdx] = tasks[tIdx].copy(completed = it)
                                            this[sIdx] = sec.copy(tasks = tasks)
                                        }
                                    },
                                    colors = CheckboxDefaults.colors(
                                        checkedColor = VitaGreen,
                                        uncheckedColor = VitaTextDim.copy(alpha = 0.3f),
                                    ),
                                    modifier = Modifier.size(18.dp),
                                )
                                Spacer(Modifier.width(10.dp))
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        task.name,
                                        fontSize = 13.sp,
                                        color = if (task.completed) VitaTextDim else VitaTextPrimary,
                                    )
                                    Text(task.duration, fontSize = 10.sp, color = VitaTextDim)
                                }
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(VitaAmber.copy(alpha = 0.1f))
                                        .padding(horizontal = 6.dp, vertical = 2.dp)
                                ) {
                                    Text("${task.energyCost}e", fontSize = 9.sp, color = VitaAmber)
                                }
                            }
                        }
                    }
                }
            }

            Spacer(Modifier.height(8.dp))
        }

        Spacer(Modifier.height(80.dp))
    }
}
