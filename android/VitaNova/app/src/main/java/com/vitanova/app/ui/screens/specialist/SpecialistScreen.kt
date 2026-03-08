package com.vitanova.app.ui.screens.specialist

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

data class SpecialistInfo(
    val label: String,
    val initials: String,
    val color: Color,
    val unreadCount: Int,
    val lastMessage: String,
)

@Composable
fun SpecialistScreen() {
    val specialists = remember {
        listOf(
            SpecialistInfo("Doctor", "EM", VitaGreen, 0, "HRV readings look stable. Continue recovery."),
            SpecialistInfo("Psych", "AV", VitaViolet, 1, "How are you feeling about the upcoming exercise?"),
            SpecialistInfo("Trainer", "MC", VitaAmber, 0, "Great session today. ACWR looking optimal."),
            SpecialistInfo("Commander", "BA", VitaBlue, 2, "Unit readiness brief at 0800 tomorrow."),
        )
    }

    var selectedSpecialist by remember { mutableStateOf<SpecialistInfo?>(null) }

    if (selectedSpecialist != null) {
        ChatScreen(specialist = selectedSpecialist!!, onBack = { selectedSpecialist = null })
    } else {
        CareCircle(specialists = specialists, onSelect = { selectedSpecialist = it })
    }
}

@Composable
private fun CareCircle(specialists: List<SpecialistInfo>, onSelect: (SpecialistInfo) -> Unit) {
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseAlpha by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 0.6f,
        animationSpec = infiniteRepeatable(tween(2000), RepeatMode.Reverse),
        label = "pulseAlpha"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("Care Circle", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Spacer(Modifier.height(8.dp))
        Text("Your specialists", fontSize = 12.sp, color = VitaTextDim)

        Spacer(Modifier.height(40.dp))

        // Circle visualization
        Box(
            modifier = Modifier.size(280.dp),
            contentAlignment = Alignment.Center,
        ) {
            // Connection lines
            Canvas(modifier = Modifier.fillMaxSize()) {
                val center = Offset(size.width / 2, size.height / 2)
                specialists.forEachIndexed { i, spec ->
                    val angle = (-90.0 + i * 90) * PI / 180
                    val endX = center.x + (cos(angle) * 100).toFloat()
                    val endY = center.y + (sin(angle) * 100).toFloat()
                    drawLine(
                        color = spec.color.copy(alpha = pulseAlpha),
                        start = center,
                        end = Offset(endX, endY),
                        strokeWidth = 1.5f,
                    )
                }
            }

            // Center - User
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.radialGradient(
                            listOf(VitaCyan.copy(alpha = 0.2f), VitaCyan.copy(alpha = 0.05f))
                        )
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("92", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                    Text("READINESS", fontSize = 7.sp, letterSpacing = 2.sp, color = VitaTextDim)
                }
            }

            // Specialist nodes
            specialists.forEachIndexed { i, spec ->
                val angle = (-90.0 + i * 90) * PI / 180
                val offsetX = (cos(angle) * 100).toFloat()
                val offsetY = (sin(angle) * 100).toFloat()

                Box(
                    modifier = Modifier
                        .offset(offsetX.dp, offsetY.dp)
                        .size(52.dp)
                        .clip(CircleShape)
                        .background(spec.color)
                        .clickable { onSelect(spec) },
                    contentAlignment = Alignment.Center,
                ) {
                    Text(spec.initials, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)

                    if (spec.unreadCount > 0) {
                        Box(
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .size(18.dp)
                                .clip(CircleShape)
                                .background(VitaRed),
                            contentAlignment = Alignment.Center,
                        ) {
                            Text("${spec.unreadCount}", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                    }
                }

                // Label below
                Text(
                    spec.label,
                    fontSize = 9.sp,
                    color = VitaTextDim,
                    modifier = Modifier.offset(offsetX.dp, (offsetY + 34).dp),
                )
            }
        }

        Spacer(Modifier.height(32.dp))

        // Quick access list
        Text("Recent Messages", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Spacer(Modifier.height(8.dp))

        specialists.forEach { spec ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.05f))
                    .clickable { onSelect(spec) }
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(spec.color),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(spec.initials, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(spec.label, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                    Text(spec.lastMessage, fontSize = 11.sp, color = VitaTextDim, maxLines = 1)
                }
                if (spec.unreadCount > 0) {
                    Box(
                        modifier = Modifier
                            .size(20.dp)
                            .clip(CircleShape)
                            .background(VitaCyan),
                        contentAlignment = Alignment.Center,
                    ) {
                        Text("${spec.unreadCount}", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = VitaDark)
                    }
                }
            }
        }

        Spacer(Modifier.height(80.dp))
    }
}

@Composable
private fun ChatScreen(specialist: SpecialistInfo, onBack: () -> Unit) {
    var messageText by remember { mutableStateOf("") }
    val messages = remember {
        mutableStateListOf(
            specialist.lastMessage to false,
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark))),
    ) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White.copy(alpha = 0.05f))
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.Default.ArrowBack, "Back", tint = VitaTextPrimary)
            }
            Box(
                modifier = Modifier
                    .size(32.dp)
                    .clip(CircleShape)
                    .background(specialist.color),
                contentAlignment = Alignment.Center,
            ) {
                Text(specialist.initials, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
            Spacer(Modifier.width(8.dp))
            Column {
                Text(specialist.label, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                Text("Online", fontSize = 10.sp, color = VitaGreen)
            }
        }

        // Messages
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            // Context snapshot
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(specialist.color.copy(alpha = 0.1f))
                    .padding(8.dp)
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf("R:92" to VitaGreen, "HRV:68" to VitaViolet, "S:22%" to VitaAmber).forEach { (text, color) ->
                        Text(text, fontSize = 9.sp, color = color, fontWeight = FontWeight.Bold)
                    }
                }
            }

            messages.forEach { (msg, isSent) ->
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = if (isSent) Alignment.CenterEnd else Alignment.CenterStart,
                ) {
                    Box(
                        modifier = Modifier
                            .widthIn(max = 260.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(
                                if (isSent) VitaBlue.copy(alpha = 0.3f) else Color.White.copy(alpha = 0.08f)
                            )
                            .padding(12.dp)
                    ) {
                        Text(msg, fontSize = 13.sp, color = VitaTextSecondary)
                    }
                }
            }
        }

        // Input
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White.copy(alpha = 0.05f))
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            OutlinedTextField(
                value = messageText,
                onValueChange = { messageText = it },
                placeholder = { Text("Type a message...", color = VitaTextDim, fontSize = 13.sp) },
                modifier = Modifier.weight(1f),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedTextColor = VitaTextPrimary,
                    unfocusedTextColor = VitaTextPrimary,
                    focusedBorderColor = VitaCyan.copy(alpha = 0.3f),
                    unfocusedBorderColor = Color.White.copy(alpha = 0.1f),
                ),
                shape = RoundedCornerShape(20.dp),
                singleLine = true,
            )
            Spacer(Modifier.width(8.dp))
            IconButton(
                onClick = {
                    if (messageText.isNotBlank()) {
                        messages.add(messageText to true)
                        messageText = ""
                    }
                },
                modifier = Modifier
                    .size(44.dp)
                    .clip(CircleShape)
                    .background(VitaCyan),
            ) {
                Icon(Icons.Default.Send, "Send", tint = VitaDark, modifier = Modifier.size(18.dp))
            }
        }
    }
}
