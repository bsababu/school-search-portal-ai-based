from pydantic import BaseModel


class SchoolResponse(BaseModel):
    name: str
    location: str
    programs: str
    program_type: str
    duration: str
    application_deadline: str
    scholarships: str
    website: str
    tuition_fee: str
    language: str
    acceptance_rate: str
    visa_process: str
    description: str