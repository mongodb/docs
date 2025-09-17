from typing import Optional, List, Mapping, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# start-data-model
# A Pydantic class modelling the *response* schema.
class Profile(BaseModel):
    """
    A profile for a single user.
    """
    id: Optional[str] = Field(
        default=None, description="MongoDB document ObjectID", alias="_id"
    )
    username: str
    residence: str
    current_location: List[float]

# A path operation that returns a Profile object as JSON.
app = FastAPI()

@app.get(
    "/profiles/{profile_id}",
    response_model=Profile,  # Tells FastAPI that the returned object must match the Profile schema.
)
async def get_profile(profile_id: str) -> Mapping[str, Any]:
    # Uses response_model to automatically convert, validate, and document
    # the returned dict without manual Profile object creation.
    profile = await app.profiles.find_one({"_id": profile_id})
    if profile is not None:
        # Return BSON document. FastAPI converts it automatically.
        return profile
    else:
        raise HTTPException(
            status_code=404, detail=f"No profile with id '{profile_id}'"
        )
# end-data-model