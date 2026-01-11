from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas, crud
from ..auth import verify_api_key

router = APIRouter(prefix="/personas", tags=["Personas"])


@router.get("", response_model=list[schemas.PersonaOut])
def get_personas(
    db: Session = Depends(get_db),
    _: bool = Depends(verify_api_key)
):
    return crud.get_personas(db)

@router.get("/{persona_id}", response_model=schemas.PersonaOut)
def get_persona(
    persona_id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_api_key)
):
    persona = crud.get_persona(db, persona_id)

    if not persona:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Persona no encontrada"
        )

    return persona


@router.post("", response_model=schemas.PersonaOut)
def create_persona(
    persona: schemas.PersonaCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_api_key)
):
    return crud.create_persona(db, persona)


@router.put("/{persona_id}", response_model=schemas.PersonaOut)
def update_persona(
    persona_id: int,
    data: schemas.PersonaUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_api_key)
):
    persona = crud.update_persona(db, persona_id, data)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona


@router.delete("/{persona_id}")
def delete_persona(
    persona_id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_api_key)
):
    persona = crud.delete_persona(db, persona_id)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return {
        "success": True,
        "message": "Persona eliminada correctamente",
    }