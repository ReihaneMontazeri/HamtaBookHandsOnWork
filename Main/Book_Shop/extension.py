from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psutil
from config import Config

# این شیء برای تعامل با پایگاه داده SQLAlchemy استفاده می‌شود
db = SQLAlchemy()

# این شیء برای انجام عملیات مهاجرت پایگاه داده استفاده می‌شود
migrate = Migrate()

def create_app():
    # ایجاد یک شیء از اپلیکیشن Flask
    app = Flask(__name__)
    
    # بارگذاری تنظیمات از فایل پیکربندی
    app.config.from_object(Config)

    # راه‌اندازی SQLAlchemy برای اپلیکیشن
    db.init_app(app)
    
    # راه‌اندازی Migrate برای انجام عملیات مهاجرت پایگاه داده
    migrate.init_app(app, db)

    def monitor_system_resources():
        # دریافت میزان استفاده از پردازنده
        cpu_percent = psutil.cpu_percent(interval=1)
        
        # دریافت وضعیت حافظه سیستم
        memory_info = psutil.virtual_memory()
        
        # نمایش استفاده از پردازنده و حافظه
        print(f"CPU Usage: {cpu_percent}%")
        print(f"Memory Usage: {memory_info.percent}%")

    # این تابع قبل از هر درخواست اجرا می‌شود و منابع سیستم را نظارت می‌کند
    @app.before_request
    def before_request():
        monitor_system_resources()

    return app
