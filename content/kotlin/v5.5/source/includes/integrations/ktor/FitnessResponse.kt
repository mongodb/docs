package com.mongodb.application.response


import com.mongodb.domain.entity.FitnessDetails


data class FitnessResponse(
    val id: String,
    val exerciseType: String,
    val notes: String,
    val details: FitnessDetails
)