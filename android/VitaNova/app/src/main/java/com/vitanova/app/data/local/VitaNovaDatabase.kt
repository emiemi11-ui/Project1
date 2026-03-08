package com.vitanova.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.vitanova.app.data.local.entities.HabitEntity
import com.vitanova.app.data.local.entities.TaskEntity
import com.vitanova.app.data.local.dao.HabitDao
import com.vitanova.app.data.local.dao.TaskDao

@Database(
    entities = [HabitEntity::class, TaskEntity::class],
    version = 1,
    exportSchema = false
)
abstract class VitaNovaDatabase : RoomDatabase() {
    abstract fun habitDao(): HabitDao
    abstract fun taskDao(): TaskDao
}
