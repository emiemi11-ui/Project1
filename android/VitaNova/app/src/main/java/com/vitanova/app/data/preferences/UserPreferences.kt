package com.vitanova.app.data.preferences

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "vitanova_prefs")

class UserPreferences(private val dataStore: DataStore<Preferences>) {

    companion object {
        val KEY_ONBOARDING_COMPLETE = booleanPreferencesKey("onboarding_complete")
        val KEY_USER_NAME = stringPreferencesKey("user_name")
        val KEY_WAKE_TIME = stringPreferencesKey("wake_time")
        val KEY_CHALLENGE = stringPreferencesKey("biggest_challenge")
        val KEY_GOAL = stringPreferencesKey("primary_goal")
    }

    val isOnboardingComplete: Flow<Boolean> = dataStore.data.map { prefs ->
        prefs[KEY_ONBOARDING_COMPLETE] ?: false
    }

    val userName: Flow<String> = dataStore.data.map { prefs ->
        prefs[KEY_USER_NAME] ?: ""
    }

    suspend fun setOnboardingComplete(name: String, wakeTime: String, challenge: String, goal: String) {
        dataStore.edit { prefs ->
            prefs[KEY_ONBOARDING_COMPLETE] = true
            prefs[KEY_USER_NAME] = name
            prefs[KEY_WAKE_TIME] = wakeTime
            prefs[KEY_CHALLENGE] = challenge
            prefs[KEY_GOAL] = goal
        }
    }

    suspend fun clearAll() {
        dataStore.edit { it.clear() }
    }
}
