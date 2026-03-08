package com.vitanova.app.ui.components

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vitanova.app.ui.theme.*

data class BottomNavItem(
    val route: String,
    val label: String,
    val outlinedIcon: ImageVector,
    val filledIcon: ImageVector,
)

val bottomNavItems = listOf(
    BottomNavItem("home", "Home", Icons.Outlined.Home, Icons.Filled.Home),
    BottomNavItem("habits", "Habits", Icons.Outlined.LocalFireDepartment, Icons.Filled.LocalFireDepartment),
    BottomNavItem("health", "Health", Icons.Outlined.FavoriteBorder, Icons.Filled.Favorite),
    BottomNavItem("tasks", "Tasks", Icons.Outlined.Checklist, Icons.Filled.Checklist),
    BottomNavItem("specialist", "Circle", Icons.Outlined.Groups, Icons.Filled.Groups),
)

@Composable
fun MorphingBottomNav(
    currentRoute: String,
    onNavigate: (String) -> Unit,
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(VitaDark.copy(alpha = 0.95f))
            .padding(top = 1.dp)
            .background(Color.White.copy(alpha = 0.05f)),
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            bottomNavItems.forEach { item ->
                val isSelected = currentRoute == item.route

                Column(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null,
                        ) {
                            onNavigate(item.route)
                        }
                        .padding(horizontal = 12.dp, vertical = 6.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    Icon(
                        imageVector = if (isSelected) item.filledIcon else item.outlinedIcon,
                        contentDescription = item.label,
                        tint = if (isSelected) VitaCyan else VitaTextDim.copy(alpha = 0.4f),
                        modifier = Modifier.size(22.dp),
                    )

                    AnimatedVisibility(
                        visible = isSelected,
                        enter = fadeIn() + expandVertically(),
                        exit = fadeOut() + shrinkVertically(),
                    ) {
                        Text(
                            item.label,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            color = VitaCyan,
                            letterSpacing = 0.5.sp,
                            modifier = Modifier.padding(top = 2.dp),
                        )
                    }

                    // Active indicator
                    if (isSelected) {
                        Box(
                            modifier = Modifier
                                .padding(top = 2.dp)
                                .size(4.dp, 2.dp)
                                .clip(RoundedCornerShape(1.dp))
                                .background(VitaCyan)
                        )
                    }
                }
            }
        }
    }
}
