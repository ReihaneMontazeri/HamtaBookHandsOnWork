from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from persiantools.jdatetime import JalaliDate, JalaliDateTime
from extension import db

# مدل کاربر (User)
class User(UserMixin, db.Model):
    __tablename__ = 'users'  # نام جدول در پایگاه داده
    
    id = db.Column(db.Integer, primary_key=True)  # شناسه کاربر
    name = db.Column(db.String(150), unique=True, nullable=False)  # نام کاربر
    email = db.Column(db.String(120), unique=True, nullable=False)  # ایمیل کاربر
    password_hash = db.Column(db.String(128), nullable=False)  # هش پسورد کاربر
    is_admin = db.Column(db.Boolean, default=False)  # تعیین مدیر بودن یا خیر
    address = db.Column(db.Text, default=None)  # آدرس کاربر
    zipcode = db.Column(db.String(100), default=None)  # کد پستی کاربر
    number = db.Column(db.String(100), default=None)  # شماره تماس کاربر
    
    orders = db.relationship('Order', backref='user', lazy=True)  # ارتباط با جدول سفارشات

    def __init__(self, name, email, password, is_admin=False):
        self.name = name
        self.email = email
        self.password_hash = generate_password_hash(password)  # هش کردن پسورد هنگام ساخت کاربر
        self.is_admin = is_admin


# مدل کتاب (Book)
class Book(UserMixin, db.Model):
    __tablename__ = 'books'  # نام جدول در پایگاه داده
    
    id = db.Column(db.Integer, primary_key=True)  # شناسه کتاب
    persian_title = db.Column(db.String(100), nullable=False)  # عنوان فارسی کتاب
    english_title = db.Column(db.String(100), nullable=False)  # عنوان انگلیسی کتاب
    author = db.Column(db.String(100), nullable=False)  # نویسنده کتاب
    publisher = db.Column(db.String(100), nullable=False)  # ناشر کتاب
    shabak = db.Column(db.String(100), nullable=False)  # شماره شابک کتاب
    ghat = db.Column(db.String(100), nullable=False)  # قطع کتاب
    number_pages = db.Column(db.Integer, default=0)  # تعداد صفحات کتاب
    public_year_shamsi = db.Column(db.Integer, default=0)  # سال انتشار (شمسی)
    public_year_miladi = db.Column(db.Integer, default=0)  # سال انتشار (میلادی)
    typee = db.Column(db.String(100), nullable=False)  # نوع کتاب (مثلاً درسی یا عمومی)
    print_series = db.Column(db.Integer, default=0)  # سری چاپ کتاب
    price = db.Column(db.Float, nullable=False)  # قیمت کتاب
    stock = db.Column(db.Integer, default=0)  # موجودی کتاب
    description = db.Column(db.Text)  # توضیحات کتاب
    cover_image = db.Column(db.String(100))  # تصویر جلد کتاب
    
    order_items = db.relationship('OrderItem', backref='book', lazy=True)  # ارتباط با جدول اقلام سفارش


# مدل سفارش (Order)
class Order(UserMixin, db.Model):
    __tablename__ = 'orders'  # نام جدول در پایگاه داده
    
    id = db.Column(db.Integer, primary_key=True)  # شناسه سفارش
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # شناسه کاربر سفارش‌دهنده
    order_date = db.Column(db.String(20))  # تاریخ سفارش
    status = db.Column(db.Boolean, default=False)  # وضعیت سفارش (آیا تکمیل شده است یا خیر)
    total_price = db.Column(db.Float, default=0.0)  # قیمت کل سفارش
    
    items = db.relationship('OrderItem', backref='order', lazy=True)  # ارتباط با جدول اقلام سفارش

    def __init__(self, user_id, total_price=0.0):
        self.user_id = user_id
        self.total_price = total_price

    def update_order_date(self):
        # بروزرسانی تاریخ سفارش
        self.lastLogin = str(f'{str(JalaliDateTime.now())[:10]} | {str(JalaliDateTime.now())[10:19]}')
        db.session.commit()


# مدل اقلام سفارش (OrderItem)
class OrderItem(UserMixin, db.Model):
    __tablename__ = 'order_items'  # نام جدول در پایگاه داده
    
    id = db.Column(db.Integer, primary_key=True)  # شناسه آیتم
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)  # شناسه سفارش
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)  # شناسه کتاب
    quantity = db.Column(db.Integer, nullable=False)  # تعداد کتاب در این آیتم سفارش
    price = db.Column(db.Float, nullable=False)  # قیمت هر کتاب


# مدل سبد خرید (Cart)
class Cart(UserMixin, db.Model):
    __tablename__ = 'carts'  # نام جدول در پایگاه داده
    
    id = db.Column(db.Integer, primary_key=True)  # شناسه سبد خرید
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # شناسه کاربر
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)  # شناسه کتاب
    quantity = db.Column(db.Integer, nullable=False, default=1)  # تعداد کتاب در سبد خرید
    
    book = db.relationship('Book')  # ارتباط با مدل کتاب
