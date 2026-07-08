from sqlalchemy import Column, DateTime, Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.session import Base


class OrderStatus(str, enum.Enum):
    PENDING = "pending"           # Created, awaiting payment
    PAID = "paid"                 # Payment confirmed
    PROCESSING = "processing"     # Being packed
    SHIPPED = "shipped"           # On the way
    DELIVERED = "delivered"       # Completed
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    # Pricing
    subtotal = Column(Float, nullable=False)
    shipping_cost = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total = Column(Float, nullable=False)

    # Shipping snapshot (store at time of order in case address changes)
    shipping_name = Column(String, nullable=False)
    shipping_line1 = Column(String, nullable=False)
    shipping_line2 = Column(String, nullable=True)
    shipping_city = Column(String, nullable=False)
    shipping_postcode = Column(String, nullable=False)
    shipping_country = Column(String, nullable=False)

    # Payment
    stripe_payment_intent_id = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

    def __repr__(self):
        return f"<Order {self.order_number}>"


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    # Snapshot product details at time of purchase
    product_name = Column(String, nullable=False)
    product_sku = Column(String, nullable=True)
    unit_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")

    def __repr__(self):
        return f"<OrderItem {self.product_name} x{self.quantity}>"