package com.vitanova.app.ui.screens.insights

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*

@Composable
fun InsightsScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF0D1220), VitaDark)))
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
    ) {
        Text("Insights", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
        Text("Correlations & Patterns", fontSize = 12.sp, color = VitaViolet, letterSpacing = 1.sp)

        Spacer(Modifier.height(16.dp))

        InsightCard(
            title = "Sleep ↔ Readiness",
            correlation = "r = 0.92",
            insight = "Each additional hour of sleep improves your readiness by ~8 points.",
            color = VitaGreen,
        )

        Spacer(Modifier.height(8.dp))

        InsightCard(
            title = "Stress ↔ Cognitive",
            correlation = "r = -0.87",
            insight = "When your stress exceeds 60%, cognitive performance drops below 50.",
            color = VitaRed,
        )

        Spacer(Modifier.height(8.dp))

        InsightCard(
            title = "HRV ↔ Recovery",
            correlation = "r = 0.84",
            insight = "HRV above 60ms correlates with 2-3 day recovery vs 5-7 days.",
            color = VitaViolet,
        )

        Spacer(Modifier.height(8.dp))

        InsightCard(
            title = "Pattern Detected",
            correlation = "WEEKLY",
            insight = "Your stress levels are 23% higher on Mondays. HRV drops precede this by 12-18 hours on Sunday evening.",
            color = VitaAmber,
        )

        Spacer(Modifier.height(80.dp))
    }
}

@Composable
private fun InsightCard(title: String, correlation: String, insight: String, color: Color) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(16.dp),
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(title, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = VitaTextPrimary)
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(color.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Text(correlation, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = color)
                }
            }
            Spacer(Modifier.height(8.dp))
            Text(insight, fontSize = 12.sp, color = VitaTextDim, lineHeight = 18.sp)
        }
    }
}
