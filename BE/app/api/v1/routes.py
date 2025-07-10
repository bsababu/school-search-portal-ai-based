from fastapi import APIRouter, Query
from app.schema.schl_schema import SchoolResponse
from app.services.schl_services import search_school

router = APIRouter(prefix="/api/v1")


@router.get("/")
def read_root():
    return {"message": "Hello, World!"}


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.get("/schools", response_model=list[SchoolResponse])
def search(query:str = Query(...), origin=Query(...), bach_or_mst=Query(...)):
    return search_school(query, origin, bach_or_mst)
    # return {"message": "Hello, World!"}