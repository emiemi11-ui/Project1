package com.vitanova.app.ui.navigation

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.vitanova.app.ui.components.MorphingBottomNav
import com.vitanova.app.ui.screens.habits.HabitsScreen
import com.vitanova.app.ui.screens.health.HealthScreen
import com.vitanova.app.ui.screens.home.HomeScreen
import com.vitanova.app.ui.screens.onboarding.OnboardingScreen
import com.vitanova.app.ui.screens.settings.SettingsScreen
import com.vitanova.app.ui.screens.specialist.SpecialistScreen
import com.vitanova.app.ui.screens.tasks.TasksScreen

sealed class Screen(val route: String) {
    data object Onboarding : Screen("onboarding")
    data object Home : Screen("home")
    data object Habits : Screen("habits")
    data object Health : Screen("health")
    data object Tasks : Screen("tasks")
    data object Specialist : Screen("specialist")
    data object Settings : Screen("settings")
}

val bottomNavScreens = listOf(
    Screen.Home,
    Screen.Habits,
    Screen.Health,
    Screen.Tasks,
    Screen.Specialist,
)

@Composable
fun NavGraph() {
    val navController = rememberNavController()
    var onboardingComplete by remember { mutableStateOf(false) }
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val showBottomNav = currentRoute in bottomNavScreens.map { it.route } || currentRoute == Screen.Settings.route

    Scaffold(
        containerColor = androidx.compose.ui.graphics.Color.Transparent,
        bottomBar = {
            if (showBottomNav) {
                MorphingBottomNav(
                    currentRoute = currentRoute ?: Screen.Home.route,
                    onNavigate = { route ->
                        navController.navigate(route) {
                            popUpTo(Screen.Home.route) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = if (onboardingComplete) Screen.Home.route else Screen.Onboarding.route,
            modifier = Modifier.padding(paddingValues),
            enterTransition = {
                slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Start, tween(300))
            },
            exitTransition = {
                slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Start, tween(300))
            },
        ) {
            composable(Screen.Onboarding.route) {
                OnboardingScreen(onComplete = {
                    onboardingComplete = true
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Onboarding.route) { inclusive = true }
                    }
                })
            }
            composable(Screen.Home.route) {
                HomeScreen(onNavigateToSettings = {
                    navController.navigate(Screen.Settings.route)
                })
            }
            composable(Screen.Habits.route) { HabitsScreen() }
            composable(Screen.Health.route) { HealthScreen() }
            composable(Screen.Tasks.route) { TasksScreen() }
            composable(Screen.Specialist.route) { SpecialistScreen() }
            composable(Screen.Settings.route) {
                SettingsScreen(onBack = { navController.popBackStack() })
            }
        }
    }
}
