import sqlite3
import datetime

def create_connection():
    connection = sqlite3.connect("C:/Users/QUAN/Desktop/solution-for-saving-student-records/backend/students.db")
    return connection


# def insert_student_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     student_data = [
#         ('ITDSIU22151', 'Nguyen Hoang Hong An', 2, 'IT'),
#         ('ITDSIU22158', 'Chau An Phu', '', 'IT'),
#         ('BABAIU20169', 'Tran Bao Tuan', '','BA')
#     ]
#     cursor.executemany("""
#         INSERT INTO student (sid, sname, scholarship_id, major_id)
#         VALUES (?, ?, ?, ?);
#     """, student_data)

#     connection.commit()
#     connection.close()

# insert_student_data()

# def insert_course_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     course_data = [
#         ('IT013IU','Data Structures and Algorithms', 'IT', 4, 5626000),
#         ('IT138IU','Data Science and Data Visualization', 'IT', 4, 5626000),
#         ('IT151IU','Statistical Methods', 'IT', 3, 4095960),
#         ('IT139IU','Scalable and Distributed Computing', 'IT', 4, 5626000),
#         ('IT140IU','Fundamental Concepts of Data Security', 'IT', 4, 5626000),
#         ('IT159IU','Artificial Intelligence', 'IT', 4, 5626000),
#         ('IT160IU','Data Mining', 'IT', 4, 5626000),
#         ('IT142IU','Analytics for Observational Data', 'IT', 4, 5626000),
#         ('IT161IU','Big Data Technology', 'IT', 4, 5626000),
#         ('IT146IU','Theory of Networks', 'IT', 4, 5626000),
#         ('IT147IU','Mobile Cloud Computing', 'IT', 4, 5626000)
#         ('IT079IU', 'Principles of Database Management', 'IT' , 4, 5626000),
#         ('IT069IU', 'Object-Oriented Programming', 'IT' , 4, 5626000),
#         ('IT137IU', 'Data Analysis', 'IT' , 4, 5626000),
#         ('IT135IU', 'Introduction to Data Science', 'IT' , 3, 4095960),
#         ('PT001IU', 'Physical Training 1', 'PT' , 3, 353000),
#         ('PT002IU', 'Physical Training 2', 'PT' , 3, 353000),
#         ('MA001IU', 'Calculus 1', 'MA' , 4, 5626000),
#         ('MA003IU', 'Calculus 2', 'MA' , 4, 5626000),
#         ('PH013IU', 'Physics 1', 'PH' , 2, 2730640),
#         ('PH014IU', 'Physics 2', 'PH' , 2, 2730640),
#         ('IT136IU', 'Regression Analysis', 'IT' , 4, 5626000),
#         ('IT154IU', 'Linear Algebra', 'IT' , 3, 4095960),
#         ('PE015IU', 'Philosophy of Marxism and Leninism', 'PE' , 3, 388410),
#         ('IT149IU', 'Fundamentals of Programming', 'IT' , 4, 5626000),
#         ('EN007IU', 'Writing AE1', 'EN' , 2, 1035760)
    #  ]
    # cursor.executemany("""
    #      INSERT INTO course (cid, cname, major_id, credit, fee)
    #      VALUES (?, ?, ?, ?,?);
    #  """, course_data)

    # connection.commit()
    # connection.close()
#insert_course_data()


# def insert_class_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     class_data = [
#         (1, 'IT069IU', 'Object-Oriented Programming' , 'WED', 'A2.407', 90, 4,6,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Tran Thanh Tung', '1-2324'),
#         (2, 'IT079IU', 'Principles of Database Management' , 'SAT', 'A1.109', 90, 7,9,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Nguyen Thi Thuy Loan', '1-2324'),
#         (3, 'IT137IU', 'Data Analysis' , 'FRI', 'A2.205', 90, 4,6, datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Nguyen Trung Ky', '1-2324'),
#         (4,'IT159IU','Artificial Intelligence', 'MON', 'A2.407', 90, 1,3,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Tran Thanh Tung', '1-2324'),
#         (5,'IT160IU','Data Mining', 'TUE', 'A2.507', 90, 1,3,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Tran Thanh Tung', '1-2324'),
#         (6,'IT147IU','Mobile Cloud Computing', 'MON', 'A2.507', 90, 1,3,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Nguyen Trung Ky', '1-2324'),
#         (7,'IT161IU','Big Data Technology', 'THU', 'A2.507', 90, 4,6,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Nguyen Thi Thuy Loan', '1-2324'),
#         (8,'IT138IU','Data Science and Data Visualization', 'TUE', 'A2.307', 90, 4,6,datetime.date(2023, 9, 20), datetime.date(2024, 1, 10), 'Nguyen Thi Thuy Loan', '1-2324')
#     ]   
#     cursor.executemany("""
#         INSERT INTO class (class_id, cid, cname, day, room, slot, start_period, end_period, start_date, end_date, professor_name, semester)
#         VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?);
#     """, class_data)

