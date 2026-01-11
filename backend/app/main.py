from fastapi import FastAPI
from .database import Base, engine
from .routers import personas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Personas API")

app.include_router(personas.router)