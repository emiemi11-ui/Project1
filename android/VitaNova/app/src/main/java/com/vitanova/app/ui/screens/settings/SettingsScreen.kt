package com.vitanova.app.ui.screens.settings

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
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

@Composable
fun SettingsScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.Default.ArrowBack, "Back", tint = VitaTextPrimary)
            }
            Text("Settings", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        }

        Spacer(Modifier.height(20.dp))

        // Profile section
        SectionHeader("Profile")
        SettingsCard {
            SettingsRow("Name", "Cpl. R. Stanescu")
            SettingsRow("Unit", "Alpha")
            SettingsRow("Wake Time", "06:30")
        }

        Spacer(Modifier.height(16.dp))

        // Privacy section
        SectionHeader("Privacy Control")
        SettingsCard {
            PrivacyToggleRow("Vitals → Physician", defaultChecked = true)
            PrivacyToggleRow("Vitals → Trainer", defaultChecked = true)
            PrivacyToggleRow("Sleep → Psychologist", defaultChecked = true)
            PrivacyToggleRow("Mood → Commander", defaultChecked = false)
            PrivacyToggleRow("Productivity → Psychologist", defaultChecked = true)
            PrivacyToggleRow("Medications → Trainer", defaultChecked = false)
        }

        Spacer(Modifier.height(16.dp))

        // Notifications section
        SectionHeader("Notifications")
        SettingsCard {
            NotificationToggle("Readiness Alerts", defaultChecked = true)
            NotificationToggle("Specialist Messages", defaultChecked = true)
            NotificationToggle("Habit Reminders", defaultChecked = true)
            NotificationToggle("Energy Warnings", defaultChecked = false)
        }

        Spacer(Modifier.height(16.dp))

        // Data section
        SectionHeader("Data Management")
        SettingsCard {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { }
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Export My Data", fontSize = 14.sp, color = VitaCyan)
                Text("JSON", fontSize = 12.sp, color = VitaTextDim)
            }
            Divider(color = Color.White.copy(alpha = 0.05f))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { }
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Delete All Data", fontSize = 14.sp, color = VitaRed)
                Text("Permanent", fontSize = 12.sp, color = VitaTextDim)
            }
        }

        Spacer(Modifier.height(16.dp))

        // About
        SectionHeader("About")
        SettingsCard {
            SettingsRow("Version", "1.0.0-beta")
            SettingsRow("Build", "2025.03.08")
            SettingsRow("License", "Proprietary")
        }

        Spacer(Modifier.height(80.dp))
    }
}

@Composable
private fun SectionHeader(title: String) {
    Text(
        title,
        fontSize = 10.sp,
        letterSpacing = 2.sp,
        color = VitaTextDim,
        fontWeight = FontWeight.Bold,
        modifier = Modifier.padding(vertical = 8.dp),
    )
}

@Composable
private fun SettingsCard(content: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
        content = content,
    )
}

@Composable
private fun SettingsRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(label, fontSize = 14.sp, color = VitaTextSecondary)
        Text(value, fontSize = 14.sp, color = VitaTextPrimary, fontWeight = FontWeight.Medium)
    }
}

@Composable
private fun PrivacyToggleRow(label: String, defaultChecked: Boolean) {
    var checked by remember { mutableStateOf(defaultChecked) }
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, fontSize = 13.sp, color = VitaTextSecondary)
        Switch(
            checked = checked,
            onCheckedChange = { checked = it },
            colors = SwitchDefaults.colors(
                checkedTrackColor = VitaGreen.copy(alpha = 0.5f),
                checkedThumbColor = VitaGreen,
                uncheckedTrackColor = Color.White.copy(alpha = 0.1f),
                uncheckedThumbColor = VitaTextDim,
            ),
        )
    }
}

@Composable
private fun NotificationToggle(label: String, defaultChecked: Boolean) {
    var checked by remember { mutableStateOf(defaultChecked) }
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, fontSize = 13.sp, color = VitaTextSecondary)
        Switch(
            checked = checked,
            onCheckedChange = { checked = it },
            colors = SwitchDefaults.colors(
                checkedTrackColor = VitaCyan.copy(alpha = 0.5f),
                checkedThumbColor = VitaCyan,
                uncheckedTrackColor = Color.White.copy(alpha = 0.1f),
                uncheckedThumbColor = VitaTextDim,
            ),
        )
    }
}
