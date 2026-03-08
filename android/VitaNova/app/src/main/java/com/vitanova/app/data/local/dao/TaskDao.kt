package com.vitanova.app.data.local.dao

import androidx.room.*
import com.vitanova.app.data.local.entities.TaskEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks ORDER BY circadianSlot ASC")
    fun getAllTasks(): Flow<List<TaskEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: TaskEntity)

    @Update
    suspend fun updateTask(task: TaskEntity)

    @Delete
    suspend fun deleteTask(task: TaskEntity)

    @Query("SELECT SUM(energyCost) FROM tasks WHERE completed = 1")
    fun getUsedEnergy(): Flow<Int?>
}
