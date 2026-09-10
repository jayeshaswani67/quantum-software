from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes import router
from app.api.intelligence_routes import router as intelligence_router


BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent


app = FastAPI(

    title="QuantumLab",

    description=(
        "Quantum computing and "
        "quantum intelligence platform"
    ),

    version="0.2.0"
)


# Static files

app.mount(
    "/static",
    StaticFiles(
        directory=PROJECT_DIR / "static"
    ),
    name="static"
)


# Quantum simulator API

app.include_router(router)


# Quantum intelligence API

app.include_router(
    intelligence_router
)


@app.get("/")
def home():

    return FileResponse(
        BASE_DIR /
        "templates" /
        "index.html"
    )