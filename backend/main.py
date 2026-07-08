from fastapi import FASTAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine,Base
from app.models import *

app = FASTAPI (
    title= "Weaning Hub API",
    description="Backend for Weaning Hub Shop",
    version="1.0.0",

)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers =["*"],

)
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Weaning Hub API is running "}

@app.get("/health")
async def health():
    return {"status":"ok"}