#     connection.commit()
#     connection.close()
    
# insert_class_data()
def insert_enrollment_data():
    connection = create_connection()
    cursor = connection.cursor()
    enrollment_data = [
        ('ITDSIU22151',1, 90, 100, 90, 93),
        ('ITDSIU22158',2,95, 100, 95, 96),
        ('BABAIU20169',3,100,100,100,100 ),
        ('ITDSIU22151',2, 85, 90, 90, 93),
        ('ITDSIU22151',6, 95, 90, 90, 95),
        ('ITDSIU22151',7, 80, 100, 90, 92),
        ('ITDSIU22151',4, 100, 99, 100, 99)
    ]
    cursor.executemany("""
        INSERT INTO enrollment (sid, class_id, inclass, midterm,final, gpa)
        VALUES (?, ?, ?, ?,?,?);
    """, enrollment_data)

    connection.commit()
    connection.close()
# insert_enrollment_data()

# def insert_major_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     major_data = [
        # ('IT','Data Science'),
        # ('PT','Physical traning'),
        # ('MA', 'Mathematics' ),
        # ('BA', 'Business Administration')
        # ('PH','Physics'),
        # ('PE','Political and economics'),
        # ('EN', 'Language')
        
    # ]
    # cursor.executemany("""
    #     INSERT INTO major (major_id, major_name)
    #     VALUES (?, ?);
    # """, major_data)

    # connection.commit()
    # connection.close()

#insert_major_data()
# def insert_professor_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     professor_data = [
#         ('EN1','Nguyễn Huy Cường','Language'),
#         ('EN2','Vũ Hoa Ngân','Language'),
#         ('MA1', 'Pham Huu Anh Ngoc','Mathematics'),
#         ('MA2', 'Nguyễn Minh Quân','Mathematics'),
#         ('PH1','Phan Bảo Ngọc','Physics'),
#         ('PH2','Hồ Quốc Bằng','Physics'),
#         ('PT1','Nguyễn Phúc Minh Quân','Physical training'),
#         ('PT2','Phạm Nguyễn Quỳnh Anh','Physical training'),
#         ('PE1','Nguyễn Hoàng Hồng Ân','Political and economics'),
#         ('PE2','Đoàn Võ Thảo My','Political and economics'),
#         ('IT1', 'Nguyen Van Sinh', 'Computer Science and engineering'),
#         ('IT2', 'Tran Thanh Tung', 'Computer Science and engineering'),
#         ('IT3', 'Nguyen Thi Thuy Loan', 'Computer Science and engineering'),
#         ('IT4', 'Nguyen Trung Ky', 'Computer Science and engineering')
        
#     ]
#     cursor.executemany("""
#         INSERT INTO professor (pid, pname, department)
#         VALUES (?, ?,?);
#     """,professor_data)

#     connection.commit()
#     connection.close()
# def insert_scholarship_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     scholarship_data = [
#         (1,'For students that have suffered from disadvantages circumstances',0.5),
#         (2,'For students that have entrance score in the top 3 of the entrance score',1),
#         (3,'For students that have entrance score in the top 5 of the entrance score',0.5),
#         (4,'For students that have the GPA in top 2 percent of the class in a semester', 600),
        
#     ]
#     cursor.executemany("""
#         INSERT INTO scholarship (scholarship_id, description, percentage_discount)
#         VALUES (?, ?,?);
#     """, scholarship_data)

#     connection.commit()
#     connection.close()
# def insert_user_data():
#     connection = create_connection()
#     cursor = connection.cursor()
#     user_data = [
#         (1,'NHHAn','123abc', 'ITDSIU22151'),
#         (2,'CAphu','123abc', 'ITDSIU22158'),
#         (3,'TBTuan','123abc','BABAIU20169')
        
#     ]
#     cursor.executemany("""
#         INSERT INTO user (user_id, username, password,sid ) 
#         VALUES (?, ?,?,?);
#     """, user_data)

#     connection.commit()
#     connection.close()
def insert_teach_data():
    connection = create_connection()
    cursor = connection.cursor()
    teach_data = [
        (1, 'IT069IU', 'Object-Oriented Programming' , 'WED', 'A2.407','IT2','Tran Thanh Tung'),
        (2, 'IT079IU', 'Principles of Database Management' , 'SAT', 'A1.109','IT3', 'Nguyen Thi Thuy Loan'),
        (3, 'IT137IU', 'Data Analysis' , 'FRI', 'A2.205','IT4' , 'Nguyen Trung Ky')
        
    ]
    cursor.executemany("""
        INSERT INTO teach (class_id, cid,cname,day,room,pid,professor_name ) 
        VALUES (?, ?,?,?,?,?,?);
    """, teach_data)

    connection.commit()
    connection.close()

insert_teach_data() 