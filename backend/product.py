from sqlalchemy import (
    ARRAY, Boolean, Column, DateTime, Enum,
    Float, ForeignKey, Integer, String, Text
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.session import Base


class AgeStage(str, enum.Enum):
    STAGE_1 = "4m+"    # First tastes
    STAGE_2 = "6m+"    # Moving on
    STAGE_3 = "9m+"    # Mashed & minced
    STAGE_4 = "12m+"   # Toddler


class ProductCategory(str, enum.Enum):
    FOOD = "food"
    EQUIPMENT = "equipment"   # spoons, bowls, bibs
    BOOKS = "books"
    BUNDLES = "bundles"


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    compare_at_price = Column(Float, nullable=True)  # for sale pricing
    stock = Column(Integer, default=0)
    sku = Column(String, unique=True, nullable=True)

    # Weaning-specific
    category = Column(Enum(ProductCategory), nullable=False)
    age_stage = Column(Enum(AgeStage), nullable=True)  # null for equipment
    allergens = Column(ARRAY(String), default=[])       # e.g. ["gluten", "dairy"]
    ingredients = Column(Text, nullable=True)
    is_organic = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

    # Media
    image_url = Column(String, nullable=True)
    extra_images = Column(ARRAY(String), default=[])

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    order_items = relationship("OrderItem", back_populates="product")

    def __repr__(self):
        return f"<Product {self.name}>"

    @property
    def is_in_stock(self):
        return self.stock > 0

    @property
    def discount_percent(self):
        if self.compare_at_price and self.compare_at_price > self.price:
            return round((1 - self.price / self.compare_at_price) * 100)
        return None
