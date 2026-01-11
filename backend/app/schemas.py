from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal


class PersonaBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    apellido: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    telefono: str = Field(..., min_length=7, max_length=20)
    direccion: str = Field(..., min_length=5, max_length=200)

    estado: Literal[
        'PENDIENTE',
        'EN_PROCESO',
        'OBSERVADO',
        'APROBADO',
        'RECHAZADO'
    ] = 'PENDIENTE'

    tiene_deuda: bool = False


class PersonaCreate(PersonaBase):
    pass


class PersonaUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=50)
    apellido: Optional[str] = Field(None, min_length=2, max_length=50)
    email: Optional[EmailStr]
    telefono: Optional[str] = Field(None, min_length=7, max_length=20)
    direccion: Optional[str] = Field(None, min_length=5, max_length=200)

    estado: Optional[
        Literal[
            'PENDIENTE',
            'EN_PROCESO',
            'OBSERVADO',
            'APROBADO',
            'RECHAZADO'
        ]
    ]

    tiene_deuda: Optional[bool]


class PersonaOut(PersonaBase):
    id: int

    class Config:
        from_attributes = True