from fastapi import FASTAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine,Base
from app.models import *

