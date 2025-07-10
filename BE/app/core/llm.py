import hashlib
import json
import re
from openai import OpenAI
from app.schema.schl_schema import SchoolResponse
from app.core.config import settings
# from .qdrant_client import qdrant_client
# from .redis_client import redis_client

client = OpenAI(api_key=settings.open_ai_key)


def _cache_key(query: str, origin_country: str) -> str:
    return f"search:{hashlib.sha256(f'{origin_country}:{query}'.encode()).hexdigest()}"


def query_with_llm(query: str, origin_country: str, bach_or_mst: str) -> list[SchoolResponse]:
    key = _cache_key(query, origin_country)

    # if cached := redis_client.get(key):
    #     return [SchoolResponse(**s) for s in json.loads(cached)]
    prompt = (
        f"You are an education advisor AI. Identify the top 6 schools offering {bach_or_mst} programs for a student from {origin_country} who are looking for: {query}.\n"
        f"Consider factors such as program quality, reputation, alignment with student preferences, and suitability for international students from {origin_country} (e.g., visa support, language requirements, and scholarships).\n"
        f"Return the result as a JSON array of objects, using double quotes for all property names and string values, in the following format:\n\n"
        f"""{[
            {
                "name": "Constructor University",
                "location": "Berlin, Germany",
                "programs": "Computer Science and Engineering",
                "program_type": "Masters",
                "duration": "2 years",
                "application_deadline": "Opens: October 1, Closes: January 31",
                "scholarships": "Merit-based scholarships, up to 20,000 USD/year",
                "website": "https://www.constructor.university",
                "tuition_fee": "10,000 EUR/year",
                "language": "English",
                "acceptance_rate": "50%",
                "visa_process": "6-10 weeks for student visa processing",
                "description": "A leading institution known for innovation in technology and research."
    
            }
        ]}\n\n"""
        f"Ensure all monetary values include currency (e.g., USD, EUR). If exact data is unavailable, provide reasonable estimates or state 'Information not available' for that field.\n"
        f"If no schools match the criteria or the query is unclear, return a single object with all fields set to 'No schools found'.\n"
        f"Verify that URLs are valid and programs align with {bach_or_mst} level. Exclude schools that do not offer programs in the specified language or are incompatible with the student's country of origin (e.g., due to visa restrictions).\n"
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )

    text = response.choices[0].message.content
    

    if text is None:
        raise ValueError("No response from LLM")

    try:
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.IGNORECASE | re.MULTILINE)
        school_data = json.loads(text)
        # redis_client.set(key, json.dumps([s.model_dump() for s in school_data]), ex=60 * 60 * 24)
        # qdrant_client.upsert(
        #     collection_name="schools",
        #     points=[
        #         Point(id=school["id"], vector=school["vector"], payload=school)
        #     ]
        # )
        return [SchoolResponse(**school) for school in school_data]
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to decode LLM response as JSON: {e}\nResponse:\n{text}")