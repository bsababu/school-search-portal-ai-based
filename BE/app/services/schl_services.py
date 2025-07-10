

from app.schema.schl_schema import SchoolResponse
from app.core.llm import query_with_llm

def search_school(query:str, origin_country:str, bach_or_mst:str) -> list[SchoolResponse]:

    response = query_with_llm(query, origin_country, bach_or_mst)

    return response