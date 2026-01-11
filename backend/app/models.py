from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    email = Column(String(254), nullable=False, unique=True, index=True)
    telefono = Column(String(20), nullable=False)
    direccion = Column(String(200), nullable=False)
    estado = Column(String(20), nullable=False, default="PENDIENTE")
    tiene_deuda = Column(Boolean, nullable=False, default=False)