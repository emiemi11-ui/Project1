package com.vitanova.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.vitanova.app.ui.navigation.NavGraph
import com.vitanova.app.ui.theme.VitaNovaTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VitaNovaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = VitaNovaTheme.colors.background
                ) {
                    NavGraph()
                }
            }
        }
    }
}
