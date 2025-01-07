from extension import create_app, db
from flask_migrate import Migrate
from flask_login import login_manager, LoginManager
import timeit
import psutil
import os
import datetime
from memory_profiler import profile
import matplotlib.pyplot as plt

app = create_app()

# لیست‌هایی برای ذخیره اطلاعات استفاده از حافظه و زمان‌بندی
memory_usage_list = []
time_stamps = []

def monitor_system_resources():
    # نظارت بر منابع سیستم شامل حافظه، CPU و دیسک
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    memory_usage = memory_info.rss / (1024 * 1024)  # تبدیل بایت به مگابایت
    print(f"Memory usage: {memory_usage:.2f} MB")
    
    # ذخیره مصرف حافظه برای رسم نمودار
    memory_usage_list.append(memory_usage)
    time_stamps.append(len(memory_usage_list))  
    
    cpu_usage = psutil.cpu_percent(interval=1)
    print(f"CPU usage: {cpu_usage:.2f}%")

    disk_usage = psutil.disk_usage('/')
    print(f"Disk usage: {disk_usage.percent}%")
    
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"Time: {current_time}")

def plot_memory_usage():
    # رسم نمودار مصرف حافظه در طول زمان
    plt.figure(figsize=(10, 6))
    plt.plot(time_stamps, memory_usage_list, marker='o', linestyle='-', color='b')
    plt.title('Memory Usage Over Time')
    plt.xlabel('Sample')
    plt.ylabel('Memory Usage (MB)')
    plt.grid()
    plt.show()

# دکوراتور برای اندازه‌گیری زمان اجرای یک تابع
def log_execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = timeit.default_timer()
        result = func(*args, **kwargs)
        end_time = timeit.default_timer()
        print(f"Execution time of {func.__name__}: {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@app.before_request
def before_request():
    # اجرای نظارت بر منابع قبل از هر درخواست
    monitor_system_resources()

@profile
def createDatabase():
    # ایجاد پایگاه داده در صورت عدم وجود
    db.create_all()

# راه‌اندازی Flask-Migrate برای مدیریت تغییرات پایگاه داده
migrate = Migrate(app, db)

# تنظیمات مربوط به Flask-Login
loginManager = LoginManager(app)
loginManager.login_view = 'sign_up'  # صفحه پیش‌فرض برای کاربران غیرلاگین

from models import User
@loginManager.user_loader
def userLoader(user_id):
    # بارگذاری کاربر از پایگاه داده با استفاده از user_id
    return User.query.get(user_id)

# ثبت مسیرهای مربوط به کنترلرهای مختلف
from controllers import visitor
app.add_url_rule('/', view_func=visitor.index, endpoint='index')
app.add_url_rule('/book/show-datei', view_func=visitor.book_dateil, endpoint='book_dateil', methods=['post', 'get'])
app.add_url_rule('/about-us', view_func=visitor.about_us, endpoint='about_us')
app.add_url_rule('/contact-us', view_func=visitor.contact_us, endpoint='contact_us', methods=['post', 'get'])

from controllers import authenticator
app.add_url_rule('/login', view_func=authenticator.sign_in, endpoint='sign_in', methods=['post', 'get'])
app.add_url_rule('/register', view_func=authenticator.sign_up, endpoint='sign_up', methods=['post', 'get'])
app.add_url_rule('/logout', view_func=authenticator.sign_out, endpoint='sign_out')

from controllers import user
app.add_url_rule('/user/all-product', view_func=user.user_all_product, endpoint='user_all_product', methods=['post', 'get'])
app.add_url_rule('/user/result-search', view_func=user.user_result_search, endpoint='user_result_search', methods=['post', 'get'])
app.add_url_rule('/user/account-info', view_func=user.user_info, endpoint='user_info', methods=['post', 'get'])
app.add_url_rule('/user/current-basket', view_func=user.user_current_basket, endpoint='user_current_basket', methods=['post', 'get'])

@app.before_request
@log_execution_time
def createDatabase():
    # ایجاد جداول پایگاه داده در هر درخواست (مناسب برای توسعه)
    db.create_all()

with app.app_context():
    db.create_all()  # ایجاد پایگاه داده هنگام راه‌اندازی برنامه

@app.after_request
def after_request(response):
    # رسم نمودار مصرف حافظه بعد از هر درخواست
    plot_memory_usage() 
    return response

if __name__ == '__main__':
    # اجرای برنامه در حالت debug
    app.run(debug=True)
