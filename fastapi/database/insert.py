import sqlite3

def create_connection():
    connection = sqlite3.connect("students.db")
    return connection


def insert_student_data():
    connection = create_connection()
    cursor = connection.cursor()
    student_data = [
        ('ITDSIU22151', 'Nguyen Hoang Hong An', 2, 'Data Science'),
        ('ITDSIU22158', 'Chau An Phu', '', 'Data Science'),
        ('BABAIU20169', 'Tran Bao Tuan', '','Business Administration')
    ]
    cursor.executemany("""
        INSERT INTO student (sid, sname, scholarship_id, major_name)
        VALUES (?, ?, ?, ?);
    """, student_data)

    connection.commit()
    connection.close()


insert_student_data()


def insert_course_data():
    connection = create_connection()
    cursor = connection.cursor()
    student_data = [
        ('ITDSIU22151', 'Nguyen Hoang Hong An', 2, 'Data Science'),
        ('ITDSIU22158', 'Chau An Phu', '', 'Data Science'),
        ('BABAIU20169', 'Tran Bao Tuan', '','Business Administration')
    ]
    cursor.executemany("""
        INSERT INTO student (sid, sname, scholarship_id, major_name)
        VALUES (?, ?, ?, ?);
    """, student_data)

    connection.commit()
    connection.close()


insert_student_data()

