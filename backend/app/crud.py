from sqlalchemy.orm import Session
from . import models, schemas

def get_personas(db: Session):
    return db.query(models.Persona).all()

def get_persona(db: Session, persona_id: int):
    return db.query(models.Persona).filter(models.Persona.id == persona_id).first()


def create_persona(db: Session, persona: schemas.PersonaCreate):
    db_persona = models.Persona(**persona.model_dump())
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona


def update_persona(db: Session, persona_id: int, data: schemas.PersonaUpdate):
    persona = db.query(models.Persona).filter(models.Persona.id == persona_id).first()

    if not persona:
        return None

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(persona, key, value)

    db.commit()
    db.refresh(persona)
    return persona


def delete_persona(db: Session, persona_id: int):
    persona = db.query(models.Persona).filter(models.Persona.id == persona_id).first()

    if not persona:
        return None

    db.delete(persona)
    db.commit()
    return persona