package com.mongodb.application.request

import com.mongodb.domain.entity.Fitness
import com.mongodb.domain.entity.FitnessDetails
import org.bson.types.ObjectId

data class FitnessRequest(
    val exerciseType: String,
    val notes: String,
    val details: FitnessDetails
)
fun FitnessRequest.toDomain(): Fitness {
    return Fitness(
        id = ObjectId(),
        exerciseType = exerciseType,
        notes = notes,
        details = details
    )
}