
from sqlalchemy import Column, Integer, String, Text 

from app.db import Base

class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    programs = Column(Text)
    program_type = Column(String)
    duration = Column(String)
    application_deadline = Column(String)
    scholarships = Column(Text)
    website = Column(String)
    tuition_fee = Column(String)
    language = Column(String)
    acceptance_rate = Column(String)
    visa_process = Column(String)
    description = Column(Text)