package com.vitanova.app.ui.screens.onboarding

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*
import kotlinx.coroutines.delay

@Composable
fun OnboardingScreen(onComplete: () -> Unit) {
    var currentStep by remember { mutableIntStateOf(0) }
    var name by remember { mutableStateOf("") }
    var wakeTime by remember { mutableStateOf("06:30") }
    var challenge by remember { mutableStateOf("") }
    var goal by remember { mutableStateOf("") }
    var showLoading by remember { mutableStateOf(false) }

    if (showLoading) {
        LoadingScreen(onComplete = onComplete)
        return
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(VitaDark)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        when (currentStep) {
            0 -> OnboardingStep(
                question = "What's your name?",
                content = {
                    OutlinedTextField(
                        value = name,
                        onValueChange = { name = it },
                        placeholder = { Text("Enter your name", color = VitaTextDim) },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = VitaTextPrimary,
                            unfocusedTextColor = VitaTextPrimary,
                            focusedBorderColor = VitaCyan,
                            unfocusedBorderColor = VitaTextDim.copy(alpha = 0.3f),
                            cursorColor = VitaCyan,
                        ),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        singleLine = true,
                    )
                },
                canProceed = name.isNotBlank(),
                onNext = { currentStep++ }
            )
            1 -> OnboardingStep(
                question = "When do you wake up?",
                content = {
                    val times = listOf("05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00")
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        times.forEach { time ->
                            SelectableChip(
                                text = time,
                                selected = wakeTime == time,
                                onClick = { wakeTime = time }
                            )
                        }
                    }
                },
                canProceed = true,
                onNext = { currentStep++ }
            )
            2 -> OnboardingStep(
                question = "Your biggest challenge?",
                content = {
                    val options = listOf("Energy", "Focus", "Consistency", "Stress")
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        options.forEach { opt ->
                            SelectableChip(
                                text = opt,
                                selected = challenge == opt,
                                onClick = { challenge = opt }
                            )
                        }
                    }
                },
                canProceed = challenge.isNotBlank(),
                onNext = { currentStep++ }
            )
            3 -> OnboardingStep(
                question = "Your primary goal?",
                content = {
                    val options = listOf("Performance", "Health", "Recovery", "Balance")
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        options.forEach { opt ->
                            SelectableChip(
                                text = opt,
                                selected = goal == opt,
                                onClick = { goal = opt }
                            )
                        }
                    }
                },
                canProceed = goal.isNotBlank(),
                onNext = { showLoading = true }
            )
        }

        // Progress dots
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 32.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            repeat(4) { i ->
                Box(
                    modifier = Modifier
                        .size(if (i == currentStep) 24.dp else 8.dp, 8.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (i <= currentStep) VitaCyan else VitaTextDim.copy(alpha = 0.2f))
                )
            }
        }
    }
}

@Composable
private fun OnboardingStep(
    question: String,
    content: @Composable () -> Unit,
    canProceed: Boolean,
    onNext: () -> Unit,
) {
    var visible by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { visible = true }

    AnimatedVisibility(
        visible = visible,
        enter = fadeIn(tween(500)) + slideInVertically(tween(500)) { it / 4 }
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(32.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = question,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = VitaTextPrimary,
                textAlign = TextAlign.Center,
            )

            content()

            Button(
                onClick = onNext,
                enabled = canProceed,
                colors = ButtonDefaults.buttonColors(
                    containerColor = VitaCyan,
                    contentColor = VitaDark,
                    disabledContainerColor = VitaCyan.copy(alpha = 0.3f),
                ),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
            ) {
                Text("Continue", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }
        }
    }
}

@Composable
private fun SelectableChip(text: String, selected: Boolean, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(if (selected) VitaCyan.copy(alpha = 0.15f) else VitaTextDim.copy(alpha = 0.05f))
            .clickable { onClick() }
            .padding(16.dp),
        contentAlignment = Alignment.CenterStart
    ) {
        Text(
            text = text,
            color = if (selected) VitaCyan else VitaTextSecondary,
            fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal,
            fontSize = 16.sp,
        )
    }
}

@Composable
private fun LoadingScreen(onComplete: () -> Unit) {
    val messages = listOf(
        "Configuring circadian profile...",
        "Setting up scheduler...",
        "Calibrating energy model...",
        "Preparing your first day..."
    )
    var currentMessage by remember { mutableIntStateOf(0) }
    val progress by animateFloatAsState(
        targetValue = (currentMessage + 1f) / messages.size,
        animationSpec = tween(800),
        label = "progress"
    )

    LaunchedEffect(Unit) {
        for (i in messages.indices) {
            delay(1200)
            currentMessage = i
        }
        delay(500)
        onComplete()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(VitaDark),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(24.dp),
        ) {
            CircularProgressIndicator(
                color = VitaCyan,
                trackColor = VitaTextDim.copy(alpha = 0.1f),
            )

            AnimatedVisibility(
                visible = true,
                enter = fadeIn(tween(300))
            ) {
                Text(
                    text = messages[currentMessage],
                    color = VitaTextSecondary,
                    fontSize = 14.sp,
                )
            }

            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .width(200.dp)
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp)),
                color = VitaCyan,
                trackColor = VitaTextDim.copy(alpha = 0.1f),
            )
        }
    }
}
