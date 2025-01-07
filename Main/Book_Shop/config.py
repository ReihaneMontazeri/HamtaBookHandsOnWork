class Config:
    # کلید مخفی برای استفاده در سشن‌ها و امنیت برنامه
    SECRET_KEY = '6f055cee9bbce0aa1866ce9268f195e1888ec44e75eb5a2e7a603ac47248ed44b81e7b9ce4673b2c'
    
    # مسیر پایگاه داده SQLite که برای ذخیره اطلاعات برنامه استفاده می‌شود
    SQLALCHEMY_DATABASE_URI = 'sqlite:///Book_Shop.db'
    
    # غیرفعال کردن قابلیت ردیابی تغییرات مدل‌ها برای بهبود کارایی
    SQLALCHEMY_TRACK_MODIFICATIONS = False
